import React, { useCallback, useState } from 'react'
import tw from 'tailwind.macro'
import { css } from '@emotion/core'
import TransitionLink from 'gatsby-plugin-transition-link'
import { TweenMax } from 'gsap'

const NavItem = tw(TransitionLink)`
  font-heading px-8 py-2 uppercase block text-black
  border-black border-solid border-0 border-b-2 mb-0
  hover:bg-orange hover:text-white
`

const openDrawer = { 
  trigger: () => {
    TweenMax.fromTo('#featureContent', 0.3, { opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-40px)' })
    TweenMax.to('#sidebar', 0.5, { transform: "none" })
    TweenMax.to('#nav', 0.3, { opacity: 0 })
  },
  length: 0.5
}

const fadeIn = { 
  delay: 0.5,
  trigger: () => {
    TweenMax.fromTo('#content', 1, { opacity: 0 }, { opacity: 1 })
  }
}

export default function Drawer(props) {
  let expand = props.expand
  const [navOffset, setnavOffset] = useState(0)
  const calcOffset = node => {
    let calc
    if (node !== null && window.innerWidth < 768) {
      calc = `translateY(calc(90vh - ${node.getBoundingClientRect().height}px))`
      setnavOffset(calc)
      props.offset(calc)
    } else if (node !== null && window.innerWidth >= 768) {
      calc = 'translateX(calc(90vw - 400px))'
      setnavOffset(calc)
      props.offset(calc)
    }
  }
  const nav = useCallback(node => {
    calcOffset(node)
    window.addEventListener('resize', () => {calcOffset(node)})
  },[])

  return (
    <aside id="sidebar" css={css`
      ${tw`bg-sidebar-gray absolute bottom-0 right-0 h-screen w-screen border-0 border-t-2 md:border-t-0 md:border-l-2 border-solid border-black`}
      max-height: 90vh;
      transform: ${expand ? '0px' : navOffset}};

      @media (min-width: 768px) {
        max-height: 100vh;
        max-width: 90vw;
      }
    `}>
      <nav ref={nav} id="nav" css={css`
        display: ${expand ? 'none' : 'block'};
      `}>
        <ul css={tw`list-none m-0`}>
          <li css={tw`mb-0`}><NavItem to="/about" exit={openDrawer} entry={fadeIn}>Info</NavItem></li>
          <li css={tw`mb-0`}><NavItem to="/impact-map" exit={openDrawer} entry={fadeIn}>Impact Map</NavItem></li>
          <li css={tw`mb-0`}><NavItem to="/contact" exit={openDrawer} entry={fadeIn}>Contact</NavItem></li>
        </ul>
      </nav>
      <div id="content" css={css`
        ${tw`overflow-y-scroll md:h-screen`}
        height: 90vh;
        -webkit-overflow-scrolling: touch;
      `}>{props.children}</div>
    </aside>
  )
}
