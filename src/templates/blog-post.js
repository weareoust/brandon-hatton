import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { Section, SnglCol } from "../components/grid"
import { Heading, Body } from "../components/type"
import PageNav from "../components/page-nav"
import logo from "../../content/assets/being-enough.svg"

const Wrapper = styled.div`
  p {
    ${tw`mb-8`}
  }
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle} expand>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <PageNav title={`BEING ENOUGH: ${post.frontmatter.title}`} logo={logo} cta={{text: "Back", url: "/blog"}}/>
        <article>
          <Section className="bg-bg-gray">
            <SnglCol>
              <Heading>{post.frontmatter.title}</Heading>
              <Body>{post.frontmatter.date}</Body>
            </SnglCol>
          </Section>
          <Section>
            <Wrapper dangerouslySetInnerHTML={{ __html: post.html }} className="font-body px-8 md:px-24 py-24" />
          </Section>
          <hr/>
          <footer>
          </footer>
        </article>

        <nav className="p-12 uppercase bg-bg-gray">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={'/blog' + previous.fields.slug} rel="prev" className="font-body">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={'/blog' + next.fields.slug} rel="next" className="font-body">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
