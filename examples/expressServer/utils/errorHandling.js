/* eslint-disable no-unused-vars */
export default (app) => {
  app.use((req, res, next) => {
    const error = new Error('Endpoint not found');
    error.status = 404;
    throw error;
  });

  app.use((err, req, res, next) => {
    console.error('error hand');
    console.error(err);
    return res.status(err.status || 500).json({
      error: {
        status: err.status,
        message: err.message,
      },
    });
  });
};
