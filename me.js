
// firebaseそのものの情報を取得。これがないとfirebase自体が使えない
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
//　firebaseを使う際に以下のモジュールを使います。という定義。ここで関数を定義しておかないと、関数が使えない。
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
// Your web app's Firebase configuration
// 個人の認証情報
const firebaseConfig = {
  apiKey: "AIzaSyBP7mF3ikGRH1t8ZIYOpQhgY-hOnB_II7s",
  authDomain: "dev30-f18-ccfc8.firebaseapp.com",
  databaseURL: "https://dev30-f18-ccfc8-default-rtdb.firebaseio.com",
  projectId: "dev30-f18-ccfc8",
  storageBucket: "dev30-f18-ccfc8.firebasestorage.app",
  messagingSenderId: "1052477308186",
  appId: "1:1052477308186:web:ceb89745c192629ad0c0a3"
};

// Initialize Firebase
        const app = initializeApp(firebaseConfig);

        const db = getDatabase(app); //RealtimeDBに接続
        const dbRef = ref(db, "talk"); //RealtimeDB内の"talk"を使う
        //データ登録(Click)
        $("#send").on("click",function(){
            const text = $("#mytext").val();
            const msg = {
                text: text,
            }
            const newPostRef = push(dbRef)
            set(newPostRef,msg)
            // 送信後空欄にする指示
            $("#mytext").val("");
        });

        //データ登録(Enter)

        //最初にデータ取得＆onSnapshotでリアルタイムにデータを取得
        onChildAdded(dbRef,function(data){
            const msg = data.val();
            const key = data.key;//keyの部分は課題もしくはご自身で使用いただくためのヒントとして残しておきます

            const html=`
            <div>
                <P>${msg.text}</P>
            </div>
            `
            // jQueryを使って画面上に表示をしたいのでappendと入れる
            $("#output").append(html)

        // この下は消さない
        })
        //上記はJS文法でもなく、firebaseの言語
