import React from 'react';
import { Header } from "./componentes/header";
import { Player } from "./componentes/logicaDelJuego";


const App = () => {
    return(
        <>
        <section className='all_small' >
            <Header />
            <Player />
        </section>
        </>
    )
}
 
export {App}