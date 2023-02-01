/*
    변수 데이터 타입
    : NUMBER, STRING, OBJECT, ARRAY, BOOLEAN, ETC

    ---------------- 기존
    var : 기존의 사용 >> 광역적으로 사용할 수 있다.
    //호이스팅 : 실제 선언 위치와 상관없이 선언만 되어 있으면 사용이 가능 >> but 의도한대로 움직이지 않을 수 있다.
    ---------------- 2015 부터
    let : 변수 >> let을 쓰는 것을 권장 var이 침범하는 부분이 많다.
    //호이스팅 X : 실제 선언 위치 이후에 사용이 가능;
    const : 상수 >> 일반적 원시형 데이더와는 일반 상수와 같으나
    object, array의 경우에 참조객체를 변경하는 것이 불가 : 참조객체의 실제 내부 필드 값은 변경 가능

    ---------------- 값이 존재하지 않는 변수를 사용했을 때
    의미자체는 동일 하지만
    undefined : 자바스크립트 -> 자동으로 해당 변수에 값이 존재하지 않다고 알려줄 때 사용(보기만 해야하는 값. 값을 주거나 사용하기에는 적합하지 않다.)
    null      : 개발자가 해당 변수의 값을 삭제 

*/

//---------------------
//내가 보는 코드
console.log('high: ' + x);
//let x = 10;
var x = 10;
console.log('middle: ' + x);
// var x = 10; let과 var은 동명 변수로 선언할 수 없다.
var x;
console.log('bottom: ' + x);
/*>> 실행시
var x;
console.log('high: ' + x);
x=10;
console.log('middle: ' + x);
console.log('high: ' + x);
와 같은 형태로 만들어진다
저렇게 끌어올려지는 것을 호이스팅*/


const obj = { name : '홍길동', age : '20'};
obj.name = 'apost';
console.log(obj.name) //apost 로 변경된다.
// 객체가 아닌 것은 상수의 역할을 하지만
// 리터럴 값이 들어가는 상수 일 경우
// 참조형 데이터 타입. array나 00은 const라도 값을 바꿀 수 있다,
// 객체 >> 존재하는 공간이 따로 존재하고 주소를 들고 오는 것
// 결론적으로 const 는 주소값을 변경 못하는 것이지 안에 값은 변경이 가능하다. 


/*
    연산자
    1)산술연산자 : +, -, *, /, %, -/+, ++/--, +=, -=, *=, /=
    2)논리연산자 : &&, ||, !
    -> null, '', 0, NaN, undefined >> 전부다 false - not을 이용해서 처리하는 것이 가장 좋다.
    3)삼항연산자 : (조건식) ? A : B
    4)비교연산자 : 
     - ==, !=   : 타입 변환 후 값을 비교 
     - ===, !== : 타입부터 확인하고 값을 비교 (타입과 값 모두 같은 경우.)
*/

// ex
console.log( null == undefined);
console.log( null === undefined);

/*
    ---------------- 조건문
    1) if ~ else if ~ else
    2) switch

*/

/*
   ---------------- 반복문
    1) while 문
    2) do ~ while 문
    3) for 문
*/

// ---------------- 기본 for문
for(let i = 1; i <= 10; i++){
    console.log(i);
}

let friends = [
    { name: '라이언', age : 5, field : '추가된 값'},
    { name: '춘식이', age : 3 },
    { name: '어피치', age : 4 },
    { name: '프로도', age : 9}
]
// ---------------- for ~ of -> 향상된 for 문(해당 객체 내부에 있는 모든 내부의 값을 가지고 와야 할 때. 배열, set, list)
// 종류는 객체면 가능하다. - Array, String, Map, Set 객체
for(let friend of friends){
    console.log( friend.name, friend.age );
}
//단, 객체 내부를 삭제할 때는 경우 주의 필요.

// ---------------- for ~ in
// - Array. String, Map, Set 객체
for(let field in friends){
    console.log(typeof field, field);
}

// 필드 : 객체 안에 여러 값, 그 여러값을 지칭하는 이름이 필요해서 사용한다. 예를 들어 인덱스값
for(let field in friends[0]){
    console.log(typeof field, field, friends[0].field); // >> undefined 된다 위에 추가된 값을 적어 줬음으로 추가된 값이 뜬다.
    //friends[0].field friends 컬럼 중 field 가 있는지 찾는다.
    console.log(typeof field, field, friends[0][field]); //>>이캐 써줘야한다.
    console.log(typeof field, field, friends[0]['field']);//>> 리터럴로 넘겨주려면 
    
} //>> 객체 안에 있는 필드값을 확인할 때 단, 실제 값을 가지고 올 때는 주의가 필요

// ---------------- 배열.forEach() >> 매소드
friends.forEach(function(data, index, array){ // >> 매개변스로 들어오는  것 외부값 먼저, (index, 배열) >> 필수는 아님
    console.log( data, '인덱스 : ' + index, array );
});

// ---------------- 함수1 >> 호이스팅O
function sum (x, y){
    // return Number(x)+ Number(y); //return 생략 무방
    return typeof x == Number && typeof y == Number ? ( x + y ) : '입력된 값이 숫자가 아닙니다.';
};

console.log(sum(1, 5));
console.log(sum ('1', '5'));

// ---------------- 함수2 >> 호이스팅X
const multi = function calc (x, y, z) {
    return x * y * z;
}
// 함수1 function 은 dom만 건들이지 않으면 밑에 정의해도 상관없다. 밑에 정의하고 위에 쓸 수 있다.
// 함수2 const 는 선언한 이후에 쓸 수 있다.

console.log(multi(5,2,3)); //>> 변수인데도 불구하고 함수를 사용하는 것처럼 사용할 수 있다.
//console.log(calc(5,2,3)); //>> 내부에서 자기 자신을 호출할때(재귀함수) function 의 명은 대체된다.
//외부에서 function의 원래이름으로는 호출 불가


/*document.addEventListener('DOMContentLoaded', fucntion(){
        dom이 완성되고 나서 실행됨.
        window.onload 도  비슷하게 쓰임. 컨텐츠가 다 로딩되고 난 후에

        DOMContentLoaded  : DOM이 완성된 직후 -> 멀티미디어가 아직 로딩 중일 가능성이 있음
        -document.addEventListener('DOMContentLoaded', fucntion(){});
        onload     : 해당 페이지 전체가 완성된 직후 -> 멀티미디어의 로딩이 끝났을 때
        -window.onload = function(){}

})*/


// ---------------- 객체: 전혀 다른 종류의 타입으로 값을 구성 -> 각 값의 이름이 필요


console.clear();
//key 값이 필요하다
let object = {  age: 10,
                grade: 'a',
                date : {year : 2023, month : '1월'},
                ary: ['문장으로 구성된 값', 100]};
                
// ---------------- 배열 : 전혀 다른 종류의 타입으로 값을 구성
let array = [ 10, 'a', {year : 2023, month : '1월'}, ['문장으로 구성된 값', 100]];

console.log(object.age);
console.log(object.date.year, object.date['year']);
console.log(object.ary[0]);

object.info = '새로운 정보입니다.';
console.log(object);


// ---------------- 문자열 vs 문자열 객체 : eval() >> 쓰지말자
let strData1 = '문자열';
let strData2 = new String('문자열');
let strData3 = new String('문자열');


console.log(strData1 == strData2);
console.log(strData1 === strData2);

console.log(strData2 == strData3);
// new를 이용하면 새로운 객체를 만드는 것이기 때문에 결과는 false가 된다.

let data1 = '1+2*3';
let data2 = new String('1+2*3');
console.log(data1, data2.toString());
console.log(eval(data1), eval(data2));
//eval은 문자열만 가능하다. 문자열과 문자열 객체는 단순히 타입이 다른게 아니라 다루는 게 다르다.


/* ---------------- slice(), substring(),substr()
    잘라쓰기
    : 문자열 자르는 메서드
*/

/* ---------------- indexOf() : 리턴 값이 -1 인 경우 내가 찾고자 하는 문자가 없다.
    String 인 경우 가질 수 있는 크기의 값은 다양하다.
    그안에 내가 찾고자 하는 문장, 단어가 있는지 찾고자 할때 이것을 이용한다.
    -1이 아닌 경우 내가 찾고자 하는 문자가 있다.*/