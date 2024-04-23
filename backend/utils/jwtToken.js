export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken(); //generates a token for the client
  const options = {
    //expiry of the token
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  //sending the token as cookie
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
