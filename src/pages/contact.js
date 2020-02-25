import React from "react"
import { graphql } from "gatsby"
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
const BasicCta = tw.a`px-4 py-2 font-body text-sm md:text-lg text-black tracking-wide uppercase border-2 border-black border-solid rounded-lg shadow-none hover:bg-black hover:text-sidebar-gray`

export default function Contact(props) {

  return (
    <Layout expand>
      <PageNav title="Contact" cta={{text: "Contact", url: "/contact#form"}}/>
      <Hero fluid={props.data.file.childImageSharp.fluid}>
        <div css={tw`flex flex-col justify-between`}>
          <Heading css={tw`max-w-2xl mb-8`}>Let’s co-design a financial path that matches your purpose</Heading>
          <BasicCta as="a" href="https://www.raymondjames.com/thehattongroup/" target="_blank" css={tw`mb-8 self-start`}>Invest with Me</BasicCta>
        </div>
      </Hero>
      <Section id="form">
        <TitleCol css={tw`md:bg-white border-b-0 hidden md:block`}>
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
