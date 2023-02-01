//값을 들고 오는 방법은 많다
// 비동기 방식 중 가장 쉬운 방법 -fetch =>언제 결과가 응답할지 모른다.
// then을 통해 응답이 오면 그 순간 처리한다.

//매개변수로 2개의 값을 넘겨줄 수 있다.
//usl, {} -> 객체
//직접적으로 넣어야할 떄 객체를 사용한다.

//경로 신경쓰기.
fetch('../data/table_info.json') //>>경로를 써주어야함
//상대경로를 쓰는 것  /(루트) 최상위, ./ 현재 파일 기준, ../ 상위 폴더
.then(response => response.json()) //response는 응답객체 request는 요청객체  -> json에서 가지고 와야함으로 .json()
.then(data => {
    //태그 생성
    let table = document.createElement('table');
    
    //헤더
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    
    for(let field in data[0]){ //field json 배열 1번
    //for in >> 객체에 있는 필드만 가지고 옴 유용한 키
        let th = document.createElement('th');
        th.textContent = field;
        tr.append(th);
    }

    thead.append(tr);
    table.append(thead);

    let maleCount = 0;
    let femaleCount = 0;
    let etcCount = 0;
    //바디
    let tbody = document.createElement('tbody');
    for(let i = 0; i < 100; i++){
        //우리는 배열을 가지고 있음. 배열 >> 객체
        //전체 들고오려면 foreach도 상관 없음
        tr = document.createElement('tr');

        for(let field in data[0]){
            let td = document.createElement('td');
            td.textContent = data[i][field]; //>> 배열 ex) data[1] 은 객체이기 때문에 내부값을 건들려면 한번더 필드로 지정해주어야한다.
            //data[i][field] data[i].field (이건 이름을 찍어주는 것이기 때문에 아무것도 뜨지 않다는다.)
            // field >> 필드는 내부의 값을 들고 있는 변수
            tr.append(td);

            //성별별 인원수
            if(field.toLowerCase() != 'gender'.toLowerCase()) continue;

            let gender = data[i][field];
            if (gender.toLowerCase() == 'Male'.toLowerCase()){
                maleCount++;
            }else if (gender.toLowerCase() == 'Female'.toLowerCase()){
                femaleCount++;
            }else{
                etcCount++;
            }

        }
        tbody.append(tr);
    }
    table.append(tbody);
    console.log('남자 : ' + maleCount, '여자 : ' + femaleCount, '중성 : ' + etcCount);
    console.log('총합 : ' + (maleCount+femaleCount+etcCount));
    
    //여기까지 하면 생성을 되엇지만 dom에 등록 되어 있지는 않음.
    //dom에 등록이 되어야 사용이 가능하다.
    //특히 addeventlistener를 할때 dom에 등록이 되어있지 않다면 이벤트를 걸 수 없기 때문이다.

    document.querySelector('#app').append(table);

})
.catch(reject => {console.log(reject)}) //실패 했을 떄 
