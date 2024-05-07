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

  const svgContainer = d3.select('#map');
  const width = svgContainer.node().getBoundingClientRect().width;
  const height = width * 1; // 가로세로 비율 조정
  const margin = 10;

  return {
    width,
    height,
    margin
  };
}

function getCoordinatesFromArcs(arcs, arcIndices, transform){
  const coordinates = [];
  for(const arcIndex of arcIndices){
    const arc = arcs[arcIndex];
    const points = arc.map(([x, y]) => [
      x * transform.scale[0] + transform.translate[0],
      y * transform.scale[1] + transform.translate[1]
    ]);
    coordinates.push(...points);
  }
  return coordinates;
}

// 폴리곤의 각 꼭지점을 찾고 면적을 계산하여 폴리곤의 중심위치를 리턴하는 함수
function getPolygonCentroid(arcs, arcIndices, transform) {
  const coordinates = getCoordinatesFromArcs(arcs, arcIndices, transform);
  let x = 0;
  let y = 0;
  let area = 0;
  const numPoints = coordinates.length;

  for (let i = 0; i < numPoints; i++) {
    const j = (i + 1) % numPoints;
    const xi = coordinates[i][0];
    const yi = coordinates[i][1];
    const xj = coordinates[j][0];
    const yj = coordinates[j][1];
    const areaSegment = xi * yj - xj * yi;
    x += (xi + xj) * areaSegment;
    y += (yi + yj) * areaSegment;
    area += areaSegment;
  }

  area *= 0.5;
  x /= 6 * area;
  y /= 6 * area;

  alert(x);

  return [x, y];
}

// 지도 렌더링 및 추가 할 세부 기능들
function renderMap(topoData) {

  const renderData = getRenderData();
  const geoJson = getGeoJson(topoData);

  const svg = d3.select('#map')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${renderData.width} ${renderData.height}`);

  const clippedWidth = renderData.width - renderData.margin * 2;
  const clippedHeight = renderData.height - renderData.margin * 2;

  const geoMercator = d3.geoMercator()
    .center([128, 36])
    .fitSize([clippedWidth, clippedHeight], geoJson);

  const pathGen = d3.geoPath(geoMercator);

  console.log(geoMercator);
  console.log(pathGen);

  const stage = svg
    .append('g')
    .attr('transform', `translate(${renderData.margin},${renderData.margin})`);

  const tooltip = d3.select('.infoTable');
  const mapContainer = d3.select('#map');

const year = document.querySelector('#year').value;  

  const onMouseHover = (d) => {
    if (d && d.properties) {
      stage
        .selectAll('.geopath')
        .filter(function(td) { return td.properties.name === d.properties.name; })
        .attr('fill', '#eee8ce');

      const containerRect = mapContainer.node().getBoundingClientRect();
      const tooltipWidth = tooltip.node().offsetWidth;
      const tooltipHeight = tooltip.node().offsetHeight;

      tooltip
        .html(d.properties.name)
        .style("display", "block")
        .style("opacity", 1)
        .style("width", "ahto")
        .style("height", "auto")
        .style("left", (containerRect.right - tooltipWidth - 10) + "px")
        .style("top", (containerRect.bottom - tooltipHeight - 10) + "px")
        .style("font-size", "30px")
        
        fetch('/geo/geoSelect', {
          method: 'POST',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify({
            
          })
        })
        .then((response) => response.json())
        .then((data) => {

          console.log(data);

          let sum = 0.0;
          let avg = 0.0;
          let cnt = 0;

          data.forEach((e) => {
            
            const str = d.properties.name_eng;
            const result = str.toUpperCase();

            console.log(e[`${result}`]);
            console.log(e['key']);
                        
            sum = sum + e[`${result}`];
            cnt += 1;
            // console.log(e[`${result}`]);
            console.log('sum = '+ sum);
            console.log(cnt);

          })
          avg = (sum * 100)/ cnt;
          console.log(avg);
          
          // Math.round(number * 100) / 100;
          
          // 응답 데이터를 파싱하고 툴팁 업데이트
          tooltip.html(`
            <p>${d.properties.name}</p>
            
            <p>데이터: ${Math.round(avg) / 100}</p>
          `);
        })
        .catch((err) => {
          console.error('fetch error:', err);
        });
    
        console.log(d.properties.name);
    }

        
  }
  
  const onMouseLeave = (d) => {
    if (d && d.properties) {
      stage
        .selectAll('.geopath')
        .filter(function(td) { return td.properties.name === d.properties.name; })
        .attr('fill', '#eceae4');
      //   .on('mouseout', function () {
        
      // });
      tooltip
        .style("display", "none")
        .style("opacity", 0);
    }
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

  // null 값을 주는 이유: 지도가 마운트 될 때 최초에 한 번만 데이터를 로드하면 돼서.
  const tUpdate = null;
  const tExit = null;

  stage
    .selectAll('.geopath')
    .data(geoJson.features)
    .enter()
    .call(tEnter);

    const geometries = geoJson.features.map(feature => feature.geometry);

console.log(geometries);
// console.log(translate);

  stage
    .append('g')
    .attr('class', 'labels')
    .selectAll('.label')
    .data(geometries)
    .join(
      enter => enter.append('text')
        .attr('class', 'label')
        .attr('transform', d => {
          let centroid;
          if(d.type === 'Polygon' && d.coordinates.length > 0){
            centroid = d3.geoCentroid(d);
          } else if(d.type === 'MultiPolygon' && d.coordinates.length > 0){
            centroid = d3.geoCentroid(d);
          }

          const feature = geoJson.features.find(f => f.geometry === d);
          if(feature){
            const name = feature.properties.name;
            if(name === '경기도'){
              centroid[1] -= 0.2;
            }
            if(name === '충청남도'){
              centroid[0] -= 0.1;
              centroid[1] += 0.1;
            }
          }
          return centroid ?  `translate(${geoMercator(centroid)})` : 'translate(0,0)';
    })
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'central')
    .style('font-size', '12px')
    .style('font-weight', 'normal')
    .style('fill', 'black')
    .style('pointer-events', 'none')
    .text(d => {
      const feature = geoJson.features.find(f => f.geometry === d);
      return feature ? feature.properties.name : '';
    })
  );
  return svg.node();
}

async function main() {
  const topoData = await loadTopoData();
  const renderData = getRenderData();
  renderMap(topoData, renderData);

  // 초기 렌더링 및 창 크기 변경 시 이벤트 핸들러 등록
  window.addEventListener('DOMContentLoaded', () =>  renderMap(topoData, renderData));
  window.addEventListener('resize', () => renderMap(topoData, renderData));
}

// 지도 렌더링
main();