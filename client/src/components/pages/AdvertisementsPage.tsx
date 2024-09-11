import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useGetAdvertisementsQuery } from '../../features/api/accountApi';
import AdvertisementCard from '../ui/AdvertisementCard';
import AddAdvertisements from '../ui/AddAdvertisements';
import SearchBar from '../ui/SearchBar';
import SortControl from '../ui/SortControl';
import PaginationControl from '../ui/PaginationControl';
import ItemsPerPageControl from '../ui/ItemsPerPageControl';

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20];
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
  const { data: advertisements = [] } = useGetAdvertisementsQuery();
  const [filteredAds, setFilteredAds] = useState(advertisements);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  const totalPages = Math.ceil(advertisements.length / itemsPerPage);

  return (
    <>
      <Box display="flex" flexWrap="wrap" justifyContent="center" mt={3}>
        <AddAdvertisements />
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="center" mt={3}>
        <SearchBar handleSearchChange={setSearchTerm} />
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="center" mt={3}>
        <SortControl
          sortOption={sortOption}
          handleSortChange={(e) => setSortOption(e.target.value)}
          options={SORT_OPTIONS}
        />
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="center" mt={3}>
        <ItemsPerPageControl
          itemsPerPage={itemsPerPage}
          handleItemsPerPageChange={(e) => setItemsPerPage(Number(e.target.value))}
          options={ITEMS_PER_PAGE_OPTIONS}
        />
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="space-evenly" mt={2}>
        {filteredAds?.map((advertisement) => (
          <Box m={3} key={advertisement.id}>
            <AdvertisementCard advertisement={advertisement} />
          </Box>
        ))}
      </Box>

      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        handlePreviousPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        handleNextPage={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      />
    </>
  );
}
