import * as React from 'react';
import { ImageSrc, ImageId, Image } from './Types';
import { Slide } from './Slide';
import './Carousel.css';

interface Props {
  images: Image[];
}

interface State {
  currentImage: ImageId;
  imageData: ImageData[];
}

interface ImageData {
  name: ImageSrc;
  count: number;
}

class Carousel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currentImage: 0,
      imageData: this.initalizeImageData(props.images, 0),
    };
  }

  public render() {
    console.table(this.state.imageData);
    const { currentImage } = this.state;

    return (
      <div className="carousel">
        {this.props.images.map((image, index) => (
          <Slide key={index} image={image} isActive={index === currentImage} />
        ))}
        <button className="carousel-btn _left" onClick={this.decrementSlide} />
        <button className="carousel-btn _right" onClick={this.incrementSlide} />
      </div>
    );
  }

  private incrementSlide = () => {
    this.setState(prevState => ({
      currentImage: this.loopImages(
        prevState.currentImage,
        prevState.imageData.length - 1,
        true,
      ),
    }));
    this.setState(prevState => ({
      imageData: this.updateImageData(
        prevState.imageData,
        prevState.currentImage,
      ),
    }));
  };

  private decrementSlide = () => {
    this.setState(prevState => ({
      currentImage: this.loopImages(
        prevState.currentImage,
        prevState.imageData.length - 1,
        false,
      ),
    }));
    this.setState(prevState => ({
      imageData: this.updateImageData(
        prevState.imageData,
        prevState.currentImage,
      ),
    }));
  };

  // loopImages returns the new ImageId position
  // while calculating if the loop has reached
  // either limit (upper/lower)
  private loopImages(
    currentImage: ImageId,
    dataLength: number,
    shouldIncrement: boolean,
  ): ImageId {
    if (shouldIncrement) {
      return currentImage >= dataLength
        ? 0
        : Math.min(currentImage + 1, dataLength);
    } else {
      return currentImage > 0 ? Math.max(currentImage - 1, 0) : dataLength;
    }
  }

  private updateImageData(
    images: ImageData[],
    currentImage: ImageId,
  ): ImageData[] {
    return images.map(
      (image, index) =>
        index === currentImage ? this.incrementImageCount(image) : image,
    );
  }

  private incrementImageCount(image: ImageData): ImageData {
    return { ...image, count: image.count + 1 };
  }

  private initalizeImageData(
    images: Image[],
    currentImage: ImageId,
  ): ImageData[] {
    return images.map((image, index) => {
      return index === currentImage
        ? {
            name: image.src,
            count: 1,
          }
        : {
            name: image.src,
            count: 0,
          };
    });
  }
}

export default Carousel;
