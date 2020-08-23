import axios from '../axios'

export const list = async (skip, limit) => {
  try {
    const { data } = await axios.post('/photos/list', {
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
