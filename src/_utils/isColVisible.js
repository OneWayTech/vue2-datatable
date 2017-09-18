export default function (col) {
  return typeof col.visible === 'undefined' || '' + col.visible === 'true'
}
