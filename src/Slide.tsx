import * as React from 'react';
import { Image } from './Types';

interface Props {
  image: Image;
  isActive: boolean;
}

export function Slide(props: Props) {
  return (
    <div>
      <p>{props.isActive ? 'Active' : 'Not Active'}</p>
      <img src={props.image.src} alt={props.image.alt} height="100" />
    </div>
  );
}
