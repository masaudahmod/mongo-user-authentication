import mongoose, { Schema, Types, model } from "mongoose";
import { emailValidator } from "../utils/validator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  ACCESSTOKEN_EXPIRE,
  ACCESSTOKEN_SECRET,
  JWT_SECRET,
  REFRESHTOKEN_EXPIRE,
  REFRESHTOKEN_SECRET,
} from "../constant.js";

const userSchema = new Schema(
  {
    displayname: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      lowercase: true,
      trim: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: [true, "Mobile No. is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      lowercase: true,
      trim: true,
      unique: true,
      validate: {
        validator: emailValidator,
        message: "Invalid email",
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    avatar: {
      publicId: String,
      url: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "vendor"],
      default: "user",
    },
    // vendor: {
    //   Types: mongoose.Schema.Types.ObjectId,
    //   ref: "Vendor",
    // },
    emailVerified: Date,
    refreshToken: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(error);
  }
};
userSchema.methods.mailVerificationToken = function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
      },
      JWT_SECRET,
      { expiresIn: "5m" }
    );
  } catch (error) {
    console.log(error);
  }
};
userSchema.methods.accessTokenGenerate = function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
        role: this.role,
      },
      ACCESSTOKEN_SECRET,
      { expiresIn: ACCESSTOKEN_EXPIRE }
    );
  } catch (error) {
    console.log(error);
  }
};
userSchema.methods.refreshTokenGenerate = function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
        role: this.role,
      },
      REFRESHTOKEN_SECRET,
      { expiresIn: REFRESHTOKEN_EXPIRE }
    );
  } catch (error) {
    console.log(error);
  }
};

export const User = mongoose.models.User || model("User", userSchema);
