export const handleResponse = (
  res,
  result,
  pagination = null,
  error,
  statusCode
) => {
  res.status(statusCode ? statusCode : res.statusCode).send({
    data: result,
    error: error ? error : null,
    pagination,
  });
};
