c2a
===

Transfer CMD to AMD

## Installation

```sh
$ npm install c2a
```

## Usage

```js
var c2a = require('c2a');
var file = 'console.log("hello world")';


// Output:
// define(function (require, exports, module) {
//     console.log("hello world");
// });
console.log(c2a(file));
```
