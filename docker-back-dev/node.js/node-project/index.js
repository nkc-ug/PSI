// index.js

const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');


const dbTestRouter = require('./DBTest'); // DBTest.jsファイルの読み込み
// const dbFaker = require('./faker/User'); 

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// DBTest.jsへのルーティング
app.use('/sql', dbTestRouter);

// ReactとCORS接続
app.use(cors({ origin:'http://127.0.0.1:3000' })); // 必要に応じてここはlocalhostに変えてください。

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working' });
});

app.get('/api/profile', (req, res) => {
  const mockData = {
    userName: 'John Doe', // ユーザー名
    joinedGroups: [
      {
        name: 'React Developers',
        members: 120,
        introduce: 'A group for React enthusiasts to share knowledge and projects.',
      },
      {
        name: 'Web Developers',
        members: 200,
        introduce: 'A group focused on web development technologies and trends.',
      },
    ],
    recentWords: [
      {
        title: 'JavaScript',
        description: 'A versatile programming language used for both client-side and server-side development.',
        icon: '🔧',
      },
      {
        title: 'React',
        description: 'A JavaScript library for building user interfaces.',
        icon: '⚛️',
      },
    ],
    createdWords: [
      {
        title: 'Node.js',
        description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
        icon: '💻',
      },
      {
        title: 'Express',
        description: 'A minimal and flexible Node.js web application framework.',
        icon: '📡',
      },
    ],
  };

  // レスポンスとして仮のデータを返す
  res.json(mockData);
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
