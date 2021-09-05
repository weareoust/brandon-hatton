import React, { useState } from 'react'
import tw from "tailwind.macro"
import { Heading, Body, Label, Field, Btn } from "./type"

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default function ContactForm(props) {
    const [regitration, setRegitration] = useState({});
    const [formVisibility, setFormVisibility] = useState(true);

    const handleChange = (e) => {
      setRegitration({ ...regitration, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      const form = e.target
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': form.getAttribute('name'),
          ...regitration,
        }),
      })
        .then(() => {
          setFormVisibility(false);
        })
        .catch((error) => alert(error))
    }

    if (formVisibility === false) {
      return (
        <div css={tw`flex flex-col items-center text-center`}>
          <Heading css={tw`mb-10`}>Thanks</Heading>
          <Body>We'll be in touch</Body>
        </div>
      )
    } else {
      return (
        <div css={tw`flex flex-col items-center w-full`}>
          {/* <Heading css={tw`text-center mb-10`}>Contact</Heading> */}
          <form
            name="contactForm"
            method="post"
            action="/success"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            id="contact-form"
            css={tw`flex flex-col items-center w-full max-w-sm`}
          >
            <input type="hidden" name="contactForm" value="contactForm" />
            <p hidden>
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>
            <Label css={tw`w-full`} htmlFor="name">
              Name
            </Label>
            <Field
              required
              name="name"
              type="text"
              placeholder="First and Last Name"
              onChange={handleChange}
              css={tw`w-full`}
            />
            <Label css={tw`w-full`} htmlFor="email">
              Email Address
            </Label>
            <Field
              required
              name="email"
              type="email"
              placeholder="brandon@brandonhatton.com"
              css={tw`w-full`}
              onChange={handleChange}
            />
            <Label css={tw`w-full`} htmlFor="message">
              Message
            </Label>
            <Field
              as="textarea"
              required
              name="message"
              placeholder="Message"
              css={tw`w-full`}
              onChange={handleChange}
            />
            <Btn
              css={tw`px-4 py-2 font-body text-sm md:text-lg text-black tracking-wide uppercase border-2 border-black border-solid rounded-lg shadow-none hover:bg-black hover:text-sidebar-gray mt-4`}
            >
              Submit
            </Btn>
          </form>
        </div>
      )
    }
}
