import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import {  } from './App.styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from '../components/Searchbar/Searchbar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Modal from '../components/Modal/Modal';

class App extends Component {
  state = {
    imageName: '',
  };

  handleSearchFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <>
        {/* {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalImg} alt={modalAlt} />
          </Modal>
        )} */}
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        <ImageGallery imageName={this.state.imageName} />
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}

App.propTypes = {
  state: PropTypes.arrayOf(
    PropTypes.shape({
      imageName: PropTypes.string.isRequired,
    })
  ),
};

export default App;
