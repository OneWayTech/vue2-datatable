import 'es6-shim'
import moment from 'moment'
import orderBy from 'lodash/orderBy'
import users from './dataSource'
const typeOf = o => Object.prototype.toString.call(o).slice(8, -1).toLowerCase()

/**
 * mockData - simulate Ajax request and respond
 * @param   {Object} query
 * @resolve {Object}
 */
export default function mockData(query) {
  // default query fields
  const { limit = 10, offset = 0, sort = '', order = 'asc' } = query

  let rows = users;

  // custom query fields
  ['uid', 'name', 'email', 'country', 'lang', 'programLang'].forEach(field => {
    switch (typeOf(query[field])) {
      case 'array':
        rows = rows.filter(row => query[field].includes(row[field]))
        break
      case 'string':
        rows = rows.filter(row => row[field].toLowerCase().includes(query[field].toLowerCase()))
        break
      default:
        // nothing to do
        break
    }
  })

  if (sort) rows = orderBy(rows, sort, order)

  const res = {
    rows: JSON.parse(JSON.stringify(rows.slice(offset, offset + limit))), // purify data
    total: rows.length,
    summary: {
      name: rows.length,
      age: rows.length && ~~(rows.map(({ age }) => age).reduce((sum, cur) => sum + cur) / rows.length) // average age
    }
  }

  const consoleGroupName = 'Mock data generator - ' + moment().format('YYYY-MM-DD HH:mm:ss')
  console.group(consoleGroupName)
  console.info('Receive:', JSON.stringify(query))
  console.info('Respond:', res)
  console.groupEnd(consoleGroupName)
  return Promise.resolve(res)
}
