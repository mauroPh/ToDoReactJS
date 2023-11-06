import 'animate.css';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import img1 from '../../assets/1.jpeg';
import img2 from '../../assets/2.jpeg';
import img3 from '../../assets/3.jpeg';
import iconToDo from '../../assets/lista-de-afazeres.png';

const HomePage = () => {
    const items = [
        {
            text: 'Sem uma boa organização, nos sentimos sobrecarregados e estressados,lutando para acompanhar nossas obrigações. Ao priorizar e organizar nossas tarefas, podemos reduzir o estresse, aumentar a produtividade e aproveitar nosso tempo de maneira mais eficaz. Organizar suas tarefas também permite definir metas e alcançar objetivos de maneira mais consistente. Em resumo, a organização é a chave para uma vida mais equilibrada e produtiva.',
            img: img1
        },
        {
            text: 'Um aplicativo de lista de tarefas, ou "to-do app", é uma ferramenta poderosa para colocar a organização em prática. Com ele, você pode criar e editar suas tarefas de forma rápida e conveniente. Com a capacidade de acessar suas listas de tarefas em dispositivos móveis e computadores, você pode levar sua organização para qualquer lugar, tornando-a mais flexível e adaptável ao seu ritmo.',
            img: img2
        },
        {
            text: 'Em um mundo cada vez mais acelerado, a simplicidade é fundamental. Um app todo simplifica a vida, permitindo que você mantenha todas as suas tarefas em um único lugar. Esqueça as listas de papel ou anotações espalhadas. Com um aplicativo de organização de tarefas, você pode centralizar todas as suas atividades em um local de fácil acesso. Isso não apenas economiza tempo, mas também ajuda a evitar esquecimentos e retrabalhos. Em última análise, um app todo é a ferramenta perfeita para ajudá-lo a conquistar sua lista de tarefas e tornar sua vida mais organizada e eficiente.',
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
        </div>
      );
    };
    
export default HomePage;