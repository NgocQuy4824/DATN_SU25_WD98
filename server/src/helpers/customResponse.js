const customResponse = ({
  data = null,
  message = "",
  status = 200,
  success = true,
}) => {
  return {
    success,
    status,
    message,
    data,
  };
};

module.exports = customResponse;
