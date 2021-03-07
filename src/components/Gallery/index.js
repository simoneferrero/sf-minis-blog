import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'

import Close from '../../../content/svg/close.svg'
import Button from '../Button'

import {
  StyledThumbnailWrapper,
  StyledCoverWrapper,
  StyledFullImage,
} from './styled'

const Gallery = ({ images }) => {
  // TODO: Add keyboard navigation
  const [selectedImage, setSelectedImage] = useState(null)
  const selectedImageIndex = images.findIndex(
    ({ name }) => name === selectedImage?.name,
  )

  return (
    <>
      <StyledThumbnailWrapper>
        {images
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map(image => (
            <Button
              aria-label={`Display image ${image.name}`}
              key={image.name}
              onClick={() => setSelectedImage(image)}
            >
              <GatsbyImage image={image.thumb} alt={image.name} />
            </Button>
          ))}
      </StyledThumbnailWrapper>
      {selectedImage ? (
        <StyledCoverWrapper hidden={!selectedImage}>
          <Button
            aria-label="Close gallery view"
            className="background-image-close"
            onClick={() => setSelectedImage(null)}
          >
            <Close />
          </Button>
          <div className="image-wrapper">
            <StyledFullImage
              image={selectedImage.full}
              alt={`${selectedImage.name} full`}
            />
            <h2>{selectedImage.name}</h2>
          </div>
          {selectedImageIndex > 0 && (
            <Button
              className="arrow prev"
              title="Show previous image"
              onClick={() => setSelectedImage(images[selectedImageIndex - 1])}
            >
              ←
            </Button>
          )}
          {selectedImageIndex < images.length - 1 && (
            <Button
              className="arrow next"
              title="Show next image"
              onClick={() => setSelectedImage(images[selectedImageIndex + 1])}
            >
              →
            </Button>
          )}
        </StyledCoverWrapper>
      ) : null}
    </>
  )
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      full: PropTypes.object.isRequired,
      name: PropTypes.string.isRequired,
      thumb: PropTypes.object.isRequired,
    }),
  ).isRequired,
}

export default Gallery
