'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

// const total = 0 // TODO

// map to only return the hat sales data
const usersHatsNotFlattenedDB = _.map(database, (o) => { return o.hats })
// flatten to improve the management
const usersHatsFlattenedDB = _.flatten(usersHatsNotFlattenedDB)
// map to return only the names of hats that have been sold
const onlyHatsNamesDB = _.map(usersHatsFlattenedDB, 'name')
// countBy to see how many times each name repeats
const onlyHatsNamesCountedDB = _.countBy(onlyHatsNamesDB)
// sortByto take the values only and reverse to make it descendant
const countedBySalesDB = _(_.sortBy(onlyHatsNamesCountedDB)).reverse().value()
// take to return only the 3 first values.
const best3sales = _.take(countedBySalesDB, 3)
// reduce to sum the data
const total = _.reduce(best3sales, function (sum, n) { return sum + n }, 0)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)
console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: TODO
 *      El tiempo que se tarda un algoritmo en ejecutarse. No necesariamente depende de sus inputs, sino más bien de su estructura.
 *   - space complexity: TODO
 *      El espacio que ocupa en la memoria la ejecución de un algoritmo.
 */
