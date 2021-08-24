import * as React from "react"

const Image = ({ blok }) => {
    return (
    <img src={blok.image?.filename} />
)}

export default Image