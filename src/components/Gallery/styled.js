import { GatsbyImage } from 'gatsby-plugin-image'
import styled, { css } from 'styled-components'

export const StyledThumbnailWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, 160px);
    grid-gap: ${theme.spacing['2']};
    justify-content: space-between;
    width: 100%;
  `}
`

export const StyledCoverWrapper = styled.div`
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

      h2 {
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

export const StyledFullImage = styled(GatsbyImage)`
  height: 80vh;
  max-width: 1200px;
  width: 80vw;

  img {
    object-fit: contain !important;
  }
`
