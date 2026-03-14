# 🎭 The Agency: あなたのワークフローを変革するAIスペシャリスト

> **手のひらサイズの完全なAIエージェンシー** - フロントエンドの魔法使いからRedditコミュニティのニンジャまで、ホイップクリームエキスパートから現実チェッカーまで。各エージェントは個性的で、プロセスを持ち、実績のあるスペシャリストです。

[![GitHub stars](https://img.shields.io/github/stars/msitarzewski/agency-agents?style=social)](https://github.com/msitarzewski/agency-agents)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

---

## 🚀 これは何？

Redditのスレッドから生まれ、何ヶ月もの改善を重ねた **The Agency** は、精密に作られたAIエージェントのパーソナリティの成長中なコレクションです。各エージェントは：

- **🎯 専門化**: 領域の深い専門知識を持つ（一般的なプロンプトテンプレートではない）
- **🧠 パーソナリティ駆動**: ユニークな声、コミュニケーションスタイル、アプローチ
- **📋 成果物焦点**: 実装されたコード、プロセス、測定可能な成果
- **✅ 本番環境対応**: 実戦テスト済みのワークフローと成功メトリクス

**考え方**: 自分の夢のチームを組み立てるのと同じですが、AIスペシャリストたちは寝ず、文句を言わず、常に成果を上げます。

---

## ⚡ クイックスタート

### オプション1: Claude Codeで使用（推奨）

The Agencyは **自動エージェント起動システム** を備えており、Claude Codeセッション内ですべてのエージェントを検出して利用できます。

#### 自動セットアップ
```bash
# エージェント起動システムは既に設定されています！
# このリポジトリでClaude Codeセッションを開くだけです。

# セッション開始時、システムは自動的に：
# ✅ 111+ のエージェントを検出
# ✅ 検索可能なインデックス (agent-index.json) を生成
# ✅ エージェントを即座の起動に備えます
```

#### エージェントを起動する
Claude Codeセッション内でエージェントをメンションするだけです：

```
Activate Frontend Developer to build a React component
Use Backend Architect to design a microservices API
Activate Security Engineer to audit this code
```

システムはエージェントのパーソナリティと専門知識を即座に読み込みます。あなたの特定のタスクに合わせたスペシャライズドAIエキスパートが手に入ります。

#### どのように動作するか
- **セッション開始フック**: `.claude/hooks/session-start.sh` がセッション開始時に自動実行
- **エージェント検出**: 14個のディビジョンをスキャンし、111+ エージェントを < 1秒で検出
- **動的インデックス**: エージェント名検索用に `agent-index.json` を作成
- **スマートマッチング**: エージェント名、説明、絵文字で検索
- **プロンプト注入**: エージェントのパーソナリティをClaudeのシステムプロンプトに読み込む

詳細は、以下の[エージェント起動システム](#-エージェント起動システム)を参照してください。

### オプション2: リファレンスとして使用

各エージェントファイルには以下が含まれます：
- アイデンティティとパーソナリティ特性
- コアミッションとワークフロー
- コード例を含む技術的成果物
- 成功メトリクスと通信スタイル

以下のエージェントを参照して、必要なものをコピー・改変してください！

### オプション3: 他のツールに展開して使用する

The Agency は、Claude Code 以外のツールでも利用できるように変換・インストールできます。

```bash
# ステップ1 -- 対応ツール向けの統合ファイルを生成
./scripts/convert.sh

# ステップ2 -- 対話形式でインストール（利用可能なツールを自動検出）
./scripts/install.sh

# または特定のツールを直接指定
./scripts/install.sh --tool cursor
./scripts/install.sh --tool copilot
./scripts/install.sh --tool aider
./scripts/install.sh --tool windsurf
```

詳細は [マルチツール統合](README.md#-multi-tool-integrations) と各 `integrations/` ディレクトリの README を参照してください。

---

## 🤖 エージェント起動システム

The Agencyは強力な **エージェント起動システム** を備えており、Claude Codeセッション内でエージェントを自動検出・起動します。

### 動作方法

#### 1. セッション開始時の自動検出
このリポジトリでClaude Codeセッションを開くと：
- システムはすべてのエージェントディレクトリ（14ディビジョン）をスキャン
- 111+ エージェントとそのメタデータを検出
- 検索可能なJSONインデックスを生成
- すべて < 1秒で自動実行

#### 2. エージェントの即座起動
セッション内でエージェントをメンションするだけ：
```
Activate Frontend Developer to help me build a React component
```

システムは：
1. インデックスからエージェントを検索
2. エージェントのパーソナリティと指示を読み込む
3. エージェントの専門知識をClaudeのシステムプロンプトに注入
4. あなたのタスク用スペシャライズドエキスパートを取得

#### 3. 動的インデックス生成
- **ファイル**: `.claude/agent-index.json`
- **内容**: 111+ エージェント（名前、説明、絵文字、パス）
- **生成**: セッション開始時に自動
- **更新**: 常に最新のエージェントを反映

### アーキテクチャ

```
┌─────────────────────────────────────────┐
│  Claude Code セッション開始              │
└─────────┬───────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  .claude/hooks/session-start.sh 実行    │
│  (session_hooks設定で自動実行)           │
└─────────┬───────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  initialize_agents()                    │
│  • すべてのエージェントファイルを検索    │
│  • ディビジョン別に分類                 │
│  • エージェント数を表示                 │
└─────────┬───────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  create_agent_index()                   │
│  • YAMLからメタデータを抽出              │
│  • JSON文字列をエスケープ               │
│  • agent-index.jsonを書き込み           │
└─────────┬───────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  エージェントシステム準備完了 ✅        │
│  111+ すべてのエージェント利用可能       │
└─────────────────────────────────────────┘
```

### 設定ファイル

**`.claude/claude.json`** - メイン設定
```json
{
  "agents_enabled": true,
  "agents_directory": "../",
  "auto_activate": true,
  "session_hooks": ["./hooks/session-start.sh"]
}
```

**`.claude/hooks/session-start.sh`** - 初期化スクリプト
- すべてのエージェントを検出
- JSONインデックスを生成（日本語文字サポート付き）
- 準備メッセージを出力（英語または日本語）
- セッション開始時に自動実行
- 環境変数：`AGENCY_LANG` (en/ja) で出力言語を指定

### 利用可能なコマンド

すべてのエージェントを列表示：
```bash
./scripts/list-agents.sh
```

特定のディビジョンのエージェントを列表示：
```bash
./scripts/list-agents.sh engineering
./scripts/list-agents.sh design
```

エージェントを検索：
```bash
./scripts/list-agents.sh --search frontend
./scripts/list-agents.sh --search security
```

日本語キーワードで検索：
```bash
./scripts/list-agents.sh --search "日本語"
./scripts/list-agents.sh --search "デザイン"
```

JSON形式で出力：
```bash
./scripts/list-agents.sh -j
```

---

## 🌐 言語サポート

システムは **英語**（デフォルト）と **日本語** の両方の出力をサポートしています。

### 日本語出力

```bash
# すべてのエージェントを日本語で表示
AGENCY_LANG=ja ./scripts/list-agents.sh

# 特定のディビジョンを日本語で表示
AGENCY_LANG=ja ./scripts/list-agents.sh engineering

# 検索結果を日本語で表示
AGENCY_LANG=ja ./scripts/list-agents.sh --search "セキュリティ"
```

### 機能

- 🇯🇵 エージェント名と説明の完全な日本語対応
- 🔤 日本語キーワード検索対応（日本語対応）
- 📝 すべての初期化スクリプトに日本語コメント
- 🌐 言語対応の出力メッセージ
- 🔄 環境変数でコントロール：`AGENCY_LANG=ja` または `AGENCY_LANG=en`

### 使用例

```bash
# 英語（デフォルト）
./scripts/list-agents.sh specialized

# 日本語
AGENCY_LANG=ja ./scripts/list-agents.sh specialized

# サンプル日本語エージェント
./scripts/list-agents.sh --search "日本語サポート"
```

---

## 🚀 使用例

```
# フロントエンド開発
Activate Frontend Developer to build a React dashboard

# バックエンドシステム
Use Backend Architect to design a scalable API

# セキュリティレビュー
Activate Security Engineer to audit this codebase

# グロース戦略
Activate Growth Hacker to plan user acquisition

# AI/ML作業
Use AI Engineer to build a machine learning pipeline

# ゲーム開発
Activate Game Designer to plan game mechanics
```

---

## 📚 詳細ドキュメント

- **English版**: [README.md](README.md)
- **クイックスタート**: [README.md#-quick-start](README.md#-quick-start)
- **エージェント詳細**: [README.md#-the-agency-roster](README.md#-the-agency-roster)
- **統合ガイド**: [integrations/README.md](integrations/README.md)
- **コントリビューション**: [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 💡 次のステップ

1. **エージェントを探索する**
   ```bash
   ./scripts/list-agents.sh
   ```

2. **Claude Codeを開く**
   - このリポジトリでClaude Codeセッションを開始

3. **エージェントを起動する**
   ```
   Activate Frontend Developer to help me...
   ```

4. **日本語で試す**
   ```bash
   AGENCY_LANG=ja ./scripts/list-agents.sh
   ```

5. **他ツールに展開する**
   ```bash
   ./scripts/convert.sh
   ./scripts/install.sh --tool copilot
   ```

---

**🎭 The Agency** - あなたのAIスペシャリストチーム、いつも準備完了！
