import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import { Image } from '../Types';
import Carousel from '../Carousel';

const images: Image[] = [
  {
    src: 'image-a.jpg',
    alt: 'image a',
  },
  {
    src: 'image-b.jpg',
    alt: 'image b',
  },
  {
    src: 'image-c.jpg',
    alt: 'image c',
  },
];

// This is to stub the console.table call
// that returns the image count
console.table = jest.fn();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Carousel images={images} />, div);
});

it('logs image data', () => {
  expect(console.table).toHaveBeenCalled();
});

describe('looping over images', () => {
  const carousel = ReactTestUtils.renderIntoDocument(
    <Carousel images={images} />,
  );
  const loopLength = 3;

  it('increments and loops to the start once hitting the end', () => {
    expect(carousel.loopImages(0, loopLength, true)).toBe(1);
    expect(carousel.loopImages(1, loopLength, true)).toBe(2);
    expect(carousel.loopImages(2, loopLength, true)).toBe(3);
    expect(carousel.loopImages(3, loopLength, true)).toBe(0);
  });

  it('decrements and loops to the end once hitting the start', () => {
    expect(carousel.loopImages(3, loopLength, false)).toBe(2);
    expect(carousel.loopImages(2, loopLength, false)).toBe(1);
    expect(carousel.loopImages(1, loopLength, false)).toBe(0);
    expect(carousel.loopImages(0, loopLength, false)).toBe(3);
  });
});

describe('imageData', () => {
  it('initializes imageData with the currentImage already viewed', () => {
    const carousel = ReactTestUtils.renderIntoDocument(
      <Carousel images={images} />,
    );
    const data = carousel.initalizeImageData(images, 0);
    expect(data).toEqual([
      { count: 1, name: 'image-a.jpg' },
      { count: 0, name: 'image-b.jpg' },
      { count: 0, name: 'image-c.jpg' },
    ]);
  });

  describe('updating view counts', () => {
    let carousel;
    let initData;
    let incrementPositionOne;
    let incrementPositionTwo;

    beforeEach(() => {
      carousel = ReactTestUtils.renderIntoDocument(
        <Carousel images={images} />,
      );
      initData = carousel.initalizeImageData(images, 0);
    });

    it('increases the view count when increasing the slide position', () => {
      incrementPositionOne = carousel.updateImageData(initData, 1);
      expect(incrementPositionOne).toEqual([
        { count: 1, name: 'image-a.jpg' },
        { count: 1, name: 'image-b.jpg' },
        { count: 0, name: 'image-c.jpg' },
      ]);

      incrementPositionTwo = carousel.updateImageData(incrementPositionOne, 2);
      expect(incrementPositionTwo).toEqual([
        { count: 1, name: 'image-a.jpg' },
        { count: 1, name: 'image-b.jpg' },
        { count: 1, name: 'image-c.jpg' },
      ]);
    });

    it('increases the view count when decreasing the slide position', () => {
      const decrementPositionOne = carousel.updateImageData(
        incrementPositionTwo,
        1,
      );
      expect(decrementPositionOne).toEqual([
        { count: 1, name: 'image-a.jpg' },
        { count: 2, name: 'image-b.jpg' },
        { count: 1, name: 'image-c.jpg' },
      ]);

      const decrementPositionZero = carousel.updateImageData(
        decrementPositionOne,
        0,
      );
      expect(decrementPositionZero).toEqual([
        { count: 2, name: 'image-a.jpg' },
        { count: 2, name: 'image-b.jpg' },
        { count: 1, name: 'image-c.jpg' },
      ]);
    });
  });
});
