import React from 'react';
import '../App.css';
import mario from '../assets/R.png';

function HelloWorld() {
  return (
    <div>
      <img src={mario} alt="Minha Imagem" className='imagemFixa'/>
      <h1>
        Mamma mia !!!
      </h1>
    </div>
   );
}

export default HelloWorld;
