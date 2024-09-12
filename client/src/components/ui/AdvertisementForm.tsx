import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Modal from 'react-modal';
import type { AdvertisementFormType, AdvertisementType } from '../../types/advertisementTypes';
import {
  useAddAdvertisementMutation,
  useUpdateAdvertisementMutation,
} from '../../features/api/accountApi';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 6,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '600px',
    padding: '20px',
  },
};

type AdvertisementFormProps = {
  advertisement?: AdvertisementType | null;
  onClose: () => void;
};

export default function AdvertisementForm({
  advertisement,
  onClose,
}: AdvertisementFormProps): JSX.Element {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [input, setInput] = useState<AdvertisementFormType>({
    name: '',
    description: '',
    imageUrl: '',
    price: 0,
  });

  const [addAdvertisement] = useAddAdvertisementMutation();
  const [updateAdvertisement] = useUpdateAdvertisementMutation();

  useEffect(() => {
    if (advertisement) {
      setInput({
        name: advertisement.name,
        description: advertisement.description,
        imageUrl: advertisement.imageUrl,
        price: advertisement.price,
      });
    } else {
      setInput({
        name: '',
        description: '',
        imageUrl: '',
        price: 0,
      });
    }
  }, [advertisement]);

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

  const closeModal = (): void => {
    resetFields();
    onClose();
    setModalIsOpen(false);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (advertisement) {
      const updatedAdvertisement = {
        ...advertisement,
        ...input,
      };

      updateAdvertisement(updatedAdvertisement)
        .unwrap()
        .then(() => {
          closeModal();
        })
        .catch((error) => {
          console.error('Ошибка при редактировании объявления: ', error);
        });
    } else {
      const newAdvertisement = {
        ...input,
        createdAt: new Date().toISOString(),
        views: 0,
        likes: 0,
      };

      addAdvertisement(newAdvertisement)
        .unwrap()
        .then(() => {
          resetFields();
          closeModal();
        })
        .catch((error) => {
          console.error('Ошибка при добавлении объявления: ', error);
        });
    }
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
          slotProps={{
            htmlInput: {
              title: 'Укажите название объявления',
            },
          }}
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
          {advertisement ? 'Сохранить изменения' : 'Добавить'}
        </Button>
        <Button variant="outlined" onClick={closeModal} sx={{ ml: 2 }}>
          Закрыть
        </Button>
      </Box>
    </form>
  );

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
      {modalContent}
    </Modal>
  );
}
