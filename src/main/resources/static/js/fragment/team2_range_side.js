

rangeData();

function rangeData() {
    fetch('/range/allRange', { //요청경로
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

            let tbody = document.querySelector('#t-body');
            tbody.innerHTML = '';
            let str = '';


            data.forEach((i,idx) => {
                console.log(i)
                str +=
                    `
            <tr onclick="goDetial()">
                <td>${i.occurredYear}</td>
                <td>${i.burnrange0_5}</td>
                <td>${i.burnrange6_10}</td>
                <td>${i.burnrange11_21}</td>
                <td>${i.burnrange21_30}</td>
                <td>${i.burnrange31_40}</td>
                <td>${i.burnrange41_50}</td>
                <td>${i.burnrange51_60}</td>
                <td>${i.burnrange60_over}</td>
                
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

const goDetial = () => {
    location.href='/range/detailRange'
}