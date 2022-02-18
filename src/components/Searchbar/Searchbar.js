import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Form, Button, Label, Input } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = event => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { imageName } = this.state;

    if (imageName.trim() === '') {
      toast.error('💩 Oops... Try again!', { theme: 'colored' });
      return;
    }

    this.props.onSubmit(imageName);
    this.setState({ imageName: '' });

    this.reset();
  };

  reset = () => {
    this.setState({
      imageName: '',
    });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <ImSearch size={25} />
            <Label>Search</Label>
          </Button>

          <Input
            type="text"
            name="imageName"
            value={this.state.imageName}
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
      imageName: PropTypes.string.isRequired,
    })
  ),
};

export default Searchbar;
