import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PageNav from "../components/page-nav"
import ContactForm from "../components/contact-form"
import tw from "tailwind.macro"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { Section, Col, TitleCol } from "../components/grid"
import { Heading, Body } from "../components/type"
import BackgroundImage from "gatsby-background-image"
import SEO from "../components/seo"

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
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {node.content[0].value}
        </a>
      )
    },
  },
}

const Hero = styled(BackgroundImage)`
  ${tw`flex flex-col justify-between px-8 pt-24 border-0 border-b-2 border-black border-solid md:flex-row`}
  min-height: 70vh;
`
const BasicCta = tw.a`px-4 py-2 font-body text-sm md:text-lg text-black tracking-wide uppercase border-2 border-black border-solid rounded-lg shadow-none hover:bg-black hover:text-sidebar-gray`

export default function Contact(props) {
  const content = props.data.contentfulContactPage
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
      <PageNav
        title="Contact"
        // cta={{ text: "Contact", url: "/contact#form" }}
      />
      {/* <Hero fluid={props.data.file.childImageSharp.fluid}>
        <div css={tw`flex flex-col justify-between`}>
          <Heading css={tw`max-w-2xl mb-8`}>{content.heroText}</Heading>
          <BasicCta
            as="a"
            href={content.heroCtaUrl}
            target="_blank"
            css={tw`self-start mb-8`}
          >
            {content.heroCtaText}
          </BasicCta>
        </div>
      </Hero>
      <Section id="form">
        <TitleCol
          css={tw`flex flex-col items-center pb-12 border-b-0 md:bg-white md:block`}
        >
          <Heading as="h2" css={tw`mb-12`}>
            {content.colTitle}
          </Heading>
          <BasicCta
            as="a"
            href={content.colButtonUrl}
            target="_blank"
            css={tw`mb-8`}
          >
            {content.colButtonText}
          </BasicCta>
        </TitleCol>
        <Col css={tw`text-white bg-black`}>
          <ContactForm />
        </Col>
      </Section> */}
      <Section id="form" css={tw`border-b-0`}>
        <div className="container flex flex-col items-center justify-center max-w-screen-lg min-h-screen px-4 py-20 mx-auto mt-8">
          <h1 css={tw`mb-4 text-2xl text-center font-heading`}>
            {content.heroText}
          </h1>
          <ContactForm />
          <div
            css={css`
              ${tw`flex flex-col items-center mt-12`}

              p {
                ${tw`block mb-4 text-xl`}
              }

              a {
                ${tw`self-center block w-auto px-4 py-2 mx-auto text-sm tracking-wide text-black uppercase border-2 border-black border-solid rounded-lg shadow-none font-body md:text-lg hover:bg-black hover:text-sidebar-gray`}
              }
            `}
          >
            {documentToReactComponents(content.postFormText.json, options)}
          </div>
        </div>
      </Section>
    </Layout>
  )
}

// export const pageQuery = graphql`
//   query contactQuery {
//     file(name: { eq: "bg" }) {
//       childImageSharp {
//         fluid(quality: 100, maxWidth: 1920) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     contentfulContactPage(id: { eq: "e2806944-e78a-538d-b8c6-8b256a69206f" }) {
//       id
//       heroText
//       heroCtaText
//       heroCtaUrl
//       colTitle
//       colButtonText
//       colButtonUrl
//       seoMetaData {
//         title
//         description {
//           description
//         }
//         image {
//           fluid(maxWidth: 1000, quality: 100) {
//             src
//           }
//         }
//       }
//     }
//   }
// `

export const pageQuery = graphql`
  query contactQuery {
    contentfulContactPage(
      id: { eq: "e2806944-e78a-538d-b8c6-8b256a69206f" }
    ) {
      heroText
      postFormText {
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
