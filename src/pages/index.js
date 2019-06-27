import React, { useState, useCallback } from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-mdx"
import Layout from "../components/layout"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      {data.allMdx.edges
        .map(edge => edge.node)
        .map(({ code, id, frontmatter }) => (
          <JokeCard key={id} title={frontmatter.title} mdxCode={code.body} />
        ))}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query MDXQuery {
    allMdx {
      edges {
        node {
          id
          frontmatter {
            title
          }
          code {
            body
          }
        }
      }
    }
  }
`

const isDelimiter = el => el.props.originalType === "hr"

const CustomWrapper = ({ children, chunk }) => {
  const childrenArray = React.Children.toArray(children)
  const chunks = childrenArray.reduce((acc, d, i) => {
    if (0 === i) return [[d]]
    if (isDelimiter(d)) return [...acc, []]
    return [acc.slice(0, acc.length - 1), acc[acc.length - 1].concat(d)]
  }, [])
  return chunks[chunk]
}

function JokeCard({ title, mdxCode, id }) {
  const [chunk, setChunk] = useState(0)
  const toggle = useCallback(() => setChunk(prev => (prev ? 0 : 1)), [])
  return (
    <div
      key={id}
      style={{
        border: "1px solid blue",
        padding: "1rem 1rem 0",
        marginBottom: "1rem",
      }}
      onClick={toggle}
    >
      <h3>{title}</h3>
      <MDXRenderer
        components={{ wrapper: CustomWrapper }}
        children={mdxCode}
        chunk={chunk}
      />
    </div>
  )
}
