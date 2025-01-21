import React, { useState, useEffect } from 'react';
import '../hojas-de-estilo/TareaFormulario.css';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function TareaFormulario(props) {

    const [input, setInput] = useState('');
    // const [error, setError] = useState('');
    const [tareas, setTareas] = useState([]);
    const [showCompleted, setShowCompleted] = useState('false');

    useEffect(() => {
        const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || []; 
        setTareas(tareasGuardadas);
    }, []);

    const manejarCambio = e => {
        setInput(e.target.value);
    };

    const manejarEnvio = e => {
        e.preventDefault();

        if (input.trim() === '') {
            alert('¡Por favor!, ingrese o escriba una tarea.');  // 1. setError('¡Por favor!, ingrese o escriba una tarea.'); 2. alert('¡Por favor!, ingrese o escriba una tarea.');            
            return;
        }
        
        const tareaNueva = {
            id: uuidv4(),
            texto: input,
            completada: false
        };

        const nuevasTareas = [...tareas, tareaNueva];
        setTareas(nuevasTareas);
        localStorage.setItem('tareas', JSON.stringify(nuevasTareas));

        props.onSubmit(tareaNueva);
        setInput(''); // Limpiar el campo de entrada después de enviar
        // setError(''); // Limpiar el mensaje de error después de enviar Nota: agregar una liea 37 {error && ....}.
    };

    const marcarCompletada = id => { 
        const tareasActualizadas = tareas.map(tarea => { 
            if (tarea.id === id) { 
                tarea.completada = !tarea.completada; 
            } 
            return tarea; 
        }); 
        setTareas(tareasActualizadas); 
        localStorage.setItem('tareas', JSON.stringify(tareasActualizadas)); 
    }; 
    
    const manejarMostrarCompletadas = () => { 
        setShowCompleted(!showCompleted); 
    };

    return (
        <div className='tarea-formulario'>
            <form 
                className='tarea-formulario'
                onSubmit={manejarEnvio}>
                <input 
                    className='tarea-input'
                    type='text'
                    placeholder='Escribe una Tarea'
                    name='texto'
                    value={input} // Asegurarse de que el valor del input sea cotrolado
                    onChange={manejarCambio}
                />
                <button className='tarea-boton'>
                    Agregar Tarea
                </button>
            </form>
            <button onClick={manejarMostrarCompletadas} className='mostrar-completadas-boton'> 
                {showCompleted ? 'Ocultar Tareas Completadas' : 'Mostrar Tareas Completadas'} 
            </button> 
            <ul> 
                {tareas.filter(tarea => !tarea.completada).map(tarea => ( 
                    <li key={tarea.id} onClick={() => marcarCompletada(tarea.id)} className='tarea incompleta'> 
                        <FontAwesomeIcon icon={faTimesCircle} className='icono-incompleta' /> 
                        {tarea.texto} 
                    </li> 
                ))} 
                {showCompleted && tareas.filter(tarea => tarea.completada).map(tarea => ( 
                    <li key={tarea.id} onClick={() => marcarCompletada(tarea.id)} className='tarea completada'> 
                        <FontAwesomeIcon icon={faCheckCircle} className='icono-completa' /> 
                        {tarea.texto} 
                    </li> 
                ))} 
            </ul>
        </div>
    );
}

export default TareaFormulario;