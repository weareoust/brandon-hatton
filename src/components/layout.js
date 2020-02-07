import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import tw from 'tailwind.macro'
import { css } from '@emotion/core'
import TransitionLink from 'gatsby-plugin-transition-link'
import { TweenMax, TimelineMax } from 'gsap/all'
import SEO from "../components/seo"
import Drawer from "../components/drawer"
import logo from "../../content/assets/logo.svg"
import "../components/global.css"
import { Body } from "./type"

function Alert(props) {
  const { show } = props
  const alert = useRef(null);
  const [timeline, setTimeline] = useState(new TimelineMax());

  useEffect(() => {
    if (show) {
      timeline
      .fromTo(alert.current, 1, {transform: "translateX(100px)", opacity: 0}, {delay: 5, transform: "translateX(0)", opacity: 1})
      .to(alert.current, 1, {delay: 3, transform: "translateX(100px)", opacity: 0})
    }
  }, [show])

  if (show) {
    return (
      <Link 
        to="/impact-map" 
        css={tw`bg-sidebar-gray text-black shadow-lg md:absolute top-0 right-0 m-8 md:m-24 p-4 rounded opacity-0`}
        ref={alert}
      >
        <Body css={tw`m-0`}>Check out the IMPACTMAP</Body>
      </Link>
    )
  } else {
    return null
  }
}

export default function Layout(props) {
  let expand = props.expand
  const [drawerOffset, setDrawerOffset] = useState(0)
  const [showAlert, setShowAlert] = useState(typeof window !== 'undefined' && localStorage["visited"] ? false : true)

  useEffect(() => {
    if (showAlert === true) {
      localStorage["visited"] = true
    }
  }, [showAlert])

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
        <Alert show={showAlert} reset={setShowAlert} />
        <div id="featureContent" css={css`
          display: ${expand ? 'none' : 'block'};
        `}>
          <img css={tw`max-w-full`} src={logo} alt=""/>
          <h1 css={tw`text-black font-heading text-lg md:text-4xl mt-2 md:mt-12 mb-2 md:max-w-2xl leading-relaxed`}>We can change for the better with a concious wealth mindset.</h1>
        </div>
      </TransitionLink>
      <Drawer expand={expand} offset={setDrawerOffset}>{props.children}</Drawer>
    </main>
  )
}

