
function chartCausing() {

  // ------------------- 첫번째 방식 ---------------//
  fetch('/causing/selectOneCausing', { //요청경로
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

      console.log(data)


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
              label: data.occurredYear,
              backgroundColor: "#3e95cd",
              data: [
                data.insulationDeteriorationShortCircuit,
                data.trackingShortCircuit,
                data.compressionDamageShortCircuit,
                data.layerShortCircuit,
                data.unidentifiedShortCircuit,
                data.overloadAndOverCurrent,
                data.electricLeakageGrounding,
                data.badContact,
                data.halfCutLine,
                data.etc
              ]
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




    })

    //fetch 통신 실패 시 실행 영역
    .catch(err => {
      alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
      console.log(err);
    });
}


chartCausing();

function mixed() {
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
      console.log("데이터 : ", data)

      // 각 항목의 합 초기화
      let sums = {
        insulationDeteriorationShortCircuit: 0,
        trackingShortCircuit: 0,
        compressionDamageShortCircuit: 0,
        layerShortCircuit: 0,
        unidentifiedShortCircuit: 0,
        overloadAndOverCurrent: 0,
        electricLeakageGrounding: 0,
        badContact: 0,
        halfCutLine: 0,
        etc: 0
      };

      // 데이터 배열 반복하며 각 항목의 속성 합산
      for (const item of data) {
        for (const key in sums) {
          sums[key] += item[key] || 0; // 만약 속성이 존재하지 않으면 0으로 처리
        }
      }

      // 각 항목의 평균 계산
      let averages = {};
      for (const key in sums) {
        averages[key + 'Avg'] = sums[key] / data.length;
      }

      // 결과 출력
      console.log("@@@@@@@@",averages);



      //////////////////////////////////////////////
      new Chart(document.querySelector('#mixed-chart1'), {
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
            "기타"
          ],
          datasets: [{
            label: data[0].occurredYear,
            type: "line",
            borderColor: "#8e5ea2",
            data: [
              data[0].insulationDeteriorationShortCircuit,
              data[0].trackingShortCircuit,
              data[0].compressionDamageShortCircuit,
              data[0].layerShortCircuit,
              data[0].unidentifiedShortCircuit,
              data[0].overloadAndOverCurrent,
              data[0].electricLeakageGrounding,
              data[0].badContact,
              data[0].halfCutLine,
              data[0].etc
            ],
            fill: false
          }, {
            label: data[1].occurredYear,
            type: "line",
            borderColor: "#3e95cd",
            data: [
              data[1].insulationDeteriorationShortCircuit,
              data[1].trackingShortCircuit,
              data[1].compressionDamageShortCircuit,
              data[1].layerShortCircuit,
              data[1].unidentifiedShortCircuit,
              data[1].overloadAndOverCurrent,
              data[1].electricLeakageGrounding,
              data[1].badContact,
              data[1].halfCutLine,
              data[1].etc
            ],
            fill: false
          }, {
            label: data[2].occurredYear,
            type: "line",
            borderColor: "rgb(75, 192, 192)",
            data: [
              data[2].insulationDeteriorationShortCircuit,
              data[2].trackingShortCircuit,
              data[2].compressionDamageShortCircuit,
              data[2].layerShortCircuit,
              data[2].unidentifiedShortCircuit,
              data[2].overloadAndOverCurrent,
              data[2].electricLeakageGrounding,
              data[2].badContact,
              data[2].halfCutLine,
              data[2].etc
            ],
            fill: false
          }, {
            label: data[3].occurredYear,
            type: "line",
            borderColor: "red",
            data: [
              data[3].insulationDeteriorationShortCircuit,
              data[3].trackingShortCircuit,
              data[3].compressionDamageShortCircuit,
              data[3].layerShortCircuit,
              data[3].unidentifiedShortCircuit,
              data[3].overloadAndOverCurrent,
              data[3].electricLeakageGrounding,
              data[3].badContact,
              data[3].halfCutLine,
              data[3].etc
            ],
            fill: false
          }, {
            label: data[4].occurredYear,
            type: "line",
            borderColor: "yellow",
            data: [
              data[4].insulationDeteriorationShortCircuit,
              data[4].trackingShortCircuit,
              data[4].compressionDamageShortCircuit,
              data[4].layerShortCircuit,
              data[4].unidentifiedShortCircuit,
              data[4].overloadAndOverCurrent,
              data[4].electricLeakageGrounding,
              data[4].badContact,
              data[4].halfCutLine,
              data[4].etc
            ],
            fill: false
          }, {
            label: data[5].occurredYear,
            type: "line",
            borderColor: "green",
            data: [
              data[5].insulationDeteriorationShortCircuit,
              data[5].trackingShortCircuit,
              data[5].compressionDamageShortCircuit,
              data[5].layerShortCircuit,
              data[5].unidentifiedShortCircuit,
              data[5].overloadAndOverCurrent,
              data[5].electricLeakageGrounding,
              data[5].badContact,
              data[5].halfCutLine,
              data[5].etc
            ],
            fill: false
          }, {
            label: data[6].occurredYear,
            type: "line",
            borderColor: "pink",
            data: [
              data[6].insulationDeteriorationShortCircuit,
              data[6].trackingShortCircuit,
              data[6].compressionDamageShortCircuit,
              data[6].layerShortCircuit,
              data[6].unidentifiedShortCircuit,
              data[6].overloadAndOverCurrent,
              data[6].electricLeakageGrounding,
              data[6].badContact,
              data[6].halfCutLine,
              data[6].etc
            ],
            fill: false
          }, {
            label: "평균",
            type: "bar",
            backgroundColor: "rgba(0,0,0,0.2)",
            data: [
              parseInt(averages.insulationDeteriorationShortCircuitAvg),
              parseInt(averages.trackingShortCircuitAvg),
              parseInt(averages.compressionDamageShortCircuitAvg),
              parseInt(averages.layerShortCircuitAvg),
              parseInt(averages.unidentifiedShortCircuitAvg),
              parseInt(averages.overloadAndOverCurrentAvg),
              parseInt(averages.electricLeakageGroundingAvg),
              parseInt(averages.badContactAvg),
              parseInt(averages.halfCutLineAvg),
              parseInt(averages.etcAvg)
            ],
          },

          ]
        },
        options: {
          title: {
            display: true,
            text: 'Population growth (millions)'
          },
          legend: { display: false }
        }
      });





    })

    //fetch 통신 실패 시 실행 영역
    .catch(err => {
      alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
      console.log(err);
    });
}

mixed();






