import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PageNav from "../components/page-nav"
import ContactForm from "../components/contact-form"
import tw from "tailwind.macro"
import styled from "@emotion/styled"
import { Section, Col, TitleCol } from "../components/grid"
import { Heading } from "../components/type"
import BackgroundImage from "gatsby-background-image"
import SEO from "../components/seo"

import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Bold = ({ children }) => <span className="bold">{children}</span>
const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [INLINES.HYPERLINK]: node => {
      return (
        <a className="underline" href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {node.content[0].value}
        </a>
      )
    },
  },
}

const Hero = styled(BackgroundImage)`
  ${tw`pt-24 flex flex-col md:flex-row justify-between px-8 border-0 border-black border-solid border-b-2`}
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
            css={tw`mb-8 self-start`}
          >
            {content.heroCtaText}
          </BasicCta>
        </div>
      </Hero>
      <Section id="form">
        <TitleCol
          css={tw`md:bg-white border-b-0 pb-12 flex flex-col items-center md:block`}
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
        <Col css={tw`bg-black text-white`}>
          <ContactForm />
        </Col>
      </Section> */}
      <Section id="form" css={tw`border-b-0`}>
        <div className="container px-4 py-20 mt-8 max-w-screen-lg mx-auto flex flex-col min-h-screen items-center justify-center">
          <Heading css={tw`text-center mb-4`}>
            {content.heroText}
          </Heading>
          <ContactForm />
          {/* <div className="text-center mt-4">
            {documentToReactComponents(content.postFormText.json, options)}
          </div> */}
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
