//함수1 -> 함수 선언문 >> 호이스팅 발생 (호이스팅이 나쁜게 아니다. 기술적으로 배제하는게 아님 주의해야한다.)
function firstFunc(x, y, ...rest) {
    let sum = x + y;
    rest.forEach(function (value) {
        sum += value;
    });
    return sum;
}

console.log(firstFunc(1, 2));

//함수2 -> 함수 표현식

/*function을 변수에 담는 함수 표현식으로 쓴다면
let보다는 const 상수로 쓰는 게 났다.*/
const funVar = function secondFunc(x, y, ...rest) {
    let sum = x + y;
    rest.forEach(function (value) {
        sum += value;
    });
    return sum;
}

//변수의 이름을 이용해서 호출 해야한다.
console.log(funVar(1, 2, 3));


//호이스팅의 문제점 >> 함수의 이름이 겹치게 선언 할 경우 앞의 함수를 덮어쓰게 된다.
console.log(test()); //출력 : 새로운 값

function test() {
    return 10;
}

console.log(test()); //출력 : 새로운 값

function test() {
    return '새로운 값';
}
console.log(test()); //출력 : 새로운 값

//커링 함수 -> 함수를 개발하는 기법
//매개변수를 무조건 하나로 가진다.

console.clear();

function orderSet(burger, side, beverage) {
    console.log('set Menu : ', burger, side, beverage);
}

orderSet('불고기버거', '감자튀김', '콜라');
orderSet('불고기버거', '코울슬로', '탄산수');
orderSet('불고기버거', '치즈스틱', '커피');

function orderSet(burger) {
    return function orderSide(side) {
        return function orderBeverage(beverage) {
            return function orderComment(comment) {
                console.log('Set Menu : ', burger, side, beverage);
                console.log('Order Comment : ', comment);
            }
        }
    }
}

// 자바, 람다식 : 자바스크립트, 화살표 함수
// 람다식이 화살표 함수를 참고한 것, 둘이 동작하는 것이 좀 다름.
// () => {}

//const orderSet = burger => side => beverage => comment => {}

//화살표 함수 내에서는 this가 원하는데로 움직이지 않는다.



let aSet = orderSet('불고기버거')('감자튀김');
/*
    let aSet = function orderBeverage(beverage){
        return function orderComment(comment){
            console.log('Set Menu : ', '불고기버거', '감자튀김', beverage);
            console.log('Order Comment : ', comment);
        }
    }
*/
//기본으로 값 주기
let bSet = orderSet('불고기버거')('샐러드');
//미리 변수에 값을 담아 놓을 수 있다.

aSet('오렌지쥬스')('감자튀김에 소금은 뿌리지 말아주세요.');
aSet('바닐라라떼')('요청사항은 없습니다.');
bSet('아이스커피')('아이스 커피에 얼음을 많이 주세요.');


//나머지 파라메터(매개변수를 몇개까지 추가로 받을지 인자에 대해 담아둘 파라메터 // 항상 마지막에 위치해야한다.),
//펼침연산자(함수에서 매개변수로서 세개의 점을 찍는 건 나머지 파라메터다. 일반적인 명령어에서 점을 세개 찍는 건 펼침연산자)
//arguments 

//펼침연산자 중요

function max(x, y, z) {
    let max = x;
    if (max < y) {
        max = y;
    } else if (max < z) {
        max = z;
    }
    return max;
}

let original = [584, 983, 487, 153];
console.log(original, max(original[0], original[1], original[2]));
//객체의 내부값을 순차적으로 나열하는 방법 방법 >> 펼침연산자
console.log(...original);
console.log(original, max(...original));

/*
    펼침연산자. 해당 변수에 펼침연산자가 붙으면 그 객체 내부를 열어서
    그값에 대한 요소들에 대해 순차적으로 나열해 준다.
    그러나 fucntion에 매개변수를 3개만 넣어줬기 때문에 function이 3개에 대해서만 적용된다.

*/

//그래서 나머지 파라메터, argument사용

function min(...restParams) {
    /* 
        restParams 은 object type
        또다른 매개변수와 쓸수 있지만 주의해야한다.
        나머지 값을 가지고 있는 것 순차적으로 채워지고 나머지를 담기 때문에
        restParams가 비게된다.

        필수적으로 들어가는 매개변수가 있을 때 매개변수와 함께 쓸 수 는 있다.
    */
    let min = restParams[0];
    restParams.forEach(function (value) {
        if (min > value) {
            min = value;
        }
    });

    return min;
};
console.log(min(-1, 40, 3, 5), min(), min(2, 8));



function minArguments(){
    /*  
        권장하진 않지만 존재하는 것 알고는 있자
        매개변수X >> 내가 넘겨준 것을 제어하고 있다.
        이상한 상황
        예외적으로 모듈을 만들거나 낮은 레벨로 만들때 사용은 할 수 있음.
        arguments 유사배열객체
        
    */


    let min = arguments[0];
    for(let i = 1; i < arguments.length; i++) {
        if (min > arguments[i]) {
            min = arguments[i];
        }
    };

    return min;
}

console.log(minArguments(-1, 40, 3, 5), min(), min(2, 8));


// 화살표 함수 : () => {}, this : window 객체 -> 전역객체 (this가 없다고 생각하면 된다.)
// 함수의 표기법을 축약해서 쓴 것.
// 콜백함수 쓸때 많이 쓰인다.
//() => {}; >> 가장 대표적인 익명함수 이러면 값이 담기지 않는다.
let testFunc = (id, message) => { console.log(id, message)};
testFunc();

//1. 매개변수가 없는 경우 2. 실행하고자 하는 명령어가 하나인 경우
testFunc = () => console.log('매개변수없는 화살표 함수');

//3. 매개변수가 하나 밖에 없는 경우 4.하나의 값을 return하는 명령어만 있는 경우
testFunc = data => {return data + '를 매개변수로 받았습니다.' ;}
//↓↓ 축약
testFunc = data => data + '를 매개변수로 받았습니다.' ;
//명령어만 있다면 전부 반환시킨다.

console.log(testFunc(100));


// 커링함수  -> 화살표 함수 변환
function orderSet(burger) {
    return function orderSide(side) {
        return function orderBeverage(beverage) {
            return function orderComment(comment) {
                console.log('Set Menu : ', burger, side, beverage);
                console.log('Order Comment : ', comment);
            }
        }
    }
}

//실행블록 생략가능 -> 명령어가 한줄일 때, 거기 리턴이 있으면 리턴도 같이 생략

// 1.
// function orderComment(comment) => 생락
comment => {
    console.log('Set Menu : ', burger, side, beverage);
    console.log('Order Comment : ', comment);
}

// 2.
//function orderBeverage(beverage) { //매개변수 하나 괄호 마찬가지로 생략
beverage => /*{ return (리턴구문 1개 >> 생략가능하다.) 생략*/ comment => {
        console.log('Set Menu : ', burger, side, beverage);
        console.log('Order Comment : ', comment);
    }; //세미콜론의 갯수(유무, 명령어가 몇줄인 건 상관없다.) =  명령어의 갯수
/*} 중괄호 생략*/

// 3.
side => beverage => comment => {
        console.log('Set Menu : ', burger, side, beverage);
        console.log('Order Comment : ', comment);
    };

// 4.
burger => side => beverage => comment => {
        console.log('Set Menu : ', burger, side, beverage);
        console.log('Order Comment : ', comment);
            };

//화살표 함수로 변환 했다고 해도 여전히 커링함수

//스코프 : 변수의 유효범위