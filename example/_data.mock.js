import Mock from 'mockjs'
const Random = Mock.Random

export default function fetchData(reqBody) {

}

function rowGen() {
  return {
    uid: Random.guid().substr(0, 8),
    name: Random.name(),
    age: Random.integer(0, 100),
    email: Random.email(),
    createTime: +new Date(Random.datetime())
  }
}
