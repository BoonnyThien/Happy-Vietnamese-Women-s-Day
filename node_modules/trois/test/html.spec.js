import expect from 'expect';
import html from '../src/html';

describe('html util', () => {
  it('htmlEscape', () => {
    const original = '<div>"This"</div>';
    const escaped = '&lt;div&gt;&quot;This&quot;&lt;/div&gt;';
    expect(html.htmlEscape(original))
      .toEqual(escaped);
  });
  it('htmlUnescape', () => {
    const original = '<div>"This"</div>';
    const escaped = '&lt;div&gt;&quot;This&quot;&lt;/div&gt;';
    expect(html.htmlUnescape(escaped))
      .toEqual(original);
  });
});
