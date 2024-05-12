import * as topojson from 'https://cdn.skypack.dev/topojson@3.0.2';
import * as d3 from 'https://cdn.skypack.dev/d3@5.15.0';
// import * as Chart from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js';

// Chart.defaults.global.defaultFontColor = 'red';
// 라인차트
let mainAreaChart = new Chart(document.querySelector('#main-area-chart'), {
    type: 'line',
    data: {
        labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [
            {
                data: [10.5, 11.5, 15.7, 8.5, 13.0],
                label: "최고기온",
                borderColor: "#FFBA00",
                fill: false
            },
        ]
    },
    options: {
        title: {
            display: false,
            text: 'World population per region (in millions)'
        },
        scales: {
            // fontSize : 20 ,
            y: {
                min: 0,
                max: 20,

                ticks: {
                    color: 'white'
                }
            },
            x: {
                ticks: {
                    color: 'white'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: '#FFBA00'
                }
            }
        }
    }
});
fetch(`/geoData/avg`)
    .then((response) => {
        if (!response.ok) {
            alert('fetch error!\n컨트롤러로 통신중에 오류가 발생했습니다.');
            return;
        }
        return response.json();
    })
    .then((data) => {

        console.log(Object.keys(data))
        //키이름 배열
        let labelData = Object.keys(data);
        let dataList = [];
        // 키이름으로 값빼기
        for (let i of Object.keys(data)) {
            dataList.push(data[i])
        }

        let maxData = 0
        let minData = 9999999
        //Math함수가 안되서 그냥 반복문돌림
        for (let i of dataList) {
            if (i > maxData) {
                maxData = i
            }
            if (minData > i) {
                minData = i
            }
        }
        maxData = Math.ceil(maxData / 10) * 10 + 100
        minData = Math.ceil(minData / 10) * 10 - 30
        console.log(maxData, minData);

        mainAreaChart.destroy();
        mainAreaChart = new Chart(document.querySelector('#main-area-chart'), {
            type: 'line',
            data: {
                labels: labelData,
                datasets: [
                    {
                        data: dataList,
                        label: "평균",
                        borderColor: "#c45850",
                        fill: false
                    }
                ]
            },
            options: {
                title: {
                    display: false,
                    text: 'World population per region (in millions)'
                },
                scales: {
                    y: {
                        min: minData,
                        max: maxData,
                        ticks: {
                            color: 'white'
                        }
                    },
                    x: {
                        ticks: {
                            color: 'white'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 16,
                                weight: 'bold'
                            },
                            color: 'white'
                        }
                    }
                }
            }
        });
    })
    //fetch 통신 실패 시 실행 영역
    .catch(err => {
        alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
        console.log(err);
    });

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
        .on('click', function (event, d) {
            console.log(this);
            // 선택한 지역 다시 원래 색으로 변경
            d3.selectAll('path').attr('fill', '#a5a5a5');
            d3.select(this).attr('fill', '#FFBA00')
            // 툴팁 스타일 변경
            toolTip
                .style("display", "block")
            // html 태그 넣어주기
            // event 안에 properties 가 있는데 거기 안에 .name 안에 지역명이 있음
            // .html(`지역명 :${event.properties.name}`)
            // 툴팁 위치 지정
            // .style('left', (event.pageX + 10) + "px")
            // .style('top', (event.pageY + 10) + "px")
            console.log(`@@@@@${event.properties.name}`)
            // ------------------- 첫번째 방식 ---------------//
            fetch(`/geoData/${event.properties.name}`)
                .then((response) => {
                    if (!response.ok) {
                        alert('fetch error!\n컨트롤러로 통신중에 오류가 발생했습니다.');
                        return;
                    }
                    return response.json(); //나머지 경우에 사용
                })
                //fetch 통신 후 실행 영역
                .then((data) => {//data -> controller에서 리턴되는 데이터!
                    console.log(data)
                    let dataList = data; //데이터
                    let maxData = 0
                    let minData = 9999999
                    //Math함수가 안되서 그냥 반복문돌림
                    for (let i of dataList) {
                        if (i > maxData) {
                            maxData = i
                        }
                        if (minData > i) {
                            minData = i
                        }
                    }
                    minData = minData - 30; //최소값 설정
                    maxData = maxData + 50 //최대값 설정
                    mainAreaChart.destroy()
                    // 라인차트
                    mainAreaChart = new Chart(document.querySelector('#main-area-chart'), {
                        type: 'line',
                        data: {
                            labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
                            datasets: [
                                {
                                    data: dataList,
                                    label: event.properties.name,
                                    borderColor: "#FFBA00",
                                    fill: false,
                                    pointBorderWidth: 0
                                },
                            ]
                        },
                        options: {
                            // responsive:false,
                            legend: {
                                display: false
                            },
                            scales: {
                                // fontSize : 20 ,
                                y: {
                                    min: minData,
                                    max: maxData,

                                    ticks: {
                                        color: 'white'
                                    }
                                },
                                x: {
                                    ticks: {
                                        color: 'white'
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        font: {
                                            size: 16,
                                            weight: 'bold'
                                        },
                                        color: '#FFBA00'
                                    }
                                }
                            }
                        }
                    });

                })
                //fetch 통신 실패 시 실행 영역
                .catch(err => {
                    alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
                    console.log(err);
                });


        })
    // .on('mouseleave', function () {
    //     // 선택한 지역 다시 원래 색으로 변경
    //     d3.select(this).attr('fill', '#a5a5a5');
    //     // 툴팁 가리기
    //     toolTip.style("display", "none");

    // })
    // 렌더링할 div 클래스 id 적고 그안에 svg.node()를 넣어줌 
    document.querySelector("#map").appendChild(svg.node());
}
main();
