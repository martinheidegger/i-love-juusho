'use strict'
module.exports = function (input) {
  var expr = /\[([^\]]*)\]/ig
  var lastIndex = 0
  var floors = []
  var res
  while ((res = expr.exec(input))) {
    if (res.index > lastIndex) {
      floors = floors.concat(input.substring(lastIndex, res.index).split(','))
    }
    floors.push(res[1].split(','))
    lastIndex = res.index + res[0].length
  }
  if (lastIndex < input.length) {
    floors = floors.concat(input.substr(lastIndex).split(','))
  }
  return floors.filter(function (entry) {
    return entry !== ''
  })
}
