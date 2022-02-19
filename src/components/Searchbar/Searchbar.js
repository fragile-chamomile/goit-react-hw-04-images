import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Form, Button, Label, Input } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    searchImage: '',
  };

  handleNameChange = event => {
    this.setState({ searchImage: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { searchImage } = this.state;

    if (searchImage.trim() === '') {
      toast.warning('Oops... Try again!', { theme: 'colored' });
      return;
    }

    this.props.onSubmit(searchImage);
    this.setState({ searchImage: '' });

    this.reset();
  };

  reset = () => {
    this.setState({
      searchImage: '',
    });
  };

  render() {
    const { searchImage } = this.state;

    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <ImSearch size={25} />
            <Label>Search</Label>
          </Button>

          <Input
            type="text"
            name="searchImage"
            value={searchImage}
            onChange={this.handleNameChange}
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  state: PropTypes.arrayOf(
    PropTypes.shape({
      searchImage: PropTypes.string.isRequired,
    })
  ),
};

export default Searchbar;
