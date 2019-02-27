# one-date-client
1Date のフロントエンドのリポジトリです。

## ローカル開発環境構築

### ソースコードのクローン

```
$ git clone git@github.com:KotaTanaka/one-date-client.git
```

### Node のインストール

```
$ brew update
$ brew install node
```

### Expo の準備

* [expo.io](https://expo.io) にアカウント登録
* [Expo Client](https://itunes.apple.com/jp/app/expo-client/id982107779) をスマホにインストール

```
$ npm install -g expo-cli
$ expo login
```

### 必要なライブラリのインストール

```
$ cd one-date-client
$ npm i
```

### アプリケーションの起動

```
$ expo start
```

→ 表示されるQRコードをスマホで読み取り Expo Client で開くと、アプリが起動します。
