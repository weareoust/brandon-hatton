import React, { useCallback, useState } from 'react'
import tw from 'tailwind.macro'
import { css } from '@emotion/core'
import TransitionLink from 'gatsby-plugin-transition-link'
import { TweenLite } from 'gsap/all'

const NavItem = tw(TransitionLink)`
  font-heading px-8 py-2 uppercase block
  border-black border-solid border-0 border-b-2 mb-0
  hover:bg-orange hover:text-white
`

const openDrawer = { 
  trigger: () => {
    TweenLite.to('#sidebar', 0.3, { transform: "none" })
  },
  length: 0.3
}

export default function Drawer(props) {
  let expand = props.expand
  const [navHeight, setNavHeight] = useState(0)
  const nav = useCallback(node => {
    if (node !== null) {
      setNavHeight(node.getBoundingClientRect().height)
    }
  }, [])

  return (
    <aside id="sidebar" css={css`
      ${tw`bg-sidebar-gray absolute bottom-0 right-0 h-screen w-screen border-0 border-t-2 md:border-t-0 md:border-l-2 border-solid border-black`}
      max-height: 90vh;
      transform: ${expand ? '0px' : `translateY(calc(90vh - ${navHeight}px))`};

      @media (min-width: 768px) {
        max-height: 100vh;
        max-width: 90vw;
        transform: ${expand ? '0px' : 'translateX(calc(90vw - 400px))'};
      }
    `}>
      <nav ref={nav} css={css`
        display: ${expand ? 'none' : 'block'};
      `}>
        <ul css={tw`list-none m-0`}>
          <li css={tw`mb-0`}><NavItem to="/about" exit={openDrawer} entry={{delay: 0.3}}>Story</NavItem></li>
          <li css={tw`mb-0`}><NavItem>Impact Map</NavItem></li>
          <li css={tw`mb-0`}><NavItem>Contact</NavItem></li>
        </ul>
      </nav>
      <div css={tw`overflow-y-scroll h-screen`}>{props.children}</div>
    </aside>
  )
}
