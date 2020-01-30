import React from "react"
import tw from 'tailwind.macro'
import {css} from '@emotion/core'
import Layout from "../components/layout"
import SEO from "../components/seo"
import logo from "../../content/assets/logo.svg"

const NavItem = tw.li`
font-heading px-8 py-2 uppercase 
border-black border-solid border-0 border-b-2 mb-0
hover:bg-orange hover:text-white
`

export default function home() {

  return (
    <main css={tw`relative`}>
      <section css={css`
        ${tw`h-screen w-screen block p-24 relative`}

        &::before {
          content: '';
          z-index: -1;
          ${tw`absolute inset-0`}
          background: radial-gradient(circle at 21%, #F40B83 10%, #FA3305 15%, #E5E6E3 20%);
          filter: blur(40px);
        }
      `}>
        <SEO title="Home" />
        <img src={logo} alt=""/>
        <h1 css={tw`text-black font-heading mb-2 max-w-2xl leading-relaxed`}>The world can change for the better with concious wealth management.</h1>
      </section>
      <aside css={css`
        ${tw`bg-sidebar-gray absolute top-0 right-0 h-screen w-screen`}
        max-width: 90vw;
        transform: translateX(calc(90vw - 300px));
      `}>
        <nav>
          <ul css={tw`list-none`}>
            <NavItem>Story</NavItem>
            <NavItem>Impact Map</NavItem>
            <NavItem>Contact</NavItem>
          </ul>
        </nav>
      </aside>
    </main>
  )
}
