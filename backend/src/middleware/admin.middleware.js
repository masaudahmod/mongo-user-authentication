import { ApiError } from "../utils/ApiErrors.js";
import { verifyTokenAndGetUser } from "../utils/middlewareUtils.js";
import { tryCatch } from "../utils/tryCatch.js";

export const admin = tryCatch(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.headers.authorization?.replace("Bearer ", "");

  const user = await verifyTokenAndGetUser(token);

  if (user.role !== "admin") {
    throw new ApiError(401, "Unauthorized access - user is not an admin");
  }
  req.user = user;
  next();
});
