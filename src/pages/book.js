import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PageNav from "../components/page-nav"
import tw from "tailwind.macro"
import { css } from "@emotion/core"
import { Section } from "../components/grid"
import { Body } from "../components/type"
import SEO from "../components/seo"

import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => (
  <Body className="align-center mb-6">{children}</Body>
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
            ${tw`text-3xl mb-4`}
          }
          h2 {
            ${tw`text-xl mb-8`}
          }

          p {
            ${tw`text-lg mb-4`}
          }
        `}
      >
        <Section className="mt-20" css={tw`block px-4`}>
          <div className="container px-4 py-20 max-w-screen-lg mx-auto flex flex-col">
            <div>
              <img
                src={content.headshot.fluid.src}
                alt="Brandon Hatton"
                className="float-left max-w-md mw-10 w-full"
              />
              {/* <Heading as="h2" className="mb-2">
                  {content.aboutTitle}
                </Heading> */}
              {/* <h3 className="mb-8 font-bold text-2xl font-heading">
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
              className="border border-black inline-block mx-auto rounded mt-8"
              css={css`
                li {
                  ${tw`py-2 px-4 border-b-2 text-center`}
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
                className="cursor-pointer font-body px-4 py-2 text-center uppercase w-full"
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
          <div className="container px-4 py-20 max-w-screen-lg mx-auto flex flex-col">
            {documentToReactComponents(content.aboutBody2.json, options)}
            <details
              className="border border-white inline-block mx-auto rounded mt-8"
              css={css`
                li {
                  ${tw`py-2 px-4 border-b-2 text-center`}
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
                className="cursor-pointer font-body px-4 py-2 text-center uppercase w-full"
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
          <div className="container px-4 py-20 max-w-screen-lg mx-auto flex flex-col">
            {documentToReactComponents(content.subCta.json, options)}
            <details
              className="border border-black inline-block mx-auto rounded mt-8"
              css={css`
                li {
                  ${tw`py-2 px-4 border-b-2 text-center`}
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
                className="cursor-pointer font-body px-4 py-2 text-center uppercase w-full"
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
        {/* <Section css={tw`bg-white`}>
          <SnglCol>
            <h2 className="text-3xl font-heading mb-12">{content.ctaTitle}</h2>
            <Link
              className="mb-12 text-center font-body text-3xl font-light tracking-wide mx-auto p-2 border-2 border-black rounded-lg block uppercase hover:bg-black hover:text-white self-start"
              to="/contact"
            >
              Contact
            </Link>
            <div
              css={css`
                p {
                  margin-bottom: 1.2rem;
                  ${tw`text-xl`}
                }

                a {
                  text-decoration: underline;
                }
              `}
            >
              {documentToReactComponents(content.subCta.json)}
            </div>
          </SnglCol>
        </Section> */}
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
