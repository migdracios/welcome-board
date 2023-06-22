// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqqTJV_HE_Y3mlZRDRd7APYaIvE-i8rLk",
  authDomain: "easy-web-1f7ff.firebaseapp.com",
  projectId: "easy-web-1f7ff",
  storageBucket: "easy-web-1f7ff.appspot.com",
  messagingSenderId: "302160190793",
  appId: "1:302160190793:web:f4723ae4271388e28c8e98",
  measurementId: "G-TK65T5PN4H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

$(".modal-btn").click(async()=>{
    let comment = $("#modal-comment").val();
    let who = $("#modal-who").val();
    if (comment === ""){
        alert("인사를 입력해주세요!")
        return;
    }
    if (who === ""){
        who = "익명";
    }    
    try {
        const docRef = await addDoc(collection(db, "welcome"), {
            comment : comment,
            who : who
        });
        console.log("Document written with ID: ", docRef.id);
        alert("환영 인사가 등록되었습니다");
        window.location.reload();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
})

$(document).ready(async()=>{
    $(".wrap-post").empty();
    const querySnapshot = await getDocs(collection(db, "welcome"));
    querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data()}`);
    let data = doc.data();
    console.log(data);

    let comment = data.comment;
    let who = data.who;
    let randomNum = Math.floor(Math.random() * 4) + 1;
    let tempHtml = `<div class="post-it flex-col-center it-${randomNum}">
                        <div class="comment">${comment}</div>
                        <br>
                        <div class="who">- ${who} -</div>
                   </div>`
    $(".wrap-post").append(tempHtml);
    });
})

$("#welcome-btn").click(()=>{
    if(confirm("지웅님의 환영 인삿말을 남겨주실래요?")){
        $("html, body").animate({ scrollTop: 0 }, "smooth");
        $("#hi-modal").css("display", "flex");
    }
})
$("#member-card-btn").click(()=>{
    if(confirm("지웅님의 멤버카드 보러 가실래요?")){
        window.open("https://www.notion.so/teamsparta/2ef0ddd523b446af866c0e5658bda817?pvs=4");
    }
})
$(".close-btn").click(()=>{
    console.log("yaho")
    $(".wrap-modal").hide();
})

$("#song-play").click(function(){
    let audio = document.querySelector('#theme-song')
    audio.play()
})


let jwTmi = [
    {"number" : 1, "main" : "지웅님의 MBTI는 ENFP", "info1" : "차분하신 것처럼 보이지만 순식간에 많은 사람들의 마음을 사로잡습니다", "info2": "환영회 때 박수받았을 때, 전날 다녀오셨던 콘서트의 느낌이었다고."},
    {"number" : 2, "main" : "가장 좋아하는 여행지는 하와이", "info1" : "본격! 휴양지 느낌 너무 좋다고 합니다", "info2" : "모든 것을 다 접고 이곳에서 우버 드라이버를 해도 행복할 것 같으셨다고."},
    {"number" : 3, "main" : "좋아하는 음식은 우유와 햄버거, 치킨", "info1" : "그 중에서 우유를 가장 좋아하십니다", "info2" : "매운 것은 좋아하시만 잘 드시지는 못해요"},
    {"number" : 4, "main" : "지웅님은 유부남이십니다", "info1" : "올 3월에 결혼하셨다고.", "info2" : "아내 분과의 러브스토리는 직접 들어보세요!"},
    {"number" : 5, "main" : "요새 운동을 하기 위해 노력하고 계십니다", "info1" : "이번 달에 PT를 4회 목표로 하고 있다고.", "info2" : "하지만, 오시자마자 야근과 주말출근 중이십니다"},
    {"number" : 6, "main" : "경원 이라는 이름과 연이 깊다", "info1" : "아내 분의 전 이름이 경원이었다고 하네요", "info2" : "경원 님의 의미심장한 표정은 또다른 포인트"},
    {"number" : 7, "main" : "지웅님의 롤 아이디는 아이스크림박사 입니다", "info1" : "하지만 롤은 잘 하시지 않으신다네요", "info2" : "아이스크림, 경원님, 온라인파트는 공통점으로 끈끈하네요"},
    {"number" : 8, "main" : "혈액형은 B형, 사는 곳은 구디, 생일은 1122", "info1" : "식사시간 동안 TMI를 다 써서 한 번에 쏟아내셨습니다", "info2" : "별자리, 사주, 타로점까지 볼 기세였습니다 ㅋㅋ"},
]
$(".tmi-wrap").empty()
jwTmi.forEach((a)=>{
    let tmiHtml = `<div id="tmi-${a.number}" class="tmi flex-col-center">${a.number}</div>`
    $(".tmi-wrap").append(tmiHtml)
})

$(".tmi").click(function(){
    let id = $(this).attr("id").split("-")[1]
    openTmi(id)
})

const openTmi = (id) => {
    let tmiDict = jwTmi[id-1]
    console.log(tmiDict)
    $("#tmi-modal").css("display", "flex");
    window.scrollTo({top:0, behavior:'smooth'});
    let randomNum = Math.floor(Math.random() * 4) + 1;
    $(".modal-image").css("background-image", `url("image/${randomNum}.jpeg")`)
    $(".modal-title").text(tmiDict.main)
    $(".info1").text(tmiDict.info1)
    $(".info2").text(tmiDict.info2)

}

$("#tmi-close").click(function(){
    let location = document.querySelector("#tmi-1").offsetTop;
    window.scrollTo({top:location, behavior:'smooth'});
})
