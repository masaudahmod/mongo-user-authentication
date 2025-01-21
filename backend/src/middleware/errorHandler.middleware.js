import { ApiError } from "../utils/ApiErrors.js";

export const errorHandler = async (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status || 500).json({
      statusCode: err.status || 500,
      status: "error",
      message: err.message || "Something went wrong",
      data: null,
    });
  }

  return res.status(500).json({
    statusCode: 500,
    status: "error",
    message: err.message,
    data: null,
  });
};
