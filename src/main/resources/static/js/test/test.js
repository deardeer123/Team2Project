import * as topojson from 'https://cdn.skypack.dev/topojson@3.0.2';
import * as d3 from 'https://cdn.skypack.dev/d3@5.15.0';
// 렌더링에 필요한 라이브러리 2개 import
// 같은 파일에 존재하는 지도 json 변수 만들기
const topoDataPath = '/json/topoKorea.json';

// 이것도 모름
async function loadTopoData() {
    const response = await fetch(topoDataPath);
    return await response.json();
}

//   뭐인지
function getGeoJson(topoData) {
    return topojson.feature(topoData, topoData.objects.skorea_provinces_2018_geo)
}

// 크기 조절 -> 객체를 리턴함
function getRenderData() {
    return {
        width: 500,
        height: 500,
        margin: 0,
    }
}

async function main() {


    // 뭔지 모름
    const topoData = await loadTopoData();
    //크기 조절
    const renderData = getRenderData();
    // 네모난 창
    const toolTip = d3.select("#tooltip"); //툴팁 요소 선택
    const geoJson = getGeoJson(topoData); //모름 korea json 가져온 데이터를 자바스크립트 용어로 표현 
    // 뭔지 모름
    const svg = d3.create('svg').attr('width', renderData.width).attr('height', renderData.height);

    // 먼지 모름
    const pathGen = d3.geoPath().projection(d3.geoMercator().fitSize([renderData.width, renderData.height], geoJson));
    svg.selectAll('.province')
        .data(geoJson.features)
        .enter().append('path')
        // attr -> 선택한 태그 d 지역 위피 pathGen 조각난 친구들
        .attr('d', pathGen)
        // 색 채우기 처음떳을때 색 회색
        .attr('fill', '#a5a5a5')
        // 지역 선 색깔
        .attr('stroke', '#e4e4e4')
        // 마우스 안에 넣으면 함수 실행
        .on('mouseenter', function (event, d) {
            d3.select(this).attr('fill', '#ff8800')
            // // 툴팁 스타일 변경
            // toolTip
            //     .style("display", "block")
            //     // html 태그 넣어주기
            //     // event 안에 properties 가 있는데 거기 안에 .name 안에 지역명이 있음
            //     .html(`지역명 :' ${event.properties.name}}`)
            //     // 툴팁 위치 지정
            //     .style('left', (event.pageX + 10) + "px")
            //     .style('top', (event.pageY + 10) + "px")


        })
        .on('mouseleave', function () {
            // 선택한 지역 다시 원래 색으로 변경
            d3.select(this).attr('fill', '#a5a5a5');
            // 툴팁 가리기
            // toolTip.style("display", "none");

        })
    // 렌더링할 div 클래스 id 적고 그안에 svg.node()를 넣어줌 
    document.querySelector("#map").appendChild(svg.node());
}
main();
