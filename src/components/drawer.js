import React, { useCallback, useState } from 'react'
import tw from 'tailwind.macro'
import {css} from '@emotion/core'

const NavItem = tw.li`
  font-heading px-8 py-2 uppercase 
  border-black border-solid border-0 border-b-2 mb-0
  hover:bg-orange hover:text-white
`

export default function Drawer(props) {
  const [navHeight, setNavHeight] = useState(0)
  const nav = useCallback(node => {
    if (node !== null) {
      setNavHeight(node.getBoundingClientRect().height)
    }
  }, [])

  return (
    <aside css={css`
      ${tw`bg-sidebar-gray absolute bottom-0 right-0 h-screen w-screen border-0 border-t-2 md:border-t-0 md:border-l-2 border-solid border-black`}
      max-height: 90vh;
      transform: translateY(calc(90vh - ${navHeight}px));

      @media (min-width: 768px) {
        max-height: 100vh;
        max-width: 90vw;
        transform: translateX(calc(90vw - 400px));
      }
    `}>
      <nav ref={nav}>
        <ul css={tw`list-none m-0`}>
          <NavItem>Story</NavItem>
          <NavItem>Impact Map</NavItem>
          <NavItem>Contact</NavItem>
        </ul>
      </nav>
      <div>{props.children}</div>
    </aside>
  )
}
