import React, { useState } from 'react'
import Img from 'gatsby-image'
import styled, { css } from 'styled-components'

import Close from '../../../content/svg/close.svg'

const StyledThumbnailWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, 160px);
    grid-gap: ${theme.spacing['2']};
    justify-content: space-between;
    width: 100%;
  `}
`

const StyledCoverWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.color['background-dark']};
    display: grid;
    left: 0;
    place-items: center;
    position: fixed;
    top: 0;
    z-index: 999;

    .background-image-close {
      height: 100vh;
      left: 0;
      top: 0;
      width: 100vw;

      svg {
        fill: ${theme.color.primary};
        max-height: 50px;
        max-width: 50px;
        padding: ${theme.spacing['4']};
        position: fixed;
        right: 0;
        top: 0;
      }
    }

    .image-wrapper {
      position: absolute;
      text-align: center;

      h5 {
        font-size: ${theme.font.size['2']};
        margin-top: ${theme.spacing['6']};
      }
    }

    .arrow {
      color: ${theme.color.primary} !important;
      font-size: ${theme.font.size['3']};
      font-weight: ${theme.font.weight.bold};
      padding: ${theme.spacing['4']};
      position: fixed;
      top: 50%;
      transform: translateY(-50%);

      &.prev {
        left: 0;
      }

      &.next {
        right: 0;
      }
    }
  `}
`

const StyledFullImage = styled(Img)`
  height: 80vh;
  max-width: 1200px;
  width: 80vw;

  img {
    object-fit: contain !important;
  }
`

const StyledButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
  outline: inherit;
  padding: 0;
`

const Gallery = ({ images }) => {
  // TODO: Add keyboard navigation
  const [selectedImage, setSelectedImage] = useState(null)
  const selectedImageIndex = images.findIndex(
    ({ name }) => name === selectedImage?.name,
  )

  return (
    <>
      <StyledThumbnailWrapper>
        {images.map(image => (
          <StyledButton
            aria-label={`Display image ${image.name}`}
            key={image.thumb.src}
            onClick={() => setSelectedImage(image)}
          >
            <Img fluid={image.thumb} alt={image.name} />
          </StyledButton>
        ))}
      </StyledThumbnailWrapper>
      {!!selectedImage ? (
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
              alt={selectedImage.name}
            />
            <h5>{selectedImage.name}</h5>
          </div>
          {selectedImageIndex > 0 && (
            <StyledButton
              className="arrow prev"
              onClick={() => setSelectedImage(images[selectedImageIndex - 1])}
            >
              ←
            </StyledButton>
          )}
          {selectedImageIndex < images.length - 1 && (
            <StyledButton
              className="arrow next"
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

export default Gallery
