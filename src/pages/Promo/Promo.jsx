/* eslint-disable max-len */
/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import { NavLink } from 'react-router-dom';

import './Promo.scss';

import englishman from './images/anglichanin.png';
import dog from './images/dog.png';
import travel from './images/case.png';
import job from './images/job.png';
import study from './images/stydied.png';
import book from './images/book.png';
import idea from './images/idea.png';
import country from './images/country.png';
import checked from './images/checked.png';
import firstBullet from './images/firstBullet.png';
import secondBullet from './images/secondBullet.png';
import thirdBullet from './images/thirdBullet.png';
import fourthBullet from './images/fourthBullet.png';
import fifthBullet from './images/fifthBullet.png';
import tasks from './images/tasks.png';
import lp from './images/lp.png';
import games from './images/games.png';
import dictionary from './images/words.png';
import gh from './images/gh.svg';

const Promo = () => (
  <div className="promo-section">
    <section className="introduction-section">
      <div className="introduction-wrapper">
        <div className="boolets-section">
          <img src={englishman} alt="man" />
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
      </div>
      <div className="dog-section">
        <div>
          <img src={dog} alt="dog" />
        </div>
      </div>
    </section>
    <section className="aims-container">
      <div className="aims-section">
        <h3 className="aims-title">Английский для ваших целей</h3>
        <ul className="aims-list">
          <li>
            <div>
              <img src={travel} alt="" />
              <span>Путешествовать</span>
            </div>
            <div>
              <img src={job} alt="" />
              <span>Работать</span>
            </div>
          </li>
          <li>
            <div>
              <img src={study} alt="" />
              <span>Учиться</span>
            </div>
            <div>
              <img src={book} alt="" />
              <span>Смотреть фильмы и читать книги</span>
            </div>
          </li>
          <li>
            <div>
              <img src={idea} alt="" />
              <span> Развиваться</span>
            </div>
            <div>
              <img src={country} alt="" />
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
      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/ZDdmB7_zNnA"
          width="510"
          height="285"
          frameBorder="0"
          allowFullScreen
        />
      </div>

    </section>
    <section className="advantages-section">
      <div className="advantage-wrapper">
        <h3>Преимущества RS Lang</h3>
        <ul className="advatnage-list">
          <li>
            <div>
              <img src={checked} alt="checked" />
              <span>
                Изучение 6000 самых распространенных слов
              </span>
            </div>
            <div>
              <img src={checked} alt="checked" />
              <span>
                Гибкие настройки обучения
              </span>
            </div>
            <div>
              <img src={checked} alt="checked" />
              <span>
                Закрепление слов с помощью мини-игр
              </span>
            </div>
          </li>
          <li>
            <div>
              <img src={checked} alt="checked" />
              <span>
                Словарь с изучаемыми словами
              </span>
            </div>
            <div>
              <img src={checked} alt="checked" />
              <span>
                Красочное оформление
              </span>
            </div>
            <div>
              <img src={checked} alt="checked" />
              <span>
                Тренируйся с азартом!
              </span>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section className="method-description">
      <div className="method-description_wrapper">
        <div className="description-article">
          <h3>
            Уровни изучения RS Lang
          </h3>
          <p>
            В алгоритме RS Lang применяется методика интервального повторения,
            <br />
            в рамках котрой каждый день вы изучите новые слова. Чем лучше слово вы изучили - тем позже у вас оно появится снова!
            <br />
            <br />
            Упражняйтесь как можно чаще, и всегда прилагайте максимум усилий, чтобы достичь наилучших результатов!
          </p>
        </div>
        <div className="bullets-section">
          <div className="bullets-container">
            <div>
              <img src={fifthBullet} alt="bullet" />
              <span>
                У вас прекрасная память!
              </span>
            </div>
            <div>
              <img src={fourthBullet} alt="bullet" />
              <span>
                Это слово так и вертится у вас на языке!
              </span>
            </div>
            <div>
              <img src={thirdBullet} alt="bullet" />
              <span>
                Вы в процессе запоминания этого слова.
              </span>
            </div>
            <div>
              <img src={secondBullet} alt="bullet" />
              <span>
                Это слово надо подучить.
              </span>
            </div>
            <div>
              <img src={firstBullet} alt="bullet" />
              <span>
                Новое слово!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="products-section">
      <div className="products-title">
        <h3>И так, чем займемся? :)</h3>
      </div>
      <ul className="products-list">
        <li>
          <NavLink className="product-nav" to="">
            <img src={tasks} alt="" />
            <div>
              <h3>
                Карточки
              </h3>
              <span>
                Развивай словарный запас вместе с карточками
              </span>
            </div>
          </NavLink>
          <NavLink className="product-nav" to="/settings">
            <img src={lp} alt="" />
            <div>
              <h3>
                Личный план
              </h3>
              <span>
                Поставь перед собой цели и достигай их!
              </span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink className="product-nav" to="/games-panel">
            <img src={games} alt="" />
            <div>
              <h3>
                Игры
              </h3>
              <span>
                Шесть мини-игр для развития английского
              </span>
            </div>
          </NavLink>
          <NavLink className="product-nav" to="/dictionary">
            <img src={dictionary} alt="" />
            <div>
              <h3>
                Словарь
              </h3>
              <span>
                Повторение изученных слов
              </span>
            </div>
          </NavLink>
        </li>
      </ul>
    </section>
    <section className="github">
      <a href="https://github.com/tastypurgen/rslang" target="_blank" rel="noopener noreferrer">
        <img src={gh} alt="" />
        {' '}
        GitHub
      </a>
    </section>
  </div>
);

export default Promo;
