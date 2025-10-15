# trois ![TravisCI](https://travis-ci.org/zhuscat/trois.svg?branch=master)![npm version](https://img.shields.io/npm/v/trois.svg?style=flat)

A JavaScript Util Toolbox.

## Installation

In a browser:

```
<script src="trois.js"></script>
```

Using npm:

```shell
$ npm install trois --save
```

## How to use

```javascript
// in browser
let components = trois.url.getUrlComponents(url);
```

```javascript
// es2015
import trois from 'trois';
let components = trois.url.getUrlComponents(url);
```

## Documentation

### trois.format.camelize(obj)

camelize `obj`

**Parameters**

**obj**: `*`, camelize `obj`

**Returns**: `*`

### trois.is.isArray(value)

test if `value` is an array.

**Parameters**

**value**: `*`, test if `value` is an array.

**Returns**: `boolean`

### trois.is.isRegex(value)

test if `value` is an instance of RegExp.

**Parameters**

**value**: `*`, test if `value` is an instance of RegExp.

**Returns**: `boolean`

### trois.is.isDate(value)

test if `value` is an instance of Date.

**Parameters**

**value**: `*`, test if `value` is an instance of Date.

**Returns**: `boolean`

### trois.html.htmlEscape(str)

Escape HTML special characters

**Parameters**

**str**: `string`, Escape HTML special characters

**Returns**: `string`

### trois.html.htmlUnescape(str)

Unescape HTML special characters

**Parameters**

**str**: `string`, Unescape HTML special characters

**Returns**: `string`

### trois.url.getUrlComponents(url)

Convert `url` to an object with its components

**Parameters**

**url**: `string`, Convert `url` to an object with its components

**Returns**: `object`

### trois.url.getQueryString(args)

Convert `args` to a query string.
The `args` parameter should be an object
like `{key1: value1, key2: value2}`.

**Parameters**

**args**: `object`, Convert `args` to a query string.
The `args` parameter should be an object
like {key1: value1, key2: value2}.

**Returns**: `string`

### trois.url.getQueryArgs(qs)

Convert `qs` to an object.
The `qs` parameter should be a string.

**Parameters**

**qs**: `string`, Convert `qs` to an object.
The `qs` parameter should be a string.

**Returns**: `object`