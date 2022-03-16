import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// Коомпоненты
import fetchImages from '../services/images-api';
import Container from './Container/Container.js';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';

const App = () => {
  const [searchImage, setSearchImage] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [perPage, setPerPage] = useState(12);

  // Добавление галереи картинок с api
  useEffect(() => {
    if (!searchImage) {
      return;
    }

    setStatus('pending');

    fetchImages(searchImage, page, perPage)
      .then(({ hits }) => {
        const images = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return { id, webformatURL, largeImageURL, tags };
        });

        if (images.length === 0) {
          toast.warning('Sorry. Nothing found!', { theme: 'colored' });
          setStatus('idle');
          return;
        }

        if (page > 1) {
          setGallery(prevImages => [...prevImages, ...images]);
          setStatus('resolved');
          return;
        }

        setGallery([...images]);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [searchImage, page, perPage]);

  // Поиск картинки
  const handleSearchFormSubmit = value => {
    setSearchImage(value);
    setPage(1);
    setPerPage(12);
    setStatus('pending');
  };

  // Методы модального окна
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClickImg = event => {
    setShowModal(true);
    setModalImg(event.target.dataset.src);
    setModalAlt(event.target.alt);
  };

  //Кнопка Load More
  const handleClickBtn = () => {
    setPage(page + 1);
    setStatus('pending');
  };

  if (status === 'idle') {
    return (
      <>
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={modalImg} alt={modalAlt} />
          </Modal>
        )}
        <Searchbar onSubmit={handleSearchFormSubmit} />
        <ToastContainer autoClose={2000} />
        <Container>
          <ImageGallery onClickImg={handleClickImg} images={gallery} />
        </Container>
      </>
    );
  }

  if (status === 'pending') {
    return (
      <>
        <Searchbar onSubmit={handleSearchFormSubmit} />
        <Container>
          {page > 1 && <ImageGallery images={gallery} />}
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
          <Modal onClose={toggleModal}>
            <img src={modalImg} alt={modalAlt} />
          </Modal>
        )}
        <Searchbar onSubmit={handleSearchFormSubmit} />
        <Container>
          <ImageGallery onClickImg={handleClickImg} images={gallery} />
          {gallery.length < perPage ? (
            !(<Button handleClickBtn={handleClickBtn} />)
          ) : (
            <Button handleClickBtn={handleClickBtn} />
          )}
        </Container>
      </>
    );
  }
};

export default App;
