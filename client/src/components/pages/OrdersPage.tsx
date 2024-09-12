import React, { useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useGetOrdersQuery, useUpdateOrderMutation } from '../../features/api/accountApi';
import Loader from '../ui/Loader';
import OrderModal from '../ui/OrderModal';
import type { OrderType } from '../../types/orderTypes';

const OrderStatus = {
  Создан: 0,
  Оплачен: 1,
  Доставляется: 2,
  'Доставлен в пункт выдачи': 3,
  Получен: 4,
  Заархивирован: 5,
  Возврат: 6,
  Все: '',
} as const;

function formatPrice(price: number | undefined): string {
  if (price === undefined) {
    return 'Цена не указана';
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function formatDateTime(date: string | number | Date): string {
  return new Date(date).toLocaleString('ru-RU');
}

export default function OrdersPage(): JSX.Element {
  const { data: orders, isLoading } = useGetOrdersQuery();
  const [updateOrder] = useUpdateOrderMutation();
  const [filterStatus, setFilterStatus] = useState<number | ''>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  if (!orders) {
    return <Typography>Заказы не найдены</Typography>;
  }

  const handleFilterChange = (event: SelectChangeEvent<number>): void => {
    setFilterStatus(event.target.value as number);
  };

  const handleSortChange = (event: SelectChangeEvent<'asc' | 'desc' | 'not-sorted'>): void => {
    setSortOrder(
      event.target.value === 'not-sorted' ? null : (event.target.value as 'asc' | 'desc'),
    );
  };

  const filteredOrders =
    filterStatus === '' ? orders : orders.filter((order) => order.status === filterStatus);

  const sortedOrders = sortOrder
    ? [...filteredOrders].sort((a, b) =>
        sortOrder === 'asc' ? a.total - b.total : b.total - a.total,
      )
    : filteredOrders;

  const handleItemClick = (order: OrderType): void => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  const handleUpdateOrderClick = async (order: OrderType): Promise<void> => {
    try {
      await updateOrder({
        ...order,
        status: OrderStatus.Получен,
        finishedAt: new Date().toISOString(),
      }).unwrap();
    } catch (error) {
      console.error('Ошибка при обновлении статуса заказа:', error);
    }
  };

  return (
    <Box p={3}>
      <Box
        mb={2}
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={2}
        flexWrap="wrap"
      >
        <FormControl sx={{ flex: 1 }}>
          <InputLabel>Статус</InputLabel>
          <Select value={filterStatus} onChange={handleFilterChange} label="Статус">
            {Object.entries(OrderStatus).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ flex: 1 }}>
          <InputLabel>Сортировать сумму</InputLabel>
          <Select
            value={sortOrder || 'not-sorted'}
            onChange={handleSortChange}
            label="Сортировать заказы"
          >
            <MenuItem value="not-sorted">Без сортировки</MenuItem>
            <MenuItem value="asc">
              <ArrowUpwardIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              По возрастанию
            </MenuItem>
            <MenuItem value="desc">
              <ArrowDownwardIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              По убыванию
            </MenuItem>
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
              <Typography>Дата создания: {formatDateTime(order.createdAt)}</Typography>
              <Typography>Статус: {Object.keys(OrderStatus)[order.status]}</Typography>
              {order.finishedAt && (
                <Typography>Дата завершения: {formatDateTime(order.finishedAt)}</Typography>
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

              {order.status === OrderStatus.Получен ? (
                <Button
                  disabled
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
              ) : (
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
        <OrderModal order={selectedOrder} open={modalOpen} onClose={handleModalClose} />
      )}
    </Box>
  );
}
