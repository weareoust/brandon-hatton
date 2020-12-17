import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "@emotion/styled"
import tw from "tailwind.macro"
import { Section, SnglCol } from "../components/grid"
import { Heading } from "../components/type"
import PageNav from "../components/page-nav"
import logo from "../../content/assets/being-enough.svg"
import SubscribeLinks from "../components/subscribe-links"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

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
            <SnglCol className="mt-20 py-10">
              {post.episodeNumber ? (
                <h2 className="mb-4">Episode {post.episodeNumber}</h2>
              ) : (
                ""
              )}
              <Heading className="max-w-screen-lg mb-2">{post.title}</Heading>
              {video_id ? (
                <div>
                  <div
                    className="relative w-screen max-w-3xl shadow-lg mt-12"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <iframe
                      title="Brandon Hatton: Being Enough"
                      className="mb-12 absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video_id}`}
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="grid grid-cols-3 gap-4 text-left my-10 w-full max-w-xl">
                <div className="border-b  border-black pb-4">
                  <h2>Published</h2>
                  <h3 className="uppercase">{post.publishedDate}</h3>
                </div>
                <div className="border-b  border-black pb-4">
                  <h2>Share</h2>
                  <ul className="flex">
                    <li>
                      <div className="bg-black h-2 w-2 rounded-full mr-3"></div>
                    </li>
                    <li>
                      <div className="bg-black h-2 w-2 rounded-full mr-3"></div>
                    </li>
                    <li>
                      <div className="bg-black h-2 w-2 rounded-full mr-3"></div>
                    </li>
                    <li>
                      <div className="bg-black h-2 w-2 rounded-full mr-3"></div>
                    </li>
                  </ul>
                </div>
                <div className="border-b  border-black pb-4">
                  <h2>Subscribe</h2>
                  <SubscribeLinks />
                </div>
              </div>
            </SnglCol>
          </Section>
          <Section>
            <Wrapper className="font-body px-8 md:px-24 py-24 w-full max-w-screen-lg mx-auto">
              <h2 className="uppercase mb-4 font-bold tracking-wide">
                About this episode
              </h2>
              {documentToReactComponents(post.post.json)}
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
      episodeNumber
      post {
        json
      }
      guest {
        websiteUrl
        twitterUrl
        photo {
          fixed(width: 200, quality: 100) {
            src
          }
        }
        name
        linkedInUrl
        jobTitle
        facebookUrl
        description {
          description
        }
      }
    }
  }
`
