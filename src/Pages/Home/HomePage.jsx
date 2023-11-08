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
            title: 'Organização',
            text: 'Sem uma boa organização, nos sentimos sobrecarregados e estressados, lutando para acompanhar nossas obrigações. A organização é a chave para uma vida mais equilibrada e produtiva.',
            img: img1,
            className: 'card-style-1'
        },
        {
            title: 'To-do App',
            text: 'Um aplicativo de lista de tarefas, ou "to-do app", é uma ferramenta poderosa para colocar a organização em prática. Com ele, você pode criar e organizar suas tarefas de forma rápida e adaptável ao seu ritmo.',
            img: img2,
            className: 'card-style-2'
        },
        {
            title: 'Simplicidade',
            text: 'Em um mundo cada vez mais acelerado, a simplicidade é fundamental. Simplifique sua vida, mantendo as suas tarefas em um único lugar. Sem listas de papel ou anotações perdidas. Torne sua vida e a de sua equipe mais organizada e eficiente.',
            img: img3,
            className: 'card-style-1'

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
                 <Carousel.Item interval={7000} key={i}>
                 <div className={`card ${item.className}`}>
                   <div className="card-body">
                   <img className="d-block w-90 carousel-image" src={item.img} alt="Imagem do item" />
                     <div className="card-text-content">
                       <h3>{item.title}</h3>
                       <p >
                       {item.text}
                       </p>
                     </div>
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