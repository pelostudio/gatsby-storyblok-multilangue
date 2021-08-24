import SbEditable from 'storyblok-react'
import Teaser from './Teaser'
import Image from './Image'
import React from "react"

const Components = {
  'teaser': Teaser,
  'image': Image,
}

const DynamicComponent = ({ blok, lang }) => {
  if (typeof Components[blok.component] !== 'undefined') {
    if(blok.component === 'image') console.log('blok', blok,'lang', lang)
    if (blok.lang && blok.lang.length !== 0 && !blok.lang.includes(lang)) return null
    const Component = Components[blok.component]
    return (<SbEditable content={blok}><Component blok={blok} /></SbEditable>)
  }
  return (<p>The component <strong>{blok.component}</strong> has not been created yet.</p>)
}

export default DynamicComponent