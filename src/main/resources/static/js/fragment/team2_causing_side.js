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
                backgroundColor: "#3e95cd",
                data: [1630, 1180, 357, 102, 2919,617,247,914,189,647]
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
                max: 3000
            }
        },
        indexAxis: 'y'
    }
});


