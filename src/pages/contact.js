import React from "react"
import Layout from "../components/layout"
import PageNav from "../components/page-nav"
import ContactForm from "../components/contact-form"
import tw from "tailwind.macro"
import styled from "@emotion/styled"
import { Section, Col, TitleCol } from "../components/grid"
import { Heading, Body } from "../components/type"
import BackgroundImage from 'gatsby-background-image'

const Hero = styled(BackgroundImage)`
  ${tw`pt-24 flex flex-col md:flex-row justify-between px-8 border-0 border-black border-solid border-b-2`}
  min-height: 70vh;
`

export default function Contact(props) {

  return (
    <Layout expand>
      <PageNav title="Contact" cta={{text: "Contact", url: "/contact#form"}}/>
      <Hero fluid={props.data.file.childImageSharp.fluid}>
        <div css={tw`flex flex-col justify-between`}>
          <Heading css={tw`max-w-2xl`}>Let’s co-design a finacial path that matches your purpose</Heading>
          {/* <Body css={tw`md:max-w-lg`}>Sit lacus leo mauris eu pharetra, vestibulum erat natoque auctor. Rhoncus nulla nisl, amet, turpis.</Body> */}
        </div>
      </Hero>
      <Section id="form">
        <TitleCol css={tw`md:bg-white border-b-0`}>
          <Heading as="h2">Let's Talk</Heading>
        </TitleCol>
        <Col css={tw`bg-black text-white`}>
          <ContactForm/>
        </Col>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query contactQuery {
    file(name: {eq: "bg"}) {
      childImageSharp {
        fluid(quality: 100, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
