const digitMap = {
  '０': '0',
  '１': '1',
  '２': '2',
  '３': '3',
  '４': '4',
  '５': '5',
  '６': '6',
  '７': '7',
  '８': '8',
  '９': '9',
  '〇': '0',
  '一': '1',
  '二': '2',
  '三': '3',
  '四': '4',
  '五': '5',
  '六': '6',
  '七': '7',
  '八': '8',
  '九': '9',
  '十': '10'
}

function parseDigit (text) {
  return parseInt(text.split('').map(function (char) {
    return digitMap[char]
  }).join(''))
}


const types = {
  number: {
    latin: { reg: /^[0-9]+/, val: function (text) { return parseInt(text) } },
    double: { reg: /^[０-９]+/, val: parseDigit },
    kanji: { reg: /^[〇一二三四五六七八九十]+/, val: parseDigit }
  }
}

/*module.exports = function (fields) {
  return function processAddress (field) {
    keywords = [丁目, 番地, ビル, Ｆ, ]
  }
}*/

module.exports = parseDigit
