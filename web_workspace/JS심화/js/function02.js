//실행컨텍스의 실행순서
var a = 1; //>> 함수를 벗어나서 사용하는 변수는 전역변수

//함수 내에서 선언된 변수는 지역변수
function outer() {
    function inner() {
        console.log(a); // undefined : 내부값이 없기 때문에
        var a = 3; // 이게 없다면 ↑ 는 var a = 1을 인식한다.
        //함수 안에 있는 변수가 우선순위
        //let a = 3이었다면 오류가 났을 것

    } // >> inner 컨텍스트가 종료된다. >> inner 컨텍스트가 사라진다.
    //독립된 실행컨텐츠로 인식하기 때문에 내부의 변수로 본다.

    inner(); // 함수호출 >> 전역컨텍스트가 만들어진다.
    console.log(a); // 1 var type이라 가능한 것

} // outer 컨텍스트 내용이 종료가 된다. >> 컨텍스트가 사라진다.

outer(); // 함수호출 >> 전역컨텍스트가 만들어진다.       >> 내가 들고 있는 것을 기반으로 해서
console.log(a); // 1

/*
    함수를 하나 만들때 마다 실행 컨텍스트가 생긴다.
    실행되는 시점에 실행 컨텍스트가 생기는 것이기 때문에
    동일한 함수라도 재귀호출(다시 호출)을 하게 되면 개별적인 실행 컨택스트가 생겨난다.
    Stack
  │
  │
  │  inner 컨텍스트 ↖ 기존에 outer 컨텍스트로 움직이던 것이 stop 되고 inner 컨텍스트에서 움직인다.
  │      (LexicalEnviroment) 
  │      ----------- e : a (아직 초기화 되지 않음 = undefined 출력) 이후에 a = 3
  │      ----------- o : outer L.E  >> 끝나고 사라진다.
  │  outer 컨텍스트 ←← 전역 컨텍스트를 기반으로 움직이던 것이 outer 컨텍스트로 움직인다. >> 전역 컨텍스트에 의해 생성됨
  │      (LexicalEnviroment) 
  │      ----------- e : inner (inner 함수 밖에 없다. console.log(a) >> a가 없다. 그럼 찾아감 outer 컨텍스트의 o 참조해서 ↓)
  │      ----------- o : GLOBAL L.E(LexicalEnviroment) (전역 컨텍스트까지 가면서 a를 찾는다. ↓)  
  │  전역  컨텍스트 (anonymous) >> 종료되면 사이트가 종료된다. let a / window.↓
  │      (LexicalEnviroment) 
  │      ----------- e : a = 1 , outer                         (a가 있다. >> a=1로 출력)                             
  └────────────────────────────────────────────────────────────────────────────────────────────┘
    호출될때 마다 컨텍스트 형태로 쌓인다. 
    끝에는 다시 전역 컨텍스트만 남는다.

 =========== 스코프 : 변수의 유효범위

 =========== 실행 컨텍스트(객체)
                >> 지금 실행할 코드에 제공되어야 되는 환경 정보들을 모아둠
                >> 실제 들고 있는 필드 값
   1) variableEnviroment(변수환경) >> 실제로 참조하는 경우가 흔치 않다.
   : snapshoot 호출되는 시점(실행 컨텍스트가 실행되는 시점)에 내부에 있는 식별자(변수, 함수)와 외부 환경 정보
   2) LexicalEnviroment
   : 내부의 식별자(변수, 함수)와 외부 환경 정보, 실시간으로 변경사항을 반영
    - environmentRecord         : 내부 식별자(변수, 함수)의 정보를 가지고 있는 경우 -> 스코프로 생각할 것 : 내부에서 생성된 애들은 내부에서만 사용한다. 하지만 경우에 따라서 서로의 스코프를 연결하고 같이 쓸 수 있나?
    => Scope (함수를 기준으로 영역을 가진다. 경우에 따라 let, const의 경우 블락 단위로 가능하다.) 
    - outerEnvironmentReference : 외부 환경 정보를 가지고 있음 -> 해당 컨텍스트를 생성하는 코드가 존재하는 실행 컨텍스트의 LexiclaEnvironment를 참고 하고 있다.
    => Scope Chain 범위를 넓힘
    3) ThisBinding
   : this 식별자가 가리키는 대상 >> 어디에서 사용하는 지에 따라 유동적으로 변동된다.


실행컨텍스트는 2가지를 가지고 있다.
내가 들고 있는 변수의 정보
나를 호출한 함수 (객체에 대한 정보) >> this
*/



// =========== this : 동적으로 객체를 받을 때 사용 (함수를 기반으로 했을 때 나를 들고 있는 게 누군지가 중요하다.)
// 설계시점에서 this는 모호하다.
function getThisInfo() { //함수 (객체)
    console.log('현재 this의 정보', this);
}

let infoObj = {
    function: 'this 정보 출력',
    getThis: getThisInfo

};

getThisInfo(); //함수 그자체로 실행    -> window 객체를 this로 받는다.
infoObj.getThis(); //객체의 메소드로 실행  -> 해당 객체를 this로 받는다.

//어디에 속해있는 애들 원하는지 지정해주어야한다.
//함수 앞에 있는 정보를 객체가 받는다.

let obj1 = {
    outer: function () {
        console.log(this); // (1) obj1 객체 출력

        var innerFunc = function () { // 함수,  독립된 함수, 메소드로 존재하는게 아니다.
            console.log(this); // 함수 그 자체 >> 무조건 window 객체를 호출한다.
        }

        innerFunc(); // (2)  window 객체

        var obj2 = { //
            innerMethod: innerFunc //선언은 함수(독립적으)로 했는데 method로 변경됨
        }

        obj2.innerMethod(); // (3) obj2 객체

        var testFunc = obj2.innerMethod; // >> method를 변수로 변경
        testFunc; // (4) window 객체
    }
}
obj1.outer();

/*
    function = method (엄밀히 말하면 같다.)
    구분해주는 이유
    하지만 자바는 function 가 없다. 거의 method라고 지칭

    function <=> method
    서로가 서로가 될 수 있다.
*/

/* =========== this 값을 우회하는 방법
    -> 필요한 이유: 콜백 함수의 경우 this가 window 객체가 아닐 경우 존재.
 

     콜백함수 ex) forEach, eventHandler
     = 주도권을 함수한테 주는 것
*/
[1, 2, 3, 4, 5].forEach(function (value, index, array) {
    console.log(index, this);
}, obj1 /*각 함수당 메소드에서 제공해주는 기능,*/ );

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('app').addEventListener('click', function () {
        console.log(this);
    });
});

/* 반복문이 몇 번 돌아가는지에 대해 주도권을 가지는 것은 forEach >> 배열의 인덱스 값이 몇인가에 따라 달라짐
   그래서 매개변수로 저렇게 받을 수 있는 것.

   이론상 함수는 모두 window 객체를 호출 하여야하지만
   콜백함수가 임의로 필요한 값을 this에 바인딩 시키기 때문에
   
   >> 콜백함수에서는 우리가 생각하는 this와 다르다.

   우리가 실행시키지 않는 함수 >> 그러면서 매개변수로 실행하지 않는 함수를 콜백 함수라고 한다.
*/

// =========== 내가 this를 마음대로 정하고 싶은 경우
// 1) 변수를 사용하는 방식 >> 쉽게 접근이 가능. / 변수에 임시로 담았다가 쓰는 것 >> this와 참조하는 것 둘다 살아 있기 때문에 헷갈리기 쉽다.
let obj3 = { //obj3이걸 this로 쓰고 싶을 때.
    outer: function () {
        console.log(this); // (1) obj3 객체

        var innerFunc1 = function () {
            console.log(this); // (2) window 객체
        }
        innerFunc1();

        var self = this; //함수를 선언하기 전에 this값을 self로 받는다.
        var innerFunc2 = function () {
            console.log(this);
            console.log(self);
        }

        innerFunc2(); // (3) obj3 객체
    }
}

// 2) 메소드를 사용하는 방식
// call(), apply() -> 넘겨준 객체를 this로 가지면서 함수를 실행 (실행하는 순간 this 값을 지정)
// bind() -> 내가 넘겨준 객체를 this로 가지는 새로운 함수를 생성  


function printValues(a, b, c) {
    console.log(this, a, b, c);
}

printValues(1, 2, 3); //function이라는 객체 >> this가 window
printValues.call({
    x: 'call 메소드'
}, 1, 2, 3 /*매개변수*/ ); //구분하고 싶다면
// call은 지정할 객체도 주면서 매개변수도 같이 주어야한다.

printValues.apply({
    x: 'call 메소드'
}, [1, 2, 3] /*배열*/ );

// apply 활용 -> 매개변수로 넘겨줄 때 배열을 사용하고 싶은 경우 활용 할 수 있다.
//let maxData = Math.max(1,2,3,4);
let maxData = Math.max.apply(null, [1, 2, 3, 4, 5, 6]);
console.log(maxData);

let bindFunc = printValues.bind({
    x: 'bind 메소드 실행'
}, 10, 20); //매개변수를 넘길 필요는 없고
console.log(bindFunc);
console.log(printValues.name, bindFunc.name);

printValues(1, 2, 3);
bindFunc(1, 2, 3);
//복사하듯이 들고 있다.
//쿼링 함수랑 비슷하게 실행된다.

/*
화살표 함수는 이 내용에서 자유롭다. >> 화살표함수는 바인딩 되지 않는다 >> this를 쓸 수 없다.
어디에서 쓰냐에 따라서 window 객체를 가지거나 다른 객체를 가진다.
화살표 함수 : 앞서 학습한 this에 대한 내용이 적용되지 않음
-> this에 대한 정보가 없으므로 스코프 체인을 따라 함수를 실행한 실행 컨텍스트의 thisBinding을 참조
*/

let obj5 = {
    outer: function () {
        console.log(this);


        var innerFunc = () => console.log(this);


        innerFunc();
        /*  window 객체를 가리켜야 하는 것이 맞지만 >> 다르다. obj5함수가 실행되는 시점
        innerFunc 밑에 있는 실행 컨텍스트(obj5)가 가지고 있는 this를 가지고 온다.
        함수 자체에 정보가 없기 때문*/
    }

}

obj5.outer();


function plusValue() {
    this.firstValue = '홍길동';
    this.secondValue = '자바스크립트';
}

//window 객체에 하나의 변수를 등록하는 것이 가능은 하다 (저렇게 쓰진 않음.)
//function으로 객체를 생성할 수 있다.

/*  java 는 class 가 있고 그걸 기반으로 인스턴스를 만들었다.
    js 는 객체가 가져야하는 필드, 컨스트럭쳐로 변수를 만들수 있다.
    프론토 타임? >> 암튼 생성자 함수 하면서 알려줌*/

plusValue();

console.log(firstValue);

/*
1급함수( 함수를 일반 값처럼 변수에 담거나 인자로 제공하거나 반환가능) 때문에 가능한 것이 
-> 고차함수 (함수를 인자로 받거나 /함수를 return하거나, 함수를 반환하는 함수) : 함수를 일반 함수와 같이 다를 수 있는 것

*/
console.clear();

function outerFunc() {
    var message = '처음 호출한 함수' //>> 얘가 살아있는 순간은 outerFunc가 살아있는 동안.
    return function innerFunc() { //>>return 을 하면서 outer가 끝나고 message는 사라진다.
        console.log(message, '반환된 함수 실행');
    }
}

let inFunVal = outerFunc(); // 실행 O => 클로저 현상(예외사항 : 원래는 사라져야하지만 연결을 살아있어 실행이 가능하게 만들어 줌.)으로 의해 실행됨
// 내부함수 자체를 반환하는 경우 -> 해당 내부함수가 반환 시키는 함수의 식별자를 참조하는 경우 : 클로저 현상이 발생한다.
let testFuncVal = function innerFunc() {
    var message = '처음 호출한 함수'
    console.log(message, '반환된 함수 실행');
}

inFunVal();
testFuncVal();

/*
    클로저란 어떤 함수 A에서 선언한 변수 a를 참조하는 내부 함수 B를 외부로 전달할 경우 
    A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상.
*/

/*
    자동차 경주 게임
    1) 주사위를 굴려서 나온 숫자(km)만큼 이동한다.
    2) 차량별로 연료량(fuel)과 연비(power)은 무작위로 생성된다.
    3) 남은 연료가 이동할 거리에 필요할 연료보다 부족하면 이동하지 못 한다.
    4) 모든 유저가 이동할 수 없는 턴에 게임이 종료된다.
    5) 게임 종료 시점에 가장멀리 이동한 사람이 승리.

*/

//인원수 만큼 차가 있어야한다.
var car = {
    fuel: Math.ceil(Math.random() * 10 + 10), //연료(L)
    power: Math.ceil(Math.random() * 3 + 2), //연비(km/L)
    moved: 0,
    run: function () {
        var km = Math.ceil(Math.random() * 6);
        var wasteFuel = km / this.power;
        if (this.fuel < wasteFuel) {
            console.log('이동불가');
            return;
        }

        this.fule -= wasteFuel;
        this.moved += km;
        console.log(km + 'km 이동 (총 ' + this.moved + 'km)');

    }
}

car.run();
car.run();
car.run();
car.moved = 50;
console.log(car.moved);


var createCar = function () {
    //this는 쓰지 않을 것
    var fuel = Math.ceil(Math.random * 10 + 10); //연료(L)
    var power = Math.ceil(Math.random() * 3 + 2); //연비(km/L)
    var moved = 0;

    return {
        get moved() /*일종의 키워드(읽기 전용)*/ {
            return moved;
        },
        run: function () {
            var km = Math.ceil(Math.random() * 6);
            var wasteFuel = km / power;
            if (this.fuel < wasteFuel) {
                console.log('이동불가');
                return;
            }

            fuel -= wasteFuel;
            moved += km;
            console.log(km + 'km 이동 (총 ' + moved + 'km)');
        }

    }
}
car = createCar();

car.run();
console.log(car.fuel, car.power, car.moved); //내꺼가 아니라 클로저에 있는 연료와 연비값을 가지고 오는 것


/*
스텍(입구가 하나인 통 3개를 넣엇을 때 2번째를 빼고 싶으면 3을 빼고 2를 꺼내야 한다. >> 후입 선출)의
구조로 큐는 터널(일방통행: 들어가면 들어간 순서대로 나온다. >> 선입선출) 
call stack

보통 function 이 하나 있고 그 내부에 function 을 만들고 직접 호출 했을 때


현재 실행되고 있던 내용이 대기상태로 빠진다.

>>직접적으로 호출할 일이 없다. 디버그할 때 내부를 볼 수 있다.

chrome 에서 검사 console sources network*/


// Generator Function
console.clear();

function * generateSeauence(){ //반복함수로서 존재하는 구나 하고 생각하면된다.
    console.log(5); 
    yield 1; // 여차하면 생략 가능하긴 한데 undefined 나오는 경우가 많다.
    console.log(4);
    yield 2;
    console.log(3);
    yield 3;
    console.log(2);
    yield 4;
    console.log(1);
    yield 5;
    console.log(0);

    return;
}
    //generater 객체를 만들어야한다. >> 비동식 객체와 주로 쓴다.
let generaterObj = generateSeauence();
// next() 메소드 >> 이것을 실행 했을 때 결과로서 객체를 반환한다
// -> 어떤 객체? : value와 done이라는 2개의 필드값을 가진 {value : 산출값, done : true/false(return을 만났다면 true)}

let resultObj = generaterObj.next();
while(!resultObj.done){
    resultObj = generaterObj.next();
}
