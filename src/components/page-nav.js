import React from 'react'
import { Link } from "gatsby"
import tw from "tailwind.macro"

const NavCta = tw(Link)`px-4 py-2 font-body text-lg text-black tracking-wide uppercase border-2 border-black border-solid rounded-lg shadow-none hover:bg-black hover:text-sidebar-gray`

function Title(props) {
  if (props.logo) {
    return <img css={tw`mb-0`} src={props.logo} alt={props.title} />
  } else {
    return <p css={tw`font-heading tracking-wide text-2xl uppercase my-0`}>{props.title}</p>
  }
}

export default function PageNav(props) {
  return (
    <div css={tw`absolute inset-x-0 top-0 flex justify-between items-center bg-sidebar-gray border-solid border-black border-0 border-b-2 px-8 py-2`}>
      <Title title={props.title} logo={props.logo}/>
      <NavCta to={props.cta.url}>{props.cta.text}</NavCta>
    </div>
  )
}
