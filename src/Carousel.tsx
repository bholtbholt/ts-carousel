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
        <button className="carousel-btn _left" onClick={this.decrementSlide}>
          Decrement
        </button>
        <button className="carousel-btn _right" onClick={this.incrementSlide}>
          Increment
        </button>
        {this.props.images.map((image, index) => (
          <Slide key={index} image={image} isActive={index === currentImage} />
        ))}
      </div>
    );
  }

  private incrementSlide = () => {
    this.setState(prevState => ({
      currentImage: Math.min(
        prevState.currentImage + 1,
        prevState.imageData.length - 1,
      ),
      imageData: this.updateImageData(
        prevState.imageData,
        this.state.currentImage + 1,
      ),
    }));
  };

  private decrementSlide = () => {
    this.setState(prevState => ({
      currentImage: Math.max(prevState.currentImage - 1, 0),
      imageData: this.updateImageData(
        prevState.imageData,
        this.state.currentImage - 1,
      ),
    }));
  };

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
