import React from 'react'

export function Card({id, name, sprites}) {
  return (
    <section className='card'>
        <h2>Nombre: </h2>
        <h2>{name}</h2>
            <div>{
            sprites.map(sprite => (
                <img src={`https://cdn.thesimpsonsapi.com/500${sprite}`} key={sprite} alt={name} />
            ))}
            </div>
    </section>
  )
}