// const tag = document.querySelector('#drawing');
// const left = document.querySelector('#right');

const left = document.querySelector('#left');
const right = document.querySelector('#right');
let str1 = '';
let str2 = '';

const selectData = () => {

    fetch('/geo/geoDetailSelect', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
        'Content-Type': 'application/json; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: JSON.stringify({
        // 데이터명 : 데이터값
        })
    })
    .then((response) => {
      return response.json(); //나머지 경우에 사용
    })
  //fetch 통신 후 실행 영역
    .then((data) => {//data -> controller에서 리턴되는 데이터!
    console.log(data);
    
    const seoul = Math.round(data.SEOUL * 100) / 100;
    const gyeonggi = Math.round(data.GYEONGGI * 100) / 100;
    const incheon = Math.round(data.INCHEON * 100) / 100;
    const gangwon = Math.round(data.GANGWON * 100) / 100;
    const sejong = Math.round(data.SEJONG * 100) / 100;
    const daejeon = Math.round(data.DAEJEON * 100) / 100;
    const chungbuk = Math.round(data.CHUNGBUK * 100) / 100;
    const chungnam = Math.round(data.CHUNGNAM * 100) / 100;
    const jeonbuk = Math.round(data.JEONBUK * 100) / 100;
    const jeonnam = Math.round(data.JEONNAM * 100) / 100;
    const gwangju = Math.round(data.GWANGJU * 100) / 100;
    const jeju = Math.round(data.JEJU * 100) / 100;
    const gyeongnuk = Math.round(data.GYEONGNUK * 100) / 100;
    const gyeongnam = Math.round(data.GYEONGNAM * 100) / 100;
    const daegu = Math.round(data.DAEGU * 100) / 100;
    const ulsan = Math.round(data.ULSAN * 100) / 100;
    const busan = Math.round(data.BUSAN * 100) / 100;

    str1 += `
    <div class="row">
        <div class="col offset-2">
            <img width="10%" style="margin-right: 10px;" src="/upload/서울최종.png">
            <img width="18%" style="margin-right: 5px;" src="/upload/인천최종.png">
            <img width="18%" style="margin-right: 5px;" src="/upload/경기최종.png">
            <img width="15%" src="/upload/강원최종.png">
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col" id="upper" style="margin-left: 100px; font-size: x-large;">
            <pre>     ${seoul}       ${incheon}          ${gyeonggi}         ${gangwon}</pre>
        </div>
    </div>

    <div class="row">
        <div class="col offset-2">
            <img width="15%" style="margin-right: 5px;" src="/upload/세종최종.png">
            <img width="15%" style="margin-right: 5px;" src="/upload/대전최종.png">
            <img width="9%" style="margin-right: 5px;" src="/upload/충북최종.png">
            <img width="15%" src="/upload/충남최종.png">
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col" id="middle" style="font-size: x-large;">
            <pre>                     ${sejong}        ${daejeon}      ${chungbuk}     ${chungnam}</pre>
        </div>
    </div>

    <div class="row">
        <div class="col offset-2">
            <img width="13%" style="margin-right: 5px;" src="/upload/광주최종.png">
            <img width="15%" style="margin-right: 5px;" src="/upload/전북최종.png">
            <img width="10%" style="margin-right: 5px;" src="/upload/전남최종.png">
            <img width="20%" src="/upload/제주최종.png">
        </div>
    </div>
    <hr>
    <div class="row state">
        <div class="col" id="lower1" style="font-size: x-large;">
            <pre>                    ${gwangju}         ${jeonbuk}       ${jeonnam}         ${jeju}</pre>
        </div>
    </div>

    <div class="row state">
        <div class="col offset-1">
            <img width="11%" style="margin-right: 5px;" src="/upload/대구최종.png">
            <img width="15%" style="margin-right: 5px;" src="/upload/울산최종.png">
            <img width="15%" style="margin-right: 5px;" src="/upload/부산최종.png">
            <img width="18%" style="margin-right: 5px;" src="/upload/경북최종.png">
            <img width="12%" src="/upload/경남최종.png">
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col" id="lower2" style="font-size: x-large;">
            <pre>          ${daegu}        ${ulsan}         ${busan}            ${gyeongnuk}        ${gyeongnam}</pre>
        </div>
    </div>
    `;

    left.innerHTML = '';

    left.insertAdjacentHTML('afterbegin', str1);

      
      
  })
  //fetch 통신 실패 시 실행 영역
  .catch(err=>{
      alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
      console.log(err);
  });
}

// 전체탭 데이터
selectData();

// const all = () => {
//     tag.innerHTML = '';
//     left.innerHTML = '';

//     fetch('/geo/geoDetailSelect', {
//         method: 'POST',
//         cache: 'no-cache',
//         headers: {
//           'Content-Type': 'application/json; charset=UTF-8'
//         },
//         body: JSON.stringify({
          
//         })
//       })
//       .then((response) => response.json())
//       .then((data) => {

//         console.log(data);

        
//       })
//       .catch((err) => {
//         console.error('fetch error:', err);
//       });
  
//       console.log(d.properties.name);
// }



// const checkAll = () => {
//     const checkboxes = document.querySelectorAll('.years');
//     const all = document.querySelector('#all');



//     const isChecked = all.checked;
//     const year = 0;

//     checkboxes.forEach(checkbox => {

//         checkbox.checked = isChecked;
//         console.log(year);
            
//     });

//     // 그림 그릴 구역 선택
//     const upper = document.querySelector('#upper');
//     const middle = document.querySelector('#middle');
//     const lower1 = document.querySelector('#lower1');
//     const lower2 = document.querySelector('#lower2');

//     const str1 = '';
//     const str2 = '';
//     const str3 = '';
//     const str4 = '';

//     if(isChecked){
//         fetch('/geo/geoDetailSelect', { //요청경로
//             method: 'POST',
//             cache: 'no-cache',
//             headers: {
//                 'Content-Type': 'application/json; charset=UTF-8'
//             },
//             //컨트롤러로 전달할 데이터
//             body: JSON.stringify({
//                // 데이터명 : 데이터값
               
//             })
//         })
//         .then((response) => {
//             return response.json(); //나머지 경우에 사용
//         })
//         //fetch 통신 후 실행 영역
//         .then((data) => {//data -> controller에서 리턴되는 데이터!
//             console.log(data);

//             upper.innerHTML = '';
//             middle.innerHTML = '';
//             lower1.innerHTML = '';
//             lower2.innerHTML = '';

//             str1 += `
                
//             `;

//         })
//         //fetch 통신 실패 시 실행 영역
//         .catch(err=>{
//             alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
//             console.log(err);
//         });
//     }
// }

// document.querySelector('#all').addEventListener('change', checkAll);

    // 전체
// new Chart(tag, {
//     type: 'line',
//     data: {
//         labels: ['서울', '경기', '인천', '강원도', '세종시', '대전시', '충청북도', '충청남도', '대구시', '울산시', '부산시', '경상북도', '경상남도', '광주시', '전라북도', '전라남도', '제주시'],
//         datasets: [
//             {
//                 data: [5478, 751, 5459, 135, 4875, 1364, 1579, 1547, 112, 1365, 1879, 5897, 1654, 6487, 615, 324, 987],
//                 label: "2016",
//                 borderColor: 'lightpink',
//                 fill: false
//             },
//             {
//                 data: [4758, 223, 4536, 1085, 286, 489, 637, 379, 432, 3467, 1973, 382, 917, 4625, 187, 986, 3846],
//                 label: "2017",
//                 borderColor: 'lightblue',
//                 fill: false
//             },
//             {
//                 data: [498, 1467, 112, 5489, 564, 3258, 4579, 115, 3648, 203, 154, 654, 325, 1658, 1478],
//                 label: "2018",
//                 borderColor: 'lightgray',
//                 fill: false
//             },
//             {
//                 data: [1569, 487, 1236, 1547, 5487, 3654, 154, 4535, 1899, 364, 1547, 3265, 154, 487, 326, 154, 3654],
//                 label: "2019",
//                 borderColor: 'lightgreen',
//                 fill: false
//             },
//             {
//                 data: [465, 487, 987, 164, 4475, 1345, 45, 164, 487, 2654, 158, 1564, 2031, 458, 1468, 11, 2354],
//                 label: "2020",
//                 borderColor: 'lightsalmon',
//                 fill: false
//             },
//             {
//                 data: [3548, 4596, 1256, 1564, 789, 1235, 156, 459, 3154, 3549, 1444, 548, 156, 478, 315, 156, 548],
//                 label: "2021",
//                 borderColor: 'green',
//                 fill: false
//             },
//             {
//                 data: [7156, 48, 5643, 6748, 1564, 3156, 156, 687, 5102, 646, 6874, 3543, 6485, 3154, 3546, 4489, 648],
//                 label: "2022",
//                 borderColor: 'red',
//                 fill: false
//             }
//         ]
//     },
//     options:{
//         title: {
//             display: true,
//             text: '전체 데이터(2016~2022)'
//         },
//         scales: {
//             y: {
//                 min: 0,
//                 max: 8000
//             }
//         }
//     }
// })

// 바
// new Chart(tag, {
//     type: 'bar',
//     data:{
//         labels: ['평균'],
//         datasets: [
//             {
//                 label: '서울',
//                 backgroundColor: 'red',
//                 data: [5786]
//             },
//             {
//                 label: '경기도',
//                 backgroundColor: 'yellow',
//                 data: [487]
//             },
//             {
//                 label: '인천',
//                 backgroundColor: 'blue',
//                 data: [578]
//             },
//             {
//                 label: '강원도',
//                 backgroundColor: 'black',
//                 data: [879]
//             },
//             {
//                 label: '세종시',
//                 backgroundColor: 'green',
//                 data: [978]
//             },
//             {
//                 label: '대전시',
//                 backgroundColor: 'purple',
//                 data: [973]
//             },
//             {
//                 label: '충청북도',
//                 backgroundColor: 'lightpink',
//                 data: [64]
//             },
//             {
//                 label: '충청남도',
//                 backgroundColor: 'lightblue',
//                 data: [996]
//             },
//             {
//                 label: '대구시',
//                 backgroundColor: 'lightsalmon',
//                 data: [977]
//             },
//             {
//                 label: '울산시',
//                 backgroundColor: 'lightgray',
//                 data: [777]
//             },
//             {
//                 label: '부산시',
//                 backgroundColor: 'black',
//                 data: [1544]
//             },
//             {
//                 label: '경상북도',
//                 backgroundColor: 'gold',
//                 data: [899]
//             },
//             {
//                 label: '경상남도',
//                 backgroundColor: 'green',
//                 data: [977]
//             },
//             {
//                 label: '광주시',
//                 backgroundColor: 'red',
//                 data: [877]
//             },
//             {
//                 label: '전라북도',
//                 backgroundColor: 'blue',
//                 data: [3644]
//             },
//             {
//                 label: '전라남도',
//                 backgroundColor: 'lightpink',
//                 data: [783]
//             },
//             {
//                 label: '제주시',
//                 backgroundColor: 'pink',
//                 data: [720]
//             }
//         ]
//     },
//     option: {
//         responsive: false,
//         legend: {display: true},
//         title: {
//             display: true,
//             text: '전체 데이터(2016~2022)'
//         },
//         scales: {
//             y: {
//                 min: 0,
//                 max: 8000
//             }
//         }
//     }
// })

// 버블
// new Chart(tag, {
//     type: 'bubble',
//     data: {
//         labels: "평균",
//         datasets: [
//             {
//                 label: ["서울"],
//                 backgroundColor: "rgba(255,221,50,0.2)",
//                 borderColor: "rgba(255,221,50,1)",
//                 data: [{
//                     x: 
//                 }]
//             }
//         ]
//     }
// })