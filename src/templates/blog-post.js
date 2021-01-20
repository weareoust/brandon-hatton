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
import { css } from "@emotion/core"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import twitter from "../images/twitter.svg"
import fb from "../images/fb.svg"
import linkedin from "../images/linkedin.svg"
import link from "../images/link.svg"
import envelope from "../images/envelope.svg"

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
    const metaData = {}
    if (post.seoMetaData) {
      if (post.seoMetaData.title) metaData.title = post.seoMetaData.title
      if (post.seoMetaData.description)
        metaData.description = post.seoMetaData.description.description
      if (post.seoMetaData.image)
        metaData.image = post.seoMetaData.image.fluid.src
    }
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
        {post.seoMetaData ? <SEO {...metaData} /> : ""}
        <PageNav
          title={`BEING ENOUGH: ${post.title}`}
          logo={logo}
          cta={{ text: "Back", url: "/beingenough" }}
        />
        <article>
          <Section className="bg-bg-gray">
            <SnglCol css={tw`mt-20 py-10`}>
              {post.episodeNumber ? (
                <h2 className="mb-4 uppercase tracking-wide">
                  Episode {post.episodeNumber}
                </h2>
              ) : (
                ""
              )}
              <Heading className="max-w-screen-lg mb-2">{post.title}</Heading>
              <h3 className="uppercase">{post.publishedDate}</h3>
              {video_id ? (
                <div>
                  <div
                    className="relative w-screen md:max-w-xl lg:max-w-3xl shadow-lg mt-12"
                    css={css`
                      padding-bottom: 56.25%;
                      margin-left: auto;
                      margin-right: auto;

                      @media (max-width: 767px) {
                        max-width: 90%;
                      }
                    `}
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
              <div
                className={`grid md:grid-cols-${
                  post.showSubscribeIcons ? "2 max-w-sm" : "1 max-w-xs"
                } gap-6 md:gap-4 text-left my-10 w-full`}
              >
                <div className="border-b  border-black pb-4 md:pb-4">
                  <h2 className="font-bold mb-0 md:mb-2 font-body text-black">
                    Share
                  </h2>
                  <ul
                    css={css`
                      display: flex;
                      align-items: center;

                      a {
                        display: block;
                        padding: 0.25rem;
                      }

                      &:hover li {
                        opacity: 0.5;
                      }
                      & > li:hover {
                        opacity: 1;
                      }
                    `}
                  >
                    <li>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${"https://brandonhatton.com/beingenough/" +
                          post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={fb} alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${"https://brandonhatton.com/beingenough/" +
                          post.slug}&text=${"Being Enough: " + post.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={twitter} alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={`http://www.linkedin.com/shareArticle?url=${"https://brandonhatton.com/beingenough/" +
                          post.slug}&text=${"Being Enough: " +
                          post.title}&title=${"Being Enough: " +
                          post.title}&source=https://brandonhatton.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={linkedin} alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={`mailto:?subject=${"Brandon Hatton: Being Enough - " +
                          post.title}&body=${"https://brandonhatton.com/beingenough/" +
                          post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={envelope} alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
                {post.showSubscribeIcons ? (
                  <div className="border-b  border-black pb-4 md:pb-4">
                    <h2 className="font-bold mb-0 md:mb-2 font-body text-black">
                      Subscribe
                    </h2>
                    <SubscribeLinks />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </SnglCol>
          </Section>
          <Section>
            <Wrapper className="font-body px-8 md:px-24 py-24 w-full max-w-screen-lg mx-auto">
              {post.guest ? (
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <h2 className="uppercase mb-4 font-bold tracking-wide w-full md:col-span-2 text-center md:text-left">
                    On this Episode
                  </h2>
                  {post.guest.map(g => {
                    return (
                      <div>
                        <div className="flex flex-col md:flex-row items-center mb-4">
                          <div
                            style={{
                              backgroundImage: `url(${g.photo.fixed.src})`,
                            }}
                            alt=""
                            className="rounded-full w-32 h-32 bg-center bg-cover flex-shrink-0 mb-4 md:mb-0"
                          />
                          <div className="ml-4">
                            <h3 className="text-2xl text-center md:text-left">
                              {g.name}
                            </h3>
                            <h4 className="mb-2 text-center md:text-left">
                              {g.jobTitle}
                            </h4>
                            <ul
                              className="justify-center md:justify-start"
                              css={css`
                                display: flex;
                                align-items: center;

                                a {
                                  display: block;
                                  padding: 0.25rem;
                                }

                                &:hover li {
                                  opacity: 0.5;
                                }
                                & > li:hover {
                                  opacity: 1;
                                }
                              `}
                            >
                              {g.linkedInUrl ? (
                                <li>
                                  <a
                                    href={g.linkedInUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <img src={linkedin} alt="" />
                                  </a>
                                </li>
                              ) : (
                                ""
                              )}
                              {g.facebookUrl ? (
                                <li>
                                  <a
                                    href={g.facebookUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <img src={fb} alt="" />
                                  </a>
                                </li>
                              ) : (
                                ""
                              )}
                              {g.twitterUrl ? (
                                <li>
                                  <a
                                    href={g.twitterUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <img src={twitter} alt="" />
                                  </a>
                                </li>
                              ) : (
                                ""
                              )}
                              {g.websiteUrl ? (
                                <li>
                                  <a
                                    href={g.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <img src={link} alt="" />
                                  </a>
                                </li>
                              ) : (
                                ""
                              )}
                            </ul>
                          </div>
                        </div>
                        {/* {g.description ? (
                          <p>{g.description.description}</p>
                        ) : (
                          ""
                        )} */}
                      </div>
                    )
                  })}
                </div>
              ) : (
                ""
              )}
              {post.videoUrl ? (
                <h2 className="uppercase mb-4 font-bold tracking-wide">
                  About this episode
                </h2>
              ) : (
                ""
              )}
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
                  to={"/beingenough/" + previous.slug}
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
                  to={"/beingenough/" + next.slug}
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
             slug
             publishedDate(formatString: "DD MMMM YYYY")
             videoUrl
             episodeNumber
             showSubscribeIcons
             seoMetaData {
               title
               description {
                 description
               }
               image {
                 fluid(maxWidth: 1000, quality: 100) {
                   src
                 }
               }
             }
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
