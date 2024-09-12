import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
};

export default function DeleteModal({ open, onClose, onConfirmDelete }: Props): JSX.Element {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Вы уверены, что хотите удалить объявление?
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
          <Button onClick={onConfirmDelete} variant="contained" color="error">
            Удалить
          </Button>
          <Button onClick={onClose} color="primary" variant="outlined">
            Отмена
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
