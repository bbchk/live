import s from './image_load.module.scss'
import { useRef } from 'react'

import { Image as ImageIcon, RotateRight, Delete } from '@mui/icons-material'
import Image from 'next/image'
import FileInput from 'comps/input_fields/file_input'

const ImageLoad = ({ selectedImages, setSelectedImages }) => {
  const handleDelete = (index) => {
    const newImages = [...selectedImages]
    newImages.splice(index, 1)
    setSelectedImages(newImages)

    const newNames = [...selectedImageNames.current]
    newNames.splice(index, 1)
    selectedImageNames.current = newNames
  }

  const handleRotate = (index) => {
    // Add your image rotation logic here
  }

  const selectedImageNames = useRef([])

  const handleImageChange = (e) => {
    if (e.target.files) {
      const imageFiles = Array.from(e.target.files)
      const newImageFiles = imageFiles.filter((file) => {
        return !selectedImageNames.current.includes(file.name)
      })

      const totalImages = selectedImages.length + newImageFiles.length

      if (totalImages > 5) {
        alert('You cannot upload more than 5 images.')
        newImageFiles.splice(5 - selectedImages.length)
      }

      const newImageUrls = newImageFiles.map((file) =>
        URL.createObjectURL(file),
      )
      setSelectedImages((prevImages) => [...prevImages, ...newImageUrls])

      const newImageNames = newImageFiles.map((file) => file.name)

      selectedImageNames.current = [
        ...selectedImageNames.current,
        ...newImageNames,
      ]
    }
  }

  return (
    <div className={`${s.file_input_container}`}>
      <div className={`${s.appeal}`}>
        <ImageIcon />
        <div className={`${s.text}`}>
          <p>Додайте фото</p>
          <p>
            Перетягніть файли сюди чи натисніть на кнопку. Додавайте до 5
            зображень у форматі .jpg, .jpeg, .png, розміром файлу до 5 МБ
          </p>
        </div>
        <div className='my-auto'>
          <FileInput
            accept='.jpg,.jpeg,.png'
            onChange={handleImageChange}
            multiple
            label='Додати фото'
          />
        </div>
      </div>

      {selectedImages.length > 0 && (
        <div className={`${s.loaded_images}`}>
          {selectedImages.map((image, index) => (
            <div key={index} className={`${s.image_box}`}>
              <Image
                src={image}
                alt={`loaded image ${index + 1}`}
                width={100}
                height={100}
              />
              <menu className={`${s.controls}`}>
                <li>
                  <button type='button' onClick={() => handleDelete(index)}>
                    <RotateRight />
                  </button>
                </li>
                <li>
                  <button
                    type='button'
                    disabled
                    onClick={() => handleRotate(index)}
                  >
                    <Delete />
                  </button>
                </li>
              </menu>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageLoad
