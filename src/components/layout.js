import React from "react"
import tw from 'tailwind.macro'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import SEO from "../components/seo"
import Drawer from "../components/drawer"
import logo from "../../content/assets/logo.svg"

export default function Layout(props) {
  let expand = props.expand

  return (
    <main css={tw`relative overflow-hidden`}>
      <Link css={css`
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
        <div css={css`
          display: ${expand ? 'none' : 'block'};
        `}>
          <img src={logo} alt=""/>
          <h1 css={tw`text-black font-heading text-lg md:text-4xl mt-2 md:mt-12 mb-2 md:max-w-2xl leading-relaxed`}>The world can change for the better with concious wealth management.</h1>
        </div>
      </Link>
      <Drawer expand={expand}>{props.children}</Drawer>
    </main>
  )
}

