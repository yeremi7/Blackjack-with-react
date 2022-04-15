import React, { useContext} from 'react';
import { Botones } from "./botones";
import { base } from "../contextoApi/baseContext";

const Player = () => {

    const {get_cards, value_card, newPlay, ask, stop, games2, cambiarEstadoAlerta, cambiarAlerta} = useContext(base);

    /* Referencia para el jugador */
    let puntajeDelJugador = 0;
    const small_jugador = React.useRef();
    const insertar_carta_jugador = React.useRef();
  
    /* Referencia para la computadora */
    let puntajeComputadora = 0;
    const small_computadora = React.useRef();
    const insertar_carta_computadora = React.useRef();

    /* Logica del jugador */
    const logic_player = () => {
            newPlay.current.disabled = true;
            games2.current.disabled = true;
            newPlay.current.className='desactivadoNuevo';
            games2.current.className='desactivadoOpcion2';

            const jugador = () => {
                const jugador = document.getElementById('jugador');
                setTimeout(() => {
                    jugador.classList.remove('container_jugador');
                    jugador.classList.add('container_jugador1')
                }, 1200);
            }
            jugador()

        if (games2.current.innerText === 'Opcion 2') {

            const card = get_cards();
            puntajeDelJugador = puntajeDelJugador + value_card(card);
            small_jugador.current.innerText = puntajeDelJugador;
        
            const img_jugador = document.createElement('img');
            img_jugador.src = process.env.PUBLIC_URL + `/assets/cartas/${card}.png`;
            img_jugador.classList.add('cartaInvisible');
            insertar_carta_jugador.current.append(img_jugador);

            setTimeout(() => {img_jugador.classList.add('cartaVisible')}, 10);

            if (puntajeDelJugador >= 21) {
                logic_computer(puntajeDelJugador);
                winner();
                ask.current.disabled = true;
                stop.current.disabled = true;
                ask.current.className='desactivadoPedir';
                stop.current.className='desactivadoDetener';
            }
        }
        /* Logica de la opcion 2 del juego */
        else if (games2.current.innerText === 'Desactivar') {

            const card = get_cards();
            puntajeDelJugador = puntajeDelJugador + value_card(card);
            small_jugador.current.innerText = puntajeDelJugador;
        
            const img_jugador = document.createElement('img');
            img_jugador.src = process.env.PUBLIC_URL + `/assets/cartas/${card}.png`;
            img_jugador.classList.add('cartaInvisible');
            insertar_carta_jugador.current.append(img_jugador);

            setTimeout(() => {img_jugador.classList.add('cartaVisible')}, 10);

            if (puntajeDelJugador >= 21) {
                winner();
                ask.current.disabled = true;
                stop.current.disabled = true;
                ask.current.className='desactivadoPedir';
                stop.current.className='desactivadoDetener';
            } 
            setTimeout(() => {logic_computer(puntajeDelJugador)}, 700);
        }
    };

    /* Logica de la computadora */
    const logic_computer = (puntosDelJugador) => {
        if (games2.current.innerText === 'Opcion 2') {
            do {
            const card = get_cards();
            puntajeComputadora = puntajeComputadora + value_card(card);
            small_computadora.current.innerText = puntajeComputadora;
            
            const img_computadora = document.createElement('img');
            img_computadora.src = process.env.PUBLIC_URL + `/assets/cartas/${card}.png`;
            img_computadora.classList.add('cartaInvisible');
            insertar_carta_computadora.current.append(img_computadora);
    
            setTimeout(() => {img_computadora.classList.add('cartaVisible')}, 10);
                
            } while (puntajeComputadora <= puntosDelJugador && puntosDelJugador <= 21);
        }
        /* Logica de la opcion 2 del juego */
        else if (games2.current.innerText === 'Desactivar') {
            do {

            const card = get_cards();
            puntajeComputadora = puntajeComputadora + value_card(card);

            if (puntajeDelJugador >= 21 ) {
                puntajeComputadora = small_computadora.current.lastChild.textContent
                small_computadora.current.innerText = puntajeComputadora;
            }else{
                small_computadora.current.innerText = puntajeComputadora;
            }
            
            const img_computadora = document.createElement('img');
            img_computadora.src = (puntajeDelJugador >= 21)? '' : process.env.PUBLIC_URL + `/assets/cartas/${card}.png`;
            img_computadora.classList.add('cartaInvisible');
            insertar_carta_computadora.current.append(img_computadora);
    
            setTimeout(() => {img_computadora.classList.add('cartaVisible')}, 10);
                
            } while (puntosDelJugador < (10 <= 2) && puntajeComputadora <= puntosDelJugador && puntosDelJugador <= 21);
        
            if (puntajeComputadora >= 21) {
                winner();
                ask.current.disabled = true;
                stop.current.disabled = true;
                ask.current.className='desactivadoPedir';
                stop.current.className='desactivadoDetener';
            }
        }
    };

    /* Mensaje para el ganador */
    const winner = () => {
        setTimeout(() => {
            if (puntajeDelJugador >= 21 && small_computadora.current.innerText == 0 ) {
                newPlay.current.disabled = false;
                cambiarEstadoAlerta(true);
                cambiarAlerta({
                    tipo: 'Error',
                    mensaje: 'Espera el turno de la computadora'
                }) 
            }
            else if (puntajeDelJugador === puntajeComputadora) {
                newPlay.current.disabled = false;
                cambiarEstadoAlerta(true);
                cambiarAlerta({
                    tipo: 'Empate',
                    mensaje: 'Guao empataron, hagan la revancha'
                }) 
              }
            else if (puntajeComputadora === 21) {
                newPlay.current.disabled = false;
                cambiarEstadoAlerta(true);
                cambiarAlerta({
                    tipo: 'Perder',
                    mensaje: 'Lo siento, Gana la computadora'
                })
              }
            else if (puntajeDelJugador === 21) {
                newPlay.current.disabled = false;
                cambiarEstadoAlerta(true);
                cambiarAlerta({
                    tipo: 'Ganar',
                    mensaje: 'Felicitaciones Ganaste'
                })
              }
            else if (puntajeDelJugador > 21) {
                newPlay.current.disabled = false;
                cambiarEstadoAlerta(true);
                cambiarAlerta({
                  tipo: 'Perder',
                  mensaje: 'Lo siento, Gana la computadora'
                })
              cambiarEstadoAlerta(true)
              }
            else if (puntajeComputadora > 21 ) {
                newPlay.current.disabled = false;
                cambiarEstadoAlerta(true);
                cambiarAlerta({
                    tipo: 'Ganar',
                    mensaje: 'Felicitaciones Ganaste'
                })
              }
            else if (puntajeComputadora > puntajeDelJugador ) {
                newPlay.current.disabled = false;
                cambiarEstadoAlerta(true);
                cambiarAlerta({
                  tipo: 'Perder',
                  mensaje: 'Lo siento, Gana la computadora'
                })
              } 
            else if (puntajeComputadora < puntajeDelJugador ) {
                newPlay.current.disabled = false;
                cambiarEstadoAlerta(true);
                cambiarAlerta({
                  tipo: 'Ganar',
                  mensaje: 'Felicitaciones Ganaste'
                })
              }   
        }, 500);     
      }

    /* Logica del boton detener */
    const btnStop = () => {
        if (games2.current.innerText === 'Opcion 2') {
            logic_computer(puntajeDelJugador);
            winner();
            newPlay.current.disabled = false;
            ask.current.disabled = true;
            stop.current.disabled = true;
            ask.current.className='desactivadoPedir';
            stop.current.className='desactivadoDetener';
        }
        else if (games2.current.innerText === 'Desactivar') {
            winner();
            newPlay.current.disabled = false;
            ask.current.disabled = true;
            stop.current.disabled = true;
            ask.current.className='desactivadoPedir';
            stop.current.className='desactivadoDetener';
            games2.current.className='desactivadoOpcion2';
            games2.current.disabled = true;
        }
    };
    
    return ( 
        <>
        <Botones 
            logic_player={logic_player}
            btnStop={btnStop}
            small_jugador={small_jugador}
            small_computadora={small_computadora}
            insertar_carta_jugador={insertar_carta_jugador}
            insertar_carta_computadora={insertar_carta_computadora}
        />

        <section id='jugador' className="container_jugador">
            <p className  ="puntos_jugador"> Jugador - <small ref={small_jugador}> 0 </small> </p>
            <div ref={insertar_carta_jugador} className="img_jugador">
                {/* <img src={carta} className='cartaVisible'  />
                <img src={carta} className='cartaVisible'  />
                <img src={carta} className='cartaVisible'  />
                <img src={carta} className='cartaVisible'  />
                <img src={carta} className='cartaVisible'  /> */}
            </div>
        </section>

        <section className="container_computadora">
            <p className="puntos_computadora"> Computadora - <small ref= {small_computadora} > 0 </small> </p>
            <div ref= {insertar_carta_computadora} className="img_computadora"></div>
        </section>
        </>
     );
}
 
export {Player};