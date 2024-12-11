import React from 'react'
import './FeatureItem.css'

export const FeatureItem = ({title, listItems, imagePath, imageSide}) => {
  let list = listItems.split("\n")
  return (
    <div className={"feature-item img-" + imageSide}>
        <div className="text-part">
            <h2 className="item-title">{title}</h2>
            <ul>
            {list.map((item, index) => (
            <li key={index}>{item}</li>
            ))}
            </ul>
        </div>
        <div className="image-part">
            <img src={imagePath} alt="" />
        </div>
    </div>
  )
}
