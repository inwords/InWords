export default function mockGrpcClientMethod(response = {}) {
  return (_, __, cb) => {
    cb(null, response);

    return {
      on: (_, cb) => {
        cb({ code: 0 });
      }
    };
  };
}
