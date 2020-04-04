# one-date-client

1Date のフロントエンドのリポジトリです。

_バックエンドはこちら [one-date-client](https://github.com/KotaTanaka/one-date-server)_

## Getting Started

### Node のインストール

```bash
$ brew update
$ brew install node
```

### Expo の準備

- [expo.io](https://expo.io) にアカウント登録
- [Expo Client](https://itunes.apple.com/jp/app/expo-client/id982107779) をスマホにインストール
- コンソールログイン

```bash
$ npm i -g expo-cli
$ expo login
```

### ソースコードのクローン

```bash
$ git clone git@github.com:KotaTanaka/one-date-client.git
$ cd one-date-client
```

### 必要なライブラリのインストール

```bash
$ yarn
```

### ローカルサーバーの起動

- [one-date-server](https://github.com/KotaTanaka/one-date-server) 参照

### クライアントアプリの起動

```bash
$ yarn start
```

- **iOS シミュレータ**  
  ブラウザコンソール http://localhost:19002 で `Run on iOS simulator` をクリックして起動します。

- **実機（Expo Client）** _Utilities「実機でのローカルサーバー接続方法」参照_
  コンソールに表示される QR コードをスマホで読み取り Expo Client アプリで起動します。  
  ※ PC とスマホは同一 LAN に繋がっている必要があります。

## Utilities

### 実機でのローカルサーバー接続方法

- プライベート IP アドレスを取得する。

```bash
$ yarn ip
...
xxx.xxx.xxx.xxx
```

- 上記で取得した IP アドレスを `app.json` 内の `apiEndpoint` のホスト部分に設定する。

```json
"extra": {
  ...
  "apiEndpoint": "http://xxx.xxx.xxx.xxx:3080"
}
```

### iOS シミュレータ GIF キャプチャ

```bash
# キャプチャスタート（Command + C で終了）
$ yarn capture:start

# GIF に変換
$ yarn capture:togif
```

### Lint エラーチェック・自動整形

```
$ yarn lint
```
