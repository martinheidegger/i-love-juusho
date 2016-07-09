'use strict'
const parseFloors = require('../../../lib/test/parseFloors')
const test = require('tap').test

test('parsing of floors', function (t) {
  t.deepEqual(parseFloors('[１,３]'), [['１', '３']])
  t.deepEqual(parseFloors('１'), ['１'])
  t.deepEqual(parseFloors('１,[１,３]'), ['１', ['１', '３']])
  t.deepEqual(parseFloors('１,１,[１,３],３,３１,[１３,１],３１'), ['１', '１', ['１', '３'], '３', '３１', ['１３', '１'], '３１'])
  t.end()
})
