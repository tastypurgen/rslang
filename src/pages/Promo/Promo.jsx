import React from 'react';

import './Promo.scss';

import englishman from './images/anglichanin.png';
import dog from './images/dog.png';
import travel from './images/case.png';
import job from './images/job.png';
import study from './images/stydied.png';
import book from './images/book.png';
import idea from './images/idea.png';
import country from './images/country.png';

const Promo = () => (
  <div className="promo-section">
    <section className="introduction-section">
      <div className="introduction-wrapper">
        <div className="boolets-section">
          <img src={englishman} alt="man"/>
        </div>
        <div className="greeting-section">
          <div className="greeting-wrapper">
             <h3>
               RS Lang — это сервис для эффективного изучения английского
             </h3>
             <p>
               Здесь вы легко и быстро прокачаете грамматику, запоминание слов, понимание на слух и другие ключевые навыки владения языком
             </p>
          </div>
        </div>
        <div className='dog-section'>
          <div>
            <img src={dog} alt="dog"/>
          </div>
        </div>
      </div>
    </section>
    <section className='aims-container'>
      <div className='aims-section'>
        <h3 className='aims-title'>Английский для ваших целей</h3>
        <ul className='aims-list'>
          <li>
            <div>
              <img src={travel} alt=""/>
              <span>Путешествовать</span>
            </div>
            <div>
              <img src={job} alt=""/>
              <span>Работать</span>
            </div>
          </li>
          <li>
            <div>
              <img src={study} alt=""/>
              <span> Учиться</span>
            </div>
            <div>
              <img src={book} alt=""/>
              <span>Смотреть фильмы и читать книги</span>
            </div>
          </li>
          <li>
            <div>
              <img src={idea} alt=""/>
              <span> Развиваться</span>
            </div>
            <div>
              <img src={country} alt=""/>
              <span>Переехать в другую cтрану</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section className="video-section">
      <div className="description-container">
          <h3>Весь английский на одном сайте</h3>
          <p>
            RS Lang — это коллекция упражнений, заданий и игр для любого уровня владения английским. 
            Сфокусируйтесь на том, что важно именно вам, 
            и добейтесь результатов.
          </p>
      </div>
      <div className='video-container'>
        <iframe src="http://www.youtube.com/embed/W7qWa52k-nE"
        width="460" height="285" frameborder="0" allowfullscreen></iframe>
      </div>
    </section>
  </div>
);

export default Promo;
