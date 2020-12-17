import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import { TweenMax } from "gsap/all"
import SubscribeForm from "../components/subscribe-form"
import tw from "tailwind.macro"

export default function Home(props) {
  const [toast, setToast] = useState(true)
  let toastTween = false
  const closeToast = () => {
    toastTween.reverse(3.6)
    setToast(false)
    localStorage.setItem("subscribeModalViewed", "true")
  }

  useEffect(() => {
    const modalViewed = localStorage.getItem("subscribeModalViewed")

    if (toastTween === false)
      toastTween = TweenMax.fromTo(
        "#toast",
        0.6,
        { opacity: 0, transform: "translateX(-40px)", display: "none" },
        { opacity: 1, transform: "none", display: "block", delay: 3 }
      ).pause()

    if (toast && !modalViewed) {
      toastTween.play()
    }
  }, [toast, toastTween])

  return (
    <Layout
      placement={
        <div
          id="toast"
          css={tw`fixed z-20 bottom-0 left-0 m-8 bg-sidebar-gray p-4 rounded-lg shadow-lg max-w-sm opacity-0`}
        >
          <h2 css={tw`mb-4 w-4/5 font-medium`}>
            Stay up to date with the Impact Map, Being Enough, and more
          </h2>
          <button
            css={tw`absolute top-0 right-0 p-4 hover:opacity-50 active:outline-none`}
            onClick={() => closeToast()}
          >
            X
          </button>
          <SubscribeForm onSubmit={closeToast} />
        </div>
      }
    />
  )
}
