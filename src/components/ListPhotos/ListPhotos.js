import React, { useState, useEffect } from 'react'
import { FixedSizeGrid as Grid } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import _chunk from 'lodash/chunk'

import ListPhotosWrapper from './ListPhotosWrapper'
import useLongPress from '../../hooks/useLongPress'
import { useRef } from 'reactn'

const GUTTER_SIZE = 15
const ITEM_PER_ROW = 5
const ROW_HEIGHT = 220 + GUTTER_SIZE
const _columnWidth = width => width / 5 - GUTTER_SIZE

const CheckBox = function ({ defaultValue = false, id, album, name, onCheck }) {
  const [checked, check] = useState(defaultValue)

  const handleCheck = () => {
    check(!checked)
    onCheck(!checked, { id, album, name })
  }

  return (
    <div
      className={`list-photo__grid__item__checkbox ${checked ? 'show' : ''}`}
    >
      <input type='checkbox' checked={checked} onChange={handleCheck} />
    </div>
  )
}

const ListPhotos = React.memo(
  function ListPhotos ({
    items,
    id,
    onScrollDown = () => {},
    onScrollUp = () => {},
    handleSelectImage = () => {},
    onDeleteFile = () => {}
  }) {
    const [images, setImages] = useState([])
    const selectedImage = useRef([])
    const onLongPress = (e, item) => {
      onDeleteFile(item)
    }

    const onClick = () => {}

    const longPressEvent = useLongPress(onLongPress, onClick)

    const handleScroll = ({ verticalScrollDirection }) => {
      verticalScrollDirection === 'forward' ? onScrollDown() : onScrollUp()
    }

    const handleCheck = (check, item) => {
      check
        ? selectedImage.current.push(item)
        : (selectedImage.current = selectedImage.current.filter(
            image => image.id !== item.id
          ))
      handleSelectImage(selectedImage.current)
    }

    const Cell = items => ({ columnIndex, rowIndex, style }) => {
      const overWriteStyle = {
        ...style,
        left: style.left + GUTTER_SIZE,
        top: style.top + GUTTER_SIZE,
        width: style.width - GUTTER_SIZE,
        height: style.height - GUTTER_SIZE
      }

      return items[rowIndex][columnIndex] === undefined ? null : (
        <div
          key={`${columnIndex}-${rowIndex}`}
          className='list-photo__grid__item'
          {...longPressEvent(items[rowIndex][columnIndex])}
          title='Click and hold to immediately delete'
          style={overWriteStyle}
        >
          <CheckBox
            defaultValue={selectedImage.current.find(
              image => image.id === items[rowIndex][columnIndex]['id']
            )}
            id={items[rowIndex][columnIndex]['id']}
            album={items[rowIndex][columnIndex]['album']}
            name={items[rowIndex][columnIndex]['name']}
            onCheck={handleCheck}
          />
          <div className='list-photo__grid__item__image'>
            <img
              src={items[rowIndex][columnIndex]['raw']}
              alt={items[rowIndex][columnIndex]['name']}
            />
          </div>
          <div className='list-photo__grid__item__info'>
            <p className='list-photo__grid__item__info__imageName'>
              {items[rowIndex][columnIndex]['name']}
            </p>
            <p className='list-photo__grid__item__info__category'>
              {items[rowIndex][columnIndex]['album']}
            </p>
          </div>
        </div>
      )
    }

    const GridRenderer = items => ({ height, width }) => (
      <Grid
        className='list-photo__grid'
        columnCount={ITEM_PER_ROW}
        columnWidth={_columnWidth(width)}
        height={height}
        width={width}
        onScroll={handleScroll}
        rowCount={items.length}
        rowHeight={ROW_HEIGHT}
        autoHeight={true}
      >
        {Cell(items)}
      </Grid>
    )

    useEffect(() => {
      const chunkItems = _chunk(items, ITEM_PER_ROW)
      setImages(chunkItems)
    }, [items.length, id])

    useEffect(() => {
      selectedImage.current = []
    }, [id])

    return (
      <ListPhotosWrapper className={!items.length && 'no-data'}>
        {!items.length && <h4>No photos available</h4>}
        {!!items.length && <AutoSizer>{GridRenderer(images)}</AutoSizer>}
      </ListPhotosWrapper>
    )
  },
  (preProps, nextProps) => {
    return preProps.id === nextProps.id
      ? preProps.items.length === nextProps.items.length
      : false // Prevent re-render from parent
  }
)

export default ListPhotos
