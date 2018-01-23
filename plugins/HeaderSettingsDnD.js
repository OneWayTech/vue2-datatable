/**
 * apply drag-and-drop sortable feature to HeaderSettings
 * note that this function should be invoked in `mounted`
 * e.g.
  <template>
    <datatable v-bind="$data">
  </template>
  <script>
  import dnd from 'vue2-datatable-component/plugins/HeaderSettingsDnD'

  export default {
    mounted () {
      dnd(this) // done!
    },
    ...
  }
  </script>
 
 * `vm.columns` should also meet the requirement that:
 * the same-group columns should be put together
 * e.g.
  [ // ok
    { field: 'a1', group: 'A' },
    { field: 'a2', group: 'A' },
    { field: 'b1', group: 'B' },
    { field: 'b2', group: 'B' },
    { field: 'c1', group: 'C' },
    { field: 'c2', group: 'C' }
  ]
  [ // not ok
    { field: 'a1', group: 'A' },
    { field: 'b1', group: 'B' },
    { field: 'c1', group: 'C' },
    { field: 'a2', group: 'A' },
    { field: 'b2', group: 'B' },
    { field: 'c2', group: 'C' }
  ]

 * @param {VueInstance} vm
 */
export default function dnd(vm) {
  const $ColGroupContainer = $(vm.$el).find('div.-col-group-container')
  const DRAGGABLE = 'li[draggable=true]'
  const DROP_ZONE = 'li.-col-drop-zone'
  
  function dropZoneGen(idx) {
    return `<li class="-col-drop-zone" target-idx="${idx}"></li>`
  }
  /** generate adjacent drop zones for each column displayed as <li> */
  function generateDropZones() {
    $ColGroupContainer
      .find(DROP_ZONE).remove().end() // ensure no drop zone exists
      .find('li').each(function (idx) {
        const $this = $(this)
        $this
          .attr('draggable', 'true')
          .attr('source-idx', idx)
          .before(
            dropZoneGen(
              $this.is('li:first-of-type') ? idx - 0.25 : idx
            )
          )

        $this.is('li:last-of-type') && $this.after(dropZoneGen(idx + 0.25))
      })
  }

  vm.$watch('columns', () => {
    vm.$nextTick(generateDropZones)
  }, { immediate: true, deep: true })

  /*** ↑↑↑ preparatory work --- main logic ↓↓↓ ***/

  let draggingIdx = null

  $.fn.isAllowedToDrop = function () {
    const targetIdx = +$(this).attr('target-idx')
    return ![-0.25, 0, 0.25, 1].includes(targetIdx - draggingIdx) // filter adjacent drop zones
  }

  $ColGroupContainer
    .on('dragstart', DRAGGABLE, function () {
      draggingIdx = +$(this).addClass('-dragging').attr('source-idx')
    })
    .on('dragend', DRAGGABLE, function () {
      draggingIdx = null
      $(this).removeClass('-dragging')
    })
    .on('dragover', DROP_ZONE, function (e) {
      e.preventDefault() // must
      e.originalEvent.dataTransfer.dropEffect = $(this).isAllowedToDrop() ? 'move' : 'none'
    })
    .on('dragenter', DROP_ZONE, function () {
      const $this = $(this)
      $this.isAllowedToDrop() && $this.addClass('-droppable')
    })
    .on('drop', DROP_ZONE, function () {
      const $this = $(this).removeClass('-droppable')
      if (!$this.isAllowedToDrop()) return

      const { columns } = vm
      const targetIdx = +$this.attr('target-idx')
      columns[draggingIdx].group = columns[Math.round(targetIdx)].group
      arrMove(columns, draggingIdx, Math.ceil(targetIdx))
    })
    .on('dragleave', DROP_ZONE, function () {
      const $this = $(this)
      $this.isAllowedToDrop() && $this.removeClass('-droppable')
    })
}

// similar to https://github.com/sindresorhus/array-move
function arrMove(arr, from, to) {
  arr.splice((from < to ? to - 1 : to), 0, arr.splice(from, 1)[0])
}

$('head').append(`<style>
  .-col-group > [draggable],
  .-col-group > .-col-drop-zone {
    margin-bottom: 0;
  }
  .-dragging {
    opacity: 0.3;
  }
  .-col-drop-zone {
    height: 10px;
    transition: height .25s ease;
  }
  .-droppable {
    height: 30px;
    border: 1px dashed #ddd;
    border-radius: 4px;
  }
</style>`)
