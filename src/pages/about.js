import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import CtaButton from "../components/cta-button"
import tw from "tailwind.macro"
import styled from "@emotion/styled"
import burst from "../../content/assets/burst.svg"

const Heading = tw.h1`font-heading text-5xl mt-0`
const Body = tw.p`font-body text-lg tracking-wide`
const NavCta = tw(Link)`px-4 py-2 font-body text-lg text-black tracking-wide uppercase border-2 border-black border-solid rounded-lg shadow-none hover:bg-black hover:text-sidebar-gray`

const Section = tw.section`border-black border-solid border-0 border-b-2 flex flex-col md:flex-row`
const Col = tw.div`md:w-1/2 px-8 py-12`
const TitleCol = tw(Col)`border-0 border-black border-solid border-b-2 md:border-b-0 md:border-r-2 px-0 mx-8 md:px-8 md:mx-0`
const SnglCol = tw(Col)`md:w-full py-24 flex flex-col items-center text-center`

const Hero = styled(Section)`
  ${tw`pt-24 flex flex-col md:flex-row justify-between px-8`}
  background: radial-gradient(circle at 70%, #F40B83 0%, #FA3305 15%, #E5E6E3 90%);
`

export default function Home(props) {

  return (
    <Layout expand>
      <div css={tw`absolute inset-x-0 top-0 flex justify-between items-center bg-sidebar-gray border-solid border-black border-0 border-b-2 px-8 py-2`}>
        <p css={tw`font-heading tracking-wide text-2xl uppercase my-0`}>Info</p>
        <NavCta to="/">Contact</NavCta>
      </div>
      <Hero>
        <div css={tw`flex flex-col justify-between`}>
          <Heading>Info</Heading>
          <Body css={tw`md:max-w-lg`}>Sit lacus leo mauris eu pharetra, vestibulum erat natoque auctor. Rhoncus nulla nisl, amet, turpis.</Body>
        </div>
        <img src={burst} alt="Brandon Hatton Logo"/>
      </Hero>
      <Section>
        <TitleCol>
          <Heading as="h2">The Approach</Heading>
        </TitleCol>
        <Col>
          <Body>It is said that happiness is in the journey, not the destination. As we navigate the often rocky terrain of life, it’s easy to lose sight of this saying. Even with considerable means, one can find themselves still longing to have greater significance. In essence, happiness can lead to success, but success doesn’t always lead to happiness. True happiness comes from building an abundant life with intention. There’s an immense benefit to be gained from guidance and insight that will enable a positive societal impact.</Body>
          <Body>As a financial advisor specializing in executive compensation, I work with select clients to co-design a financial path that aligns with their purpose. believe that your investments can further your values. For this reason, I serve as a guide for those individuals and families ready to undergo this rewarding journey of rediscovery. My aim is to empower families to leverage their cultivated conscious wealth for the highest communal good.</Body>
          <Body>I’m a firm believer that the investment process is smart and complex, but it doesn’t have to be elite. I take a pure integrated approach to portfolio creation and maintenance while steering clients away from complicated unnecessary investment products. At all times, I want you to know what you own, why you own it, and how much it is costing you. Because the more confident you are in the purpose of your investments, the more at peace you are to pursue a life of purpose.</Body>
          <Body>My name is Brandon Hatton and I know this world can change for the better with conscious wealth management.</Body>
          <Body>We are cultivating healing and designing impact, together.</Body>
        </Col>
      </Section>
      <Section css={tw`bg-white`}>
        <SnglCol>
          <Heading as="h2">Ready for conscious wealth management?</Heading>
          <CtaButton to="/">Contact</CtaButton>
        </SnglCol>
      </Section>
    </Layout>
  )
}
