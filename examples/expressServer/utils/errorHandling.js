export default (app) => {
  app.use(() => {
    const error = new Error('Endpoint not found');
    error.status = 404;
    throw error;
  });

  app.use((err, req, res) => {
    console.error(err);
    return res.status(err.status || 500).json({
      error: {
        status: err.status,
        message: err.message,
      },
    });
  });
};
