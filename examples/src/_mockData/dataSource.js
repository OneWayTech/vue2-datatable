import uniq from 'lodash/uniq'
import without from 'lodash/without'
const Random = require('mockjs').Random

const total = 120 // how many rows to generate
const getRandomUid = () => Random.integer(1, total)

const users = Array(total).fill().map((item, idx) => ({
  uid: idx,
  name: Random.name(),
  age: Random.integer(0, 100),
  email: Random.email().substr(0, 22),
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
}))

export default users
