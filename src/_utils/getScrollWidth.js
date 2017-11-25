// Refers to https://davidwalsh.name/detect-scrollbar-width
let scrollWidth

export default function () {
  if (scrollWidth) {
    return scrollWidth
  }

  const div = document.createElement('div')

  div.style.width = '100px'
  div.style.height = '100px'
  div.style.overflow = 'scroll'
  div.style.position = 'absolute'
  div.style.top = '-9999px'

  document.body.appendChild(div)

  scrollWidth = div.offsetWidth - div.clientWidth

  document.body.removeChild(div)

  return scrollWidth
}
