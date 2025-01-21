import { verifyTokenAndGetUser } from "../utils/middlewareUtils.js";
import { tryCatch } from "../utils/tryCatch.js";

export const auth = tryCatch(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.headers.authorization?.replace("Bearer ", "");
  req.user = await verifyTokenAndGetUser(token);
  next();
});
