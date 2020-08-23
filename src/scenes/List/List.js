import React, { useEffect, useState, useRef } from 'react'
import ListWrapper from './ListWrapper'
import { ListPhotos, DragNDropModal } from '../../components'

import useNotification from '../../hooks/useNotification'
import { list, uploadPhotos } from '../../Services/PhotoService'

import { hasClass, removeClass, addClass } from '../../utils/interactiveHtml'

export default function List (props) {
  const [isShowUploadModal, toogleModal] = useState(false)
  const [images, setImages] = useState([])
  const [itemPerPage, setItemPerPage] = useState(25)
  const [isShowLoadMore, showLoadmore] = useState(false)
  const [isLoading, showLoading] = useState(false)
  const { showError, showSuccess } = useNotification()
  const skip = useRef(0)
  const loadMoreBtnRef = useRef(null)

  useEffect(() => {
    skip.current = 0
    getList(skip.current, itemPerPage, function (imgs) {
      setImages(imgs)
    })
  }, [itemPerPage])

  const getList = (skip, itemPerPage, cb) => {
    showLoading(true)
    list(skip, +itemPerPage)
      .then(images => {
        // setImages(images)
        cb(images)
        showLoadmore(images.length >= itemPerPage)
      })
      .catch(e => showError(e.message))
      .finally(() => showLoading(false))
  }
  const handleToogleModal = () => toogleModal(!isShowUploadModal)
  const handleUploadImages = (files, category, cb) => {
    if (!files.length || !category) {
      showError('Missing file or album')
      return
    }
    const bodyFormData = new FormData()
    bodyFormData.append('album', category)
    for (const file of files) {
      bodyFormData.append('documents', file)
    }

    uploadPhotos(bodyFormData)
      .then(res => {
        if (res.message === 'OK') {
          skip.current = 0
          cb()
          getList(skip.current, itemPerPage, function (imgs) {
            showSuccess('Uploaded success')
            setImages(imgs)
          })
        } else {
          showError(res.message)
        }
      })
      .catch(e => showError(e.message))
      .finally(() => handleToogleModal())
  }
  const handleLoadMore = () => {
    skip.current++
    showLoading(true)
    getList(skip.current, itemPerPage, function (imgs) {
      setImages([...images, ...imgs])
    })
  }
  const handleChangeItemPerPage = e => setItemPerPage(e.target.value)
  const handleScrollDown = () => addClass(loadMoreBtnRef.current)('show')
  const handleScrollUp = () =>
    hasClass(loadMoreBtnRef.current)('show') &&
    removeClass(loadMoreBtnRef.current)('show')

  return (
    <ListWrapper>
      <div className='list__header'>
        <h3 className='list__header__title'>Photos</h3>
        <div className='list__header__options'>
          <button>Delete</button>
          <button onClick={handleToogleModal}>Upload</button>
          <select onChange={handleChangeItemPerPage}>
            <option value='25'>25</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </select>
        </div>
      </div>
      <div className='list__body'>
        <ListPhotos
          items={images}
          onScrollDown={handleScrollDown}
          onScrollUp={handleScrollUp}
        />
        <div className='list__body__action'>
          {isShowLoadMore && (
            <button ref={loadMoreBtnRef} onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
        {isLoading && <div className='loading'>Loading...</div>}
      </div>

      <DragNDropModal
        show={isShowUploadModal}
        toogleModal={handleToogleModal}
        onUploadFile={handleUploadImages}
      />
    </ListWrapper>
  )
}
