// import { initializeApp } from "../node_modules/firebase/app";
// import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged} from "../node_modules/firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBge7INCaZhBfCUkftbwE9VJ2fXWgkD0-Y",
//   authDomain: "psi-project-d985e.firebaseapp.com",
//   projectId: "psi-project-d985e",
//   storageBucket: "psi-project-d985e.appspot.com",
//   messagingSenderId: "513435252250",
//   appId: "1:513435252250:web:28e2cab2b98c1b11ac03a3",
//   measurementId: "G-Z32W7R1FHC"
// };

// // Firebaseの初期化
// const app = initializeApp(firebaseConfig);

// // FirestoreとAuthを初期化
// const auth = getAuth(app);

// window.addEventListener('load', () => {
//   const homeNav = document.getElementById('home-nav');
//   const profileNav = document.getElementById('profile-nav');
//   const logoutNav = document.getElementById('logout-nav');
//   const signupBtn = document.getElementById('signup-btn');
//   const loginBtn = document.getElementById('login-btn');

//   // Navigation event listeners
//   homeNav.addEventListener('click', () => {
//     alert('Home clicked');
//     console.log("faire");
//     // ホーム画面に遷移するコードを追加できます
//   });

//   profileNav.addEventListener('click', () => {
//     alert('Profile clicked');
//     // プロフィール画面に遷移するコードを追加できます
//   });

//   logoutNav.addEventListener('click', () => {
//     signOut(auth).then(() => {
//       console.log('User signed out');
//       hideUserInfo();
//     }).catch((error) => {
//       console.error('Error signing out:', error);
//     });
//   });

//   // Sign up button click event
//   signupBtn.addEventListener('click', () => {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
    
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         console.log('User signed up:', user);
//         // ユーザーが作成された後の処理をここに追加
//       })
//       .catch((error) => {
//         console.error('Error signing up:', error.code, error.message);
//       });
//   });

//   // Log in button click event
//   loginBtn.addEventListener('click', () => {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         console.log('User signed in:', user);
//         // ログイン後の処理をここに追加
//       })
//       .catch((error) => {
//         console.error('Error signing in:', error.code, error.message);
//       });
//   });

//   // ユーザー情報を表示する関数
//   const showUserInfo = (auth) => {
//     const user = auth.currentUser;
//     if (user) {
//       userEmail.textContent = user.email;
//       userInfo.style.display = 'block';
//       logoutBtn.style.display = 'block';
//       emailInput.style.display = 'none';
//       passwordInput.style.display = 'none';
//       signupBtn.style.display = 'none';
//       loginBtn.style.display = 'none';
//       logoutNav.style.display = 'inline';
//     }
//   };

//   // ユーザー情報を非表示にする関数
//   const hideUserInfo = () => {
//     userInfo.style.display = 'none';
//     logoutBtn.style.display = 'none';
//     emailInput.style.display = 'block';
//     passwordInput.style.display = 'block';
//     signupBtn.style.display = 'block';
//     loginBtn.style.display = 'block';
//   };

//   // ユーザーの認証状態をチェックする
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       showUserInfo();
//     } else {
//       hideUserInfo();
//     }
//   });
// });
