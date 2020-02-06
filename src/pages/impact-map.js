import React from "react"
import Layout from "../components/layout"
import DownloadForm from "../components/download-form"
import PageNav from "../components/page-nav"
import tw from "tailwind.macro"
import styled from "@emotion/styled"
import { Section, Col, TitleCol } from "../components/grid"
import { Heading, Body } from "../components/type"
import logo from "../../content/assets/impact-map-logo.svg"

const Hero = styled(Section)`
  ${tw`pt-24 flex flex-col md:flex-row justify-between px-8 bg-black text-white`}
  min-height: 60vh;
`

const List = styled.ol`
  ${tw`flex flex-col items-center`}

  li {
    ${tw`uppercase font-heading`}
  }
`

export default function ImpactMap(props) {

  return (
    <Layout expand>
      <PageNav title="Impact Map" logo={logo} cta={{text: "Download", url: "/impact-map#download"}}/>
      <Hero>
        <div css={tw`flex flex-col justify-between`}>
          <Heading css={tw`max-w-2xl`}>Ensure that your giving reflects your values</Heading>
          <Body css={tw`md:max-w-lg`}>Sit lacus leo mauris eu pharetra, vestibulum erat natoque auctor. Rhoncus nulla nisl, amet, turpis.</Body>
        </div>
      </Hero>
      <Section css={tw`bg-bg-gray`}>
        <TitleCol css={tw`md:bg-white`}>
          <Heading as="h2">A New Way to Track Your Impact</Heading>
        </TitleCol>
        <Col css={tw`bg-bg-gray`}>
          <Body>Fames imperdiet in faucibus eu. Consectetur ut donec ut cursus suspendisse placerat. Massa cursus quis mollis sociis. Euismod tortor consectetur maecenas in habitasse. Elementum quisque ut consectetur egestas interdum at dictum. Placerat amet, lacus bibendum ut tempor, morbi est nulla. Metus, lacus, aliquet a risus faucibus diam. Ornare nibh ipsum elementum faucibus nullam sagittis. Eget tempus curabitur ultrices ipsum. Mi habitant nunc, facilisis vitae sed sed tellus. Non eu, pellentesque diam egestas. Maecenas gravida amet proin fermentum commodo ac, eget risus. Turpis sit elementum risus ut nibh mauris, cursus.</Body>
        </Col>
      </Section>
      <Section css={tw`bg-sidebar-gray`}>
        <TitleCol css={tw`md:bg-bg-gray`}>
          <Heading as="h2">How it Works</Heading>
        </TitleCol>
        <Col>
          <List>
            <li>State your intentions</li>
            <li>State Values and Intended Impact</li>
            <li>Record your Investments for Social Change</li>
            <li>Monitor Your Impact</li>
          </List>
        </Col>
      </Section>
      <Section id="download">
        <TitleCol css={tw`md:bg-white border-b-0`}>
          <Heading as="h2">Ready to get started?</Heading>
        </TitleCol>
        <Col css={tw`bg-black text-white`}>
          <DownloadForm/>
        </Col>
      </Section>
    </Layout>
  )
}
