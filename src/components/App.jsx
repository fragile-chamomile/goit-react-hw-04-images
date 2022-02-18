import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import {  } from './App.styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TailSpin from '../components/Loader/Loader';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import API from '../services/images-api';
import Searchbar from '../components/Searchbar/Searchbar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
// import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';

class App extends Component {
  state = {
    searchImage: '',
    gallery: [],
    page: 1,
    error: null,
    status: 'idle',
  };

  // Добавление галереи картинок с api
  componentDidUpdate(prevProps, prevState) {
    const prevImage = prevState.searchImage;
    const nextImage = this.state.searchImage;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (nextPage > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }

    if (prevImage !== nextImage) {
      this.setState({ gallery: [], status: 'pending' });
    }

    if (prevImage !== nextImage || prevPage !== nextPage) {
      API.fetchImages(nextImage, nextPage)
        .then(({ hits }) => {
          const images = hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return { id, webformatURL, largeImageURL, tags };
            }
          );

          if (images.length > 0) {
            this.setState(prevState => {
              return {
                gallery: [...prevState.gallery, ...images],
                status: 'resolved',
              };
            });
          } else {
            alert(`On request ${nextImage} - nothing find.`);
            this.setState({ status: 'idle' });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  // Поиск картинки
  handleSearchFormSubmit = searchImageNew => {
    if (searchImageNew !== this.state.searchImage) {
      this.setState({
        searchImage: searchImageNew,
        page: 1,
        status: 'pending',
      });
    }
  };

  render() {
    const { gallery, error, status } = this.state;

    if (status === 'idle') {
      <Searchbar onSubmit={this.handleSearchFormSubmit} />;
      <ToastContainer autoClose={2000} />;
    }
    if (status === 'pending') {
      <>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />;
        {gallery.length > 0 && <ImageGallery images={gallery} />}
        <TailSpin />;
      </>;
    }
    if (status === 'rejected') {
      return <div>Error: {error.message}</div>;
    }
    if (status === 'resolved') {
      return (
        <>
          {/* {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalImg} alt={modalAlt} />
          </Modal>
        )} */}
          <Searchbar onSubmit={this.handleSearchFormSubmit} />;
          <ImageGallery images={gallery} />
          <Button />
          <ToastContainer autoClose={2000} />
        </>
      );
    }
  }
}

App.propTypes = {
  state: PropTypes.arrayOf(
    PropTypes.shape({
      searchImage: PropTypes.string.isRequired,
      images: PropTypes.array.isRequired,
      page: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ),
};

export default App;
