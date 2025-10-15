import expect from 'expect';
import url from '../src/url';

describe('url utils', () => {
  it('getUrlComponents', () => {
    const exampleUrl = 'http://localhost:8080/path/child?p=5&count=10#hash';
    const components = {
      url: 'http://localhost:8080/path/child?p=5&count=10#hash',
      scheme: 'http',
      slash: '//',
      host: 'localhost',
      port: '8080',
      path: '/path/child',
      query: '?p=5&count=10',
      hash: '#hash',
    };
    const exampleUrl2 = 'http://example/path';
    const components2 = {
      url: 'http://example/path',
      scheme: 'http',
      slash: '//',
      host: 'example',
      path: '/path',
    };
    expect(url.getUrlComponents(exampleUrl))
      .toEqual(components);
    expect(url.getUrlComponents(exampleUrl2))
      .toEqual(components2);
  });

  it('getQueryString', () => {
    const args = {
      key1: 'value1',
      key2: 6,
    };
    const qs = '?key1=value1&key2=6';
    expect(url.getQueryString(args))
      .toEqual(qs);
  });

  it('getQueryArgs', () => {
    const args = {
      key1: 'value1',
      key2: '6',
    };
    const qs = '?key1=value1&key2=6';
    expect(url.getQueryArgs(qs))
      .toEqual(args);
  });
});
