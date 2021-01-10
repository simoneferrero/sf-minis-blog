import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledVideoWrapper = styled.div`
  padding-bottom: calc(var(--aspect-ratio, 0.5625) * 100%);
  position: relative;
  width: 100%;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

const Video = ({ videoSrcURL, videoTitle }) => (
  <StyledVideoWrapper className="video">
    <iframe
      data-testid={`${videoTitle}-video`}
      src={videoSrcURL}
      title={videoTitle}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
    />
  </StyledVideoWrapper>
)

Video.propTypes = {
  videoSrcURL: PropTypes.string.isRequired,
  videoTitle: PropTypes.string.isRequired,
}

export default Video
