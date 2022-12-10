module.exports = errorHandleFunc => (req, res, next) => {
  Promise.resolve(errorHandleFunc(req, res, next)).catch(next);
};
//promise is JS pre built class
