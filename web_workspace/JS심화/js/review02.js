let students = [
    { name: '박하영', snn : '9506252345678'},
    { name: '이한나', snn : '0512023124567'},
    { name: '김나나', snn : '1202164253617'},
    { name: '신윤권', snn : '9905041326549'},
    { name: '홍길동', snn : '0810183345678'}
];

let stuSnn;
//해당 학생들의 나이와 성별에 대한 정보를 콘솔에 출력하세요.

// substring (시작인덱스, 끝인덱스) : 시작인덱스는 포함하지만 끝인덱스는 포함하지 않음.
//console.log(students[0].snn,substring(6,7));

// substr(시작인덱스, 잘라낼 길이)
//console.log(students[0].snn.substr(6, 1)); //substr쓰는 것을 추천하지 않는다.


function age() {
    let stuYear = stuSnn.substring(0, 2);
    let sysyear = new Date().getFullYear();

    let stuAge = 0;
    if (stuYear > 23){
        stuAge = parseInt(sysyear) - parseInt('19'+stuYear);
    }else {
        stuAge = parseInt(sysyear) - parseInt('20'+stuYear);
    }
    console.log('나이 : ' + stuAge);
}

function gender(){
    let genNum = stuSnn.substring(6, 7);

    if ( genNum == 1 || genNum == 3 ){ // (genNum%2 ==1)
        console.log('성별 :  남자');
    }else if ( genNum == 2 || genNum == 4){ // (genNum%2 ==0)
        console.log('성별 :  여자');
    }

}

for (let student of students){
    stuSnn = student.snn;
    console.log(student.name);
    age();
    gender();
}

//교수님 방법
function getInfo(snn){
    let today = new Date().getFullYear();
    let year = snn.substring(0, 2);
    let gender = snn.substring(6, 7);
    let age = 0;

    if ( gender == 1 || gender == 2 ){
        age = today - parseInt('19'+year);
    }else if ( gender == 3 || gender == 4 ) {
        age = today - parseInt('20'+year);
    }

    if (gender%2 ==1){ 
        gender =  '남자';
    }else if (gender%2 ==0){
        gender = '여자';
    }

    return '현재 나이 : ' + age + ' , 성별 : ' + gender;

}

students.forEach(function(student){
    console.log(student.name, getInfo(student.snn));
});


//forEach() : 순환 메서드 -> return 없음
//map()     : 순한 메서드 -> return 존재, 새로운 배열 생성
//filter()  : map()과 유사하게 새로운 배열 생성

//내풀이
let female = [];
let male =[];

students.forEach(function(student){
    stuSnn = student.snn;
    let gen = stuSnn.substring(6, 7);
    if (gen == 1 || gen == 3 ){
        male.push(student);
    }else if (gen == 2 || gen == 4 ){
        female.push(student);
    }
})

console.log(male);
console.log(female);

console.log('교수님')
//교수님

function getGender (snn){
    let gender = snn.substring(6, 7);

    if(gender%2 == 0) return '여자'
    else if (gender%2 == 1) return '남자';
}

//  남자 : map() 메서드 사용
let newList = students.map(function(student, index, array){
    return { name: student.name, ssn : student.ssn, gender : getGender(student.snn)};
});

console.log(newList);

//분류용 메서드 : filter()
let maleList = students.filter(function(student, index, array){
    if( getGender(student.snn) == '남자') return true;
    else return false;

});

console.log(maleList);

