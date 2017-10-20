import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Image } from './Types';
import './Normalize.css';
import './index.css';
import Carousel from './Carousel';

const initImageData: Image[] = [
  {
    src: require('./images/coffee-777612_640.jpg'),
    alt: 'A coffee cup',
  },
  {
    src: require('./images/coins-1523383_1920.jpg'),
    alt: 'A collection of coins in a stack',
  },
  {
    src: require('./images/posing-999199_1920.jpg'),
    alt: 'A skier standing on a ski run',
  },
  {
    src: require('./images/raspberries-1426859_1920.jpg'),
    alt: 'A closeup of raspberries in a bowl',
  },
];

ReactDOM.render(
  <Carousel images={initImageData} />,
  document.getElementById('root'),
);
