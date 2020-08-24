import axios from '../axios'

export const list = async (skip, limit) => {
  try {
    const { data } = await axios.post('photos/list', {
      skip,
      limit
    })

    return data.message === 'OK' ? data.documents : []
  } catch (error) {
    throw error
  }
}

export const uploadPhotos = async formData => {
  try {
    const { data } = await axios.put('photos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return data
  } catch (error) {
    throw error
  }
}

export const deletePhotos = async bodyRaw => {
  console.log(bodyRaw);
  try {
    const { data } = await axios.delete('photos', { data : bodyRaw })
    
    return data.message === 'OK'
  } catch (error) {
    throw error
  }
}

export const deletePhoto = async photo => {
  
  try {
    const { data } = await axios.delete(`photos/${photo.album}/${photo.name}`)
    
    return data.message === 'OK'
  } catch (error) {
    throw error
  }
}