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
        <form
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
        </form>
      </div>
    )
  }
}
