import React, { useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ButtonMore } from './Button/Button';
import { fetchImage } from '../services/api';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { useEffect } from 'react';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(null);
  const [largeImg, setlargeImg] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function fetch(page, query) {
      try {
        setLoading(true);
        const data = await fetchImage(page, query);
        const images = data.hits;
        setImages(prevImages => [...prevImages, ...images]);
        setTotal(data.totalHits);

        if (images.length === 0) {
          alert('Nothing was found for your request');
          setLoading(false);
          return;
        }

        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }
    fetch(page, query);
    setError(null);
  }, [page, query]);

  const addSearchWord = query => {
    setPage(1);
    setQuery(query);
    setImages([]);
  };

  const addOnePage = () => {
    if (page < total / 12) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const openLargeImg = e => {
    const { src } = e.target;

    const image = images.find(image => {
      return image.webformatURL === src;
    });

    setlargeImg(image.largeImageURL);
  };

  const closeModal = () => setlargeImg(null);

  return (
    <div className="app">
      {largeImg && <Modal onClick={closeModal}>{largeImg}</Modal>}
      <Searchbar onSubmit={addSearchWord} />
      {error && <span>"Try again later"</span>}
      {loading && <Loader />}

      <ImageGallery onClick={openLargeImg} images={images}></ImageGallery>
      {images.length > 0 && <ButtonMore onClick={addOnePage}></ButtonMore>}
    </div>
  );
};
