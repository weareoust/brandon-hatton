import React from "react"
import { Link } from "gatsby"
import tw from "tailwind.macro"
import styled from "@emotion/styled"
import arrow from "../../content/assets/arrow.svg"

const Cta = styled(Link)`
  ${tw`shadow-none font-heading uppercase text-black tracking-wide`}
  font-size: 28px;
  position: relative;

  div {
    transition: 0.3s transform ease;
  }

  &:hover > div {
    transform: scaleY(12) scaleX(1.1);
  }
`

const Bg = styled.div`
  ${tw`bg-black absolute inset-x-0 bottom-0 h-1`}
  transform-origin: center bottom;
  mix-blend-mode: difference;
  background-color: white;
`
 
 export default function CtaButton(props) {
   return (
     <Cta to={props.to}>
      {props.children} 
      <img src={arrow} alt="Arrow" css={tw`mb-0 ml-2`}/>
      <Bg/>
     </Cta>
   )
 }
 