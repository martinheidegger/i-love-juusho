'use strict'
const fs = require('fs')
const path = require('path')
const test = require('tap').test
const CSVParser = require('csv-parse')
const processAddress = require('../processAddress')({})
const parseFloors = require('../lib/test/parseFloors')

function isEmpty (val) {
  return val === '' || val === undefined || val === null
}

var file
if (process.env.FULL_TEST) {
  file = path.join(__dirname, 'addresses_all.csv')
} else {
  file = path.join(__dirname, 'addresses.csv')
}

fs.createReadStream(file)
  .pipe(new CSVParser({
    columns: true,
    relax_column_count: true
  }))
  .on('data', function (expected) {
    if (expected.floors) {
      expected.floors = parseFloors(expected.floors)
    }
    test(expected._raw, function (t) {
      var result = processAddress(expected._raw)
      var keys = Object.keys(expected)
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i]
        var resultData = result[key]
        if (isEmpty(resultData)) {
          result[key] = ''
        }
      }
      t.deepEqual(result, expected)
      t.done()
    })
  })
