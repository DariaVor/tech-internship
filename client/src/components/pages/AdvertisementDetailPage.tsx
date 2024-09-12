import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useGetAdvertisementByIdQuery } from '../../features/api/accountApi';
import Loader from '../ui/Loader';
import AdvertisementForm from '../ui/AdvertisementForm';

const ContentBox = styled(Box)({
  maxWidth: 800,
  margin: '2rem auto',
  padding: '2rem',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  backgroundColor: '#fff',
  position: 'relative',
});

const ImageBox = styled(Box)({
  position: 'relative',
  margin: '1rem 0',
  cursor: 'pointer',
});

const StyledImage = styled('img')({
  width: '100%',
  height: 'auto',
  maxHeight: 400,
  objectFit: 'cover',
  borderRadius: '8px',
});

const DescriptionBox = styled(Box)({
  textAlign: 'left',
  margin: '1rem 0',
});

const ModalImage = styled('img')({
  width: 'auto',
  maxWidth: '90vw',
  maxHeight: '80vh',
  borderRadius: '8px',
});

const CloseButton = styled(Button)({
  position: 'absolute',
  top: '16px',
  right: '16px',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

function formatPrice(price: number | undefined): string {
  if (price === undefined) {
    return 'Цена не указана';
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export default function AdvertisementDetailPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { data: advertisement, isLoading } = useGetAdvertisementByIdQuery(id || '');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  if (!advertisement) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Объявление не найдено</Typography>
      </Box>
    );
  }

  const handleEditClick = (): void => {
    setIsEditModalOpen(true);
  };

  const handleModalClose = (): void => {
    setIsEditModalOpen(false);
  };

  const handleImageClick = (): void => {
    setIsImageModalOpen(true);
  };

  const handleImageModalClose = (): void => {
    setIsImageModalOpen(false);
  };

  const handleDescriptionToggle = (): void => {
    setShowFullDescription((prev) => !prev);
  };

  const imageUrl = advertisement.imageUrl || '/logo.svg';
  const description = advertisement.description || 'Описание отсутсвует';
  const previewLength = 200;
  const showPreview = description.length > previewLength;

  return (
    <Box sx={{ padding: '2rem' }}>
      <ContentBox>
        <Typography variant="h4" gutterBottom>
          {advertisement.name}
        </Typography>
        <ImageBox onClick={handleImageClick}>
          <StyledImage src={imageUrl} alt={advertisement.name} />
        </ImageBox>
        <Typography variant="h6" gutterBottom>
          Цена: {formatPrice(advertisement.price)} ₽
        </Typography>
        <DescriptionBox>
          <Typography variant="body1">
            {showPreview ? (
              <>
                {showFullDescription ? description : `${description.slice(0, previewLength)}...`}
                <Button onClick={handleDescriptionToggle} color="primary">
                  {showFullDescription ? 'Скрыть' : 'Читать далее'}
                </Button>
              </>
            ) : (
              description
            )}
          </Typography>
        </DescriptionBox>
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={2}
        >
          <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
            Назад
          </Button>
          <Button variant="contained" color="success" onClick={handleEditClick}>
            Редактировать
          </Button>
        </Box>

        {isEditModalOpen && (
          <AdvertisementForm advertisement={advertisement} onClose={handleModalClose} />
        )}

        <Modal
          open={isImageModalOpen}
          onClose={handleImageModalClose}
          aria-labelledby="image-modal-title"
          aria-describedby="image-modal-description"
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              p: 2,
            }}
            onClick={(e) => {
              if (e.currentTarget === e.target) handleImageModalClose();
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <CloseButton onClick={handleImageModalClose}>
                <CloseIcon />
              </CloseButton>
              <ModalImage src={imageUrl} alt={advertisement.name} />
            </Box>
          </Box>
        </Modal>
      </ContentBox>
    </Box>
  );
}
