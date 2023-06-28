exports.success = (req, res, message, status) => {
    res.status(status || 200).json({
      success: true,
      message: message
    });
  };

exports.error = (req, res, message, status, details) => {
    console.error('[response error] -> ' + details);
    res.status(status || 500).json({
      success: false,
      message: message,
      errorDetails: details
    });
  };