// https://stackoverflow.com/a/7616484/5172890
export default function (s) {
  let hash = 0
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash) + s.charCodeAt(i)
    hash |= 0
  }
  return '' + hash
}
