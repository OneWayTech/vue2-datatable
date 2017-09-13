// if some dynamic components are used frequently, a better way is to register them globally
export default {
  DisplayRow: require('./nested-DisplayRow'),
  Color: require('./td-Color'),
  CreatetimeTd: require('./td-Createtime'),
  CreatetimeTh: require('./th-Createtime'),
  Email: require('./td-Email'),
  IP: require('./td-IP'),
  Opt: require('./td-Opt'),
  FilterTh: require('./th-Filter')
  // [Vue warn]: Do not use built-in or reserved HTML elements as component id: Filter
  // Filter: require('./th-Filter')
}
