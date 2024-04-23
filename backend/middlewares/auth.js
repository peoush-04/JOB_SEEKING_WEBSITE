import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

//checks whether the user is authenticated by verifying the JWT token extracted from the cookie. 
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // decodes the token and attaches it to the request body for further processing in subsequent middleware.
  req.user = await User.findById(decoded.id);

  next();
});
