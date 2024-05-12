function vv() { }

// 라인차트
let mainHourChart = new Chart(document.querySelector('#main-hour-chart'), {
    type: 'line',
    data: {
        labels: ['00~02', '02~04', '04~06', '06~08', '08~10', '10~12', '12~14', '14~16', '16~18', '18~20', '20~22', '22~24'],
        datasets: [
            {
                data: [1, 2, 3, 4, 5, 6, 7],
                label: "2016 ~ 2022 감전사고인명피해현황 시간별 데이터 평균 (단위,명) ",
                borderColor: "#c45850",
                fill: false
            }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'World population per region (in millions)'
        },
        scales: {
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

// ------------------- 첫번째 방식 ---------------//
fetch('/hourData/avg')
    .then((response) => {
        if (!response.ok) {
            alert('fetch error!\n컨트롤러로 통신중에 오류가 발생했습니다.');
            return;
        }

        // return response.text(); //컨트롤러에서 return하는 데이터가 없거나 int, String 일 때 사용
        return response.json(); //나머지 경우에 사용
    })
    //fetch 통신 후 실행 영역
    .then((data) => {//data -> controller에서 리턴되는 데이터!
        console.log(data)
        mainHourChart.destroy() //차트삭제
        //데이터 리스트 생성 -> 바로 차트에 올릴려고함
        let dataList = []
        // 키 이름 리스트
        let keyList = Object.keys(data)
        //정렬
        keyList.sort()
        //키이름으로 반복 키이름 -> 키값을 데이터리스트에 넣음
        for (let i of keyList) {
            dataList.push(data[i])
        }
       
        //최대값 최소값
        let maxData = 0
        let minData = 99999
        for(let i of dataList){
            if(i > maxData){
                maxData = i
            }
            if( minData > i){
                minData = i
            }
        }

        // 라인차트
        mainHourChart = new Chart(document.querySelector('#main-hour-chart'), {
            type: 'line',
            data: {
                labels: ['00~02', '02~04', '04~06', '06~08', '08~10', '10~12', '12~14', '14~16', '16~18', '18~20', '20~22', '22~24'],
                datasets: [
                    {
                        data: dataList,
                        label: "2016 ~ 2022 감전사고인명피해현황 시간별 데이터 평균 (단위,명) ",
                        borderColor: "#c45850",
                        fill: false
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'World population per region (in millions)'
                },
                scales: {
                    y: {
                        min: 0,
                        max: maxData+10,
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



