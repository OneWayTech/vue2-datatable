/**
 * replace all the elements of target with source's
 * @param {Array} target
 * @param {Array} source
 */
export default (target, source) => {
  target.splice(0, target.length, ...source)
}
