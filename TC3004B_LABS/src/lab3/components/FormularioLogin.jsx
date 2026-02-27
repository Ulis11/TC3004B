import React from 'react'
import { useEffect, useState } from 'react';
import Message from './Message';

export const FormularioLogin = () => {

        const [showData, setShowData] = useState(false);

        const [formState, setFormState] = useState({
            matricula: 'A0000000',
            nombre: 'Ulises',
            apellidos: 'Montiel Sosa',
            edad: '20',
            universidad: 'Tec de Monterrey',
            carrera: 'ITC'
        });
        const { matricula, nombre, apellidos, edad, universidad, carrera } = formState;
        const onInputChange = ({ target }) => {
            const { name, value } = target;
            setFormState({
                ...formState, [name]: value
        });
    }

    const handleSubmit = () => {
        setShowData(true); 
    };

    useEffect(() => {
        // console.log('useEffect called!');
    }, []);
    useEffect(() => {
        // console.log('formState changed!');
    }, [formState]);
    useEffect(() => {
        // console.log('email changed!');
    }, [matricula]);

  return (
      <>
          <h1>Formulario Tipo Login</h1><hr/>
          <h5>Matricula</h5>
          <input type="text" className="form-control" placeholder="A0000000" name="matricula"
              value={matricula}
              onChange={onInputChange}
          />
          <br/>
          <h5>Nombre</h5>
          <input type="text" className="form-control mt-2" placeholder="test@gmail.com" name="nombre"
              value={nombre}
              onChange={onInputChange}
          />
          <br/>
          <h5>Apellidos</h5>
          <input type="text" className="form-control mt-2" placeholder="Montiel Sosa" name="apellidos"
              value={apellidos}
              onChange={onInputChange}
          />
          <br/>
          <h5>Edad</h5>
          <input type="text" className="form-control mt-2" placeholder="20" name="edad"
              value={edad}
              onChange={onInputChange}
          />
          <br/>
          <h5>Universidad</h5>
          <input type="text" className="form-control mt-2" placeholder="Apellidos" name="universidad"
              value={universidad}
              onChange={onInputChange}
          />
          <br/>
          <h5>Carrera</h5>
          <input type="text" className="form-control mt-2" placeholder="Ingeniería en Tecnologias Computacionales" name="carrera"
              value={carrera}
              onChange={onInputChange}
          />
          <br/>
          <button 
                className="btn btn-primary"
                onClick={handleSubmit}   // 👈 ADD THIS
            >
                Iniciar Sesión
            </button>
            {showData && (
                <p>
                    {nombre} {apellidos} ({matricula}) - {edad} años - 
                    {carrera} en {universidad}
                </p>
            )}
          {
              (nombre === 'secret') && <Message/>
          }
      </>
  )
}
