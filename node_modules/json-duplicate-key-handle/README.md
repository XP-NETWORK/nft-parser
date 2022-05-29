# json-dup-key-validator [![NPM version](https://img.shields.io/npm/v/json-duplicate-key-handle.svg)](https://www.npmjs.com/package/json-duplicate-key-handle) [![Build Status](https://travis-ci.org/jackyjieliu/json-duplicate-key-handle.svg?branch=master)](https://travis-ci.org/jackyjieliu/json-duplicate-key-handle)

A json handler that has an option to check for duplicated keys

## Install
`npm install json-duplicate-key-handle`
## Usage
```js
var jsonHandler = require('json-duplicate-key-handle');

// Returns error or undefined if json is valid
jsonHandler.validate(jsonString, allowDuplicatedKeys);

// Returns the object and handle if duplicate key
jsonHandler.parse(jsonString, allowDuplicatedKeys);
```
## API
## .validate(jsonString, allowDuplicatedKeys)
Validates a json string and returns error if any, undefined if the json string is valid.
#### jsonString
Type: `String`

JSON string to parse
#### allowDuplicatedKeys
Type: `Boolean`

Default: `false`

Whether duplicated keys are allowed in an object or not

## .parse(jsonString, allowDuplicatedKeys)
Parses a json string and returns the parsed result
#### jsonString
Type: `String`

JSON string to parse
#### allowDuplicatedKeys
Type: `Boolean`

Default: `false`

Whether duplicated keys are allowed in an object or not