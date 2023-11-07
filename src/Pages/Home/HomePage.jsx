import 'animate.css';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import img1 from '../../assets/1.jpeg';
import img2 from '../../assets/2.jpeg';
import img3 from '../../assets/3.jpeg';
import iconToDo from '../../assets/lista-de-afazeres.png';
import Footer from '../../styles/styledComponents/Footer';

const HomePage = () => {
    const items = [
        {
            text: 'Sem uma boa organização, nos sentimos sobrecarregados e estressados,lutando para acompanhar nossas obrigações. Em resumo, a organização é a chave para uma vida mais equilibrada e produtiva.',
            img: img1
        },
        {
            text: 'Um aplicativo de lista de tarefas, ou "to-do app", é uma ferramenta poderosa para colocar a organização em prática. Com ele, você pode criar e editar suas tarefas de forma rápida e conveniente. Podendo ser acessado em qualquer lugar, a organização de suas tarefas se torna mais flexível e adaptável ao seu ritmo.',
            img: img2
        },
        {
            text: 'Em um mundo cada vez mais acelerado, a simplicidade é fundamental. Simplifique sua vida, mantendo as suas tarefas em um único lugar. Sem listas de papel ou anotações perdidas. Torne sua vida e a de sua equipe mais organizada e eficiente.',
            img: img3
        }
    ];
    return (
        <div className="container">
          <nav className="navbar">
            <a href="/" className="navbar-brand">To-do App</a>
            <div className="nav">
              <a href="/">
                <img src={iconToDo} alt="Minha Imagem" className='imagem-nav'/>
              </a>
            </div>
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          </nav>
          <Carousel>
            {items.map((item, i) => (
              <Carousel.Item interval={6000} key={i}>
                <div className="card">
                  <div className="card-body">
                    <img className="d-block w-90 carousel-image" src={item.img} alt="Imagem do item" />
                    <p className="card-text">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <Footer></Footer>
        </div>
        
      );
    };
    
export default HomePage;