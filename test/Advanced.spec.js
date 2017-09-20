import test from 'ava'
import { mount } from 'avoriaz'
import nextTick from 'p-immediate'
import Advanced from '../examples/src/Advanced/index.vue'
import isColVisible from '../src/_utils/isColVisible'

test.beforeEach(t => {
  const wrapper = mount(Advanced)
  const { vm } = wrapper
  Object.assign(t.context, { vm, wrapper })
})

test('HeaderSettings: the visible columns should be checked', t => {
  const { wrapper, vm } = t.context

  const labelsOfvisibleColumns = vm.columns.filter(isColVisible).map(col => col.label || col.title)

  const labelsOfRenderVisibleColumns = wrapper
    .find('div[name=HeaderSettings] ul[name=ColumnGroup] > li > input[type=checkbox]:checked + label')
    .map(el => el.text().trim())

  t.deepEqual(labelsOfvisibleColumns.sort(), labelsOfRenderVisibleColumns.sort())
})

test('HeaderSettings: if column[i].visible\'s type is String, then it could not be toggled', t => {
  const { wrapper, vm } = t.context

  const labelsOfColumnsNotAllowToToggle = vm.columns
    .filter(col => typeof col.visible === 'string')
    .map(col => col.label || col.title)

  const labelsOfRenderColumnsNotAllowToToggle = wrapper
    .find('div[name=HeaderSettings] ul[name=ColumnGroup] > li > input[type=checkbox]:disabled + label')
    .map(el => el.text().trim())

  t.deepEqual(labelsOfColumnsNotAllowToToggle.sort(), labelsOfRenderColumnsNotAllowToToggle.sort())
})

test('MultiSelect', async t => {
  const { wrapper, vm } = t.context
  await nextTick() // wait for mockData

  const [$master, ...$slaves] = wrapper.find('input[name=MultiSelect]')

  /* *** user behaviors *** */
  $master.trigger('click') // select all
  t.is(vm.selection.length, vm.query.limit) // 10

  $slaves[0].trigger('change')
  $slaves[1].trigger('change')
  t.is(vm.selection.length, 8)

  /* *** programmatic behavior  *** */
  vm.selection = vm.data.slice(0, 3)
  await nextTick()
  t.is(wrapper.find('input[name=MultiSelect]:checked').length, 3)
})

test('thComp / tdComp / nested components', t => {
  const { wrapper, vm } = t.context
  const { components } = vm.$options

  for (let name in components) {
    let comp = components[name].default
    comp && t.true(wrapper.contains(comp))
  }
})
