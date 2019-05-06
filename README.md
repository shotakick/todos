# todos+α
React+TypeScriptによる簡易TODOアプリケーション実装

## 仕様
[TodoMVC](http://todomvc.com/)で公開されている[サンプルアプリケーション](http://todomvc.com/examples/react/#/)と同等の機能+αをReact+TypeScriptで実装する。
+αとして追加する機能は以下のとおり。
- ログイン機能
- 詳細表示機能

### ログイン機能
- ログイン画面
  - 未ログイン状態の場合はログイン画面を表示する
  - ログイン後はログイン画面を表示する前に指定されていた画面へ遷移する
- アカウント情報
  - `localStorage`にて管理 (※1)
  - ID
    - 有効値:半角英数字1文字以上40文字以下
  - パスワード
    - 有効値:半角英小文字大文字数字をそれぞれ1種類以上含む8文字以上40文字以下
    - `BCrypt`を利用してHash化して保存
- アカウント登録
  - 明示的なサインアップ機能は設けない
    - サインアップ処理
      - ログイン要求時、アカウントが存在しない場合に自動サインアップする
      - ログイン要求時のID/パスワード情報にてアカウント登録する
      - サインアップ後ログイン状態となる
  - サインアウト機能は設けない
- アカウント認証管理
  - トークン(JWT)による認証管理
  - 手動ログアウト機能は設けない
  - ログアウト条件
    - ウィンドウやタブを閉じた時
- TODO情報管理
  - ユーザ毎にTODO情報を分けて管理する
  - ログインユーザのTODO情報のみ画面に表示する
- その他
  - 複数ウィンドウ/タブからの同時ログインを許可する

※1 元アプリがTODO情報の保存に`Web Storage`を利用しておりWebサーバ単体で動作する簡易アプリであった事からログイン機能もそれを踏襲した。

### 詳細表示機能
- 編集機能は設けない
- 表示情報
  - todoIdとtodoのタイトル
  - Status: Active or completed
  - createdAt: 作成日時+曜日
  - updatedAt: 更新日時+曜日

### 非機能
- 制限
  - TODO登録可能数: 制限は設けない
  - アカウント数: 制限は設けない
- `todoId`仕様
  - 形式: 数値
  - 範囲: 1～制限は設けない
  - 採番:
    - 登録済のTODOの中で一番最後に登録されているTODOのtodoId+1
    - 1つも登録されていなかったら1
- UI: CSS
  - 基本はサンプルコードで使用しているCSSファイルを利用
  - ＋CSSフレームワークとして`Semantic UI`を利用

## 技術スタック/使用ツール/ライブラリ等
- Language
  - [TypeScript](https://www.typescriptlang.org/)
- Linter and Code Formatter
  - [TSLint](https://palantir.github.io/tslint/)
  - [Prettier](https://prettier.io/)
- View
  - [React](https://reactjs.org/)
    - [craete-react-app](https://github.com/facebook/create-react-app)
    - React Hooks
    - Higher-Order Components / Render props
- State Management
  - [React Redux](https://react-redux.js.org/)
    - [The Ducks File Structure](https://medium.com/@scbarrus/the-ducks-file-structure-for-redux-d63c41b7035c)
- Storage
  - Web Storage
- Hosting / Deployment
  - [GitHub Pages](https://pages.github.com/)
  - [spa-github-pages](https://github.com/rafrex/spa-github-pages)
  - [gh-pages](https://github.com/tschaub/gh-pages)
- Libraries
  - [Semantic UI React](https://react.semantic-ui.com/)
  - [React Router](https://github.com/ReactTraining/react-router) (v4)
  - [Connected React Router](https://github.com/supasate/connected-react-router)
  - [React Helmet](https://github.com/nfl/react-helmet)
  - [TypeScript FSA](https://github.com/aikoven/typescript-fsa)
  - [TypeScript FSA Reducers](https://github.com/dphilipson/typescript-fsa-reducers)
  - [redux-saga](https://github.com/redux-saga/redux-saga/blob/master/README_ja.md)
  - [Reselect](https://github.com/reduxjs/reselect)
  - [Formik](https://jaredpalmer.com/formik/)
  - [formik-semantic-ui](https://github.com/turner-industries/formik-semantic-ui)
  - [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
  - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
  - [Classnames](https://github.com/JedWatson/classnames)
  - [Luxon](https://moment.github.io/luxon/)
  - [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
