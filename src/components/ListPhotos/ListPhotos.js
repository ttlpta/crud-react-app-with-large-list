import React, { useState, useEffect } from 'react'
import { FixedSizeGrid as Grid } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import _chunk from 'lodash/chunk'

import ListPhotosWrapper from './ListPhotosWrapper'

const GUTTER_SIZE = 15
const ITEM_PER_ROW = 5
const ROW_HEIGHT = 120 + GUTTER_SIZE
const _columnWidth = width => width / 5 - GUTTER_SIZE

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
      style={overWriteStyle}
    >
      <img src={items[rowIndex][columnIndex]} />
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

export default function ListPhotos ({ items }) {
  const [images, setImages] = useState([])

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
