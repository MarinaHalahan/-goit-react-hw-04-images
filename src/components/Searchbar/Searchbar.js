import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CgSearch } from 'react-icons/cg';
import { Header, SubmitButton, Form, Input } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      alert('Enter a search value');
      return;
    }

    onSubmit(query);
    resetForm();
  };

  const resetForm = () => {
    setQuery('');
  };

  return (
    <Header className="searchbar">
      <Form onSubmit={handleSubmit}>
        <SubmitButton>
          <CgSearch size="2em" aria-label={'Image search'} />
        </SubmitButton>
        <Input
          onChange={handleChange}
          value={query}
          className="input"
          type="text"
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
  onChange: PropTypes.func,
  value: PropTypes.string,
};
