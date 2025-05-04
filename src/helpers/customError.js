
class CustomError extends Error {
  constructor(message, statusCode = 500) {
    // Call the parent constructor of Error
    super(message);
    // Set the name of the error to the class name
    this.statusCode = statusCode;
  }
}
module.exports = CustomError;
// Usage example
// const CustomError = require('./path/to/customError');
//
// const error = new CustomError('This is a custom error message', 400);