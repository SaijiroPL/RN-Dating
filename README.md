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
※ PCとスマホは同一LANに繋がっている必要があります。

### サーバーURL(APIのエンドポイント)設定方法

Expo Client アプリ内部でAPIを利用するためにはローカルサーバーのURLを指定する必要があります。  
`expo start` 時にQRコードとともに `exp://xxx.xxx.xxx.xxx:19000` というURLが表示されるので、  
このホスト名を `app.json` に記述している `apiEndpoint` のホスト名に設定します。

```
"extra": {
  ...
  "apiEndpoint": "http://xxx.xxx.xxx.xxx:3000"
}
```

`rails s` でローカルサーバーを起動した上で改めて `expo start` すればアプリ内でAPIを使用している箇所も動作するようになります。
