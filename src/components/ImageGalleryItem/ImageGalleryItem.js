import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  render() {
    const { imageUrl, imageTags, onImageClick, forwardRef } = this.props;
    return (
      <li className={css.ImageGalleryItem} ref={forwardRef}>
        <img
          className={css.ImageGalleryItemImage}
          src={imageUrl}
          alt={imageTags}
          onClick={onImageClick}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageTags: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
  forwardRef: PropTypes.object,
};
