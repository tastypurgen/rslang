import React from 'react';

import './AboutTeam.scss';
import NameCard from './components/NameCard';

import alexKImg from './img/alexK.jpg';
import andreiAImg from './img/andreiA.jpg';
import alinaSImg from './img/alinaS.jpg';
import arturPImg from './img/arturP.jpg';
import kateKImg from './img/kateK.jpg';
import andreyLImg from './img/andreyL.jpg';
import nikitaKImg from './img/nikitaK.jpg';

const AboutTeam = () => (
  <div className="about-page">
    <h2>
      Пару слов о наших волшебниках,
      <br />
      которые сотворили это приложение
      <br />
      <i>(магия вне Хогвартса!)</i>
    </h2>
    <NameCard name="Александр Клещукевич" img={alexKImg} description={'Руководитель творческого коллектива "АЭЛИТА"'} ghLink="https://github.com/sleepwalky/" />
    <div className="container">
      <NameCard name="Андрей Абрамчук" img={andreiAImg} description="Директор молочного цеха, любитель-прокрастинатор" ghLink="https://github.com/tastypurgen/" />
      <NameCard name="Алина Сидорова" img={alinaSImg} description="И швец, и жнец, и на дуде игрец, полюбила реакт с первого взгляда" ghLink="https://github.com/alinasidorova28/" />
      <NameCard name="Артур Паньков" img={arturPImg} description="Город засыпает - просыпается кодер, владыка апишек" ghLink="https://github.com/koptohhka/" />
      <NameCard name="Андрей Лавров" img={andreyLImg} description="Настройщик настраиваемых настроек, любит кодить как футбол" ghLink="https://github.com/zenitfan19/" />
      <NameCard name="Екатерина Кириленко" img={kateKImg} description="Творческая натура, создатель дзен пазлов" ghLink="https://github.com/katerina-kirilenko/" />
      <NameCard name="Никита Колпинский" img={nikitaKImg} description="Финансовый руководитель наших карманных расходов, мастер спринтерских дистанций" ghLink="https://github.com/nikitakolpinskiy/" />
    </div>
  </div>
);

export default AboutTeam;
