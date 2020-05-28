import React, { useState } from "react"
import tw from 'tailwind.macro'
import { css } from '@emotion/core'
import TransitionLink from 'gatsby-plugin-transition-link'
import { TweenMax } from 'gsap/all'
import SEO from "../components/seo"
import Drawer from "../components/drawer"
import logo from "../../content/assets/logo.svg"
import "../components/global.css"

export default function Layout(props) {
  let [expand, setExpand] = useState(props.expand)
  const [drawerOffset, setDrawerOffset] = useState(0) 

  const closeDrawer = { 
    trigger: () => {
      TweenMax.to('#sidebar', 0.3, { transform: drawerOffset })
      TweenMax.fromTo('#nav', 0.3, { opacity: 0 }, { opacity: 1 })
      TweenMax.fromTo('#content', 0.3, { opacity: 1 }, { opacity: 0 })
    },
    length: 0.3
  }

  const fadeIn = { 
    delay: 0.3,
    trigger: () => {
      TweenMax.fromTo('#featureContent', 0.6, 
        { opacity: 0, transform: 'translateY(-40px)' }, { opacity: 1, transform: 'none' })
    },
    length: 0.6
  }


  return (
    <main css={tw`relative overflow-hidden`}>
      <TransitionLink to="/" exit={closeDrawer} entry={fadeIn} css={css`
        ${tw`block p-8 md:p-24 relative w-screen h-screen`}

        @media (min-width: 768px) {
          height: 100vh;
          width: calc(100vw - 400px);
        }

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
          <img css={tw`max-w-full`} src={logo} alt=""/>
          <h1 css={tw`text-black font-heading text-lg md:text-4xl mt-2 md:mt-12 mb-2 md:max-w-2xl leading-relaxed`}>Uncovering the Soul with Conscious Wealth.</h1>
        </div>
      </TransitionLink>
      {props.placement}
      <Drawer expand={expand} offset={setDrawerOffset}>{props.children}</Drawer>
    </main>
  )
}

