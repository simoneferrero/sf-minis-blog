import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled, { css } from 'styled-components'

import FeaturedImage from '../components/FeaturedImage'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

const StyledBlogPost = styled.article`
  ${({ theme }) => css`
    text-align: justify;

    header {
      text-align: center;
      margin-bottom: ${theme.spacing['12']};

      h1 {
        margin: ${theme.spacing['0']} ${theme.spacing['0']}
          ${theme.spacing['4']} ${theme.spacing['0']};
      }

      p {
        color: ${theme.color.text};
        font-size: ${theme.font.size['2']};
        font-weight: ${theme.font.weight.bold};
        margin-bottom: 0;
        margin-top: 12%;
      }
    }
  `}
`

const StyledBlogPostNav = styled.div`
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
        overflow: hidden;
        padding: ${theme.spacing['1']};
        text-align: center;
        text-overflow: ellipsis;
        transition: .1s linear;
        white-space: nowrap;
        width: 15vh;

        .gatsby-image-wrapper > div {
          padding-bottom: 100% !important;
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

const BlogPostTemplate = ({ data, location }) => {
  const { markdownRemark: { frontmatter, html }, previous, next } = data
  const { date, description, featuredImage, title, origin } = frontmatter

  return (
    <Layout location={location} title={title}>
      <SEO
        title={title}
        description={description}
      />
      <StyledBlogPost itemScope itemType="http://schema.org/Article">
        <header>
          <FeaturedImage
            date={date}
            description={description}
            featuredImage={featuredImage}
            isBig
          />
          <p><small>{origin}</small></p>
          <h1>
              <span itemProp="headline">{title}</span>
          </h1>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: html }}
          itemProp="articleBody"
        />
        <hr />
      </StyledBlogPost>
      <StyledBlogPostNav>
        {previous && (
          <Link className="previous" to={previous.fields.slug} rel="prev">
            <div className="arrow">←</div>
            <div className="thumbnail">
              <Img fluid={previous.frontmatter.featuredImage.childImageSharp.fluid} alt={`Go to ${previous.frontmatter.title}`} />
              <small>{previous.frontmatter.title}</small>
            </div>
          </Link>
        )}
        {next && (
          <Link className="next" to={next.fields.slug} rel="prev">
            <div className="arrow">→</div>
            <div className="thumbnail">
              <Img fluid={next.frontmatter.featuredImage.childImageSharp.fluid} alt={`Go to ${next.frontmatter.title}`} />
              <small>{next.frontmatter.title}</small>
            </div>
          </Link>
        )}
      </StyledBlogPostNav>
      {/* TODO: Add gallery at the end */}
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "DD MMM YYYY")
        description
        origin
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
