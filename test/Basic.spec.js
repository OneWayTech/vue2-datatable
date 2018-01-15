import test from 'ava'
import { pick } from 'lodash'
import { mount } from 'avoriaz'
import nextTick from 'p-immediate'
import Basic from '../examples/src/Basic/index.vue'

test.beforeEach(t => {
  const wrapper = mount(Basic)
  const { vm } = wrapper
  Object.assign(t.context, { vm, wrapper })
})

test('render properly', async t => {
  const { wrapper, vm } = t.context

  const renderTitles = wrapper.find('th').map(el => el.text().trim())
  const origTitles = vm.columns.map(col => col.title)
  t.deepEqual(renderTitles, origTitles)

  await nextTick()

  const origFields = vm.columns.map(col => col.field)
  wrapper.find('tbody > tr').forEach((tr, idx) => {
    // e.g. [ '1', 'Jennifer Robinson', '34', 'h.fmx@pedfgjpwe.gl', 'Russia' ]
    let renderRowData = tr.find('td').map(td => {
      let text = td.text().trim()
      return ~~text ? +text : text // convert to number if possible
    })
    let origRowData = Object.values(pick(vm.data[idx], origFields))

    t.deepEqual(renderRowData.sort(), origRowData.sort())
  })
})

test('sort', async t => {
  const { wrapper, vm } = t.context

  const [uidSortBtn, ageSortBtn] = wrapper.find('a[name=HeadSort]')
  const [uidSort, ageSort] = wrapper.find('a[name=HeadSort] > i')

  /* *** user behaviors *** */
  uidSortBtn.trigger('click')
  t.deepEqual(
    { limit: 10, offset: 0, sort: 'uid', order: 'desc' },
    vm.query
  )
  await nextTick()
  t.true(uidSort.hasClass('fa-sort-desc'))

  ageSortBtn.trigger('click')
  t.deepEqual(
    { limit: 10, offset: 0, sort: 'age', order: 'desc' },
    vm.query
  )
  await nextTick()
  t.true(ageSort.hasClass('fa-sort-desc'))

  ageSortBtn.trigger('click')
  t.deepEqual(
    { limit: 10, offset: 0, sort: 'age', order: 'asc' },
    vm.query
  )
  await nextTick()
  await nextTick()
  t.true(ageSort.hasClass('fa-sort-asc'))

  /* *** programmatic behavior  *** */
  Object.assign(vm.query, { sort: 'uid', order: 'asc' })
  await nextTick()
  t.true(uidSort.hasClass('fa-sort-asc'))
})

test('pagination relevant', async t => {
  const { wrapper, vm } = t.context
  const $PageSizeSelect = wrapper.find('label[name=PageSizeSelect] > select')[0]

  /* *** programmatic behaviors  *** */
  Object.assign(vm.query, { limit: 20, offset: 20 })
  await nextTick()
  t.is(
    +$PageSizeSelect.value(),
    20
  )
  t.is(
    +wrapper.find('ul[name=Pagination] > li.active > a')[0].text().trim(),
    2
  )
  
  /* *** user behaviors *** */
  vm.query.limit = 10 // TODO：simulate change event on select (vnode)
  t.is(vm.query.limit, 10)
  // t.is(vm.query.offset, 0) // reset to the first page

  wrapper.find('ul[name=Pagination] > li > a').forEach(el => {
    // click the 3rd page
    if (+el.text().trim() === 3) {
      el.trigger('click')
    }
  })
  t.is(vm.query.offset, 20)
})
