import React from "react"
import Layout from "../components/layout"
import CtaButton from "../components/cta-button"
import PageNav from "../components/page-nav"
import tw from "tailwind.macro"
import styled from "@emotion/styled"
import burst from "../../content/assets/burst.svg"
import { Section, Col, TitleCol, SnglCol } from "../components/grid"
import { Heading, Body } from "../components/type"

const Hero = styled(Section)`
  ${tw`pt-24 flex flex-col md:flex-row justify-between px-8`}
  background: radial-gradient(circle at 70%, #F40B83 0%, #FA3305 15%, #E5E6E3 90%);
`

export default function About(props) {

  return (
    <Layout expand>
      <PageNav title="Info" cta={{text: "Contact", url: "/"}}/>
      <Hero>
        <div css={tw`flex flex-col justify-between`}>
          <Heading>Cultivating Healing.<br/>Designing Impact.</Heading>
          {/* <Body css={tw`md:max-w-lg`}>Cultivating Healing. Designing Impact.</Body> */}
        </div>
        <img src={burst} alt="Brandon Hatton Logo"/>
      </Hero>
      <Section>
        <TitleCol>
          <Heading as="h2">The Approach</Heading>
        </TitleCol>
        <Col>
          <Body>It is said that happiness is in the journey, not the destination. As we navigate the often rocky terrain of life, it’s easy to lose sight of this saying. Even with considerable means, one can find themselves still longing to have greater significance. In essence, happiness can lead to success, but success doesn’t always lead to happiness. True happiness comes from building an abundant life with intention. There’s an immense benefit to be gained from guidance and insight that will enable a positive societal impact.</Body>
        </Col>
      </Section>
      <Section css={tw`bg-white`}>
        <SnglCol>
          <Heading as="h2">Want to learn more about conscious wealth?</Heading>
          <CtaButton to="/">Contact</CtaButton>
        </SnglCol>
      </Section>
    </Layout>
  )
}
