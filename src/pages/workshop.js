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

import { BLOCKS, MARKS } from "@contentful/rich-text-types"
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
  },
}

const Hero = styled(Section)`
  ${tw`pt-24 flex flex-col md:flex-row justify-between px-4 md:px-8 pb-4`}
  background: radial-gradient(circle at 70%, #F40B83 0%, #FA3305 15%, #E5E6E3 90%);
`

export default function Workshops(props) {
  const content = props.data.contentfulWorkshopPage
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
      <PageNav title="Workshop" cta={{ text: "Contact", url: "/" }} />
      <div
        css={css`
          ${tw`text-left`}

          h1 {
            ${tw`font-heading mb-4 md:text-4xl text-2xl`}
          }

          h2 {
            ${tw`font-heading mb-4 md:text-3xl text-2xl`}
          }

          p {
            margin-bottom: 1.2rem;
            ${tw`md:text-xl`}
          }

          ul {
            ${tw`list-disc pl-5`}
          }
        `}
      >
        <Hero>
          <div css={tw`flex flex-col justify-between`}>
            {documentToReactComponents(content.heroBody.json)}
          </div>
          <img
            css={tw`w-1/2 md:w-auto self-end`}
            src={burst}
            alt="Brandon Hatton Logo"
          />
        </Hero>
        <Section>
          {/* <TitleCol className="p-0">
          <img src={content.headshot.fluid.src} alt="Brandon Hatton" />
        </TitleCol> */}
          {/* <Heading as="h2" className="mb-2">
            {content.aboutTitle}
          </Heading> */}
          {/* <h3 className="mb-8 font-bold text-2xl font-heading">
            {content.aboutSubtitle}
          </h3> */}
          <div
            className="container px-4 py-20 max-w-screen-lg mx-auto flex flex-col"
            css={css`
              p {
                margin-bottom: 1.2rem;
              }
            `}
          >
            {documentToReactComponents(content.aboutBody2.json)}
          </div>
        </Section>
        {/* <Section>
        <div className="container px-4 py-20 max-w-screen-lg mx-auto">
          <Heading as="h2" className="mb-8">
            {content.bioTitle}
          </Heading>
          {documentToReactComponents(content.bio.json, options)}
        </div>
      </Section> */}
        <Section css={tw`bg-white`}>
          <div className="container px-4 py-20 max-w-screen-lg mx-auto flex flex-col">
            <div className="text-left mb-4">
              {documentToReactComponents(content.subCta.json)}
            </div>
            <Link
              className="mb-12 text-center font-body text-normal font-light tracking-wide mx-auto p-2 border-2 border-black rounded-lg block uppercase hover:bg-black hover:text-white self-start"
              to="/contact"
            >
              {content.ctaTitle}
            </Link>
          </div>
        </Section>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query WorkshopPage {
    contentfulWorkshopPage(
      id: { eq: "dc32d11e-d45e-59ec-baf8-c566e3e6d82a" }
    ) {
      id
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
      heroBody {
        json
      }
      aboutBody2 {
        json
      }
      ctaTitle
      subCta {
        json
      }
    }
  }
`
