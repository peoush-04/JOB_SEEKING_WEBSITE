//used to catch async errors , if an error occurs, it calls the next function with error as the argument, passing the error to the error handling middleware.
export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};
