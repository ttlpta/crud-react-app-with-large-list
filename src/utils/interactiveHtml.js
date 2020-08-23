export const hasClass = el => classname =>
  el && el.classList.contains(classname)
export const addClass = el => classname => el && el.classList.add(classname)
export const removeClass = el => classname =>
  el && el.classList.remove(classname)
