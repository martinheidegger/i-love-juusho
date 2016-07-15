'use strict'
var CSVParser = require('csv-parse')
var CSVWriter = require('csv-write-stream')
var fs = require('fs')

var processAddress = require('./processAddress')({})

var out = CSVWriter({
  headers: [
    '_raw', 'rest', 'area', 'line', 'areaName', 'info', 'alternate', 'direction', 'district',
    'buildingName', 'buildingNr', 'tower', 'floors', 'roomNumber'
  ]
})
out.pipe(process.stdout)
fs
  .createReadStream('./JIGYOSYO_utf8.CSV')
  .pipe(new CSVParser()).on('data', function (data) {
    var output = processAddress(data[6], data)
    if (output.floors) {
      output.floors = output.floors.map(function (entry) {
        if (Array.isArray(entry)) {
          return '[' + entry + ']'
        }
        return entry
      }).toString()
    }
    out.write(output)
  })
  .on('end', function () {
    out.end()
  })
