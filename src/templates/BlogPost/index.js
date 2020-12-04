import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import getReadingTime from 'reading-time'

import Gallery from '../../components/Gallery'
import FeaturedImage from '../../components/FeaturedImage'
import Layout from '../../components/Layout'
import SEO from '../../components/Seo'

import { StyledBlogPost, StyledBlogPostNav } from './styled'

const BlogPostTemplate = ({ data, location }) => {
  const {
    allFile,
    markdownRemark: { frontmatter, html },
    previous,
    next,
  } = data
  const { date, description, featuredImage, title, origin } = frontmatter
  const readingTime = getReadingTime(html)

  const images = allFile.edges.map(({ node }) => ({
    name: node.name,
    thumb: node.childImageSharp.thumb,
    full: node.childImageSharp.full,
  }))

  return (
    <Layout location={location} title={title}>
      <SEO title={title} description={description} />
      <StyledBlogPost itemScope itemType="http://schema.org/Article">
        <header>
          <FeaturedImage
            date={date}
            description={description}
            featuredImage={featuredImage}
            isBig
          />
          <p className="origin">
            <small>{origin}</small>
          </p>
          <h1>
            <span itemProp="headline">{title}</span>
          </h1>
          <p className="reading-time">
            <small>{readingTime.text}</small>
          </p>
        </header>
        <section
          className="body"
          dangerouslySetInnerHTML={{ __html: html }}
          itemProp="articleBody"
        />
        <hr />
        <section className="gallery">
          <h3>Gallery</h3>
          <Gallery images={images} />
        </section>
        <hr />
      </StyledBlogPost>
      <StyledBlogPostNav>
        {previous && (
          <Link className="previous" to={previous.fields.slug} rel="prev">
            <div className="arrow">←</div>
            <div className="thumbnail">
              <Img
                fluid={previous.frontmatter.featuredImage.childImageSharp.fluid}
                alt={`Go to ${previous.frontmatter.title}`}
              />
              <small>{previous.frontmatter.title}</small>
            </div>
          </Link>
        )}
        {next && (
          <Link className="next" to={next.fields.slug} rel="prev">
            <div className="arrow">→</div>
            <div className="thumbnail">
              <Img
                fluid={next.frontmatter.featuredImage.childImageSharp.fluid}
                alt={`Go to ${next.frontmatter.title}`}
              />
              <small>{next.frontmatter.title}</small>
            </div>
          </Link>
        )}
      </StyledBlogPostNav>
    </Layout>
  )
}

BlogPostTemplate.propTypes = {
  data: PropTypes.shape({
    allFile: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string.isRequired,
            childImageSharp: PropTypes.shape({
              full: PropTypes.object.isRequired,
              thumb: PropTypes.object.isRequired,
            }).isRequired,
          }).isRequired,
        }),
      ).isRequired,
    }).isRequired,
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        origin: PropTypes.string.isRequired,
        featuredImage: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fluid: PropTypes.object.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    next: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }).isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        featuredImage: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fluid: PropTypes.object.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
    }),
    previous: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }).isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        featuredImage: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fluid: PropTypes.object.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $dirRegex: String!
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMM YYYY")
        description
        origin
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 600, maxHeight: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    allFile(
      filter: {
        dir: { regex: $dirRegex }
        extension: { regex: "/(jpg)|(jpeg)|(png)/" }
      }
    ) {
      edges {
        node {
          name
          childImageSharp {
            thumb: fluid(maxWidth: 160, maxHeight: 160) {
              ...GatsbyImageSharpFluid
            }
            full: fluid(maxWidth: 1200) {
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
            fluid(maxWidth: 150, maxHeight: 150) {
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
            fluid(maxWidth: 150, maxHeight: 150) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
