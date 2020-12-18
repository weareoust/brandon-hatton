import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import DownloadForm from "../components/download-form"
import PageNav from "../components/page-nav"
import tw from "tailwind.macro"
import styled from "@emotion/styled"
import { Section, Col, TitleCol, SnglCol } from "../components/grid"
import { Heading } from "../components/type"
import logo from "../../content/assets/impact-map-logo.svg"
import BackgroundImage from "gatsby-background-image"
import SEO from "../components/seo"

const Hero = styled(BackgroundImage)`
  ${tw`pt-24 flex flex-col md:flex-row justify-between px-8 bg-black text-white`}
  min-height: 60vh;
`

const List = styled.ol`
  ${tw`flex flex-col items-start`}
  padding-inline-start: 0;
  list-style: none;
  counter-reset: my-awesome-counter;
`

const Step = styled.li`
  counter-increment: my-awesome-counter;
  ${tw`uppercase font-heading text-lg tracking-wide mb-24 pb-2 flex items-center relative`}

  &:last-child {
    ${tw`mb-0`}
  }

  &::after {
    content: "";
    height: 2px;
    ${tw`block bg-black bottom-0 absolute w-screen`}
  }

  &:nth-of-type(2n-1)::after {
    ${tw`right-0`}
  }

  &::before {
    content: counter(my-awesome-counter);
    ${tw`font-display text-2xl mr-4 h-10 w-10 flex flex-none items-center justify-center border border-solid border-black rounded-full`}
  }
`

const BasicCta = tw.a`px-4 py-2 font-body text-sm md:text-lg text-black tracking-wide uppercase border-2 border-black border-solid rounded-lg shadow-none hover:bg-black hover:text-sidebar-gray`

export default function ImpactMap(props) {
  const content = props.data.contentfulImpactMap
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
        title="Impact Map"
        logo={logo}
        cta={{ text: "Download", url: "/impact-map#download" }}
      />
      <Hero fluid={props.data.file.childImageSharp.fluid}>
        <div css={tw`flex flex-col justify-between`}>
          <Heading css={tw`max-w-xl`}>{content.heroText}</Heading>
        </div>
      </Hero>
      <Section css={tw`bg-bg-gray`}>
        <SnglCol css={tw`md:bg-white`}>
          <Heading as="h2" css={tw`mb-8`}>
            {content.ctaTitle}
          </Heading>
          <BasicCta href={content.tutorialVideoUrl} target="_blank">
            {content.ctaButtonText}
          </BasicCta>
        </SnglCol>
      </Section>
      <Section css={tw`bg-sidebar-gray`}>
        <TitleCol css={tw`md:bg-bg-gray`}>
          <Heading as="h2">{content.stepsTitle}</Heading>
        </TitleCol>
        <Col css={tw`flex items-center justify-center overflow-hidden`}>
          <List>
            {content.steps.map((s, i) => (
              <Step key={i}>{s.content}</Step>
            ))}
          </List>
        </Col>
      </Section>
      <Section id="download">
        <TitleCol css={tw`md:bg-white border-b-0 hidden md:block`}>
          <Heading as="h2">{content.colTitle}</Heading>
        </TitleCol>
        <Col css={tw`bg-black text-white`}>
          <DownloadForm title={content.formTitle} />
        </Col>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query images {
    file(name: { eq: "bg-2" }) {
      childImageSharp {
        fluid(quality: 100, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    contentfulImpactMap(id: { eq: "b5ace2b2-3459-5ec4-9747-d4c56c6e8a68" }) {
      heroText
      ctaTitle
      ctaButtonText
      tutorialVideoUrl
      stepsTitle
      steps {
        content
      }
      colTitle
      formTitle
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
