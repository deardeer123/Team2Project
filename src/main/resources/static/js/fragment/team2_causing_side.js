
selectAllCausing();

function selectAllCausing(){
    // ------------------- 첫번째 방식 ---------------//
    fetch('/causing/selectAllCausing', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: new URLSearchParams({
            // 데이터명 : 데이터값
            
        })
    })
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
            console.log(data);

            // let tbody = document.querySelector('#t-body');
            // tbody.innerHTML = '';
            // let str = '';

            // str +=
            //     `
            // <tr>
            //     <td>${data.occurredYear}</td>
            //     <td>${data.burnrange0_5}</td>
            //     <td>${data.burnrange6_10}</td>
            //     <td>${data.burnrange11_21}</td>
            //     <td>${data.burnrange21_30}</td>
            //     <td>${data.burnrange31_40}</td>
            //     <td>${data.burnrange41_50}</td>
            //     <td>${data.burnrange51_60}</td>
            //     <td>${data.burnrange60_over}</td>
                
            // </tr>
            // `

            // tbody.insertAdjacentHTML('afterbegin', str)

        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
}


// 바차트
new Chart(document.querySelector('#bar-chart1'), {
    type: 'bar',
    data: {
        labels: [
            "절연열화에 의한 단락",
            "트래킹에 의한 단락",
            "압착 손상에 의한 단락",
            "층간 단락",
            "미확인 단락",
            "과부하 및 과전류",
            "누전 지락",
            "접촉 불량",
            "반단선",
            "기타"],
        datasets: [
            {
                label: "전기화재발생요인",
                backgroundColor: "#009FE3",
                data: [1630, 1180, 357, 102, 2919, 617, 247, 914, 189, 647]
            }
        ]
    },
    options: {
        legend: { display: true },
        title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
        },
        scales: {
            y: {
                min: 0,
                max: 3000,
                ticks: {
                    color: 'white'
                }
            },
            x:{
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
        },
        indexAxis: 'y'
    }
});



