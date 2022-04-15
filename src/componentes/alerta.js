import React, {useContext, useEffect} from 'react';
import style, {keyframes} from "styled-components";
import { base } from "../contextoApi/baseContext";

const slideDown = keyframes`
0%{
    transform: translateY(-0.80rem);
    opacity: 0;
}
10%{
    transform: translateY(0.80rem);
    opacity: 1;
}
40%{
    transform: translateY(0.80rem);
    opacity: 1;
}
45%{
    transform: translateY(0.80rem);
    opacity: 0;
}
100%{
    transform: translateY(0.80rem);
    opacity: 0;
}`;

const ContenedorAlerta = style.div`
        font-family: 'Source Sans Pro', sans-serif;
        position: fixed;
        display: flex;
        justify-content: center;
        z-index: 1000;
        width: 100%;
        margin-top: 8rem;
        padding-right: 5%;
        animation: ${slideDown} 4s ease forwards;
        
        p{
            box-shadow: 0px 0px 10px rgb(190, 187, 187);
            color: white;
            font-size: 15px;
            background-color: ${(props) => {
                if (props.alerta.tipo === 'Ganar') {
                    return '#38c950'
                }
                else if (props.alerta.tipo === 'Perder') {
                    return '#8792F1'
                }
                else if (props.alerta.tipo === 'Empate') {
                    return '#989945'
                }else{
                    return '#E34747'
                }
            }};
            border-radius: 5%;
            padding: 7px 7px; 
        }
        @media screen and (max-width: 480px){
            margin-top: 7.5rem;
            p{
                font-size: 14px;
            }
        }
        @media screen and (max-width: 370px){
            margin-top: 8.1rem;
        }
        @media screen and (max-width: 350px){
            margin-top: 8rem;
            p{
                font-size: 12px;
            }
        }
`

const Alerta = () => {
    const {estadoAlerta, cambiarEstadoAlerta, alerta} =useContext(base);

    useEffect(()=>{
        let tiempo;

        tiempo = setTimeout(() => {
            if (estadoAlerta === true) {
                cambiarEstadoAlerta(false)
            }
        }, 1800);

        return(() => clearTimeout(tiempo))
        
    },[estadoAlerta, cambiarEstadoAlerta])

    return(
        <>
        {estadoAlerta &&
        <ContenedorAlerta alerta={alerta}>
            <p>{alerta.mensaje}</p>
        </ContenedorAlerta> 
        }
        </>
    )

}
export {Alerta}