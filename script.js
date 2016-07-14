'use strict'
var CSVParser = require('csv-parse')
var fs = require('fs')

var fields = {}
for (var i = 0; i < 43; i++) {
  // fields[i] = 0
}
var processAddress = require('./processAddress')(fields)

var code = null
var cnt = 0
fs.createReadStream('./JIGYOSYO_utf8.CSV').pipe(new CSVParser()).on('data', function (data) {
  var newCode = data[7]
  if (newCode === code) {
    console.log('multiline')
  }
  var output = processAddress(data[6], data)
  if (output.rest) {
    console.log(cnt + ' -> "' + data[6] + '"')
    console.log(output)
    process.exit()
  }
  cnt++
}).on('end', function () {
  Object.keys(fields).forEach(function (key) {
    console.log(key + ': ' + fields[key])
  })
  console.log('done')
})
