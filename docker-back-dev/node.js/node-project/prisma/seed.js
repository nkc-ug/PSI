const { PrismaClient } = require('@prisma/client')
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  // Create some groups
  const groups = [];
  for (let i = 0; i < 5; i++) {
    const group = await prisma.group.create({
      data: {
        name: faker.company.name(),
        introduce: faker.lorem.sentence({min: 1,max: 3}),
        created_date: faker.date.recent(),
      },
    });
    groups.push(group);
  }
  console.log("Groups created:", groups);

  // Create some users
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.firstName(),
        introduce: faker.lorem.sentence({min: 1,max: 3}),
        email: faker.internet.email(),
        created_date: faker.date.recent(),
      },
    });
    users.push(user);
  }
  console.log("Users created:", users);

   // Create Word Lists and associate with users
   const wordsLists = [];
   for (const user of users) {
     for (let i = 0; i < 10; i++) {
       const wordsList = await prisma.wordsList.create({
         data: {
           name: faker.lorem.words(3),
           introduce: faker.lorem.sentence(10),
           created_date: faker.date.recent(),
           author_id: user.id,
         },
       });
       wordsLists.push(wordsList);
     }
   }
   console.log("Word lists created:", wordsLists);

// Assign users to groups
 // ユーザーをグループに割り当てる処理
 for (const user of users) {
  const assignedGroups = new Set();  // ユニークなグループを保持するセット

  // 2 つのグループにユーザーを割り当てる
  for (let i = 0; i < 2; i++) {
    let groupId;

    do {
      groupId = groups[faker.number.int({ min: 0, max: groups.length - 1 })].id;
    } while (assignedGroups.has(groupId));

    // 割り当てられたグループIDをセットに追加
    assignedGroups.add(groupId);

    // ユーザーとグループを関連付けるデータを作成
    await prisma.userGroup.create({
      data: {
        user_id: user.id,         // ユーザーID
        group_id: groupId,        // グループID
      },
    });
  }
}
console.log("Users assigned to groups.");

 // 単語リストをグループに割り当てる処理
for (const wordsList of wordsLists) {
  const assignedGroups = new Set(); // 割り当てられたグループを記録するセット
  
  for (let i = 0; i < 2; i++) {
    let groupId;

    // 同じグループを重複して割り当てないようにする
    do {
      groupId = groups[faker.number.int({ min: 0, max: groups.length - 1 })].id;
    } while (assignedGroups.has(groupId));

    assignedGroups.add(groupId);

    // 既にこの word_list_id と group_id のペアが存在するかを確認
    const existingAssignment = await prisma.wordListGroup.findUnique({
      where: {
        word_list_id_group_id: {
          word_list_id: wordsList.id,
          group_id: groupId,
        },
      },
    });

    // 存在しない場合にのみ新しいデータを作成
    if (!existingAssignment) {
      await prisma.wordListGroup.create({
        data: {
          word_list_id: wordsList.id,
          group_id: groupId,
        },
      });
    }
  }
}
console.log("Word lists assigned to groups.");


  // create some words
  const words = [];
  for (let i = 0; i < 50; i++) {
    let wordsList = wordsLists[faker.number.int({ min: 0, max: wordsLists.length - 1 })];
    let randomUser = users[faker.number.int({ min: 0, max: users.length - 1 })];
  
      // ランダムな文字数のdescriptionを生成
    const randomLength = faker.number.int({ min: 1, max: 400 });
    const randomDescription = faker.lorem.text().slice(0, randomLength);

    const word = await prisma.word.create({
      data: {
        title: faker.lorem.word(),
        description: randomDescription, 
        image: null,
        genre_level: faker.number.int({ min: 1, max: 3 }),
        //wordsListエンティティとのリレーション
        wordsList: {
          connect: { id: wordsList.id }
        },
        // author_idとuserエンティティとのリレーション
        user: {
          connect: { id: randomUser.id }
        },
        created_date: faker.date.recent(),
        updated_date: faker.date.recent() 
      },
    });
    words.push(word);
  }
  console.log("Words created:", words);


   // Create genres
const genres = [];
for (let i = 0; i < 5; i++) {
  const genre = await prisma.genre.create({
    data: {
      name: faker.lorem.word(),
      parent_id: null,
      level: i + 1,
      word_id: words[faker.number.int({ min: 0, max: words.length - 1 })].id,
    },
  });
  genres.push(genre);
}
console.log("Genres created:", genres);


// 単語帳とジャンルの紐づけ
for (const word of words) {
  const shuffledGenres = genres.sort(() => 0.5 - Math.random());
  const genresToAssociate = shuffledGenres.slice(0, faker.number.int({ min: 1, max: 3 }));

  for (const genre of genresToAssociate) {
    try {
      await prisma.wordGenre.create({
        data: {
          word_id: word.id,
          genre_id: genre.id,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        console.log(`Skipping duplicate WordGenre association for word ${word.id} and genre ${genre.id}`);
      } else {
        throw error;
      }
    }
  }
}
console.log("WordGenre associations created.");


    // 
  for (const user of users) {
    const shuffledWords = [...words].sort(() => 0.5 - Math.random());
    const wordsToFavorite = shuffledWords.slice(0, 3);  // Favorite up to 3 random words

    for (const word of wordsToFavorite) {
      try {
        const favorite = await prisma.favorite.create({
          data: {
            user_id: user.id,
            word_id: word.id,
            created_date: faker.date.recent(),
          },
        });
        console.log(`Created favorite: User ${user.id} favorited Word ${word.id}`);
      } catch (error) {
        console.error(`Error creating favorite for User ${user.id} and Word ${word.id}:`, error);
      }
    }
  }


// Create notifications
const favorites = await prisma.favorite.findMany();
for (let i = 0; i < 10; i++) {
  const randomUser = users[faker.number.int({ min: 0, max: users.length - 1 })];
  const randomWord = words[faker.number.int({ min: 0, max: words.length - 1 })];
  const randomFavorite = favorites[faker.number.int({ min: 0, max: favorites.length - 1 })];

  try {
    const notification = await prisma.notification.create({
      data: {
        title: faker.lorem.words(2),
        word_id: randomWord.id,
        user_id: randomUser.id,
        like_id: randomFavorite.id,
        is_read: faker.datatype.boolean(),
        event_type: faker.helpers.arrayElement(['like']),
        created_date: faker.date.past(),
        updated_date: faker.date.recent(),
      },
    });
    console.log(`Created notification: ${notification.id}`);
  } catch (error) {
    console.error('Error creating notification:', error);
  }
}
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
