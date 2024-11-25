const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 各テーブルのレコードを削除
  await prisma.WordListGroup.deleteMany();
  await prisma.WordsList.deleteMany();  
  await prisma.Favorite.deleteMany();     
  await prisma.UserGroup.deleteMany();    
  await prisma.Group.deleteMany();     
  await prisma.WordGenre.deleteMany(); 
  await prisma.Genre.deleteMany();     
  await prisma.Notification.deleteMany();    
  await prisma.Word.deleteMany();    
  await prisma.User.deleteMany();     // Userテーブルのレコード削除
  // 必要なテーブルを追加で削除
  console.log('All records have been deleted.');
}

main()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
  });
