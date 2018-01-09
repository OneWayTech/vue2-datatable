const LS = localStorage

export const parseStr = JSON.parse

export const stringify = JSON.stringify

export const saveToLS = (k, v) => {
  LS.setItem(k, stringify(v))
}

export const rmFromLS = k => {
  LS.removeItem(k)
}

export const getFromLS = k => {
  try {
    return parseStr(LS.getItem(k))
  } catch (e) {
    rmFromLS(k)
  }
}
