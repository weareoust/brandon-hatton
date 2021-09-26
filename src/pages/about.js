import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import PageNav from "../components/page-nav"
import tw from "tailwind.macro"
import styled from "@emotion/styled"
import {css} from "@emotion/core"
import burst from "../../content/assets/burst.svg"
import { Section, Col, TitleCol, SnglCol } from "../components/grid"
import { Heading, Body } from "../components/type"
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

const Hero = styled(Section)`
  ${tw`flex flex-col justify-between px-4 pt-24 pb-4 md:flex-row md:px-8`}
  background: radial-gradient(circle at 70%, #F40B83 0%, #FA3305 15%, #E5E6E3 90%);
`

export default function About(props) {
  const content = props.data.contentfulAboutPage
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
        title="About"
        cta={{ text: "Invest", url: "https://thehatton.group/" }}
      />
      <Hero>
        <div css={tw`flex flex-col justify-between`}>
          <Heading className="max-w-xl">{content.heroText}</Heading>
        </div>
        <img
          css={tw`self-end w-1/2 md:w-auto`}
          src={burst}
          alt="Brandon Hatton Logo"
        />
      </Hero>
      <Section>
        <TitleCol className="p-0">
          <img src={content.headshot.fluid.src} alt="Brandon Hatton" />
        </TitleCol>
        <Col>
          <Heading as="h2" className="mb-2">
            {content.aboutTitle}
          </Heading>
          <h3 className="mb-8 text-2xl font-bold font-heading">
            {content.aboutSubtitle}
          </h3>
          <div
            css={css`
              p {
                margin-bottom: 1.2rem;
              }
            `}
          >
            {documentToReactComponents(content.aboutBody2.json)}
          </div>
        </Col>
      </Section>
      {/* <Section>
        <div className="container max-w-screen-lg px-4 py-20 mx-auto">
          <Heading as="h2" className="mb-8">
            {content.bioTitle}
          </Heading>
          {documentToReactComponents(content.bio.json, options)}
        </div>
      </Section> */}
      <Section css={tw`bg-white`}>
        <SnglCol>
          <h2 className="mb-12 text-3xl font-heading">{content.ctaTitle}</h2>
          <Link
            className="px-4 py-2 text-sm tracking-wide text-black uppercase border-2 border-black border-solid rounded-lg shadow-none font-body md:text-lg hover:bg-black hover:text-sidebar-gray"
            to="/contact"
          >
            Contact
          </Link>
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
            {documentToReactComponents(content.subCta.json, options)}
          </div>
        </SnglCol>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query AboutPage {
    contentfulAboutPage(id: { eq: "bf301b20-8788-5fd8-8e8c-34b4e6f5b150" }) {
      heroText
      headshot {
        fluid(maxWidth: 700, quality: 100) {
          src
        }
      }
      aboutTitle
      aboutSubtitle
      aboutBody2 {
        json
      }
      subCta {
        json
      }
      ctaTitle
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
