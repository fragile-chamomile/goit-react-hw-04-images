import React from 'react';
import PropTypes from 'prop-types';
import { List } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images }) => {
  return (
    <List>
      {images.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem key={id} webformatURL={webformatURL} tags={tags} />
      ))}
    </List>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
