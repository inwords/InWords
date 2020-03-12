export default function mockGrpcImplementation(method, response = {}) {
  return function() {
    this[method] = (_, __, cb) => {
      cb(null, response);
      return {
        on: (_, cb) => {
          cb({ code: 0 });
        }
      };
    };
  };
}
