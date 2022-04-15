import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from "./app";
import { ProovedorTema } from "./contextoApi/baseContext";
import {Helmet} from "react-helmet";
import favicon from "./img/logo.jpg";

const Index = () => {
  return (
    <>
    <Helmet>
      <title>BlackJack</title>
      <link rel="shortcut icon" href={favicon} type="image/x-icon" />
    </Helmet> 
    
    <React.StrictMode>
      <ProovedorTema>
          <App />
      </ProovedorTema>
    </React.StrictMode>
    </>
   );
}
 

ReactDOM.render(<Index />,document.getElementById('root'));


