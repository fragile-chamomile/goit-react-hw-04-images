import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// Коомпоненты
import API from '../services/images-api';
import Container from './Container/Container.js';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';

class App extends Component {
  state = {
    searchImage: '',
    gallery: [],
    page: 1,
    error: null,
    status: 'idle',
    showModal: false,
    modalImg: '',
    modalAlt: '',
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
            toast.warning('Sorry. Nothing found!', { theme: 'colored' });
            this.setState({ status: 'idle' });
            return;
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  // Поиск картинки
  handleSearchFormSubmit = searchImageNew => {
    const { searchImage } = this.state;

    if (searchImageNew !== searchImage) {
      this.setState({
        searchImage: searchImageNew,
        page: 1,
        status: 'pending',
      });
    }
  };

  // Методы модального окна
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleClickImg = event => {
    this.setState({
      showModal: true,
      modalImg: event.target.dataset.src,
      modalAlt: event.target.alt,
    });
  };

  //Кнопка Load More
  handleClickBtn = () => {
    this.setState(({ page }) => {
      return { page: page + 1, status: 'pending' };
    });
  };

  render() {
    const { gallery, error, status, showModal, modalImg, modalAlt } =
      this.state;

    if (status === 'idle') {
      return (
        <>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={modalImg} alt={modalAlt} />
            </Modal>
          )}
          <Searchbar onSubmit={this.handleSearchFormSubmit} />
          <ToastContainer autoClose={2000} />
          <Container>
            <ImageGallery onClickImg={this.handleClickImg} images={gallery} />
          </Container>
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <Searchbar onSubmit={this.handleSearchFormSubmit} />
          <Container>
            {gallery.length > 0 && <ImageGallery images={gallery} />}
            <div style={{ margin: '50px auto 0', width: '100px' }}>
              <ThreeDots color="#3f51b5" />
            </div>
          </Container>
        </>
      );
    }

    if (status === 'rejected') {
      return <div>Error: {error.message}</div>;
    }

    if (status === 'resolved') {
      return (
        <>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={modalImg} alt={modalAlt} />
            </Modal>
          )}
          <Searchbar onSubmit={this.handleSearchFormSubmit} />
          <Container>
            <ImageGallery onClickImg={this.handleClickImg} images={gallery} />
            {gallery.length < 12 ? (
              !(<Button handleClickBtn={this.handleClickBtn} />)
            ) : (
              <Button handleClickBtn={this.handleClickBtn} />
            )}
          </Container>
        </>
      );
    }
  }
}

App.propTypes = {
  state: PropTypes.arrayOf(
    PropTypes.shape({
      searchImage: PropTypes.string.isRequired,
      gallery: PropTypes.array.isRequired,
      page: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      showModal: PropTypes.bool.isRequired,
      modalImg: PropTypes.string.isRequired,
      modalAlt: PropTypes.string.isRequired,
    })
  ),
};

export default App;
