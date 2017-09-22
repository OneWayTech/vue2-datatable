import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

/**
 * synchronize the scroll position among `els`
 * @param  {DOM[]} els
 * @param  {Func}  callback(offsetLeft)
 * @return {Func}  unsync
 */
export default function (els, callback) {
  let currentDriver
  
  function syncScroll(me, others) {
    me
      .on('scroll', throttle(() => {
        if (currentDriver && currentDriver !== me) return
        currentDriver = me

        let offsetLeft = me.scrollLeft()
        others.scrollLeft(offsetLeft)
        
        callback(offsetLeft)
      }))
      // scroll stops
      .on('scroll', debounce(() => {
        currentDriver = null
      }, 150))

    // unlistener
    return () => {
      me.off('scroll')
    }
  }
  
  const unlisteners = els.map((me, idx) => {
    let others = els.slice()
    others.splice(idx, 1) // exclude me
    return syncScroll($(me), $(others))
  })

  // unsync
  return () => {
    unlisteners.forEach(unlistener => {
      unlistener()
    })
  }
}
