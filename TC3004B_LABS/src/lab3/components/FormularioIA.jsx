import React, { useState, useEffect, useRef } from 'react';

export const FormularioIA = () => {

    // 🔹 Estado del formulario
    const [formState, setFormState] = useState({
        matricula: '',
        nombre: '',
        apellidos: '',
        edad: '',
        universidad: '',
        carrera: ''
    });

    // 🔹 Estado para mostrar resultado
    const [submittedData, setSubmittedData] = useState(null);

    // 🔹 useRef para hacer focus automático
    const matriculaRef = useRef();

    // 🔹 useEffect → focus cuando el componente carga
    useEffect(() => {
        matriculaRef.current.focus();
    }, []);

    // 🔹 useEffect → detectar cambios en el formulario
    useEffect(() => {
        console.log('Formulario actualizado:', formState);
    }, [formState]);

    const { matricula, nombre, apellidos, edad, universidad, carrera } = formState;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedData(formState);
    };

    return (
        <>
            <h1>Formulario Tipo Login</h1>
            <hr />

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Matrícula"
                    name="matricula"
                    value={matricula}
                    onChange={onInputChange}
                    ref={matriculaRef}
                />
                <br /><br />

                <input
                    type="text"
                    placeholder="Nombre"
                    name="nombre"
                    value={nombre}
                    onChange={onInputChange}
                />
                <br /><br />

                <input
                    type="text"
                    placeholder="Apellidos"
                    name="apellidos"
                    value={apellidos}
                    onChange={onInputChange}
                />
                <br /><br />

                <input
                    type="text"
                    placeholder="Edad"
                    name="edad"
                    value={edad}
                    onChange={onInputChange}
                />
                <br /><br />

                <input
                    type="text"
                    placeholder="Universidad"
                    name="universidad"
                    value={universidad}
                    onChange={onInputChange}
                />
                <br /><br />

                <input
                    type="text"
                    placeholder="Carrera"
                    name="carrera"
                    value={carrera}
                    onChange={onInputChange}
                />
                <br /><br />

                <button type="submit">Enviar</button>

            </form>

            {/* 🔹 Mostrar datos enviados */}
            {submittedData && (
                <p>
                    {submittedData.matricula} - {submittedData.nombre} {submittedData.apellidos} - 
                    {submittedData.edad} años - {submittedData.carrera} en {submittedData.universidad}
                </p>
            )}
        </>
    );
};