import { User } from "../model/user.schema.js";
import { sendMail } from "../service/mailService.js";
import { emailValidator, passwordValidator } from "../utils/validator.js";
import { verificationMail } from "../mail/verificationMail.js";
import { JWT_SECRET, REFRESHTOKEN_SECRET } from "../constant.js";
import jwt from "jsonwebtoken";
import { tryCatch } from "../utils/tryCatch.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { cloudinaryUpload } from "../service/cloudinary.js";
import { passwordChangeMail } from "../mail/userMail.js";

const generateTokens = async (_id) => {
  try {
    const user = await User.findById(_id);
    const accessToken = await user.accessTokenGenerate();
    const refreshToken = await user.refreshTokenGenerate();
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error, message);
  }
};

const createUser = tryCatch(async (req, res) => {
  const { displayname, username, mobile, email, password } = req.body;

  // Check if any required field is missing
  if (!displayname || !username || !email || !mobile || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if username already exists
  const isUserNameExists = await User.findOne({ username });
  if (isUserNameExists) {
    throw new ApiError(400, "Username already exists");
  }

  // Check if mobile number already exists
  const isMobileExists = await User.findOne({ mobile });
  if (isMobileExists) {
    throw new ApiError(400, "Mobile number already exists");
  }

  // Check if email already exists
  const isEmailExists = await User.findOne({ email });
  if (isEmailExists) {
    throw new ApiError(400, "Email already exists");
  }

  const isEmailValid = emailValidator(email);
  if (!isEmailValid) {
    throw new ApiError(
      400,
      "User validation failed: email: invalid email address"
    );
  }

  // Validate password strength
  const isPasswordValid = passwordValidator(password);
  if (!isPasswordValid) {
    throw new ApiError(
      400,
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }

  // Create user in the database
  const createdUser = await User.create({
    displayname,
    username,
    mobile,
    email,
    password,
  });

  // Retrieve the created user
  const user = await User.findById(createdUser._id).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found after creation");
  }

  // Generate email verification token
  const mailVerificationToken = user.mailVerificationToken();

  // Send verification email
  await sendMail(
    user.email,
    "Email Verification",
    "",
    verificationMail(user.displayname, mailVerificationToken)
  );

  return res.json(
    new ApiSuccess(
      201,
      "User created successfully. Please verify your email.",
      { user }
    )
  );
});

const mailverification = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.status(404).json({ message: "User not found" });
    }
    const decodedToken = jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid token" });
      }
      return decoded;
    });
    if (!decodedToken) {
      return res.status(400).json({ message: "Invalid token" });
    }
    const user = await User.findByIdAndUpdate(
      decodedToken._id,
      {
        $set: {
          emailVerified: Date.now(),
        },
      },
      { new: true }
    );

    return res
      .status(201)
      .send( "Email verified successfully" );
  } catch (error) {
    console.error("Error in mailverification:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  if (Object.values(req.body).some((item) => item.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const isUser = await User.findOne({ email });
  const isPasswordCorrect = await isUser.isPasswordCorrect(password);
  const user = await User.findById(isUser._id).select("-password");
  if (!isUser) {
    throw new ApiError(404, "User not found");
  }

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid password");
  }

  const { accessToken, refreshToken } = await generateTokens(user._id);

  const options = {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
  };
  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options);
  return res.json(
    new ApiSuccess(200, "Login successful", {
      user: isUser,
      accessToken,
      refreshToken,
    })
  );
});
 
const updateProfile = tryCatch(async (req, res) => {
  const updates = {};
  if (req.file) {
    const avatar = req.file;
    const cloudinaryResult = await cloudinaryUpload(
      avatar.path,
      req.user.username,
      "avatar"
    );
    updates.avatar = {
      public_id: cloudinaryResult.public_id,
      url: cloudinaryResult.optimizeUrl,
    };
  }

  if (req.body.displayname) {
    updates.displayname = req.body.displayname;
  }

  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, "No Valid data to update");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: updates },
    { new: true }
  );
  return res.json(
    new ApiSuccess(200, "Profile updated successfully", { user })
  );
});

const logout = tryCatch(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: null } });

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.json(new ApiSuccess(200, "Logout successful", {}));
});

const changePassword = tryCatch(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  // checking for empty fields
  if (
    Object.values(req.body).some((item) => item.trim() === "") ||
    !oldPassword ||
    !newPassword
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Validate password strength
  if (!passwordValidator(newPassword)) {
    throw new ApiError(
      400,
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }
  const user = await User.findById(req.user._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }
  // Send verification email
  await sendMail(
    user.email,
    "Password Changed",
    "",
    passwordChangeMail(user.displayname)
  );
  user.password = newPassword;
  await user.save();
  return res.json(new ApiSuccess(200, "Password changed successfully", {}));
});

const refreshAccessToken = tryCatch(async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.headers.authorization;
  if (!refreshToken) {
    throw new ApiError(401, "Unauthorized access - no refresh token provided");
  }
  const decodedToken = jwt.verify(refreshToken, REFRESHTOKEN_SECRET);
  if (!decodedToken) {
    throw new ApiError(401, "Unauthorized access - invalid refresh token");
  }
  const user = await User.findById(decodedToken._id);
  if (!user) {
    throw new ApiError(401, "Unauthorized access - user not found");
  }
  const accessToken = await user.accessTokenGenerate();
  const options = {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
  };
  res.cookie("accessToken", accessToken, options);
  return res.json(
    new ApiSuccess(200, "Access token refreshed", { accessToken })
  );
});

export {
  createUser,
  mailverification,
  login,
  updateProfile,
  logout,
  changePassword,
  refreshAccessToken,
};
