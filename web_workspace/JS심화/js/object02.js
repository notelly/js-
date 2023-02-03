function Member(id, name, dept){
    this.id = id;
    this.name = name;
    this.dept = dept;

}

let mem1 = new Member(100, '가나다', '영업');

/*
    주의사항

    propertype끼리 체인이 감겨 있기 때문에
    모든 인스턴스가 공유하는 내용에 대해서 수정을 하면 된다.

*/


/*
    생성자함수 사이에서 발생하는 인스턴스들에 대해서 상속과 비슷한 방식이
    아래와 같은 것

    스튜던트가 참조하고 있던 대상은 맴버와는 연관성이없다(체인이 없다.)
    프로퍼티를 바꿔치기함
    또다른 스튜던트(원래는 독립되어있는)에 영향을 줄 수 있다.
    프로토타입을 이용해 연결성을 가져가는 
    서로 연결되있는 체인을 바꿔치기하는 것
    위처럼하면 마치 상속과 같은 효과를 낼 수 있다. js의 class에 대해 몰라도.

    뭘 기억하랬는데 그걸 못들음.

    function.name -> 이런식으로 하면 체인에 연결되지 않는다.
    객체 내부에 있는 프로토타입, 프로토타입인터널 이 뭔지
    인스턴스는 [[prototype]] 을 통해 prototype property 와 프로퍼체인으로 연결되어 있다.
*/
Member.prototype.printMessage = function (message){
    console.log(message);
}

function Student(school) {
    this.school = school;
    this.printMessage = function(){
        console.log('Student Method');
        //오버로딩은 안된다. <없는 개념> 내부에 동일한 형태가 있다면
        // 내꺼가 우선.
        //mothod 오버라이딩은 가능하다.
    }
}


Student.prototype = Member.prototype;

let studnet1 = new Student('예담고등학교');
studnet1.printMessage('상속을 발생시켰습니다.');

String.prototype.method = function(){
    console.log(this.length);
}
//자체적으로 추가할 수 있다.

//프로토 타입을 지우고 추가하는 경우 >> 상속되지 않는다.
String.method = function(){
    console.log('prototype이 아닌 경우');
}



let strData = 'Hello World';
//모든 원시형 객체와 뭐시기에 적용할 수 있다...?
//순간적으로 오브젝트 기반의 인스턴스로 변한다.

strData.method();

//오류뜨는게 맞음
//String.plusMethod();
//strData.plusMethod();
//없는 거 아님

/*  
    즉 문자열에 대해서 공통적으로 사용하고 싶은 내용
    스트링이 우리가 어느정도 수정을 할 수 있게 
    스트링에 프로퍼타입에 내가 추가하고자하는 필드나 메소드를 추가하자면
    내가 사용하는 문자열 모두에 적용이 가능하다.
    strData 스트링이라는 원시형 데이터. 메소드를 쓸 수 잇는 이유는
    스트링 객체를 랩퍼객체?라고 하는데 래퍼클래스
    인트 더블 순수하게 값만 가지는 애들을 클래스로 다루기 위한 것 = 래퍼 클래스
    int -> integer 같은 경우?
    순수하게 문자에대해 값을 가지는 원시형 객체가 있고

    new string 해서 만들어도 되고
    원시형 데이터를 method로 해도 됨
    메소드로 하면 값을 감싸고 그게 객체가 된다.

    */


/*
  -  프로토타입 : 원형
  -> 자바스크립트) 안에서 프로토타입을 통한 부모 객체의 프로퍼티를 참조하는 것으로 객체의 상속을 표현할 수 있다.
      : 프로토타입 체인을 기반으로 참조를 하고 있다. (복사X : 두개 X) -> 부모 객체의 프로퍼티가 변경되면 실시간으로 반영된다.
      1) 부모객체 : prototype 프로퍼티                          -> 공유대상 => 프로토타입 객체
      2) 자식객체 : [[Prototype]]/(__ prototype __) 프로퍼티    -> 참조하는 부모객체의 prototype 프로퍼티를 가리킴
      => 두 프로퍼티 모두 객체임.

*/


class a { //이게 가능하다, 동일한 내용에 대해서 자바스크립트로 표현 하는 것과 클래스로 표현하는 차이가 있다.

    //생성자
    //this를 기반으로 등록하지 않아도 된다.
    constructor(x, y){
        //필드 let field X >> this.field로 선언
        this.x = x; // public 으로 본다
        this.y = y; // public
    }

    //get이라는 성질을 이용하면
    //밖에서 x랑 y에 대한 접근이 불가능해진다.
    //getter/setter을 생각해보기

    // result 가 일종의 프로퍼티로서 작동한다.
    get result(){
        return this.x *10;
    }


    //set을 없애면 읽어오기만 가능하다.
    set result(value){
        this.x = value;
    }


    method(){
        return this.x + this.y;
    }

}; 

let aInstance = new a(10, 20);
console.log(aInstance.x, aInstance.y, aInstance.method());
aInstance.result = 20;
console.log(aInstance.result);


class Car {
    constructor(){
        this._fuel = Math.ceil(Math.random() * 10 +10);
        this._power = Math.ceil(Math.random() * 3 + 2);
        this._moved = 0;
        //_ 건드리지 말라고 적어둔거 관습적인 약속

    }
    
    /*set _fuel(value){
        this._fuel = value;
    }
    */

    get moved(){
        return this._moved;
        //_를 해주는 이유
        /* 자바는 getter / setter라고 이름을 정해둔거지만(일종의 약속) 메소드로 움직인다.
            자바스크립트는 get / set 함수로서의 역할보다는 프로퍼티 역할을 한다.
            읽어오고 집어넣는 역할을 한다.
            get 매개변수는 X -> return은 무조건 있어야한다.
            선언되어 있지 않은 애들도 하나의 필드로서 이용할 수 있다.
        */
    }

    run(){
        var km = Math.ceil(Math.random()*6);
        var wasteFule = km/ this.power;
        if( this._fuel < wasteFule){
            console.log('이동불가');
            return;
        }

        this._fuel -= wasteFule;
        this._moved += km;
        console.log(km + 'km 이동 (총 ' + this._moved +'km)');

    }
    
    //자바 static 정적
    //자바스크립트 prototype(instance에 주고 싶은 내용인 경우 사용) 에서 벗어나기 위해 static(instance에 주고 싶은 내용이 아닌 경우 경우 사용)을 쓴다.
    //정적 메소드와 필드 -> prototype 프러퍼티에 지외
    static get message(){
        return this.message;

    }

    static set message(comment){
        this.message = comment;
    }

    static print(){
        console.log(this.message);
    }

}





let myCar = new Car();
myCar.run();
console.log(myCar._moved, myCar.moved);
//동일함.

class sportsCar extends Car{ // extends상속 뭐는 구현  Car를 sportsCar가 상속받는다.
    constructor(speed){
        super();
        super.power *= speed;
    }
}

let dreamCar = new sportsCar(300);
dreamCar.run();
console.log(dreamCar.moved); // run도 없고 moved도 없지만 Car에 있는 내용을 상속해서 충분히 사용할 수 있다.
 
Car.print();

/*
    -자바스크립트의 클래스 : 문법적으로 클래스 기반의 객체 지향 언어들과 유사함
                            (class, getter/setter >> 캡술화 가능 , extends 상속 가능)
                            -> 내부 필드: _로 시작하며 기술적으로 막힌 필드는 아니나 외부에서 접근하지 않는 걸로 합의 (내부에서 사용하는 필드는 _로 시작한다/ 기술적인 문제는 없음)
                             ( get과 set을 적용한 프로퍼티에 대새허 내부에서 영향을 받음)
                            -> 클래스 내부의 모든 필드와 메서드는 기본적으로 해당 클래스의 prototype 프로퍼티에 저장됨
                             (프로토타입 체인에서 제외하고자 하는 필드와 메서드는 static으로 선언해 주면 된다.)

*/



