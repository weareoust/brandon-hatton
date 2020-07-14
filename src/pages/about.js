import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import CtaButton from "../components/cta-button"
import PageNav from "../components/page-nav"
import tw from "tailwind.macro"
import styled from "@emotion/styled"
import burst from "../../content/assets/burst.svg"
import { Section, Col, TitleCol, SnglCol } from "../components/grid"
import { Heading, Body } from "../components/type"

const Hero = styled(Section)`
  ${tw`pt-24 flex flex-col md:flex-row justify-between px-4 md:px-8 pb-4`}
  background: radial-gradient(circle at 70%, #F40B83 0%, #FA3305 15%, #E5E6E3 90%);
`

export default function About(props) {
  const content = props.data.contentfulAboutPage
  return (
    <Layout expand>
      <PageNav title="Info" cta={{ text: "Contact", url: "/" }} />
      <Hero>
        <div css={tw`flex flex-col justify-between`}>
          <Heading className="max-w-xl">{content.heroText}</Heading>
        </div>
        <img
          css={tw`w-1/2 md:w-auto self-end`}
          src={burst}
          alt="Brandon Hatton Logo"
        />
      </Hero>
      <Section>
        <TitleCol className="p-0">
          <img src={content.headshot.fluid.src} alt="Brandon Hatton" />
        </TitleCol>
        <Col>
          <Heading as="h2" className="mb-8">
            {content.aboutTitle}
          </Heading>
          <Body>{content.aboutBody.aboutBody}</Body>
        </Col>
      </Section>
      <Section css={tw`bg-white`}>
        <SnglCol>
          <Heading as="h2">{content.ctaTitle}</Heading>
          <CtaButton to="/contact">Contact</CtaButton>
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
      aboutBody {
        aboutBody
      }
      ctaTitle
    }
  }
`
