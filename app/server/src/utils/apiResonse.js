const sendResponse = function (
  res,
  status,
  data,
  message,
  statusCode = 200,
  apiVersion = null
) {
  let obj = {
    status,
    data,
    message,
    // statusCode,
    apiVersion: apiVersion || "No Version",
  };
  return res.status(statusCode).json(obj);
};

const sendErrorResponse = (res, message, statusCode = 500) => {
    sendResponse(res, false, null, message, statusCode);
};

export { sendResponse,sendErrorResponse };
