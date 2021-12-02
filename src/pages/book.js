import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PageNav from "../components/page-nav"
import tw from "tailwind.macro"
import { css } from "@emotion/core"
import { Section } from "../components/grid"
import { Body } from "../components/type"
import SEO from "../components/seo"
import SubscribeForm from "../components/subscribe-form"

import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => (
  <Body className="mb-6 align-center">{children}</Body>
)

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [INLINES.HYPERLINK]: node => {
      return (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
        >
          {node.content[0].value}
        </a>
      )
    },
  },
}

export default function About(props) {
  const content = props.data.contentfulBookPage
  const metaData = {}
  if (content.seoMetaData) {
    if (content.seoMetaData.title) metaData.title = content.seoMetaData.title
    if (content.seoMetaData.description)
      metaData.description = content.seoMetaData.description.description
    if (content.seoMetaData.image)
      metaData.image = content.seoMetaData.image.fluid.src
  }
  return (
    <Layout expand>
      {content.seoMetaData ? <SEO {...metaData} /> : ""}
      <PageNav title="Book" />
      <div
        css={css`
          h1,
          h2,
          h3,
          h4 {
            ${tw`font-heading`}
          }

          h1 {
            ${tw`mb-4 text-3xl`}
          }
          h2 {
            ${tw`mb-8 text-xl`}
          }

          p {
            ${tw`mb-4 text-lg`}
          }
        `}
      >
        <Section className="mt-20" css={tw`block px-4`}>
          <div className="container flex flex-col items-center max-w-screen-lg px-4 py-20 mx-auto">
            <div>
              <img
                src={content.headshot.fluid.src}
                alt="Brandon Hatton"
                className="float-left w-full max-w-md mw-10"
              />
              {/* <Heading as="h2" className="mb-2">
                  {content.aboutTitle}
                </Heading> */}
              {/* <h3 className="mb-8 text-2xl font-bold font-heading">
                  {content.aboutSubtitle}
                </h3> */}
              <div
                css={css`
                  &:after {
                    content: "";
                    display: block;
                    clear: both;
                  }

                  p {
                    margin-bottom: 1.2rem;
                  }
                `}
              >
                {documentToReactComponents(content.bookOverview.json, options)}
              </div>
            </div>
            <details
              className="mt-8 text-sm tracking-wide text-black uppercase border-2 border-black border-solid rounded-lg shadow-none font-body md:text-lg"
              css={css`
                li {
                  ${tw`px-4 py-2 text-center border-b-2 hover:bg-black hover:text-sidebar-gray`}
                }

                li:last-child {
                  ${tw`border-b-0`}
                }

                p {
                  margin: 0;
                }
              `}
            >
              <summary
                className="w-full px-4 py-2 text-center uppercase cursor-pointer font-body hover:bg-black hover:text-sidebar-gray"
                css={css`
                  list-style: none;

                  &::-webkit-details-marker {
                    display: none;
                  }
                `}
              >
                {content.ctaTitle}
              </summary>
              <div className="border-t-2">
                {documentToReactComponents(
                  content.bookPurchaseLinks.json,
                  options
                )}
              </div>
            </details>
          </div>
        </Section>
        <Section
          css={css`
            background: radial-gradient(
              circle at 10% 70%,
              #f40b83 0%,
              #fa3305 80%
            );
            ${tw`text-white`}
          `}
        >
          <div className="container flex flex-col items-center max-w-screen-lg px-4 py-20 mx-auto">
            {documentToReactComponents(content.aboutBody2.json, options)}
            <details
              className="mt-8 text-sm tracking-wide text-white uppercase border-2 border-white border-solid rounded-lg shadow-none font-body md:text-lg"
              css={css`
                li {
                  ${tw`px-4 py-2 text-center border-b-2 hover:bg-white hover:text-black`}
                }

                li:last-child {
                  ${tw`border-b-0`}
                }

                p {
                  margin: 0;
                }
              `}
            >
              <summary
                className="w-full px-4 py-2 text-center uppercase cursor-pointer font-body hover:bg-white hover:text-black"
                css={css`
                  list-style: none;

                  &::-webkit-details-marker {
                    display: none;
                  }
                `}
              >
                {content.ctaTitle}
              </summary>
              <div className="border-t-2">
                {documentToReactComponents(
                  content.bookPurchaseLinks.json,
                  options
                )}
              </div>
            </details>
          </div>
        </Section>
        <Section>
          <div className="container flex flex-col max-w-screen-lg px-4 py-20 mx-auto">
            {documentToReactComponents(content.subCta.json, options)}
            <details
              className="self-center mt-8 text-sm tracking-wide text-black uppercase border-2 border-black border-solid rounded-lg shadow-none font-body md:text-lg"
              css={css`
                li {
                  ${tw`px-4 py-2 text-center border-b-2 hover:bg-black hover:text-sidebar-gray`}
                }

                li:last-child {
                  ${tw`border-b-0`}
                }

                p {
                  margin: 0;
                }
              `}
            >
              <summary
                className="w-full px-4 py-2 text-center uppercase cursor-pointer font-body hover:bg-black hover:text-sidebar-gray"
                css={css`
                  list-style: none;

                  &::-webkit-details-marker {
                    display: none;
                  }
                `}
              >
                {content.ctaTitle}
              </summary>
              <div className="border-t-2">
                {documentToReactComponents(
                  content.bookPurchaseLinks.json,
                  options
                )}
              </div>
            </details>
          </div>
        </Section>
        <Section css={tw`bg-white`}>
          <div css={css`
              ${tw`flex flex-col max-w-screen-lg px-4 py-20 mx-auto text-center`}
              max-width: 300px;

              input {
                ${tw`mb-8 border-black border-2 rounded-md`}
              }
            `}>
            <h2>Preview the Book</h2>
            <SubscribeForm bookPreview={true}/>
          </div>
        </Section>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
         query BookPage {
           contentfulBookPage(
             id: { eq: "6dfc6328-1825-5b85-bd94-95508bdd17ef" }
           ) {
             id
             bookOverview {
               json
             }
             aboutBody2 {
               json
             }
             bookPurchaseLinks {
               json
             }
             ctaTitle
             headshot {
               fluid(maxWidth: 700, quality: 100) {
                 src
               }
             }
             subCta {
               json
             }
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
           }
         }
       `
