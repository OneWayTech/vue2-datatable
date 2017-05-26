import 'es6-shim'
import moment from 'moment'
import orderBy from 'lodash/orderBy'
import { users, getSummary } from './dataSource'

/**
 * mockData - simulate Ajax request and respond
 * @param   {Object} query
 * @resolve {Object}
 */
export default function mockData(query) {
  let {
    limit = 10, offset = 0, sort = '', order = 'asc', // default query fields
    searchName = '' // custom query field
  } = query

  let rows = users
  if (searchName) rows = rows.filter(row => row.name.includes(searchName))
  if (sort) rows = orderBy(rows, sort, order)

  const res = {
    rows: rows.slice(offset, offset + limit),
    total: rows.length,
    summary: getSummary()
  }

  const consoleGroupName = 'Mock data generator - ' + moment().format('YYYY-MM-DD HH:mm:ss')
  console.group(consoleGroupName)
  console.info('Receive:', JSON.stringify(query))
  console.info('Respond:', res)
  console.groupEnd(consoleGroupName)
  return Promise.resolve(res)
}
