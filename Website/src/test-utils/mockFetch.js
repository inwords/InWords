const mockFetch = data =>
  jest.fn().mockImplementation(() =>
    Promise.resolve({
      headers: new Headers({ 'content-type': 'application/json' }),
      ok: true,
      json: () => data
    })
  );

export default mockFetch;
