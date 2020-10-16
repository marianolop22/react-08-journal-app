import { useState } from "react";


/**
 * Este custom Hook, sirve para tratar los campos de un formulario,
 * toma el name del campo y el value y los setea.
 * name y value deben tener el mismo nombre
 * 
 * @param {{}} initialState - El estado inicial
 * @returns {Array} Retorna un array con el state  y los métodos que se pueden manejar
 */
export const useForm = ( initialState={} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues ( initialState );
    };

    const handleInputChange = ({target}) => {
        
        setValues({
            ...values,
            [target.name]: target.value
        });
    };

    return [values, handleInputChange, reset];

};