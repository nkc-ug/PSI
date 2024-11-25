良いdockerファイルの作り方
https://blog.shinonome.io/nodejs-docker/

express、mysqlを含んだnode.jsのコンテナ
コマンド
・npm install -g express-generator
※ここでパッケージを事前に書いておいた、package.jsonをbuildするディレクトリに配置する。
## express導入
・express -e ejs-project（アプリのひな形生成）
・cd node-app , npm install
・npm install mysql2

達成してます！

## やること（日々更新）
・ORMいれる(Prisma?TypeORM)　済
→DBを直感的に操作でき、初心者にも理解しやすいため。
・ダミーデーター作成　済
→node.jsからダミーデーターを作成するコードを実行
・reactとnode.jsをくっつける必要がある
・node.jsで実際に、ORMを使ってデータを取得する。その後、reactにも反映させる。

## お役立ちコマンド
・コンテナの中に入る
`docker exec -it <container_name> /bin/sh`
・シードファイル実行
`npx prisma db seed`
・dbのスキーマ定義を変えた場合にprismaへ反映させる
1.node.jsのコンテナで`npx prisma db pull`でDBのスキーマをprsima.schemaファイルに反映
2.npx prisma migrate devでよくわからんけどprismaに反映させてる。


混合で開発されてる
https://ralacode.com/blog/post/create-nodejs-react-app-with-typescript/

エラーログ
・MySQLとの接続エラー
error connecting: Error: connect ECONNREFUSED 127.0.0.1:3306
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1595:16)

・npm installできないエラー    
failed to solve: process "/bin/sh -c npm install" did not complete successfully: exit code: 254

・volumesが残っててmysql起動できないエラー
'''Remove-Item -Recurse -Force ../PSI/docker-back-dev/mysql/*'''
をPowerShellで打ち、ボリュームを削除する。

・package.jsonが見つからない
npm installするためにpackage.jsonがいる→すでに用意したpackage.jsonを/appにコピー→/appでnpm installしたけど、jsonがないって言われる
→なんかあった。ディレクトリをちゃんと見ること

・コンテナからサーバーを起動してるのにページが表示されない
前提：ポートマッピングできてる。curl叩いても何も帰ってこない。ERR_EMPTY_RESPONSEって出てる。
解決：0.0.0.0で立てる。localhostではなく、172.0.0.1:5000にアクセスする。
参考記事→https://qiita.com/amuyikam/items/01a8c16e3ddbcc734a46

・コンテナのディレクトリにファイルをコピーしたけど、マウントした時に表示されない

・コンテナが起動しない
node.jsのコンテナが起動しないといわれる。（nginxとかは動く。）
→ホストとコンテナのポートを繋げて、expressでファイルを作り、起動。治った

・Error connecting to MySQL: Error: connect ECONNREFUSED 127.0.0.1:3306
node.jsのコンテナからmysqlにつながらない案件
単純にポートが競合しちゃってる。タスクマネージャーなどで競合しているサービスを洗い出して消そう

node.jsからmysqlのコンテナにうまくつながらない
コンテナ間の通信では、dockerネットワーク内で動的に、IPアドレスが振り分けられるためuserのhost名を%にしないと接続許可がおりないみたい。
だが、セキュリティ上よくないため、対策を練りたい。

メモ
・dockerfileを更新した時は--no-cacheをうしろにつける（キャッシュを参照して正常に作れないため）

・ビルドコンテキストルート・・・buildを実行するディレクトリのこと。
(dockerignoreはここに設置)


passwordの共有手段
・.envを使って読み込ませている
・gitignoreに指定しているため、コミットしてもファイルは反映されない。

