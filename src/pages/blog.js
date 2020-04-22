import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import PageNav from "../components/page-nav"
import tw from "tailwind.macro"
import styled from "@emotion/styled"
import { Section, Col, TitleCol, SnglCol } from "../components/grid"
import { Heading, Body } from "../components/type"
import BackgroundImage from 'gatsby-background-image'

const Hero = styled(BackgroundImage)`
  ${tw`pt-24 flex flex-col md:flex-row justify-between px-8 bg-black text-white`}
  min-height: 60vh;
`

const List = styled.ol`
  ${tw`flex flex-col items-start`}
  padding-inline-start: 0;
  list-style: none;
  counter-reset: my-awesome-counter;
`

const Step = styled.li`
  counter-increment: my-awesome-counter;
  ${tw`uppercase font-heading text-lg tracking-wide mb-24 pb-2 flex items-center relative`}

  &:last-child {
    ${tw`mb-0`}
  }

  &::after {
    content: '';
    height: 2px; 
    ${tw`block bg-black bottom-0 absolute w-screen`}
  }

  &:nth-child(2n-1)::after {
    ${tw`right-0`}
  }

  &::before {
    content: counter(my-awesome-counter);
    ${tw`font-display text-2xl mr-4 h-10 w-10 flex flex-none items-center justify-center border border-solid border-black rounded-full`}
  }
`

const BasicCta = tw.a`px-4 py-2 font-body text-sm md:text-lg text-black tracking-wide uppercase border-2 border-black border-solid rounded-lg shadow-none hover:bg-black hover:text-sidebar-gray`

export default function ImpactMap(props) {

  return (
    <Layout expand>
      <PageNav title="BEING ENOUGH: A BLOG" cta={{text: "Contact", url: "/contact"}}/>
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
