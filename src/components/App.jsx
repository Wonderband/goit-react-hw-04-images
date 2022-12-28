import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';
import { getImages } from 'services/getImages';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export const App = () => {
  const perPage = 15;
  const [searchTerm, setSearchTerm] = useState('');
  // const [perPage, setPerPage] = useState(15);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [imgTotalNumber, setImgTotalNumber] = useState(0);
  const [modalUrl, setModalUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = e => {
    e.preventDefault();
    const searchWord = e.currentTarget.input.value;
    if (!searchWord) {
      Notiflix.Notify.failure(`Empty search!`);
      return;
    }
    if (searchWord === searchTerm) return;
    setSearchTerm(searchWord);
    setPage(1);
    setImages([]);
    setImgTotalNumber(0);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!searchTerm) return;
    getImages(searchTerm, perPage, page)
      .then(data => {
        setImgTotalNumber(data.totalHits);
        return data.hits;
      })
      .then(images => {
        if (!images.length) Notiflix.Notify.failure(`No images found!`);
        else setImages(prevImages => [...prevImages, ...images]);
      })
      .catch(err => Notiflix.Notify.failure(err.message))
      .finally(() => setIsLoading(false));
  }, [searchTerm, page, perPage]);

  const modalHandler = e => setModalUrl(e.target.dataset.modal);

  const showModal = () => modalUrl.length > 0;

  const hideModal = () => setModalUrl('');

  const showNextPage = () => {
    setPage(page => page + 1);
    setIsLoading(true);
  };

  return (
    <>
      <SearchBar submitHandler={submitHandler} />
      <ImageGallery images={images} clickHandler={modalHandler} />
      <Loader isLoading={isLoading} />
      <Button
        imagesQtt={imgTotalNumber}
        page={page}
        perPage={perPage}
        loadMore={showNextPage}
      />
      {showModal() && <Modal imgUrl={modalUrl} hideModal={hideModal} />}
    </>
  );
};
