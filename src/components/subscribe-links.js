import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, graphql } from "gatsby"

import apple from "../images/apple.svg"
import googlePlay from "../images/google-play.svg"
import rss from "../images/rss.svg"
import stitcher from "../images/stitcher.svg"
import tunein from "../images/tunein.svg"

export default function SubscribeLinks() {
  const data = useStaticQuery(graphql`
    {
      contentfulGlobalSettings(
        id: { eq: "56f65675-48c1-5f91-ac9b-2d2706c70763" }
      ) {
        subscribeApple
        subscribeGooglePlay
        subscribeRss
        subscribeStitcher
        subscribeTuneIn
      }
    }
  `)
  const settings = data.contentfulGlobalSettings

  return (
    <ul
      className="flex"
      css={css`
        display: flex;
        align-items: center;

        a {
          display: block;
          padding: 0.25rem;
        }
      `}
    >
      {settings.subscribeApple ? (
        <li>
          <a
            href={settings.subscribeApple}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={apple} alt="" />
          </a>
        </li>
      ) : (
        ""
      )}
      {settings.subscribeGooglePlay ? (
        <li>
          <a
            href={settings.subscribeGooglePlay}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={googlePlay} alt="" />
          </a>
        </li>
      ) : (
        ""
      )}
      {settings.subscribeRss ? (
        <li>
          <a
            href={settings.subscribeRss}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={rss} alt="" />
          </a>
        </li>
      ) : (
        ""
      )}
      {settings.subscribeStitcher ? (
        <li>
          <a
            href={settings.subscribeStitcher}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={stitcher} alt="" />
          </a>
        </li>
      ) : (
        ""
      )}
      {settings.subscribeTuneIn ? (
        <li>
          <a
            href={settings.subscribeTuneIn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={tunein} alt="" />
          </a>
        </li>
      ) : (
        ""
      )}
    </ul>
  )
}
