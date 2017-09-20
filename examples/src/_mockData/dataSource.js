import uniq from 'lodash/uniq'
import without from 'lodash/without'
import camelCase from 'lodash/camelCase'
const Random = require('mockjs').Random

const total = 120 // how many rows to generate
const getRandomUid = () => Random.integer(1, total)

const users = Array(total).fill().map((item, idx) => {
  let name = Random.name()
  return {
    uid: idx + 1,
    name,
    age: Random.integer(1, 100),
    email: `${camelCase(name.split(' ')[0])}@oneway.mobi`,
    friends: without(
      uniq(Array(getRandomUid()).fill().map(() => getRandomUid())),
      idx // exclude `myself`
    ),
    country: Random.pick(
      ['US', 'UK', 'China', 'Russia', 'Germany', 'France', 'Japan']
    ),
    lang: Random.pick(
      ['English', 'Chinese', 'Russian', 'German', 'French', 'Japanese']
    ),
    programLang: Random.pick(
      ['C', 'C++', 'Java', 'C#', 'Python', 'Ruby', 'PHP', 'JavaScript', 'Go']
    ),
    ip: Random.ip(),
    color: Random.color(),
    createTime: +new Date(Random.datetime('yyyy/MM/dd HH:mm:ss')) // to timestamp
  }
})

export default users
