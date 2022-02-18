import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from './ImageGallery.styled';

import API from '../../services/images-api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
// import Loader from '../Loader/Loader';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName) {
      this.setState({ images: [], status: 'pending' });

      API.fetchImages(nextName, nextPage)
        .then(images => this.setState({ images, status: 'resolved' }))
        .then(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { images, error, status } = this.state;
    // const { imageName } = this.props;

    if (status === 'idle') {
      return <div>Write image name</div>;
    }
    if (status === 'pending') {
      // return <Loader />;
    }
    if (status === 'rejected') {
      return <div>Error: {error.message}</div>;
    }
    if (status === 'resolved') {
      return (
        <List>
          {images.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
            />
          ))}
        </List>
      );
    }
  }
}

ImageGallery.propTypes = {
  state: PropTypes.arrayOf(
    PropTypes.shape({
      images: PropTypes.array.isRequired,
    })
  ),
};

export default ImageGallery;
