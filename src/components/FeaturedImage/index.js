import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'
import styled, { css } from 'styled-components'

import Frame from '../../../content/svg/frame.svg'

const StyledFeaturedImage = styled.div`
  ${({ isBig, theme }) => css`
    position: relative;

    .date {
      background-color: white;
      border-radius: 50%;
      bottom: 0;
      color: ${theme.color.text};
      display: grid;
      height: 5.5em;
      left: 50%;
      overflow: hidden;
      place-items: center;
      position: absolute;
      text-wrap: wrap;
      transform: translate(-50%, 50%);
      width: 5.5em;

      ${isBig &&
      css`
        height: 20vw;
        width: 20vw;

        @media screen and (min-width: ${theme['media-queries'].tablet}) {
          height: 150px;
          width: 150px;
        }
      `}

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

const FeaturedImage = ({ date, featuredImage, isBig, title }) => {
  console.log(isBig)
  const [day, month, year] = date.split(' ')
  return (
    <StyledFeaturedImage isBig={isBig}>
      <GatsbyImage
        image={featuredImage.childImageSharp.gatsbyImageData}
        alt={title}
      />
      <section className="date" data-testid={`date-${date}`}>
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

FeaturedImage.propTypes = {
  date: PropTypes.string.isRequired,
  featuredImage: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      gatsbyImageData: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
  isBig: PropTypes.bool,
  title: PropTypes.string.isRequired,
}

export default FeaturedImage
