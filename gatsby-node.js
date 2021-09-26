const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const fs = require('fs')


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allContentfulPosts(sort: { fields: publishedDate, order: DESC }) {
          nodes {
            id
            title
            slug
          }
        }
        contentfulGlobalSettings(
          id: { eq: "56f65675-48c1-5f91-ac9b-2d2706c70763" }
        ) {
          onePagerFile {
            file {
              url
            }
          }
        }
      }
    `
  )

  

  if (result.errors) {
    throw result.errors
  }
  
  fs.readFile('./static/_redirects', 'utf-8', function (err, data) {
    console.log("err", err)
    console.log("data", data)
    if (data) {
      fs.writeFile(
        "./static/_redirects",
        data.replace(
          /.*one-pager.*/g,
          "/one-pager https:" + result.data.contentfulGlobalSettings.onePagerFile.file.url
        ),
        "utf-8",
        function(err) {
          console.log(err)
        }
      )
    }
  })

  // Create blog posts pages.
  const posts = result.data.allContentfulPosts.nodes

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]

    createPage({
      path: "/beingenough/" + post.slug,
      component: blogPost,
      context: {
        slug: post.slug,
        previous,
        next,
      },
    })
  })
}
