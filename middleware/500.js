// Even if you don’t need to use the next object, you must specify it to maintain the signature.
// Otherwise, the next object will be interpreted as regular middleware and will fail to handle
// errors. For details about error-handling middleware
// See: https://expressjs.com/en/guide/error-handling.html
// eslint-disable-next-line no-unused-vars
function serverErrorHandler(error, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  // render the error page
  res.status(error.status || 500);
  res.render('error');
}

module.exports = serverErrorHandler;
