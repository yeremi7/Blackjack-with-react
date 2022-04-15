import React, { useContext } from 'react';
import { base } from '../contextoApi/baseContext';
import {shuffle} from 'underscore';

const Botones = ({logic_player, btnStop,small_jugador,small_computadora,insertar_carta_jugador,insertar_carta_computadora, }) => {

    const {change_package_cards, ask, stop, games2, newPlay, estadoAlerta} = useContext(base);
    
    /* Logica del boton Nuevo Juego */
    const btnNew = () => {

        change_package_cards(()=>{
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

            const jugador = document.getElementById('jugador');
            jugador.classList.add('container_jugador');
                   
            if (estadoAlerta === false) {
                small_jugador.current.innerText='0'
                small_computadora.current.innerText='0'
    
                insertar_carta_jugador.current.innerText = ''
                insertar_carta_computadora.current.innerText = ''

                ask.current.disabled = false;
                stop.current.disabled = false;
                ask.current.className='Pedir'
                stop.current.className='Detener'
    
                games2.current.className='mismoTiempo';
                games2.current.disabled = false;
            };
    }

    /* Logica del boton Opcion 2 */
    const btnOption2 = () => {

        if (games2.current.innerText === 'Opcion 2') {
            games2.current.innerText='Desactivar';

        } else{
            games2.current.innerText='Opcion 2';
        }
    }

    return ( 
        <section className="container_button">
        
        <button onClick={btnNew} ref={newPlay} className={(estadoAlerta === true)? 'desactivadoNuevo': 'Nuevo'}> Nuevo Juego </button>
                <button onClick={logic_player} ref={ask} className="Pedir"> Pedir </button>
                <button onClick={btnStop} ref={stop} className="Detener"> Detener </button>
                <button onClick={btnOption2}  ref={games2} className="mismoTiempo"> Opcion 2 </button>
        
        </section>
     );
}
 
export {Botones};