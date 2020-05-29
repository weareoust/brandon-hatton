import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import PageNav from "../components/page-nav"
import tw from "tailwind.macro"
import styled from "@emotion/styled"
import { Section } from "../components/grid"
import { Heading, Body } from "../components/type"
import BackgroundImage from 'gatsby-background-image'
import logo from "../../content/assets/being-enough.svg"

const Hero = styled(BackgroundImage)`
  ${tw`pt-24 flex flex-col md:flex-row justify-between px-8 bg-black text-white`}
  min-height: 60vh;
`

export default function ImpactMap(props) {

  return (
    <Layout expand>
      <PageNav title="BEING ENOUGH: A BLOG" logo={logo} cta={{text: "Contact", url: "/contact"}}/>
      <Hero fluid={props.data.file.childImageSharp.fluid}>
        <div css={tw`flex flex-col justify-between`}>
          <Heading css={tw`max-w-2xl`}>A written and spoken<br/>series on Being Enough</Heading>
        </div>
      </Hero>
      {props.data.allMarkdownRemark.nodes.map((blog, i) => {
        return (
          <Section>
            <Link to={`/blog${blog.fields.slug}`} className="p-4" key={i}>
              <Heading>{blog.frontmatter.title}</Heading>
              <Body className="max-w-3xl mb-4">{blog.frontmatter.description}</Body>
              <Body>{blog.frontmatter.date}</Body>
            </Link>
          </Section>
        )
      })}
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPage {
    file(name: {eq: "bg-2"}) {
      childImageSharp {
        fluid(quality: 100, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          description
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`;
