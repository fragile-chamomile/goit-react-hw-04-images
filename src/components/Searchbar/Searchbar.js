import { useState } from 'react';
import PropTypes from 'prop-types';
import { Header, Form, Button, Label, Input } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

const Searchbar = ({ onSubmit }) => {
  const [searchImage, setSearchImage] = useState('');

  const handleNameChange = event => {
    setSearchImage(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchImage.trim() === '') {
      toast.error('Oops... Try again!', { theme: 'colored' });
      return;
    }

    onSubmit(searchImage);
    setSearchImage('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <ImSearch size={25} />
          <Label>Search</Label>
        </Button>

        <Input
          type="text"
          name="searchImage"
          value={searchImage}
          onChange={handleNameChange}
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
