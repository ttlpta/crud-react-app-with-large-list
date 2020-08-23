import React, { useState, useEffect } from 'react'
import { FixedSizeGrid as Grid } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import _chunk from 'lodash/chunk'

import ListPhotosWrapper from './ListPhotosWrapper'
import useLongPress from '../../hooks/useLongPress'

const GUTTER_SIZE = 15
const ITEM_PER_ROW = 5
const ROW_HEIGHT = 220 + GUTTER_SIZE
const _columnWidth = width => width / 5 - GUTTER_SIZE

export default function ListPhotos ({ items }) {
  const [images, setImages] = useState([])
  const onLongPress = () => {
    const yes = window.confirm('Are you sure to delete this image?')
  }

  const onClick = () => {
    console.log('click is triggered')
  }

  const longPressEvent = useLongPress(onLongPress, onClick)

  const CheckBox = function (props) {
    const [checked, check] = useState(false)

    const handleCheck = () => {
      check(!checked)
    }

    return (
      <div
        className={`list-photo__grid__item__checkbox ${checked ? 'show' : ''}`}
      >
        <input type='checkbox' onChange={handleCheck} />
      </div>
    )
  }
  const Cell = items => ({ columnIndex, rowIndex, style }) => {
    const overWriteStyle = {
      ...style,
      left: style.left + GUTTER_SIZE,
      top: style.top + GUTTER_SIZE,
      width: style.width - GUTTER_SIZE,
      height: style.height - GUTTER_SIZE
    }

    return (
      <div
        key={`${columnIndex}-${rowIndex}`}
        className='list-photo__grid__item'
        {...longPressEvent}
        title='Hold to immediately delete'
        style={overWriteStyle}
      >
        <CheckBox />
        <div className='list-photo__grid__item__image'>
          <img src={items[rowIndex][columnIndex]} />
        </div>
        <div className='list-photo__grid__item__info'>
          <p className='list-photo__grid__item__info__imageName'>
            read-12354.jpg
          </p>
          <p className='list-photo__grid__item__info__category'>Nature</p>
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
  }, [items.length])

  return (
    <ListPhotosWrapper>
      <AutoSizer>{GridRenderer(images)}</AutoSizer>
    </ListPhotosWrapper>
  )
}
