import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import PageNav from "../components/page-nav"
import tw from "tailwind.macro"
import styled from "@emotion/styled"
import { Section } from "../components/grid"
import { Heading, Body } from "../components/type"
import BackgroundImage from "gatsby-background-image"
import logo from "../../content/assets/being-enough.svg"

const Hero = styled(BackgroundImage)`
  ${tw`pt-24 flex flex-col md:flex-row justify-between px-8 bg-black text-white`}
  min-height: 60vh;
`

const BasicCta = tw.a`px-4 py-2 font-body text-sm md:text-lg text-white tracking-wide uppercase border-2 border-white border-solid rounded-lg shadow-none hover:bg-black hover:text-sidebar-gray`

export default function ImpactMap(props) {
  const content = props.data.contentfulBlogPage
  return (
    <Layout expand>
      <PageNav
        title="BEING ENOUGH: A BLOG"
        logo={logo}
        cta={{ text: "Contact", url: "/contact" }}
      />
      <Hero fluid={props.data.file.childImageSharp.fluid}>
        <div css={tw`flex flex-col justify-between`}>
          <Heading css={tw`max-w-xl`}>{content.heroText}</Heading>
          <BasicCta
            as="a"
            href={content.heroCtaUrl}
            target="_blank"
            css={tw`mb-8 self-start`}
          >
            {content.heroCtaText}
          </BasicCta>
        </div>
      </Hero>
      {props.data.allContentfulPosts.nodes.map((blog, i) => {
        return (
          <Section>
            <Link to={`/blog/${blog.slug}`} className="p-4" key={i}>
              <Heading className="max-w-xl">{blog.title}</Heading>
              <Body>{blog.publishedDate}</Body>
            </Link>
          </Section>
        )
      })}
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPage {
    file(name: { eq: "bg-2" }) {
      childImageSharp {
        fluid(quality: 100, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    allContentfulPosts(sort: { fields: publishedDate, order: DESC }) {
      nodes {
        id
        title
        publishedDate(formatString: "DD MMMM YYYY")
        slug
      }
    }
    contentfulBlogPage(id: { eq: "fab41a1b-7a99-5d88-8706-5cc676b9300f" }) {
      id
      heroText
      heroCtaText
      heroCtaUrl
    }
  }
`
