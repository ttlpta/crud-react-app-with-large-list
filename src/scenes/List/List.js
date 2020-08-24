import React, { useEffect, useState, useRef } from 'react'
import _ from 'lodash'
import uniqid from 'uniqid'

import ListWrapper from './ListWrapper'
import { ListPhotos, DragNDropModal } from '../../components'
import { PrimaryButton } from '../../styled-components/Button'
import Select from '../../styled-components/Select'
import useNotification from '../../hooks/useNotification'
import {
  list,
  uploadPhotos,
  deletePhotos,
  deletePhoto
} from '../../Services/PhotoService'

import { hasClass, removeClass, addClass } from '../../utils/interactiveHtml'

export default function List (props) {
  const [isShowUploadModal, toogleModal] = useState(false)
  const [images, setImages] = useState([])
  const [itemPerPage, setItemPerPage] = useState(25)
  const [isShowLoadMore, showLoadmore] = useState(false)
  const [isLoading, showLoading] = useState(false)
  const [isShowDeleteButon, showDeleteButton] = useState(false)
  const { showError, showSuccess } = useNotification()
  const [idListPhotos, changeIdListPhotos] = useState('')
  const skip = useRef(0)
  const loadMoreBtnRef = useRef(null)
  const selectedImages = useRef(null)

  useEffect(() => {
    skip.current = 0
    getList(skip.current, itemPerPage, function (imgs) {
      setImages(imgs)
      changeIdListPhotos(uniqid())
    })
  }, [itemPerPage])

  const reloadList = () => {
    changeIdListPhotos(uniqid())
  }

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
  const handleUploadImages = (files, category, resetForm) => {
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
          resetForm()
          getList(skip.current, itemPerPage, function (imgs) {
            showSuccess('Uploaded success')
            setImages(imgs)
            reloadList()
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

  const handleSelectImage = items => {
    selectedImages.current = items
    showDeleteButton(!!items.length)
  }

  const handleClickDeleteMultiFiles = () => {
    const yes = window.confirm('Are you sure to delete these files')
    if (!yes) return
    const newFormatImages = _(selectedImages.current)
      .groupBy('album')
      .map(function (items, album) {
        return {
          album: album,
          documents: _.map(items, 'name').toString()
        }
      })
      .value()
    showLoading(true)
    deletePhotos(newFormatImages)
      .then(success => {
        skip.current = 0
        success
          ? getList(skip.current, itemPerPage, function (imgs) {
              showSuccess('Delete success')
              setImages(imgs)
              reloadList()
            })
          : showError('Delete fail')
      })
      .catch(e => showError(e.message))
      .finally(() => showLoading(false))
  }

  const handleDeleteFile = image => {
    const yes = window.confirm(`Are you sure to delete ${image.name}?`)
    yes &&
      deletePhoto(image)
        .then(success => {
          skip.current = 0
          success
            ? getList(skip.current, itemPerPage, function (imgs) {
                showSuccess('Delete success')
                setImages(imgs)
                reloadList()
              })
            : showError('Delete fail')
        })
        .catch(e => showError(e.message))
        .finally(() => showLoading(false))
  }

  return (
    <ListWrapper>
      <div className='list__header'>
        <h3 className='list__header__title'>Photos</h3>
        <div className='list__header__options'>
          {isShowDeleteButon && (
            <PrimaryButton onClick={handleClickDeleteMultiFiles}>
              Delete
            </PrimaryButton>
          )}
          <PrimaryButton onClick={handleToogleModal}>Upload</PrimaryButton>
          <Select onChange={handleChangeItemPerPage}>
            <option value='25'>25</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </Select>
        </div>
      </div>
      <div className='list__body'>
        <ListPhotos
          id={idListPhotos}
          items={images}
          onScrollDown={handleScrollDown}
          onScrollUp={handleScrollUp}
          onDeleteFile={handleDeleteFile}
          handleSelectImage={handleSelectImage}
        />
        <div className='list__body__action'>
          {isShowLoadMore && (
            <PrimaryButton ref={loadMoreBtnRef} onClick={handleLoadMore}>
              Load More
            </PrimaryButton>
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
