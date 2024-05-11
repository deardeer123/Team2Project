
function disasterData() {
  fetch('/disaster/selectAllDisaster', { //요청경로
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

      let tbody = document.querySelector('#t-body2');
      tbody.innerHTML = '';
      let str = '';


      data.forEach((i, idx) => {
        console.log(i)
        str +=
          `
          <tr onclick="goData([[${i.occurredYear}]])" style="cursor: pointer">
              <td>${i.occurredYear}</td>
              <td>${i.totalFire}</td>
              <td>${i.efire}</td>
              <td>${i.dead}</td>
              <td>${i.ouch}</td>
              <td>${i.moneyDamage}</td>
          </tr>
          `
      });

      tbody.insertAdjacentHTML('afterbegin', str)

    })
    //fetch 통신 실패 시 실행 영역
    .catch(err => {
      alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
      console.log(err);
    });
}
disasterData();

goData(2022);

function goData(occurredYear) {
  const lineChart = document.querySelector('#bar-chart1-grouped');
  const lineChart2 = document.querySelector('#bar-chart2-grouped');
  if (Chart.getChart(lineChart)) {
    Chart.getChart(lineChart)?.destroy();
    Chart.getChart(lineChart2)?.destroy();
    // lineChart.style.height = 40 + 'vh'
    // lineChart2.style.height = 40 + 'vh'
  }
  // ------------------- 첫번째 방식 ---------------//
  fetch('/disaster/selectOneDisaster', { //요청경로
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    //컨트롤러로 전달할 데이터
    body: new URLSearchParams({
      // 데이터명 : 데이터값
      occurredYear: occurredYear
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
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@", data)



      // Radar chart
      new Chart(document.querySelector('#bar-chart2-grouped'), {
        type: 'bar',
        data: {
          labels: [data.occurredYear],
          datasets: [
            {
              label: "총 화재건수",
              backgroundColor: "#3e95cd",
              data: [data.totalFire]
            }, {
              label: "전기화재건수",
              backgroundColor: "#8e5ea2",
              data: [data.efire] 
            }
            , {
              label: "재산피해(백만원)",
              backgroundColor: "#8e5ea2",
              data: [data.moneyDamage]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Population growth (millions)'
          }
        }
      });
      new Chart(document.querySelector('#bar-chart1-grouped'), {
        type: 'bar',
        data: {
          labels: [data.occurredYear],
          datasets: [
            {
              label: "인명피해(사망)",
              backgroundColor: "#8e5ea2",
              data: [data.dead]
            }, {
              label: "인명피해(부상)",
              backgroundColor: "#3e95cd",
              data: [data.ouch]
            }
            
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Population growth (millions)'
          }
        }
      });


    })

    //fetch 통신 실패 시 실행 영역
    .catch(err => {
      alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
      console.log(err);
    });



}
