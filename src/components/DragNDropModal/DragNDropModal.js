import React, { useRef, useState } from 'react'

import Select from '../../styled-components/Select'
import { PrimaryButton } from '../../styled-components/Button'
import { hasClass, removeClass, addClass } from '../../utils/interactiveHtml'
import DragNDropModalWrapper from './DragNDropModalWrapper'

const ALLOW_FILE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif']

export default function DragNDropPopup ({
  show = false,
  toogleModal,
  onUploadFile
}) {
  const dropBoxEl = useRef(null)
  const inputFilesEl = useRef(null)
  const [previewImgs, setPreviewImgs] = useState([])
  const [errMsg, setErrorMsg] = useState('')
  const categoryRef = useRef(null)
  const uploadedImgsRef = useRef([])

  const resetAllValue = () => {
    setPreviewImgs([])
    setErrorMsg('')
    uploadedImgsRef.current = []
  }
  const validationFile = selectedImgs => {
    let validatedFiles = []
    let errMsg = ''
    for (let i = 0; i < selectedImgs.length; i++) {
      const file = selectedImgs[i]
      const filename = file.name
      const extension = filename.split('.').pop()
      const uploadedImgs = uploadedImgsRef.current
      const isDuplicateFile = uploadedImgs.find(img => img.name === filename)

      if (uploadedImgs.length && isDuplicateFile) {
        errMsg = 'Upload an existing file'
        continue
      }

      ALLOW_FILE_EXTENSIONS.indexOf(extension) !== -1
        ? validatedFiles.push(file) && (errMsg = '')
        : (errMsg = 'Please upload an image')
    }

    return { errMsg, validatedFiles }
  }

  const readSrcFile = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = function () {
        resolve({ name: file.name, src: reader.result })
      }

      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleSelectFile = e => {
    hasClass(dropBoxEl.current)('dragover') &&
      removeClass(dropBoxEl.current)('dragover')
    const { errMsg, validatedFiles } = validationFile(e.target.files)
    if (!validatedFiles.length) {
      setErrorMsg(errMsg)
      return
    } else {
      setErrorMsg('')
    }
    const uploadedImgs = uploadedImgsRef.current
    uploadedImgsRef.current = [...uploadedImgs, ...validatedFiles]
    const promiseReadSrcFiles = validatedFiles.map(file => readSrcFile(file))
    Promise.all(promiseReadSrcFiles).then(imgs => {
      setPreviewImgs([...previewImgs, ...imgs])
    })
  }

  const handleDragOver = () => addClass(dropBoxEl.current)('dragover')
  const handleDragLeave = () => removeClass(dropBoxEl.current)('dragover')
  const handleUploadFiles = () =>
    onUploadFile(uploadedImgsRef.current, categoryRef.current, () =>
      resetAllValue()
    )

  const handleChangeCategory = e => (categoryRef.current = e.target.value)

  const clickOutsideModalContent = e =>
    e.target === e.currentTarget && toogleModal()

  const handleRemoveUploadingImg = name => {
    uploadedImgsRef.current = uploadedImgsRef.current.filter(
      file => file.name !== name
    )

    setPreviewImgs(previewImgs.filter(img => img.name !== name))
  }

  return (
    <DragNDropModalWrapper
      show={show}
      className='modal'
      onClick={clickOutsideModalContent}
    >
      <div className='modal__content'>
        <div className='modal__header'>
          <span className='close' onClick={toogleModal}>
            &times;
          </span>
          <h3>Upload photos</h3>
        </div>
        <div className='modal__body'>
          <div className='dropNdrag'>
            <div
              className={`dropNdrag__area ${errMsg ? 'has-error' : ''}`}
              ref={dropBoxEl}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                type='file'
                className='files'
                onChange={handleSelectFile}
                name='files'
                multiple
                ref={inputFilesEl}
              />
              <p>
                {errMsg
                  ? errMsg
                  : `Drag 'n' drop some images here, or click select images`}
              </p>
            </div>
            <div className='dropNdrag__display-files'>
              {!previewImgs.length && (
                <p className='no-file-select'>No files selected</p>
              )}
              {!!previewImgs.length && (
                <div>
                  {previewImgs.map((img, index) => (
                    <img
                      onClick={() => handleRemoveUploadingImg(img.name)}
                      key={`previewImage${img.name}`}
                      className='previewImg'
                      src={img.src}
                      alt='Click to remove this image'
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='modal__footer'>
          <Select onChange={handleChangeCategory}>
            <option value=''>Select Album</option>
            <option value='Travel'>Travel</option>
            <option value='Personal'>Personal</option>
            <option value='Food'>Food</option>
            <option value='Nature'>Nature</option>
            <option value='Nature'>Other</option>
          </Select>
          <PrimaryButton onClick={handleUploadFiles}>Upload</PrimaryButton>
        </div>
      </div>
    </DragNDropModalWrapper>
  )
}
