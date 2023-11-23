import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.lastNewImageRef = createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.images !== this.props.images) {
      this.scrollToLastNewImage();
    }
  }

  scrollToLastNewImage = () => {
    if (this.lastNewImageRef.current) {
      this.lastNewImageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  };

  render() {
    const { images, onImageClick } = this.props;

    return (
      <ul className={css.ImageGallery}>
        {images.map((image, index) => (
          <ImageGalleryItem
            key={image.id}
            imageUrl={image.webformatURL}
            imageTags={image.tags}
            onImageClick={() => onImageClick(image.largeImageURL)}
            forwardRef={
              index === images.length - 1 ? this.lastNewImageRef : null
            }
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
