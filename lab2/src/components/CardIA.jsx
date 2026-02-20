import React from 'react'

export function CardIA({ id, name, image }) {
  return (
    <section className='card'>
        <h2>#{id}</h2>
        <h2>{name}</h2>

        <div className='image-container'>
            <img 
              src={image} 
              alt={name}
              className='character-img'
            />
        </div>
    </section>
  )
}