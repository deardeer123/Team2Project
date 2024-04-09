function vv() { }

//Grouped bar chart
new Chart(document.querySelector('#bar-chart-grouped'), {
    type: 'bar',
    data: {
        labels: ["00~02", "02~04", "04~06", "06~08", "08~10", "10~12", "12~14", "14~16", "16~18", "18~20", "20~22", "22~24", "미상"],
        datasets: [
            {
                label: "감전사고인명피해현황(단위,시간별)",
                backgroundColor: "#3e95cd",
                data: [5, 1, 1, 11, 39, 90, 58, 69, 75, 42, 33, 13, 109]
            }
            // , {
            //     label: "Europe",
            //     backgroundColor: "#8e5ea2",
            //     data: [408, 547, 675, 734]
            // }
        ]
    },
    options: {
        scales: {
            x: {
                
            },
            y: {
                
                min: 0,
                max: 120,
                ticks: {
                    // forces step size to be 50 units
                    stepSize: 5
                }
            }
        }
    }
});
