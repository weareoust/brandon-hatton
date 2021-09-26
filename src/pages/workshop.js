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
  <Body className="mb-6 align-center">{children}</Body>
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
  ${tw`flex flex-col justify-between px-4 pt-24 pb-4 md:flex-row md:px-8`}
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
      <PageNav
        title="Workshop"
        // cta={{ text: "Invest", url: "https://thehatton.group/" }}
      />
      <div
        css={css`
          ${tw`text-left`}

          h1 {
            ${tw`mb-4 text-2xl font-heading md:text-4xl`}
          }

          h2 {
            ${tw`mb-4 text-2xl font-heading md:text-3xl`}
          }

          p {
            margin-bottom: 1.2rem;
            ${tw`md:text-xl`}
          }

          ul {
            ${tw`pl-5 list-disc`}
          }
        `}
      >
        <Hero>
          <div css={tw`flex flex-col justify-start`, css`p {${tw`font-heading md:text-2xl`} max-width: 820px;}`}>
            {documentToReactComponents(content.heroBody.json)}
          </div>
          <img
            css={tw`self-end w-1/2 md:w-auto`}
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
          {/* <h3 className="mb-8 text-2xl font-bold font-heading">
            {content.aboutSubtitle}
          </h3> */}
          <div
            className="container flex flex-col max-w-screen-lg px-4 py-20 mx-auto"
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
        <div className="container max-w-screen-lg px-4 py-20 mx-auto">
          <Heading as="h2" className="mb-8">
            {content.bioTitle}
          </Heading>
          {documentToReactComponents(content.bio.json, options)}
        </div>
      </Section> */}
        <Section css={tw`bg-white`}>
          <div className="container flex flex-col items-center max-w-screen-lg px-4 py-20 mx-auto">
            <div className="mb-4 text-left">
              {documentToReactComponents(content.subCta.json)}
            </div>
            <Link
              className="px-4 py-2 text-sm tracking-wide text-black uppercase border-2 border-black border-solid rounded-lg shadow-none font-body md:text-lg hover:bg-black hover:text-sidebar-gray"
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
