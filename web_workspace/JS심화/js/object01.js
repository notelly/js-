// class가 객체와 일체화 되는 건 아니다
//js 는 프로토 타입을 기반으로 하는 객체지향형 언어다.

//객체(object) : 프로퍼티(property)들의 집합 -> 키(key)와 값(value)의 한쌍
let object = { key : 'value', method : function(){}};

//key : 문자열 or symbol -> 이외의 타입에 대해서는 문자열로 자동 타입 변환 /가질 수 있는 값이 제한적이다.
//      주의사항, "예약어 X" O, 'a-b' js 는 -을 인식하지 못한다. ''안에 넣어서 문자라는 것을 인식 시켜줄 필요가 있다.

//객체리터럴
// 1) 객체 리터럴 -> Object 객체의 생성자 함수
let obj1 = {name : '김한운', age: 34, country : '대한민국'};
// 2) Object 객체의 생성자 함수
let obj2 = new Object();

obj2.name = '한차늘';
obj2.age = 38;
obj2.country = '대한민국';

//나는 1번이라고 생각하지만 내부에서는 2번으로 움직인다.
//실제로 2번째는 안쓴다.

// 3) 함수를 기반으로 한 객체 생성 -> 생성자 함수
//우리가 알고 있는 class 00을 생성하는 것과 유사하다
function Person(name, age, country){  
    //객체를 만드는 용도로 정의하는 거라서 일반 함수와 구분하기 위해 이름을 대문자로 할것
    this.name = name;
    this.age = age;
    this.country = country;
    this.info = function(){
        console.log(name, age, country);
    }

    //return 구문이 따로 없다. -> 일종의 틀로 존재하기 때문에.
};

let person1 = new Person('홍길동', 30, '호주');
let person2 = new Person('신호상', 28, '대만');

console.log(typeof obj1, obj1);
console.log(typeof obj2, obj2);
console.log(typeof person1, person1);
/*
    person이 어떤 함수를 기반으로 만들어진 instance
    function 이라는 객체를 상속받은 자식객체
    무엇을 기반으로 만들어졌는지 알려주는것
    object > Person
    
*/
console.log(typeof person2, person2);


