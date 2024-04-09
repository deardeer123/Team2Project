// //Grouped bar chart
// new Chart(document.querySelector('#bar-chart-grouped'), {
//     type: 'bar',
//     data: {
//         labels: ["2022"],
//         datasets: [
//             {
//                 label: "0-5",
//                 backgroundColor: "#8e5ea2",
//                 data: [300]
//             },
//             {
//                 label: "6-10",
//                 backgroundColor: "#8e5ea2",
//                 data: [184]
//             }, {
//                 label: "11-20",
//                 backgroundColor: "#8e5ea2",
//                 data: [35]
//             }, {
//                 label: "21-30",
//                 backgroundColor: "#8e5ea2",
//                 data: [16]
//             }, {
//                 label: "31-40",
//                 backgroundColor: "#8e5ea2",
//                 data: [3]
//             }, {
//                 label: "41-50",
//                 backgroundColor: "#8e5ea2",
//                 data: [2]
//             }, {
//                 label: "51-60",
//                 backgroundColor: "#8e5ea2",
//                 data: [2]
//             }, {
//                 label: "60초과",
//                 backgroundColor: "#8e5ea2",
//                 data: [4]
//             }
//         ]
//     },
//     options: {
//         title: {
//             display: true,
//             text: 'Population growth (millions)'
//         },
//         // indexAxis: 'y',
//         // scales: {
            
//         //     y: {
//         //         title: {
//         //             display: true,
//         //         },
//         //         min: 0,
//         //         max: 500,
//         //         // ticks: {
//         //         //     // forces step size to be 50 units
//         //         //     stepSize: 50
//         //         // },
//         //         type: 'logarithmic'
//         //     }
//         // }

//     }

// });

// , "2017", "2018", "2019","2020","2021","2022"





function rangeData() {
    fetch('/', { //요청경로
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

            return response.text(); //컨트롤러에서 return하는 데이터가 없거나 int, String 일 때 사용
            //return response.json(); //나머지 경우에 사용
        })
        //fetch 통신 후 실행 영역
        .then((data) => {//data -> controller에서 리턴되는 데이터!

        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
}
