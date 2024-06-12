// auth.js

import { auth, db } from '../../firebase-config.js'; // Firebase設定をインポート
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js';
import { setDoc, doc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js';

// ユーザー情報を表示する関数（例）
function showUserInfo(user) {
  console.log(`User Info: ${user.email}`);
}

// ユーザー情報を非表示にする関数（例）
function hideUserInfo() {
  console.log('User Info hidden');
}

// サインアップ関数
function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User signed up:', user);
      return setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: serverTimestamp()
      });
    })
    .then(() => {
      console.log('User data saved to Firestore');
      showUserInfo(auth.currentUser);
    })
    .catch((error) => {
      console.error('Error signing up:', error.code, error.message);
    });
}

// ログイン関数
function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User signed in:', user);
      showUserInfo(user);

      // 新しいページにリダイレクト
      console.log('Redirecting to success.html');
      window.location.href = "success.html";
    })
    .catch((error) => {
      console.error('Error signing in:', error.code, error.message);
    });
}


// ログアウト関数
function signOutUser() {
  signOut(auth)
    .then(() => {
      console.log('User signed out');
      hideUserInfo();
    })
    .catch((error) => {
      console.error('Error signing out:', error);
    });
}



// 初期化関数
function initializeAuth() {
  document.getElementById('signup-btn').addEventListener('click', () => {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    console.log('Sign Up button clicked');
    signUp(email, password);
  });

  document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    console.log('Log In button clicked');
    signIn(email, password);
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    console.log('Log Out button clicked');
    signOutUser();
  });
}

export { initializeAuth }; // initializeAuth をエクスポート

// HTMLにデバッグメッセージを表示する関数
function displayDebugMessage(message) {
  const debugElement = document.getElementById('debug-message');
  if (debugElement) {
    debugElement.textContent = message;
  } else {
    const newDebugElement = document.createElement('div');
    newDebugElement.id = 'debug-message';
    newDebugElement.textContent = message;
    document.body.appendChild(newDebugElement);
  }
}

export { displayDebugMessage };
