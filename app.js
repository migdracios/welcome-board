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