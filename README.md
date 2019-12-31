# one-date-client

1Date のフロントエンドのリポジトリです。

## Getting Started

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

- [expo.io](https://expo.io) にアカウント登録
- [Expo Client](https://itunes.apple.com/jp/app/expo-client/id982107779) をスマホにインストール

```
$ npm install -g expo-cli
$ expo login
```

### 必要なライブラリのインストール

```
$ cd one-date-client
$ npm i
```

### ローカルサーバーの起動

_※ [one-date-server](https://github.com/KotaTanaka/one-date-server) 環境構築済みの前提_

```
$ cd one-date-server
$ rails s
```

### 実機でのローカルサーバー設定方法

_※ iOS シミュレータの場合、この設定変更は不要です。_

- プライベート IP アドレスを取得

```
$ npm run ip
...
xxx.xxx.xxx.xxx
```

- 上記で取得した IP アドレスを `app.json` 内の `apiEndpoint` のホスト部分に設定

```
"extra": {
  ...
  "apiEndpoint": "http://xxx.xxx.xxx.xxx:3080"
}
```

### クライアントアプリの起動

```
$ cd one-date-client
$ npm run start
```

- **iOS シミュレータ**
  ブラウザコンソール http://localhost:19002 で `Run on iOS simulator` をクリックして起動します。

- **実機（Expo Client）**
  コンソールに表示される QR コードをスマホで読み取り Expo Client アプリで起動します。
  ※ PC とスマホは同一 LAN に繋がっている必要があります。

## Utilities

### iOS シミュレータ GIF キャプチャ

- キャプチャスタート（Command + C で終了）

```
$ npm run capture:start
```

- GIF に変換

```
$ npm run capture:togif
```
