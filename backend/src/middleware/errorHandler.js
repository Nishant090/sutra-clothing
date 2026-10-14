
export const errorHandler = (err, req, res, next) => {
  // Handle Zod validation errors
  if (err.name === "ZodError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  // Handle known application errors
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Handle unexpected server errors
  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
