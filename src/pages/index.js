import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query getMdxContent {
    allMdx(
      filter: {
        fields: { sourceName: { eq: "content" } }
        frontmatter: { isPublished: { eq: true }, title: {} }
      }
    ) {
      edges {
        node {
          id
          parent {
            ... on File {
              relativePath
              sourceInstanceName
              modifiedTime(fromNow: true)
            }
          }
          frontmatter {
            title
            author
            _PARENT
          }
          code {
            body
          }
        }
      }
    }
  }
`
