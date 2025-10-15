import expect from 'expect';
import format from '../src/format';

describe('format util', () => {
  it('camelizeStr', () => {
    const before = 'this_is_an_variable';
    const after = 'thisIsAnVariable';
    const before2 = '_this_is_an_variable';
    const after2 = 'ThisIsAnVariable';
    const before3 = 'this_is_just_4_you';
    const after3 = 'thisIsJust4You';
    const before4 = 'this_is_an_variable_';
    const after4 = 'thisIsAnVariable';
    expect(format.camelize(before)).toEqual(after);
    expect(format.camelize(before2)).toEqual(after2);
    expect(format.camelize(before3)).toEqual(after3);
    expect(format.camelize(before4)).toEqual(after4);
  });

  it('camelize', () => {
    const before = {
      foo_bar: 'value1',
      this_is: {
        level_two: 'value2',
        level_three: 'level_three',
        array: [1, 2, 3, 4, 5],
      },
      regex: /^test$/,
      array_with_obj: [{ test_this: 'testArray' }],
    };
    const after = {
      fooBar: 'value1',
      thisIs: {
        levelTwo: 'value2',
        levelThree: 'level_three',
        array: [1, 2, 3, 4, 5],
      },
      regex: /^test$/,
      arrayWithObj: [{ testThis: 'testArray' }],
    };
    expect(format.camelize(before)).toEqual(after);
  });
});
