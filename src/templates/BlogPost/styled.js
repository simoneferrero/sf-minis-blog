import styled, { css } from 'styled-components'

export const StyledBlogPost = styled.article`
  ${({ theme }) => css`
    text-align: justify;

    header {
      text-align: center;
      margin-bottom: ${theme.spacing['12']};

      h1 {
        margin: ${theme.spacing['0']};
      }

      p {
        &.origin {
          color: ${theme.color.text};
          font-size: ${theme.font.size['2']};
          font-weight: ${theme.font.weight.bold};
          margin-bottom: 0;
          margin-top: 12%;
        }

        &.reading-time {
          color: ${theme.color.text};
          font-size: ${theme.font.size['1']};
          font-style: italic;
          font-weight: ${theme.font.weight.bold};
        }
      }
    }

    .gallery {
      margin: ${theme.spacing['8']} ${theme.spacing['0']};
      text-align: center;

      h1 {
        color: ${theme.color.heading};
        font-size: ${theme.font.size['4']};
        margin-top: ${theme.spacing['0']};
        margin: ${theme.spacing['4']};
      }
    }
  `}
`

export const StyledBlogPostNav = styled.div`
  ${({ theme }) => css`
    .previous,
    .next {
      color: ${theme.color.heading};
      overflow: hidden;
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      width: 15vh;

      .thumbnail {
        background-color: ${theme.color['background-primary']};
        display: flex;
        flex-direction: column;
        overflow: hidden;
        padding: ${theme.spacing['1']};
        text-align: center;
        text-overflow: ellipsis;
        transition: 0.1s linear;
        white-space: nowrap;
        width: 15vh;

        .gatsby-image-wrapper > div {
          height: 15vh;
        }

        small {
          font-family: ${theme.font.family.sans};
          padding: ${theme.spacing['1']};
        }
      }

      .arrow {
        font-size: ${theme.font.size['3']};
        font-weight: ${theme.font.weight.bold};
        padding: ${theme.spacing['4']};
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 15vh;
      }

      &:hover {
        .thumbnail {
          transform: translateX(0);
        }
      }
    }

    .previous {
      left: 0;
      transform: translateY(-50%);

      .thumbnail {
        padding-left: 0;
        transform: translateX(-101%);
      }

      .arrow {
        text-align: left;
      }

      &:hover {
        .thumbnail {
          transform: translateX(0);
        }
      }
    }

    .next {
      right: 0;

      .thumbnail {
        padding-right: 0;
        transform: translateX(101%);
      }

      .arrow {
        text-align: right;
      }

      &:hover {
        .thumbnail {
          transform: translateX(0);
        }
      }
    }
  `}
`

export const StyledVideoSection = styled.section`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacing['12']};
  `}
`
