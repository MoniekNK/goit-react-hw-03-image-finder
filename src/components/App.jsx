import React, { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '754704-15f293fdc79a851fbfbf7bf56';

export class App extends Component {
  state = {
    images: { total: 0, hits: [] },
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: '',
  };

  fetchImages = () => {
    const { query, page } = this.state;
    const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ isLoading: true });

    axios
      .get(url)
      .then(response => {
        if (response.data.hits.length === 0) {
          Notiflix.Notify.warning(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        if (page === 1) {
          Notiflix.Notify.success(
            `Hooray! We found ${response.data.totalHits} images.`
          );
        }

        if (response.data.totalHits <= page * 12) {
          Notiflix.Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
        }

        this.setState(prevState => ({
          images: {
            total: response.data.totalHits,
            hits: [...prevState.images.hits, ...response.data.hits],
          },
          page: prevState.page + 1,
        }));
      })
      .catch(error => {
        Notiflix.Notify.failure(
          'Ooops... Something went wrong! Please, try again.'
        );
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  handleSearch = query => {
    this.setState(
      { query, page: 1, images: { total: 0, hits: [] } },
      this.fetchImages
    );
  };

  handleLoadMore = () => {
    this.fetchImages();
  };

  handleClickImage = imageUrl => {
    this.setState({ showModal: true, selectedImage: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  render() {
    const { images, showModal, selectedImage, isLoading, page } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearch} />

        <ImageGallery
          images={images.hits}
          onImageClick={this.handleClickImage}
        />
        {images.total > (page - 1) * 12 && !isLoading && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        {isLoading && <Loader />}
        {showModal && (
          <Modal
            imageUrl={selectedImage}
            onCloseModal={this.handleCloseModal}
          />
        )}
      </>
    );
  }
}
