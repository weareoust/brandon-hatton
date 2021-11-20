import React, { useCallback, useState } from "react"
import tw from "tailwind.macro"
import { css } from "@emotion/core"
import TransitionLink from "gatsby-plugin-transition-link"
import { TweenMax } from "gsap"

const NavItem = tw(TransitionLink)`
  font-heading px-8 py-2 uppercase block text-black
  border-black border-solid border-0 border-b-2 mb-0
  hover:bg-orange hover:text-white
`

const openDrawer = {
  trigger: () => {
    TweenMax.fromTo(
      "#featureContent",
      0.3,
      { opacity: 1, transform: "none" },
      { opacity: 0, transform: "translateY(-40px)" }
    )
    TweenMax.to("#sidebar", 0.5, { transform: "none" })
    TweenMax.to("#nav", 0.3, { opacity: 0 })
  },
  length: 0.5,
}

const fadeIn = {
  delay: 0.5,
  trigger: () => {
    TweenMax.fromTo("#content", 1, { opacity: 0 }, { opacity: 1 })
  },
}

export default function Drawer(props) {
  let expand = props.expand
  const [navOffset, setnavOffset] = useState("translateX(calc(100%))")
  const calcOffset = node => {
    let calc
    if (node !== null && window.innerWidth < 768) {
      calc = `translateY(calc(93vh - ${node.getBoundingClientRect().height}px))`
      setnavOffset(calc)
      props.offset(calc)
    } else if (node !== null && window.innerWidth >= 768) {
      calc = "translateX(calc(90vw - 400px))"
      setnavOffset(calc)
      props.offset(calc)
    }
  }
  const nav = useCallback(node => {
    calcOffset(node)
    window.addEventListener("resize", () => {
      calcOffset(node)
    })
  }, [])

  return (
    <aside
      id="sidebar"
      css={css`
        ${tw`absolute bottom-0 right-0 w-screen h-screen border-0 border-t-2 border-black border-solid bg-sidebar-gray md:top-0 md:border-t-0 md:border-l-2`}
        max-height: 93vh;
        transform: ${expand ? "0px" : navOffset}};

        @media (min-width: 768px) {
          max-height: 100vh;
          max-width: 90vw;
        }
      `}
    >
      <div
        css={css`
        display: ${expand ? "block" : "none"};
        height  7vh;
        width: 100vw;
        pointer-events: none;
        ${tw`fixed top-0 left-0 flex items-center justify-center`}
      `}
      >
        <p
          css={css`
            display: ${expand ? "block" : "none"};
            color: #cecaca;
            ${tw`tracking-wide uppercase font-body`}
          `}
        >
          Close
        </p>
      </div>
      <nav
        ref={nav}
        id="nav"
        css={css`
          display: ${expand ? "none" : "block"};
        `}
      >
        <div css={tw`flex flex-col justify-between max-h-full md:h-screen`}>
          <ul css={tw`m-0 list-none`}>
            <li css={tw`mb-0`}>
              <NavItem to="/about" exit={openDrawer} entry={fadeIn}>
                About
              </NavItem>
            </li>
            <li css={tw`mb-0`}>
              <NavItem to="/book" exit={openDrawer} entry={fadeIn}>
                Book
              </NavItem>
            </li>
            <li css={tw`mb-0`}>
              <NavItem to="/workshop" exit={openDrawer} entry={fadeIn}>
                Workshop
              </NavItem>
            </li>
            <li css={tw`mb-0`}>
              <NavItem to="/impact-map" exit={openDrawer} entry={fadeIn}>
                Impact Map
              </NavItem>
            </li>
            <li css={tw`mb-0`}>
              <NavItem to="/beingenough" exit={openDrawer} entry={fadeIn}>
                BEING ENOUGH BLOG
              </NavItem>
            </li>
            <li css={tw`mb-0`}>
              <NavItem to="/contact" exit={openDrawer} entry={fadeIn}>
                Contact
              </NavItem>
            </li>
          </ul>
          <ul className="flex">
            <li>
              <a
                href={props.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                css={tw`self-start block p-2 m-4 uppercase border-2 border-black rounded-lg hover:bg-black hover:text-white`}
              >
                linkedin
              </a>
            </li>
            <li>
              <a
                href={props.twitter}
                target="_blank"
                rel="noopener noreferrer"
                css={tw`self-start block p-2 m-4 ml-0 uppercase border-2 border-black rounded-lg hover:bg-black hover:text-white`}
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href={props.instagram}
                target="_blank"
                rel="noopener noreferrer"
                css={tw`self-start block p-2 m-4 ml-0 uppercase border-2 border-black rounded-lg hover:bg-black hover:text-white`}
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div
        id="content"
        css={css`
          ${tw`overflow-y-scroll md:h-screen`}
          height: 93vh;
          -webkit-overflow-scrolling: touch;
        `}
      >
        {props.children}
      </div>
    </aside>
  )
}
