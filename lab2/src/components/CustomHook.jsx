import React from 'react'
import { useFetch } from '../hooks/useFetch'
import { useCounter } from '../hooks/useCounter'
import { Card } from './Card'
import { Loading } from './Loading'

export function CustomHook() {
    const  {counter, decrement, increment, reset} = useCounter(1);
    const { data, hasError, isLoading } = useFetch(`https://thesimpsonsapi.com/api/characters/${counter}`);
  return (
    <>
        <h1>Fetch API de Simpson</h1>
        <hr/>
        <h2>Personaje #{counter}</h2>
        {isLoading ? <Loading/>
        : (<Card id={counter} name={data.name} sprites={ [
        data.portrait_path,
        ] } />)}
        <button className='btn btn-primary' onClick= { ()=>decrement() } >Anterior</button>
        <button className='btn btn-primary' onClick= { ()=>increment() } >Siguiente</button>
        <button className='btn btn-primary' onClick= { ()=>reset() } >Reset</button>
    </>
  )
}
