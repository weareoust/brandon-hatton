import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "@emotion/styled"
import tw from "tailwind.macro"
import { Section, SnglCol } from "../components/grid"
import { Heading, Body } from "../components/type"
import PageNav from "../components/page-nav"
import logo from "../../content/assets/being-enough.svg"

import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
}

const Wrapper = styled.div`
  p {
    ${tw`mb-8`}
  }
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.contentfulPosts
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    let video_id = post.videoUrl
    if (video_id) {
      video_id = video_id.split("v=")[1]
      var ampersandPosition = video_id.indexOf("&")
      if (ampersandPosition !== -1) {
        video_id = video_id.substring(0, ampersandPosition)
      }
    }

    return (
      <Layout location={this.props.location} title={siteTitle} expand>
        <SEO
          title={post.title}
          description={post.description || post.excerpt}
        />
        <PageNav
          title={`BEING ENOUGH: ${post.title}`}
          logo={logo}
          cta={{ text: "Back", url: "/blog" }}
        />
        <article>
          <Section className="bg-bg-gray">
            <SnglCol className="mt-20">
              <Heading className="max-w-screen-lg mb-8">{post.title}</Heading>
              <Body>{post.publishedDate}</Body>
            </SnglCol>
          </Section>
          <Section>
            <Wrapper className="font-body px-8 md:px-24 py-24">
              {video_id ? (
                <iframe
                  title="Edward Bailey"
                  style={{
                    width: "100%",
                    minHeight: "500px",
                  }}
                  className="mb-12"
                  src={`https://www.youtube.com/embed/${video_id}`}
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              ) : (
                ""
              )}
              {documentToReactComponents(post.post.json, options)}
            </Wrapper>
          </Section>
          <hr />
          <footer></footer>
        </article>

        <nav className="p-12 uppercase bg-bg-gray">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link
                  to={"/blog/" + previous.slug}
                  rel="prev"
                  className="font-body"
                >
                  ← {previous.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link
                  to={"/blog/" + next.slug}
                  rel="next"
                  className="font-body"
                >
                  {next.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }

    contentfulPosts(slug: { eq: $slug }) {
      id
      title
      publishedDate(formatString: "DD MMMM YYYY")
      videoUrl
      post {
        json
      }
    }
  }
`
