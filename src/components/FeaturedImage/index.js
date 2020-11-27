import React from 'react'
import Img from 'gatsby-image'
import styled, { css } from 'styled-components'

import Frame from '../../../content/svg/frame.svg'

const StyledFeaturedImage = styled.div`
  ${({ isBig, theme }) => css`
    position: relative;

    .gatsby-image-wrapper > div {
      padding-bottom: 100% !important;
    }

    .date {
      background-color: white;
      border-radius: 50%;
      bottom: 0;
      color: ${theme.color.text};
      display: grid;
      height: 22%;
      left: 50%;
      overflow: hidden;
      place-items: center;
      position: absolute;
      text-wrap: wrap;
      transform: translate(-50%, 50%);
      width: 22%;

      > div {
        display: grid;
        height: 100%;
        position: relative;
        place-items: center;
        width: 100%;

        svg {
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          width: 100%;
        }

        p {
          color: ${theme.color.primary};
          font-family: ${theme.font.body};
          font-weight: ${theme.font.weight.normal};
          font-size: 4vw;
          margin: 0 auto;
          text-align: center;

          @media screen and (min-width: ${theme['media-queries'].tablet}) {
            font-size: ${isBig ? '175%' : '95%'};
          }
        }
      }
    }
  `}
`

const FeaturedImage = ({ date, description, featuredImage, isBig }) => {
  const [day, month, year] = date.split(' ')
  return (
    <StyledFeaturedImage isBig={isBig}>
      <Img fluid={featuredImage.childImageSharp.fluid} alt={description} />
      <section className="date">
        <div>
          <Frame />
          <p>
            <small>
              {day} {month}
              <br />
              {year}
            </small>
          </p>
        </div>
      </section>
    </StyledFeaturedImage>
  )
}

export default FeaturedImage
