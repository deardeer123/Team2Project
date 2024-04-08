getDayData();

function getDayData() {

    console.log("진입")
    // ------------------- 첫번째 방식 ---------------//
    fetch('/day/getDayFetch', { //요청경로
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

            //return response.text(); //컨트롤러에서 return하는 데이터가 없거나 int, String 일 때 사용
            return response.json(); //나머지 경우에 사용
        })
        //fetch 통신 후 실행 영역
        .then((data) => {//data -> controller에서 리턴되는 데이터!

            console.log(data)

        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });

}

// 바차트
new Chart(document.querySelector('#bar-chart'), {
    type: 'bar',
    data: {
        labels: ['a', 'b', 'c', 'd', 'e'],
        datasets: [
            {
                label: "최고기온",
                backgroundColor: "#c45850",
                data: [10.5, 11.5, 15.7, 8.5, 13.0]
            },
            {
                label: "기온",
                backgroundColor: "#3e95cd",
                data: [3.1, 5.7, 1.2, 2.4, 3.5]
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
                max: 20
            }
        }
    }
});