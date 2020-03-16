export default function mockFetchOnce(data) {
  return jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      headers: new Headers({ 'content-type': 'application/json' }),
      ok: true,
      json: () => data
    })
  );
}
