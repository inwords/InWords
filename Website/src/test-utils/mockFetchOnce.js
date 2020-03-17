const mockFetchOnce = data =>
  jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      headers: new Headers({ 'content-type': 'application/json' }),
      ok: true,
      json: () => data
    })
  );

export default mockFetchOnce;
