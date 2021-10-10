import React, { useEffect } from 'react';
import icon01 from '../images/sub/btn_icon01.png';
import icon02 from '../images/sub/btn_icon02.png';
import icon03 from '../images/sub/btn_icon03.png';
import Box from '@mui/material/Box';
import Search from '../components/Search';
import {
  Chip,
  Stack,
  Link,
  Grid,
  Typography,
  Skeleton,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';

import ExclusiveSelect from '../components/ExclusiveSelect';
import graphImage from '../images/sub/graph_img.jpg';
import useFetch from '../hooks/useFetch';
import { getLineBreakText, useSessionStorage } from '../js/util';
import ThreatMediaCard from '../components/ThreatMediaCard';

const timeBefore = (today: Date, timelength: String) => {
  const [d, m, y] = [today.getDate(), today.getMonth(), today.getFullYear()];
  if (timelength === '1d') {
    return new Date(y, m, d - 1);
  }
  if (timelength === '1wk') {
    return new Date(y, m, d - 7);
  }
  if (timelength === '1m') {
    return new Date(y, m - 1, d);
  }
  if (timelength === '1y') {
    return new Date(y - 1, m, d);
  }
  if (timelength === 'all') {
    return new Date(2000, 0, 1);
  }
};

const RiskReport = () => {
  const [getCart, addCart] = useSessionStorage('riskoutShoppingCart');
  const [dateRange, setDateRange] = React.useState('all'); // for period select
  const { data, isPending, error } = useFetch(
    '/static/ReportData.example.json?dateRange=' +
      dateRange +
      '&articleIds=' +
      JSON.stringify(getCart()) // fetch occurs whenever dateRange changes
  );

  /*
    // if using POST request with request options
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: 'Hacker', // organization name?
        dateRange: dateRange, // user selected
        articleIds: [1, 2, 3], // get from sessionStorage
      }),
    }
  */

  const loadingScreen = (
    <section id="sub_contents" style={{ width: '100vw', height: '100vh' }}>
      <div className="sub01_wrap">
        <h2 className="h2_tit2">Loading...</h2>
      </div>
      <div className="content clfix">
        {Array.from({ length: 20 }).map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    </section>
  );

  const errorScreen = (
    <section id="sub_contents">
      <div className="sub01_wrap">
        <h2 className="h2_tit2">Error</h2>
      </div>
      <div className="content clfix"></div>
    </section>
  );

  // select handler is not required.
  // when dateRange changes selected happens due to the useFetch hook
  const selectHandler = (dateRange) => {
    alert('dateRange changed ' + dateRange);
  };

  return (
    <>
      {isPending ? (
        loadingScreen
      ) : error ? (
        errorScreen
      ) : (
        <section id="sub_contents">
          <div className="sub01_wrap">
            <h2 className="h2_tit2">
              Report
              <em>
                {new Intl.DateTimeFormat('ko-KR', { dateStyle: 'full' }).format(
                  new Date()
                )}{' '}
                (24h)
              </em>
            </h2>

            <div className="text">{getLineBreakText(data.overview)}</div>

            <div className="period">
              <h2 style={{ display: 'inline-block' }}>리스크 브리핑</h2>
              <ExclusiveSelect
                selectOptions={['1d', '1wk', '1m', '1yr', 'all']}
                selectedValue={dateRange}
                setSelectedValue={setDateRange}
                selectHandler={selectHandler}
              />
            </div>

            <div className="content clfix">
              <div className="img">
                <img src={graphImage} alt="" />
              </div>

              <div className="text">
                {data.briefingContents.map(
                  ({
                    title,
                    summary,
                    characteristics,
                    sourceName,
                    url,
                    datetime,
                  }) => {
                    return (
                      <article>
                        <Link
                          href={url}
                          target="_blank"
                          rel="noopener"
                          underline="hover"
                        >
                          <h3>{title}</h3>
                        </Link>
                        {getLineBreakText(summary)}
                        <Grid
                          container
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ mt: '1rem' }}
                        >
                          <Stack direction="row" spacing={1}>
                            {characteristics.map((c) => (
                              <Chip
                                label={c}
                                variant="outlined"
                                size="medium"
                                sx={{ height: '2.4rem', fontSize: '1rem' }}
                              />
                            ))}
                          </Stack>
                          <Link
                            href={url}
                            target="_blank"
                            rel="noopener"
                            underline="hover"
                          >
                            <em>원본:</em> {sourceName} {datetime}
                          </Link>
                        </Grid>
                      </article>
                    );
                  }
                )}
              </div>
            </div>

            <div className="content clfix">
              <h2>중대 위협</h2>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: '1rem' }}
              >
                <ThreatMediaCard
                  imageUrl="https://via.placeholder.com/400x1200/09f/fff.png"
                  title="문재인: 이명박, 박근혜가 5.18 민주화운동 기념식에 참석하지 않았다고 주장"
                  threatType="허위뉴스"
                  sourceChannel="연합뉴스"
                  sourceTime="2021-10-03 10:33PM"
                  href="#"
                />
                <ThreatMediaCard
                  imageUrl="https://via.placeholder.com/400x150/09f/fff.png"
                  title="문재인: 이명박, 박근혜가 5.18 민주화운동 기념식에 참석하지 않았다고 주장"
                  threatType="대외비 기밀"
                  sourceChannel="연합뉴스"
                  sourceTime="2021-10-03 10:33PM"
                  href="#"
                />
                <ThreatMediaCard
                  imageUrl="https://via.placeholder.com/600x150/09f/fff.png"
                  title="문재인: 이명박, 박근혜가 5.18 민주화운동 기념식에 참석하지 않았다고 주장"
                  threatType="3급 기밀"
                  sourceChannel="연합뉴스"
                  sourceTime="2021-10-03 10:33PM"
                  href="#"
                />
                <ThreatMediaCard
                  imageUrl="https://via.placeholder.com/600x150/09f/fff.png"
                  title="문재인: 이명박, 박근혜가 5.18 민주화운동 기념식에 참석하지 않았다고 주장"
                  threatType="3급 기밀"
                  sourceChannel="연합뉴스"
                  sourceTime="2021-10-03 10:33PM"
                  href="#"
                />
              </Grid>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default RiskReport;
