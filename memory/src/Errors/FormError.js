export default class FormError extends Error {
  /**
   * Constructs the MyError class
   * @param {String} message an error message
   * @constructor
   */
  constructor(message) {
    super(message);
    // properly capture stack trace in Node.js
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}
