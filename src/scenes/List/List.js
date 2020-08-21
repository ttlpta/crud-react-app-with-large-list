import React from 'react'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'

import ListWrapper from './ListWrapper'

import { ListVehicle } from '../../components'

export default function List (props) {
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
        <ListVehicle />
      </div>
    </ListWrapper>
  )
}
