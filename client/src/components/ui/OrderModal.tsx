import React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import type { OrderType } from '../../types/orderTypes';

type OrderModalProps = {
  order: OrderType;
  open: boolean;
  onClose: () => void;
};

function formatPrice(price: number | undefined): string {
  if (price === undefined) {
    return 'Цена не указана';
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export default function OrderModal({ order, open, onClose }: OrderModalProps): JSX.Element {
  const navigate = useNavigate();
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>
        Товары заказа №{order.id}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 13, top: 1 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {order.items.map((item) => (
          <Box
            key={item.id}
            p={2}
            onClick={() => navigate(`/advertisements/${item.id}`)}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              border: '1px solid #ddd',
              borderRadius: '8px',
              mb: 2,
            }}
          >
            <img
              src={item.imageUrl || '/logo.svg'}
              alt={item.name}
              style={{ width: '100px', height: 'auto', borderRadius: '8px' }}
            />
            <Box>
              <Typography variant="body1">{item.name}</Typography>
              <Typography>Цена: {formatPrice(item.price)} ₽</Typography>
              <Typography>Количество: {item.count}</Typography>
            </Box>
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
}
