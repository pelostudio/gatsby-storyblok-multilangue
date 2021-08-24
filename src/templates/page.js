import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import DynamicComponent from "../components/dynamicComponent"
import useStoryblok from "../lib/storyblok"

const Page = ({ pageContext, location }) => { 
  const story = pageContext.story

  return (
  <>
    { story?.content.body.map(blok => {
    return (<DynamicComponent blok={blok} lang={story.lang} key={blok._uid} />)
    }) }
  </>
)}

export default Page
