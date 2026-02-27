import React from 'react'
import { useFetchIA } from '../hooks/useFetchIA'
import { useCounter } from '../hooks/useCounter'
import { CardIA } from './CardIA'
import { Loading } from './Loading'

export function CustomHookIA() {

    const { counter, decrement, increment, reset } = useCounter(1);

    const { data, hasError, isLoading } =
      useFetchIA(`https://thesimpsonsapi.com/api/characters/${counter}`);

    return (
        <>
            <h1>Fetch API de Simpson IA</h1>
            <hr/>
            <h2>Personaje #{counter}</h2>

            {isLoading && <Loading />}

            {!isLoading && data && (
                <CardIA
                    id={data.id}
                    name={data.name}
                    image={`https://cdn.thesimpsonsapi.com/500${data.portrait_path}`}
                />
            )}

            <button className='btn btn-primary' onClick={() => decrement()}>
                Anterior
            </button>

            <button className='btn btn-primary' onClick={() => increment()}>
                Siguiente
            </button>

            <button className='btn btn-primary' onClick={() => reset()}>
                Reset
            </button>
        </>
    )
}