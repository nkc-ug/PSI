// profile.js
import { displayDebugMessage } from './auth.js';

import { auth } from '../../firebase-config.js';

// プロフィール情報を表示する関数
function showUserProfile(user) {
    const userEmail = document.getElementById('user-email');
    if (userEmail) {
        userEmail.textContent = user.email;
    }
    // 他のユーザー情報を表示する場合はここに追加
}

// 初期化関数
function initializeProfile() {
    const currentUser = auth.currentUser;
    if (currentUser) {
        // ログイン済みのユーザーがいる場合、プロフィール情報を表示
        showUserProfile(currentUser);
    } else {
        // ログインしていない場合はログインページにリダイレクト
        window.location.href = "../html/success.html";
    }

    document.getElementById('logout-btn').addEventListener('click', () => {
        // ログアウト処理
        auth.signOut().then(() => {
            // ログアウト後はログインページにリダイレクト
            window.location.href = "../html/success.html";
        }).catch((error) => {
            console.error('Error signing out:', error);
            displayDebugMessage(`Error signing out: ${error.message}`);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeProfile();
});
