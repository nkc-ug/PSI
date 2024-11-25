-- 上から順番に実行してください

### プロジェクトのルートディレクトリに移動して作業を開始

-- mysqlコンテナに入り、root権限でログイン `docker exec -it mysql mysql -u root -p`
(passwordは.envに記載)

-- user作成 `CREATE USER 'user'@'%' IDENTIFIED BY 'userpass';`

-- DB作成 `create database psi;`

-- 権限作成 `GRANT ALL PRIVILEGES ON psi.* TO 'user'@'%';`(セキュリティ上あんまりよくないんだけどこれでしかできない)

-- 変更の反映 `FLUSH PRIVILEGES;`

-- userが作成できているか確認 `SELECT user, host FROM mysql.user;`

作成が確認でき、hostが%になっていることを確認したらおっけい


-- ログアウト `exit`  

-- userでログイン `docker exec -it mysql mysql -u user -p`

-- userのパスワードは `userpass`

-- psiのDBが存在しているか確認`SHOW DATABASES;`

-- DB使用 `use psi;`

-- 仮データ作成(一括だとできなかったんで、一つずつコピペして実行)

-- 一旦Node.jsの方で作業する。node.jsのコンテナの中に入ってからnpx prisma db migrateでスキーマを作成 
(スキーマ作成に必要な、schema.prismaは既に書いてあるため問題なし)

```mysqlのコンテナに戻って、DB内でcreate_table文を実行。
[create_table.sqlを参照](file:/docker-back-dev/node.js/node-project/create_table.sql)
を参照。（御免リンク張れてない）
```

-- 実行し終わったら、 `npx prisma studio`でサーバーを立ち上げ
ブラウザで[https127.0.0.1:5555](http://127.0.0.1:5555/)にアクセスしテーブルが作られていることを確認。
か、node.jsのコンテナの中で、`npx prisma db seed`を実行すると、テストデータが入っていることを確認。


ここまでできたらDBの設定は完了です！