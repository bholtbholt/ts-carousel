import * as React from 'react';
import { Image } from './Types';
import './Slide.css';

interface Props {
  image: Image;
  isActive: boolean;
}

export function Slide(props: Props) {
  const classes = props.isActive ? 'slide _active' : 'slide';
  return (
    <img className={classes} src={props.image.src} alt={props.image.alt} />
  );
}
