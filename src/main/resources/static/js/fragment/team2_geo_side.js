// 렌더링에 필요한 라이브러리 2개 import
import * as topojson from 'https://cdn.skypack.dev/topojson@3.0.2';
import * as d3 from 'https://cdn.skypack.dev/d3@5.15.0';

// 같은 파일에 존재하는 지도 json 변수 만들기
const topoDataPath = '/json/topoKorea.json';

// Promise : 비동기 통신의 객체. 이것을 더욱 편하게 다루기 위해 async와 await가 있음
// 우리가 늘 쓰는 fetch도 Promise를 반환함
// async : 어노테이션의 일종. 해당 함수가 Promise를 반환하는 함수임을 알려줌
// await : async에서만 사용가능하며 해당 함수의 Promise가 해결될때까지 일시정지 시킴
async function loadTopoData() {
  const response = await fetch(topoDataPath);
  return await response.json();
}

// topoData가 무엇인지 모르겠음 topojson라이브러리의 기능 중 하나 일 것으로 추정
function getGeoJson(topoData) {
  return topojson.feature(topoData, topoData.objects.skorea_provinces_2018_geo);
}

// 렌더링 할 지도가 치지할 크키
function getRenderData() {
  return {
    width: 900,
    height: 900,
    margin: 10
  };
}

// 지도 렌더링 및 추가 할 세부 기능들
function renderMap(topoData, renderData) {

  const geoJson = getGeoJson(topoData);

  const svg = d3.select('#map')
    .append('svg')
    .attr('width', renderData.width)
    .attr('height', renderData.height);

  const clippedWidth = renderData.width - renderData.margin * 2;
  const clippedHeight = renderData.height - renderData.margin * 2;

  const geoMercator = d3.geoMercator()
    .center([128, 36])
    .fitSize([clippedWidth, clippedHeight], geoJson);

  const pathGen = d3.geoPath(geoMercator);

  const stage = svg
    .append('g')
    .attr('transform', `translate(${renderData.margin},${renderData.margin})`);

  const textX = 10;
  const textY = 10;
  const infoText = stage
    .append('g')
    .attr('transform', `translate(${textX},${textY})`);

  const onMouseHover = (d, pathGen) => {
    stage
      .selectAll('.geopath')
      .filter(td => td.properties.name === d.properties.name)
      .attr('fill', '#eee8ce');
  
  }


  const onMouseLeave = d => {
    stage
      .selectAll('.geopath')
      .filter(td => td.properties.name === d.properties.name)
      .attr('fill', '#eceae4');
  };

  const tEnter = enter => {
    enter
      .append('path')
      .attr('d', pathGen)
      .attr('stroke', 'gray')
      .attr('fill', '#eceae4')
      .classed('geopath', true)
      .on('mouseenter', onMouseHover)
      .on('mouseleave', onMouseLeave);
  }
  const tUpdate = null;
  const tExit = null;
  stage
    .selectAll('.geopath')
    .data(geoJson.features)
    .enter()
    .call(tEnter);

  return svg.node();
}

async function main() {
  const topoData = await loadTopoData();
  const renderData = getRenderData();
  renderMap(topoData, renderData);
}

// 지도 렌더링
main();