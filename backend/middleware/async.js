//Catch every async error
//(Not required to use try catch for async await operation use this middleware)
export default function asyncMiddelware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
