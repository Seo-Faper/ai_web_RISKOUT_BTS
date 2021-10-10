import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';

import AppliedFilters from '../components/DetectionStatus/AppliedFilter';
import DetectionTable from '../components/DetectionStatus/DetectionTable';
import FilterBar from '../components/DetectionStatus/FilterBar';
import Search from '../components/Search';
import SecretsDetailModal from '../components/Modal/SecretsDetailModal';
import { useSessionStorage } from '../js/util';

import { useRecoilValue } from 'recoil';
import { filterListState } from '../atoms/filterListState';
import { searchListState } from '../atoms/searchListState';
import useSeacrh from '../hooks/useSearch';

export default function DetectionStatus() {
  useSeacrh(); // filterList 변경될 때마다 검색.

  const filterList = useRecoilValue(filterListState);
  const searchList = useRecoilValue(searchListState);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [detailModalData, setDetailModalData] = useState({
    id: 0,
    created_at: '',
    site_url: '',
    thumbnail_url: '',
    category: '',
    title: '',
    contentBody: '',
    summarized: '',
    positivity: 0,
    entities: {},
  });

  const showDetailModal = (id) => {
    const data = searchList.contents.filter((x) => x.id == id).pop(0); // popping doesn't affect original array
    console.log(
      data,
      searchList.contents.filter((x) => x.id == id),
      searchList
    );
    setDetailModalData(data);
    setDetailModalOpen(true);
  };

  const [getCart, addCart] = useSessionStorage('riskoutShoppingCart');

  const scrapArticle = (id) => {
    addCart(id);
    console.log('TODO: scrap article ', id);
    alert('TODO: scrap article ' + id + ' ' + getCart());
  };

  const analyzePage = (id) => {
    console.log('TODO: analyzePage article ', id);
    alert('TODO: analyzePage article ' + id);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={10} container spacing={3} direction="column">
        <Grid width="100%" item>
          <Typography mt={1} variant="h5" sx={{ fontWeight: 'bold' }}>
            탐지 현황
          </Typography>
          <Search />
          <Typography mt={3} color="primary">
            {searchList.contentsLength}개 결과 | {filterList.length}개 필터
            적용중
          </Typography>
        </Grid>
        <Grid width="100%" item justify="center">
          <AppliedFilters />
        </Grid>
        <Grid item justify="center">
          <DetectionTable
            showDetailModal={showDetailModal}
            scrapArticle={scrapArticle}
          />
        </Grid>
      </Grid>
      <Grid item xs={0} md={2} display={{ xs: 'none', md: 'block' }}>
        <FilterBar />
      </Grid>
      <SecretsDetailModal
        isOpen={isDetailModalOpen}
        setOpen={setDetailModalOpen}
        scrapArticle={scrapArticle}
        data={detailModalData}
      />
    </Grid>
  );
}
