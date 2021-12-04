import React, { useState } from "react"
import tw from "tailwind.macro"
import { Label, Field, Btn } from "./type"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

export default function SubscribeForm(props) {
  const [regitration, setRegitration] = useState({})
  const [formVisibility, setFormVisibility] = useState(true)

  const handleChange = e => {
    setRegitration({ ...regitration, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...regitration,
      }),
    })
      .then(() => {
        setFormVisibility(false)
        if (props.onSubmit) props.onSubmit()
      })
      .catch(error => alert(error))
  }

  if (formVisibility === false) {
    return (
      <div css={tw`flex flex-col items-start`}>
        <p>Thanks</p>
      </div>
    )
  } else {
    return (
      <div css={tw`flex flex-col items-start`}>
        {/* <form
          name="downloadForm"
          method="post"
          action="/success"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          id="subscribe-form"
          css={tw`flex flex-col items-start w-full max-w-sm`}
        >
          <input type="hidden" name="downloadForm" value="downloadForm" />
          <p hidden>
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </p>
          <Label htmlFor="name" css={tw`text-sm`}>
            Name
          </Label>
          <Field
            css={tw`w-full bg-white text-black text-sm`}
            required
            name="name"
            type="text"
            placeholder="First and Last Name"
            onChange={handleChange}
          />
          <Label htmlFor="email" css={tw`text-sm`}>
            Email Address
          </Label>
          <Field
            css={tw`w-full bg-white text-black text-sm mb-4`}
            required
            name="email"
            type="email"
            placeholder="brandon@brandonhatton.com"
            onChange={handleChange}
          />
          <Btn css={tw`max-w-xs bg-black text-white text-sm p-2`}>Submit</Btn>
        </form> */}
        <div id="mc_embed_signup" className="w-full">
          <form
            action="https://brandonhatton.us4.list-manage.com/subscribe/post?u=6bca12b9ab3131a6451679c69&amp;id=f6ede05269"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate w-full"
            // target="_blank"
            novalidate
          >
            <div id="mc_embed_signup_scroll">
              <input
                type="email"
                // value=""
                name="EMAIL"
                className="font-body border-0 p-2 mb-2 rounded-sm w-full"
                id="mce-EMAIL"
                placeholder="email address"
                onChange={handleChange}
                required
              />
              { props.bookPreview ?
                <label className="checkbox hidden" for="group_2"><input type="checkbox" checked id="group_2" name="group[68553][2]" value="1" className="av-checkbox"/><span>Book Preview</span> </label> : 
                <label className="checkbox hidden" for="group_4"><input type="checkbox" checked id="group_4" name="group[68553][4]" value="1" className="av-checkbox"/><span>Main Website Signup</span> </label>
              }
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="b_6bca12b9ab3131a6451679c69_f6ede05269"
                  tabindex="-1"
                  onChange={handleChange}
                  value=""
                />
              </div>
              <div className="clear">
                <input
                  type="submit"
                  value="Subscribe"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  onSubmit={handleSubmit}
                  className="max-w-xs bg-black text-white text-sm p-2 font-heading uppercase"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
