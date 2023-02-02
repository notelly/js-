//dom 잘 다루는 건 관계를 잘 찾는 것

// 이벤트를 사용하기 위해서는 dom이 형성 되어야한다.
// DOMContentLoaded 가 끝났을 때 이벤트가 실행되게 하면 된다.
// 모든 tag에 동일한 id를 줘도 문제가 되지는 않는다. 다만 검색할 때 불가능
// getElementById querySelector -> 첫번째 검색되는 id만 가지고 온다.
// 현업에서는 class 속성 값으로 찾는 경우가 많음

document.addEventListener('DOMContentLoaded', function(){
    let checkBoxList = document.querySelectorAll('td > input');
    //input 만 적을 시 .html 에 있는 input 전체를 다 들고 온다 저렇게 조건을 걸어주면 더 났다.

    checkBoxList.forEach(function(checkBox){
        checkBox.addEventListener('click', function(){
            //똑같은 동작이지만 개별적으로 넣어주어야한다.
            //그래서 forEach를 사용함
            //queryselectorall 값이 하나라고 하더라도 배열
            //>> 유사배열이기 때문에 처리를 한다면 반복문을 돌리거나 인덱스를 지정해주어야한다.
            let trTag = this.parentNode.parentNode;
            if(this.checked){
                trTag.style.backgroundColor = 'lightsalmon';

                //선택한 행의 이름을 가져와서 콘솔에 출력하는 코드
                console.log(trTag.children[0].textContent);
                
                //trTag.after(createElement());

                createElement();
                createElement();
                createElement();
                //메모리에는 존재하지만 dom에는 존재하지 않는다.
                //결과가 반영되지 않는다.
                //append를 사용하지 않아서 그런게 아니라
                //dom에 append 가 되어있지 않아서 그렇다.



                //동적 00는 문서 노드부터 시작한다.

                // 돔이 만들어진 이유
                // 왜 트리형태로 만들어졌을까? >> 검색이 용이하기 위해
                // 메모리 전체를 뒤지는게 아니라 


                console.log(document.querySelector('td > input'));
                //querySelector 돔에 등록된 애만 검색 가능함.


                /*
                    --- append 는 하위요소로서 마지막에 붙는다.
                        trTag.parentNode.append(createElement());

                    --- 내가 선택한 것의 뒤에 붙이고 싶다.
                        trTag.after(createElement());
                        선택한 것 뒤에 들어간다. >> tbody는 append가 맞음.
                
                    --- 앞에 붙이고 싶으면 before
                        trTag.before(createElement());

                    --- prepend 완전 앞에 붙음
                        trTag.parentNode.prepend(createElement());
                */


                /*<h1>Hi</h1>
                    document.getElementById("app")._ _ _ = '<h1>Hi</h1>
                    ---innerHTML : 하지 말것 보안이 취약함
                        Hi
                    ---innerText
                        <h1>Hi</h1>
                    ---textContent 속성은 text속성
                        <h1>Hi</h1>  
                */


            }else{
                trTag.style.backgroundColor = '';
            }


            /*클릭을 발생 시켰을 때 행에 대한 정보가 필요하다.

            //let trTag = this.parentNode.parentNode;
                trTag.style.backgroundColor = 'lightsalmon';
                - 은 인식 못한다. css 에서 사용하는 표기법과 js 표기법이 다르다
                두번째문자 첫글자를 대문자로 하면 css와 연결시켜준다.
                background-color >> backgroundColor */


        });
    })

})

/*
    --  DOM Treversing(탐색)
        1) 부모 : parentNode, parentElementNode
                  굳이 따지자면 둘은 다르지만
                  textNode가 부모인 경우는 없기 때문에 둘이 같다고 봐도 된다.
                

        -- 형제 자식은, textNode를 가질 수 있기 때문에 구분해주어야한다.
        2) 자식
        - firstElementChild, lastElementChild : 첫번쨰 요소 노드, 마지막 요소 노드
        - children : 모든 요소 노드

        3) 형제
        - previousElementSibling, nextElementSiblin : 위 코딩된 요소, 아래 코딩된 요소


 */

function createElement(){
    let data = { name : '이운로', age : '18', city: '울산'}

    //행에 대한 정보를 가지고 있음
    let tr = document.createElement('tr');
    
    //forEach 사용 불가 data는 객체 -> 배열이 아니므로 사용 불가능하다.
    for(let field in data){
        let td = document.createElement('td');
        td.textContent = data[field];
        tr.append(td);
    }

    //체크박스는 for문안에 들어가는게 아님
    let td = document.createElement('td');
    let inputTag = document.createElement('input');
    inputTag.type = 'checkbox';
    inputTag.addEventListener('click', function(){
        console.log('새로 추가한 체크박스 입니다.');
    })
    td.append(inputTag);
    tr.append(td);
    // 이벤트는 정상적으로 작동하지 않음.
    // R : 동적으로 태그를 만들었기 때문
    // 필요하면 따로 이벤트를 등록을 해 주어야한다.
    // 이벤트 다 걸어두고 새로 만들어진 tr이기 때문에 이벤트가 없다.


    // 생성시 이벤트를 걸거나 돔 생성하면서 건 이벤트를 가지고 오면 된다.?




    return tr;
}

/*  분리해서 생각하기

    attribute  (geattribute setattribute)
    초기 값을 그대로 유지하는 것


    property
    DOM 내부의
    
    DOM이 HTML 기준으로 움직임


    사용자 정의 속성
    dataset (-으로 시작하는 속성)
    ex) data_neme
    neme(name의 오타)는 읽지 못하지만 data-neme는 읽어온다.
    대신 document.getElementById('app').getAttribute('neme') 형태로
    읽어올 수 있다.
*/

/*
    캡처링 버블링

    캡처링
    --이벤트가 발생했을 때 이벤트가 어디 있는지 방마다 다 열어보고 이벤트까지 가는거
    document -> 해당 파일까지

    버블링
    -캡처링을 통해서 이벤트가 일어나는 곳까지 왔고 이벤트가 끝난 이후
    나가면서 전파 확산
    해당 파일부터 -> document까지 가면서 확산
    상위요소로 가면서 이벤트가 확산
    


*/


/*
                                    이벤트 객체
    Tag.addEventListener('event', function(){})

    ┌ target: 이벤트 <p> / 고정값 유지
    └ currnetTarget : 현재 이벤트 전파가 되어서 그 이벤트의 주체가 되는 것.

    ┌ stopPropagation() : 이벤트의 전파를 막을 때
    │
    └ preventDefault()  : 이벤트의 실행을 막을 때


*/