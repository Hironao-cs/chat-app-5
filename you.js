
// firebaseそのものの情報を取得。これがないとfirebase自体が使えない
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
//　firebaseを使う際に以下のモジュールを使います。という定義。ここで関数を定義しておかないと、関数が使えない。
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
// Your web app's Firebase configuration
// 個人の認証情報
const firebaseConfig = {
  apiKey: ,
  authDomain: ,
  databaseURL: ,
  projectId: ,
  storageBucket: ,
  messagingSenderId: ,
  appId: 
};

// Initialize Firebase
        const app = initializeApp(firebaseConfig);

        const db = getDatabase(app); //RealtimeDBに接続
        const dbRef = ref(db, "talk"); //RealtimeDB内の"talk"を使う
        //データ登録(Click)
        $("#send").on("click",function(){
            const text = $("#yourtext").val();
            const msg = {
                text: text,
            }
            const newPostRef = push(dbRef)
            set(newPostRef,msg)
            // 送信後空欄にする指示
            $("#yourtext").val("");
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
