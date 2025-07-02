const customResponse = ({
  success = true,
  message = "",
  data = null,
  status = 200,
}) => {
  return {
    success,
    message,
    data,
    status, //
  };
};

module.exports = customResponse;
