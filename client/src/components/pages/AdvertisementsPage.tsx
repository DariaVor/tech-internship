import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Grid2 from '@mui/material/Grid2';
import { useGetAdvertisementsQuery } from '../../features/api/accountApi';
import AdvertisementCard from '../ui/AdvertisementCard';
import AdvertisementForm from '../ui/AdvertisementForm';
import Loader from '../ui/Loader';
import PaginationControl from '../ui/PaginationControl';
import ItemsPerPageControl from '../ui/ItemsPerPageControl';
import type { AdvertisementType } from '../../types/advertisementTypes';
import SearchBar from '../ui/SearchBar';
import SortControl from '../ui/SortControl';

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50];
const SORT_OPTIONS = [
  { value: '', label: 'Без сортировки' },
  { value: 'priceAsc', label: 'Цена: по возрастанию' },
  { value: 'priceDesc', label: 'Цена: по убыванию' },
  { value: 'viewsAsc', label: 'Просмотры: по возрастанию' },
  { value: 'viewsDesc', label: 'Просмотры: по убыванию' },
  { value: 'likesAsc', label: 'Лайки: по возрастанию' },
  { value: 'likesDesc', label: 'Лайки: по убыванию' },
];

export default function AdvertisementsPage(): JSX.Element {
  const { data: advertisements = [], isLoading } = useGetAdvertisementsQuery();
  const [filteredAds, setFilteredAds] = useState(advertisements);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAd, setEditAd] = useState<AdvertisementType | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    let ads = [...advertisements];

    if (searchTerm.length >= 3) {
      ads = ads.filter((ad) => ad.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    switch (sortOption) {
      case 'priceAsc':
        ads.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        ads.sort((a, b) => b.price - a.price);
        break;
      case 'viewsAsc':
        ads.sort((a, b) => a.views - b.views);
        break;
      case 'viewsDesc':
        ads.sort((a, b) => b.views - a.views);
        break;
      case 'likesAsc':
        ads.sort((a, b) => a.likes - b.likes);
        break;
      case 'likesDesc':
        ads.sort((a, b) => b.likes - a.likes);
        break;
      default:
        break;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredAds(ads.slice(startIndex, endIndex));
  }, [advertisements, searchTerm, sortOption, itemsPerPage, currentPage]);

  if (isLoading) {
    return <Loader />;
  }

  if (!advertisements || advertisements.length === 0) {
    return <div>Объявления не найдены</div>;
  }

  const totalPages = Math.ceil(advertisements.length / itemsPerPage);

  const handleCardClick = (id: string): void => {
    navigate(`/advertisements/${id}`);
  };

  const openAddModal = (): void => {
    setEditAd(null);
    setIsModalOpen(true);
  };

  const handleModalClose = (): void => {
    setIsModalOpen(false);
    setEditAd(null);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number): void => {
    setCurrentPage(page);
  };

  return (
    <>
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={4} mb={4} mt={4}>
        <SearchBar handleSearchChange={setSearchTerm} />

        <SortControl
          sortOption={sortOption}
          handleSortChange={(e) => setSortOption(e.target.value)}
          options={SORT_OPTIONS}
        />

        <ItemsPerPageControl
          itemsPerPage={itemsPerPage}
          handleItemsPerPageChange={(e) => setItemsPerPage(Number(e.target.value))}
          options={ITEMS_PER_PAGE_OPTIONS}
        />

        <Button variant="contained" color="primary" onClick={openAddModal}>
          Разместить объявление
        </Button>
      </Box>

      <Grid2 container spacing={4} justifyContent="center" sx={{ padding: '0 16px' }}>
        {filteredAds.map((advertisement) => (
          <Grid2 key={advertisement.id}>
            <AdvertisementCard advertisement={advertisement} onCardClick={handleCardClick} />
          </Grid2>
        ))}
      </Grid2>

      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      {isModalOpen && <AdvertisementForm advertisement={editAd} onClose={handleModalClose} />}
    </>
  );
}
