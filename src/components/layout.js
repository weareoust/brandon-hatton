import React, { useState } from "react"
import tw from 'tailwind.macro'
import { css } from '@emotion/core'
import TransitionLink from 'gatsby-plugin-transition-link'
import { TweenLite } from 'gsap/all'
import SEO from "../components/seo"
import Drawer from "../components/drawer"
import logo from "../../content/assets/logo.svg"

export default function Layout(props) {
  let expand = props.expand
  const [drawerOffset, setDrawerOffset] = useState(0)

  const closeDrawer = { 
    trigger: () => {
      TweenLite.to('#sidebar', 0.3, { transform: drawerOffset })
      TweenLite.fromTo('#nav', 0.3, { opacity: 0 }, { opacity: 1 })
      TweenLite.fromTo('#content', 0.3, { opacity: 1 }, { opacity: 0 })
    },
    length: 0.3
  }

  const fadeIn = { 
    delay: 0.3,
    trigger: () => {
      TweenLite.fromTo('#featureContent', 0.6, { opacity: 0, transform: 'translateY(-40px)' }, { opacity: 1, transform: 'none' })
    },
    length: 0.6
  }


  return (
    <main css={tw`relative overflow-hidden`}>
      <TransitionLink to="/" exit={closeDrawer} entry={fadeIn} css={css`
        ${tw`h-screen w-screen block p-8 md:p-24 relative`}

        &::before {
          content: '';
          z-index: -1;
          ${tw`absolute inset-0`}
          background: radial-gradient(circle at 21%, #F40B83 10%, #FA3305 15%, #E5E6E3 20%);
          filter: blur(40px);
        }
      `}>
        <SEO title="Home" />
        <div id="featureContent" css={css`
          display: ${expand ? 'none' : 'block'};
        `}>
          <img src={logo} alt=""/>
          <h1 css={tw`text-black font-heading text-lg md:text-4xl mt-2 md:mt-12 mb-2 md:max-w-2xl leading-relaxed`}>The world can change for the better with concious wealth management.</h1>
        </div>
      </TransitionLink>
      <Drawer expand={expand} offset={setDrawerOffset}>{props.children}</Drawer>
    </main>
  )
}

