import React, { useState } from 'react';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import Modal from 'react-modal';
import type { AdvertisementFormType } from '../../types/advertisementTypes';
import { useAddAdvertisementMutation } from '../../features/api/accountApi';

Modal.setAppElement('#root');

export default function AddAdvertisements(): JSX.Element {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [input, setInput] = useState<AdvertisementFormType>({
    name: '',
    description: '',
    imageUrl: '',
    price: 0,
  });

  const [addAdvertisement] = useAddAdvertisementMutation();

  const resetFields = (): void => {
    setInput({
      name: '',
      description: '',
      imageUrl: '',
      price: 0,
    });
  };

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openModal = (): void => {
    setModalIsOpen(true);
  };

  const closeModal = (): void => {
    resetFields();
    setModalIsOpen(false);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const advertisement = {
      ...input,
      createdAt: new Date().toISOString(),
      views: 0,
      likes: 0,
    };

    addAdvertisement(advertisement)
      .unwrap()
      .then(() => {
        resetFields();
        closeModal();
      })
      .catch((error) => {
        console.error('Ошибка при добавлении объявления: ', error);
      });
  };

  const modalContent = (
    <form onSubmit={submitHandler}>
      <Box sx={{ mb: 2 }}>
        <TextField
          name="name"
          label="Название"
          value={input.name}
          onChange={changeHandler}
          fullWidth
          required
          slotProps={{ htmlInput: { title: 'Название обязательно' } }}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          name="description"
          label="Описание"
          multiline
          value={input.description}
          onChange={changeHandler}
          fullWidth
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          name="price"
          label="Цена"
          type="number"
          value={input.price}
          onChange={changeHandler}
          fullWidth
          required
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">₽</InputAdornment>,
            },
            htmlInput: {
              min: 0,
              title: 'Цена должна быть больше или равна 0',
            },
          }}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          name="imageUrl"
          label="Ссылка на изображение"
          value={input.imageUrl}
          onChange={changeHandler}
          fullWidth
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Button type="submit" variant="contained" color="success">
          Добавить
        </Button>
        <Button variant="contained" onClick={closeModal} sx={{ ml: 2 }}>
          Закрыть
        </Button>
      </Box>
    </form>
  );

  return (
    <div>
      <Button variant="contained" color="primary" onClick={openModal}>
        Разместить объявление
      </Button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
}
