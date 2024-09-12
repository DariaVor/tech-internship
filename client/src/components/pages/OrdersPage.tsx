import React, { useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useGetOrdersQuery, useUpdateOrderMutation } from '../../features/api/accountApi';
import Loader from '../ui/Loader';
import type { OrderType } from '../../types/orderTypes';

const OrderStatus = {
  Создан: 0,
  Оплачен: 1,
  Доставляется: 2,
  'Доставлен в пункт выдачи': 3,
  Получен: 4,
  Заархивирован: 5,
  Возврат: 6,
} as const;

function formatPrice(price: number | undefined): string {
  if (price === undefined) {
    return 'Цена не указана';
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export default function OrdersPage(): JSX.Element {
  const { data: orders, isLoading } = useGetOrdersQuery();
  const [updateOrder] = useUpdateOrderMutation();
  const [filterStatus, setFilterStatus] = useState<number | ''>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  if (!orders) {
    return <Typography>Заказы не найдены</Typography>;
  }

  const handleFilterChange = (event: SelectChangeEvent<number>): void => {
    setFilterStatus(event.target.value as number);
  };

  const handleSortChange = (event: SelectChangeEvent<'asc' | 'desc'>): void => {
    setSortOrder(event.target.value as 'asc' | 'desc');
  };

  const filteredOrders =
    filterStatus === '' ? orders : orders.filter((order) => order.status === filterStatus);

  const sortedOrders = [...filteredOrders].sort((a, b) =>
    sortOrder === 'asc' ? a.total - b.total : b.total - a.total,
  );

  const handleItemClick = (order: OrderType): void => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  const handleUpdateOrderClick = async (order: OrderType): Promise<void> => {
    try {
      await updateOrder({ ...order, status: OrderStatus.Получен }).unwrap();
    } catch (error) {
      console.error('Ошибка при обновлении статуса заказа:', error);
    }
  };

  return (
    <Box p={3}>
      <Box mb={2}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Статус</InputLabel>
          <Select value={filterStatus} onChange={handleFilterChange} label="Status">
            {Object.entries(OrderStatus).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Сортировать заказы</InputLabel>
          <Select value={sortOrder} onChange={handleSortChange} label="Sort Order">
            <MenuItem value="asc">В порядке возрастания</MenuItem>
            <MenuItem value="desc">В порядке убывания</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        {sortedOrders.map((order) => (
          <Card key={order.id} variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">Заказ №{order.id}</Typography>
              <Typography>
                Количество товаров: {order.items.reduce((sum, item) => sum + item.count, 0)}
              </Typography>
              <Typography>Сумма заказа: {formatPrice(order.total)} ₽</Typography>
              <Typography>
                Дата создания: {new Date(order.createdAt).toLocaleDateString('ru-RU')}
              </Typography>
              <Typography>Статус: {Object.keys(OrderStatus)[order.status]}</Typography>
              {order.finishedAt && (
                <Typography>
                  Дата завершения: {new Date(order.finishedAt).toLocaleDateString('ru-RU')}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 1 }}
                onClick={() => handleItemClick(order)}
              >
                Показать все товары
              </Button>

              {order.status !== OrderStatus.Получен && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    void (async () => {
                      try {
                        await handleUpdateOrderClick(order);
                      } catch (error) {
                        console.error('Ошибка при обновлении статуса заказа:', error);
                      }
                    })();
                  }}
                >
                  Завершить заказ
                </Button>
              )}
            </CardActions>
          </Card>
        ))}
      </Box>

      {selectedOrder && (
        <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="md">
          <DialogTitle>Товары заказа №{selectedOrder.id}</DialogTitle>
          <DialogContent>
            {selectedOrder.items.map((item) => (
              <Box
                key={item.id}
                p={2}
                onClick={() => navigate(`/advertisements/${item.id}`)}
                sx={{ cursor: 'pointer' }}
              >
                <img
                  src={item.imageUrl || '/logo.svg'}
                  alt={item.name}
                  style={{ width: '100px' }}
                />
                <Typography variant="body1">{item.name}</Typography>
                <Typography>Цена: {formatPrice(item.price)} ₽</Typography>
                <Typography>Количество: {item.count}</Typography>
              </Box>
            ))}
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}
