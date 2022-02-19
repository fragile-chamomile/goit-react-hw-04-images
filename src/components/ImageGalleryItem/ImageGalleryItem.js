import React from 'react';
import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onClick }) => (
  <Item onClick={onClick}>
    <Image src={webformatURL} alt={tags} data-src={largeImageURL} />
  </Item>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
