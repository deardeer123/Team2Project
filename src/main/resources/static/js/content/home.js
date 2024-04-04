// https://observablehq.com/@rabelais/rendering-topojson-of-south-korea-with-d3-v5@66

import * as topojson from 'https://cdn.skypack.dev/topojson@3.0.2';
import * as d3 from 'https://cdn.skypack.dev/d3@v5.15.0';

const topoDataPath = '/json/topoKorea.json';

async function loadTopoData(){
  const response = await fetch(topoDataPath)
  return await response.json();
}

function getGeoJson(topoData){
  return topojson.feature(topoData, topoData.objects.skorea_provinces_2018_geo);
}

function getRenderData(){
  return{
  width: 900,
  height: 900,
  margin: 10
  };
}

function renderMap(topoData, renderData){
  const geoJson = getGeoJson(topoData);

  const svg = d3
    .create('svg')
    .attr('width', renderData.width)
    .attr('height', renderData.height);

  const clippedWidth = renderData.width - renderData.margin * 2;
  const clippedHeight = renderData.height - renderData.margin * 2;

  const geoMercator = d3
    .geoMercator()
    // the center uses longtitude and latitude
    // get Long/Lat data from google maps
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
    .attr('transform', `translate(${textX},${textY})`)
    .append('text');
  infoText.text('no data');

  const onMouseHover = d => {
    stage
      .selectAll('.geopath')
      .filter(td => td.properties.name === d.properties.name)
      .attr('fill', 'lightpink');
    infoText.text(d.properties.name);
  };

  const onMouseLeave = d => {
    stage
      .selectAll('.geopath')
      .filter(td => td.properties.name === d.properties.name)
      .attr('fill', 'lightblue');
    infoText.text('선택 안함');
  };

  const tEnter = enter =>
    enter
      .append('path')
      .attr('d', pathGen)
      .attr('stroke', 'black')
      .attr('fill', 'lightblue')
      .classed('geopath', true)
      .on('mouseenter', onMouseHover)
      .on('mouseleave', onMouseLeave)
      .on('cliked', alert(111));
  const tUpdate = null;
  const tExit = null;
  stage
    .selectAll('.geopath')
    .data(geoJson.features)
    .join(tEnter, tUpdate, tExit);

    return svg.node();
}

async function main(){
  const topoData = await loadTopoData();
  const renderData = getRenderData();
  const mapElement = renderMap(topoData, renderData);

  const mapContaimer = document.querySelector('#map');
  mapContaimer.appendChild(mapElement);
}

main();