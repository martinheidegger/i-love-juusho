'use strict'
const fs = require('fs')
const path = require('path')
const test = require('tap').test
const CSVParser = require('csv-parse')
const processAddress = require('../processAddress')({})

function isEmpty (val) {
  return val === '' || val === undefined || val === null
}

fs.createReadStream(path.join(__dirname, 'addresses.csv'))
  .pipe(new CSVParser({
    columns: true,
    relax_column_count: true
  }))
  .on('data', function (expected) {
    if (expected.floors) {
      expected.floors = expected.floors.split(',')
    }
    test(expected._raw, function (t) {
      var result = processAddress(expected._raw)
      var keys = Object.keys(expected)
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i]
        var expectData = expected[key]
        var resultData = result[key]
        if (isEmpty(expectData)) {
          t.ok(isEmpty(resultData), key + ' is not empty')
        } else {
          t.ok(!isEmpty(resultData), key + ' is empty, \'' + expectData + '\' expected ')
          t.deepEqual(expectData, resultData, key + ' not equal')
        }
      }
    })
  })
