SQL
-- ユーザーテーブル
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    introduce VARCHAR(100),
    email VARCHAR(50) NOT NULL,
    created_date DATETIME NOT NULL
);

-- グループテーブル
CREATE TABLE `groups` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    introduce VARCHAR(400),
    created_date DATETIME NOT NULL
);

-- ユーザーとグループの中間テーブル
CREATE TABLE users_and_groups (
    user_id INT NOT NULL,
    group_id INT NOT NULL,
    PRIMARY KEY (user_id, group_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES `groups`(id) ON DELETE CASCADE
);


-- 単語帳テーブル
CREATE TABLE words_lists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    introduce VARCHAR(400),
    author_id INT NOT NULL,
    created_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 単語帳とグループの中間テーブル
CREATE TABLE wordLists_and_groups (
    word_list_id INT NOT NULL,
    group_id INT NOT NULL,
    PRIMARY KEY (word_list_id, group_id),
    FOREIGN KEY (word_list_id) REFERENCES words_lists(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES `groups`(id) ON DELETE CASCADE
);

-- ジャンルテーブルの作成
CREATE TABLE genres (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id INT,
    level INT NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES genres(id) ON DELETE SET NULL
);

-- 単語テーブル
CREATE TABLE words (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    description VARCHAR(400) NOT NULL,
    image BLOB,
    word_list_id INT NOT NULL,
    author_id INT NOT NULL, -- 修正: StringからVARCHARに変更
    genre_level INT NOT NULL,
    created_date DATETIME NOT NULL,
    updated_date DATETIME NOT NULL,
    FOREIGN KEY (word_list_id) REFERENCES words_lists(id) ON DELETE CASCADE,
    FOREIGN KEY (author) REFERENCES users(id) ON DELETE CASCADE,

);

-- 単語とジャンルの多対多リレーションテーブルの作成
CREATE TABLE words_and_genres (
    word_id INT NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (word_id, genre_id),
    FOREIGN KEY (word_id) REFERENCES words(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

-- お気に入りテーブル
CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    word_id INT NOT NULL, 
    created_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (word_id) REFERENCES words(id) ON DELETE CASCADE
);

-- 通知テーブル
CREATE TABLE notification (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    word_id INT NOT NULL,
    user_id INT NOT NULL,
    like_id INT NOT NULL,
    is_read BOOLEAN,
    event_type VARCHAR(20),
    created_date DATETIME NOT NULL,
    updated_date DATETIME NOT NULL,
    FOREIGN KEY (word_id) REFERENCES words(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (like_id) REFERENCES favorites(user_id) ON DELETE CASCADE
);
