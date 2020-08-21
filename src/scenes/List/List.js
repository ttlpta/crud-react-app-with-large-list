import React, { useState } from 'react'

import ListWrapper from './ListWrapper'
import { ListPhotos } from '../../components'

export default function List (props) {
  const items = [
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg',
    'bird.jpg'
  ]

  const [images, setImages] = useState(items)
  const handleLoadmore = () => {
    const tmp = [
      'bird2.jpg',
      'bird2.jpg',
      'bird2.jpg',
      'bird2.jpg',
      'bird2.jpg',
      'bird2.jpg',
      'bird2.jpg',
      'bird2.jpg',
      'bird2.jpg',
      'bird2.jpg',
      'bird2.jpg',
      'bird2.jpg',
      'bird2.jpg',
      'bird2.jpg',
      'bird2.jpg'
    ]
    setImages([...images, ...tmp])
  }

  return (
    <ListWrapper>
      <div className='list__header'>
        <h3 className='list__header__title'>Photos</h3>
        <div className='list__header__options'>
          <button>Delete</button>
          <button>Upload</button>
          <select>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
      </div>
      <div className='list__body'>
        <ListPhotos items={images} />
        <div className='list__body__action'>
          <button onClick={handleLoadmore}>Load More</button>
        </div>
      </div>
    </ListWrapper>
  )
}
