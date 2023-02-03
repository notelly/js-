// fetch 는 promise를 쉽게 만들어주는 mapper
// then 과 catch는 promise의 method를 쉽게
fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())  //한번 파싱 작업을 해주어야한다.
.then(data => {
    console.log(data);
    // 이 값들을 콘솔창에서 지우고 싶다면 console.clear(); 가 이 아래에 와야한다.
})
.catch(reject => console.error(reject));

//console.clear();

// XMLHttpRequest
function get(url){
    //비동기(작업 대표적인 것 addEventListener) 통신을 하기 위해 객체 생성 
    const xhr = new XMLHttpRequest();

    //비동기 작업 >> 상황에 대해 발생하면 갑자기 내가 하는게 stop 콜백 함수가 실행된다.

    //실제로 비동기 통신을 위해 데이터를 받아 왔을 때 우리가 처리하는 함수가 될 것
    //onreadystatechange : 상태가 변경되었을 때 뭔가 하겠다. = onload or onclick 
    xhr.onreadystatechange = function(){
        //state : 통신에 대한 결과로서 받는 값.

        //응답에 왔을 때 실행해야하는거
        if (xhr.readyState != XMLHttpRequest.DONE) return;

        if( xhr.status == 200 ){
            //정상적인 응답에 대해서만
            return xhr.response;
        }else{
            console.error('Response Error : ' + xhr.status);
        }
    }
    xhr.open('Get', url); // 길을 열었다.
    //리퀘스트를 보낼꺼면 send를 호출해주어야한다.
    xhr.send();
}

const res = get('https://jsonplaceholder.typicode.com/posts');
console.log(res); // undefined

//비동기 통신은 동기되지 않은 상황에서 벌어지는 것

//동기통신
// 내가 뭔가 하고 있을때 누가 들어오면 일단 스탑.
// 일단 그 누구랑 해결을 하고 그 사람을 보내고
// 다시 내작업

//비동기
//메세지. 채팅. 보내고 나는 내꺼 한다.
//그사람이 다시 메세지에 답을 해주면 알람이 뜨며 알려준다.
// 내꺼먼저 끝낼 수도 있다.
// 언제 답장올지 모르는 것을 추측하고 미리 응답해 둬야한다.


//뭔가 다시 요청해야하는 경우


/*
    get은 response를 처리하는데 썼다.
    반복적으로 데이터를 확인해야하는 작업이 있다면 콜백 함수를 쓰는데
    동기와 다르게 비동기는 사용자가 원하는 타이밍에 호출하지 못한다.
    비동기는 필연적으로 콜백함수를 써야함.
    실제 비동기 결과와 콜백함수를 연동해서 씀.

    비동기 통신이 한번에 끝나면 상관없지만 연속적으로 이루어져야한다면
    가독성은 둘째치고 정상적으로 작동하지 않을 가능성이 많다.
    -> 이걸 Callback Hell이라고 한다.


    비동기 통신 -> 콜백함수: 연속적인 비동기 통신에서 Callbakc Hell라 불리는 현상이 발생
    Callback hell이 일어나지 않도록 해주는 것
    -> promise 객체
    굉장히 단순하다.
*/

function step(location){
    let result = location -1;
    while(result > 0){
        result = step(result);
    }
    return result;
}

step(10);

//promise 객체
const promise = new Promise((resolve, reject) => {
    // resolve, reject => promise가 던져주는 것

    //틀을 기억하기
    let data = 0;
    setTimeout(() => { data = 100; }, 3000);
    if( data > 0 ){
        resolve('success'); //resovle에 대한 결과를 첫번째 매개변수로 받고
    }else{
        reject('fail'); //reject에 대한 결과를 두번째 매개변수로 받고
    }
})
.then(res=> console.log(res), err => console.log(err))
.then()
.then()
.then()
.then()
.then();


//비동기 통신에 대해 우리가 꾸밀 수 있다. >> 내가 결과를 봤을 떄 실패로 돌리고 싶다면 reject를 이용해 실패로 만들 수 있다.

let promisAjax = (method, url, payload) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(payload));
        
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState != XMLHttpRequest.DONE) return;

            if(xhr.status >= 200 && xhr.status < 400){
                resolve(xhr.response);
            }else{
                reject(new Error(xhr.status));
            }
        }
    })
}


//비동기 처리를 시작하고 그 결과에 응답하지 않은 것을 pending이라고 한다.
let firstAjax = promisAjax('GET', 'https://jsonplaceholder.typicode.com/posts/1', '');
console.log(firstAjax.status);

//pending       : 비동기 처리가 수행되지 않은 상태.
//settled       : 비동기 처리가 수행된 상태(성공 혹은 실패).
//fullfilled    : 비동기 처리가 수행된 상태, 그 결과 성공 -> resolve 함수
//rejected      : 비동기 처리가 수행된 상태, 그 결과 실패 -> reject 함수


//promise 자체는 통신을 일으키진 않는다.
//결과 처리 방법 >> 그 종료된 (promis 객체를 그대로 가지고 있으면서) 결과만 계속 출력해 줌.
setTimeout (()=>{console.log(firstAjax);}, 1000);
let buttonTag = document.createElement('button');
buttonTag.textContent = '통신결과';
buttonTag.addEventListener('click', function(){
    firstAjax // 얘가 들고 있는 객체에 대해 반복적으로 프린트만 해주는 것 -> 필요할 때 던져줄 수도 있다.
    .then(JSON.parse, /*err => console.log(err) 개별적인 에러 처리 지우고*/)
    /* 
        성공했을 때 콜백함수로 던진거 JSON.parse가 가지고 있는 함수를 인자로 집어넣은 것
        그걸 다시 return시킨다.
        객체를 반환 시켜줌
        체인 then이 결국 return을 하나 해주는데 그게 promise 객체다
        최소한 then을 쓸 때는 error가 났을 때 console에 출력하는 문구를 적어줘야한다.    
    
    */
    .then(data => console.log(data))
    .catch(reject => console.log(reject)); /* catch를 통해 오류를 잡아주면 된다. */
});

//then 오류처리와
//catch 오류처리의 차이
//      그전의 에러는 처리할 수 없다. 
// then 오류처리  .then 첫번째 성공 or 실패 -> 처리가능 >> 계속 매번 처리해주어야한다.
//                .then 첫번째 결과 처리 -> 두번째 성공 or 실패 -> 처리가능
//                .then 두번째 결과 처리 -> 세번째 성공 or 실패 -> 처리가능 ...

//catch 오류 처리 >> 전체적으로 처리 그냥 출력 -> 실패가 되는 순간 건너뛰고 바로 catch로 넘어간다.



document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#app').append(buttonTag);

    const divTag = document.querySelector('#app');
    const render = content => { divTag.textContent = JSON.stringify(content, null, 2); }

    const url = 'https://jsonplaceholder.typicode.com/posts';

    promisAjax('GET', `${url}/1`) //통신을 일으키고 상세결과로 가는게 가능하다.
    .then(res => promisAjax('GET', `${url}?userId=${JSON.parse(res).userId}`)) //템플릿기법 ''가 아니라 ``(backtick)사용한다.
    .then(JSON.parse)
    .then(render)
    .catch(console.error);

})


//fetch랑 비슷하면서 다른데 promise객체가 확장성이 훨씬 좋다.
//promise같은 경우는 병렬진행이 가능해서 알아둬야한다.

/*
    -> 비동기 통신의 병렬처리
    - Promise.all   : 매개변수 순서대로 결과를 보장한다.
    - Promise.race  : 매개변수 순서와 상관없이 제일 먼저 실행된 건에 대해 반환한다. -> 


*/

Promise.all([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 3000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2), 1000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 5000)),
]).then(console.log) //1,2,3순으로 결과 반환 -> 실행순서는 상관없음
  .catch(console.log);


  Promise.race([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 3000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2), 1000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 5000)),
]).then(console.log) //제일 빨리 실행된 5만원 반환.
  .catch(console.log);
  
  
//async/ await
//내부에 비동기 처리를 하고자 하는 내용에 대하여
  function getUser(username){
    return fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(user => user.name);
}

let users = ['jeresig', 'ahejlsberg', 'ungmo2'];
async function getUserAll(){
    let user;
    user = await getUser(users[0]);
    console.log( 0, users[0], user);

    user = await getUser(users[1]);
    console.log( 1, users[1], user);

    user = await getUser(users[2]);
    console.log( 2, users[2], user);
}

getUserAll();

//일어나는 비동기 처리가 끝나기 전까지 실행되지 말라고 await를 걸어 기다리게 만듬.



/* 정리

비동기 통신 -> XMLHTTPRequest (주체) : 비동기통신 결과를 처리 => 콜백헬 발생할 수 있음
좀 더 편하게 하자 -> promise 객체 : 비동기 통신에 대한 내용을 콜백함수로 받는다.  콜백함수: 비동기 통신을 실제로 일으키는.

promise는 콜백함수로 하여금 내부에서 비동기 통신을 처리를 하고
Promis((resolve, reject)={
    비동기 작엄
    if resolve -> 성공
    else reject -> 실패
})
.then (성공 값이 넘어온다.)
.then (실패 값이 넘어온다.) 내가 결과에 따라 실행을 처리해주면 결과에 따라 실행하게 된다.
.then에서 에러 처리는 각자 할 수 밖에 없기 때문에
전체적인 오류는 할 수 없다 >> 하고 싶다면 catch를 통해 오류를 잡는다.
.catch(); : 필수(주의!) >> 무조건 적기
>> catch가 없다면 오류가 표시 되지 않아 오류가 나도 계속 기다리게 된다.

Promise + XHLHTTPRequest => 내부에 고정적인 코드 발생
                         -> fetch 가 통신을 일으킬 때 좀더 편하게 쓸 수 있다.// 제한적 >> fetch를 알고 있으면 promise 자체가 어렵지 않다.
async / await                                                                              


*/