import React, { useState } from 'react';
import {shuffle} from 'underscore';

const base = React.createContext();

const ProovedorTema = ({children}) => {

    const [estadoAlerta, cambiarEstadoAlerta] = useState();
    const [alerta, cambiarAlerta] = useState({});

    /* Crear el deck de cartas */
    const [package_cards,change_package_cards ] = useState(() => {
        let letras_1 = ['A','J','K','Q']; 
        let letras_2 = ['C','D','H','S'];
        let arr_juegos = [];

        for (let i=2; i <= 10; i++ ) {
            for (const sumar in letras_2) {
                arr_juegos.push(i+ letras_2[sumar])
            }
        }

        for (const suma_1 in letras_1) {
            for (const suma_2  in letras_2) {
                arr_juegos.push( letras_1[suma_1] + letras_2[suma_2] )
            }
        }

        arr_juegos = shuffle(arr_juegos);
        return arr_juegos; 
    });

    /* Obtener la carta */
    const get_cards = () => {
       return package_cards.pop()
    };
    
    /* Darle valor a la carta */
    const value_card = (carta) => {
        const valor = carta.substring(0, carta.length-1)

        const darValor = (valor === 'A') ? 11:
        (valor === 'J' || valor === 'K' || valor === 'Q')? 10 : valor * 1; 
        return darValor;
    };
 
    /* Referencia a los botones Nuevo Juego, Pedir, Detener y Opcion 2 */
    const ask = React.useRef();
    const stop = React.useRef();
    const games2 = React.useRef();
    const newPlay = React.useRef();
    
    return(
        <base.Provider value={{
            package_cards,
            change_package_cards,
            get_cards,
            value_card,
            ask,
            stop,
            games2,
            newPlay,
            estadoAlerta,
            cambiarEstadoAlerta,
            alerta, 
            cambiarAlerta
        }}
            >
            {children}
        </base.Provider>
    )
}

export {base,ProovedorTema};
