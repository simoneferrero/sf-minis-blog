module.exports = {
  siteMetadata: {
    title: `SF Minis Blog`,
    author: {
      name: `Simone Ferrero`,
      summary: `Programmer, team lead, amateur painter, bad footballer, unfortunately not Batman.`,
    },
    description: `A showcase for my painted miniatures.`,
    siteUrl: `https://sfminis.surge.sh/`,
    social: {
      instagram: `https://instagram.com/sf_minis`,
      github: `https://github.com/simoneferrero/sf-minis-blog`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `SF Minis Blog`,
        short_name: `SFMinis`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#00adb5`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svg/,
        },
      },
    },
  ],
}
