import React from 'react';
import icon01 from '../images/sub/btn_icon01.png';
import icon02 from '../images/sub/btn_icon02.png';
import icon03 from '../images/sub/btn_icon03.png';
import Box from '@mui/material/Box';
import Search from '../components/Search';

import ExclusiveSelect from '../components/ExclusiveSelect';
import graphImage from '../images/sub/graph_img.jpg';

const RiskReport = () => {
  return (
    <>
      <section id="sub_contents">
        <div className="sub01_wrap">
          <h2 className="h2_tit2">
            “Hacker” 개요 <em>8월 5일, 2021부터 9월 5일, 2021</em>
          </h2>
          <div className="text">
            <p>
              오늘의 이야기에는 KISA가 발표한 랜섬웨어 공격과 D-Dos 공격에 대한
              내용이 주로 포함되어 있다. 글로벌 랜섬웨어 공격 증가 트랜드와
              D-Dos 공격 기술의 발전을 기반으로 리포트가 생성되었다.
            </p>
            <p>
              대기업들은 Windows, Linux 서버 시스템을 서비스 운영 목적으로
              사용하므로 최근 랜섬웨어 공격자들은 Windows 뿐만 아니라 Linux로
              랜섬웨어 버전이다.
            </p>
          </div>

          <div className="period">
            <span>8월 5일부터 주요내용</span>
            <ExclusiveSelect />
          </div>

          <div className="content clfix">
            <div className="img">
              <img src={graphImage} alt="" />
            </div>
            <div className="text">
              <h4>랜섬웨어 역사</h4>
              <p>
                1989년 12월 Joseph L.Popp를 통해 작성 배포된 첫 번째 랜섬웨어
                공격을 시작으로 2021년 현재 랜섬웨어 공격은 점차 증가하고 있으며
                그 피해규모 또한 날로 커지고 있다. 글로벌 랜섬웨어 감염 피해
                금액은 2021년 말 23조 6천억원에 이를 것으로 예상이 되며,
                지금으로부터 10년 후인 2031년에는 약 312조 7천억으로 피해금액이
                천문학적 규모로 늘어날 것으로 예측된다.
              </p>
              <h4>랜섬웨어 역사</h4>
              <p>
                1989년 12월 Joseph L.Popp를 통해 작성 배포된 첫 번째 랜섬웨어
                공격을 시작으로 2021년 현재 랜섬웨어 공격은 점차 증가하고 있으며
                그 피해규모 또한 날로 커지고 있다. 글로벌 랜섬웨어 감염 피해
                금액은 2021년 말 23조 6천억원에 이를 것으로 예상이 되며,
                지금으로부터 10년 후인 2031년에는 약 312조 7천억으로 피해금액이
                천문학적 규모로 늘어날 것으로 예측된다.
              </p>
              <h4>랜섬웨어 역사</h4>
              <p>
                1989년 12월 Joseph L.Popp를 통해 작성 배포된 첫 번째 랜섬웨어
                공격을 시작으로 2021년 현재 랜섬웨어 공격은 점차 증가하고 있으며
                그 피해규모 또한 날로 커지고 있다. 글로벌 랜섬웨어 감염 피해
                금액은 2021년 말 23조 6천억원에 이를 것으로 예상이 되며,
                지금으로부터 10년 후인 2031년에는 약 312조 7천억으로 피해금액이
                천문학적 규모로 늘어날 것으로 예측된다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RiskReport;
