import React from "react"
import {graphql} from "gatsby"
import Layout from "../components/layout"
import DownloadForm from "../components/download-form"
import PageNav from "../components/page-nav"
import tw from "tailwind.macro"
import styled from "@emotion/styled"
import { Section, Col, TitleCol, SnglCol } from "../components/grid"
import { Heading } from "../components/type"
import logo from "../../content/assets/impact-map-logo.svg"
import BackgroundImage from 'gatsby-background-image'

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
    content: '';
    height: 2px; 
    ${tw`block bg-black bottom-0 absolute w-screen`}
  }

  &:nth-child(2n-1)::after {
    ${tw`right-0`}
  }

  &::before {
    content: counter(my-awesome-counter);
    ${tw`font-display text-2xl mr-4 h-10 w-10 flex flex-none items-center justify-center border border-solid border-black rounded-full`}
  }
`

export default function ImpactMap(props) {

  return (
    <Layout expand>
      <PageNav title="Impact Map" logo={logo} cta={{text: "Download", url: "/impact-map#download"}}/>
      <Hero fluid={props.data.file.childImageSharp.fluid}>
        <div css={tw`flex flex-col justify-between`}>
          <Heading css={tw`max-w-2xl`}>Design your impact.<br/>Align your giving.</Heading>
          {/* <Body css={tw`md:max-w-lg`}>Sit lacus leo mauris eu pharetra, vestibulum erat natoque auctor. Rhoncus nulla nisl, amet, turpis.</Body> */}
        </div>
      </Hero>
      <Section css={tw`bg-bg-gray`}>
        <SnglCol css={tw`md:bg-white`}>
          <Heading as="h2">A New Way to Track Your Impact</Heading>
        </SnglCol>
      </Section>
      <Section css={tw`bg-sidebar-gray`}>
        <TitleCol css={tw`md:bg-bg-gray`}>
          <Heading as="h2">How it Works</Heading>
        </TitleCol>
        <Col css={tw`flex items-center justify-center overflow-hidden`}>
          <List>
            <Step>State Values and Intended Impact</Step>
            <Step>Record your Investments for Social Change</Step>
            <Step>Track Your Impact</Step>
          </List>
        </Col>
      </Section>
      <Section id="download">
        <TitleCol css={tw`md:bg-white border-b-0 hidden md:block`}>
          <Heading as="h2">Ready to get started?</Heading>
        </TitleCol>
        <Col css={tw`bg-black text-white`}>
          <DownloadForm/>
        </Col>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query images {
    file(name: {eq: "bg-2"}) {
      childImageSharp {
        fluid(quality: 100, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
