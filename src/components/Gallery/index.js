import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

import Close from '../../../content/svg/close.svg'

import {
  StyledThumbnailWrapper,
  StyledButton,
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
            <StyledButton
              aria-label={`Display image ${image.name}`}
              key={image.thumb.src}
              onClick={() => setSelectedImage(image)}
            >
              <Img fluid={image.thumb} alt={image.name} />
            </StyledButton>
          ))}
      </StyledThumbnailWrapper>
      {selectedImage ? (
        <StyledCoverWrapper hidden={!selectedImage}>
          <StyledButton
            aria-label="Close gallery view"
            className="background-image-close"
            onClick={() => setSelectedImage(null)}
          >
            <Close />
          </StyledButton>
          <div className="image-wrapper">
            <StyledFullImage
              fluid={selectedImage.full}
              alt={`${selectedImage.name} full`}
            />
            <h2>{selectedImage.name}</h2>
          </div>
          {selectedImageIndex > 0 && (
            <StyledButton
              className="arrow prev"
              title="Show previous image"
              onClick={() => setSelectedImage(images[selectedImageIndex - 1])}
            >
              ←
            </StyledButton>
          )}
          {selectedImageIndex < images.length - 1 && (
            <StyledButton
              className="arrow next"
              title="Show next image"
              onClick={() => setSelectedImage(images[selectedImageIndex + 1])}
            >
              →
            </StyledButton>
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
