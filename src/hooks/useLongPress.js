import { useCallback, useRef, useState } from 'react'

const useLongPress = (
  onLongPress,
  onClick,
  { shouldPreventDefault = true, delay = 650 } = {}
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false)
  const timeout = useRef()
  const target = useRef()

  const start = useCallback(
    (event, item) => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener('touchend', preventDefault, {
          passive: false
        })
        target.current = event.target
      }
      timeout.current = setTimeout(() => {
        onLongPress(event, item)
        setLongPressTriggered(true)
      }, delay)
    },
    [onLongPress, delay, shouldPreventDefault]
  )

  const clear = useCallback(
    (event, item, shouldTriggerClick = true, ) => {
      timeout.current && clearTimeout(timeout.current)
      shouldTriggerClick && !longPressTriggered && onClick(event, item)
      setLongPressTriggered(false)
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener('touchend', preventDefault)
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered]
  )

  return item => ({
    onMouseDown: e => start(e, item),
    onTouchStart: e => start(e, item),
    onMouseUp: e => clear(e, item),
    onMouseLeave: e => clear(e, item, false),
    onTouchEnd: e => clear(e, item)
  })
}

const isTouchEvent = event => {
  return 'touches' in event
}

const preventDefault = event => {
  if (!isTouchEvent(event)) return

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault()
  }
}

export default useLongPress
