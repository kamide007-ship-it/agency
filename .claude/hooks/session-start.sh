#!/usr/bin/env bash
#
# Claude Code Session Start Hook - Agent Activation
# エージェント起動システム初期化フック
#
# This hook runs when Claude Code sessions start in the agency repository.
# It initializes the agent activation system and makes all agents discoverable.
#
# 環境変数 (Environment variables):
#   CLAUDE_SESSION_ID - セッション識別子 / Unique session identifier
#   CLAUDE_REPO_ROOT  - リポジトリルート / Repository root directory
#   CLAUDE_WORKSPACE  - ワークスペースパス / Current workspace path
#   AGENCY_LANG       - 言語設定 / Language setting (en/ja)

set -euo pipefail

# スクリプトディレクトリ取得 / Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 言語設定 / Language setting (default: en)
AGENCY_LANG="${AGENCY_LANG:-en}"

# 出力用色定義 / Color definitions for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RESET='\033[0m'

# ログメッセージ（英語/日本語） / Log messages (English/Japanese)
declare -A LOG_MESSAGES=(
  [loading_agents_en]="Loaded"
  [loading_agents_ja]="読み込みました"
  [across_divisions_en]="agents across"
  [across_divisions_ja]="個のエージェントを"
  [divisions_en]="divisions"
  [divisions_ja]="ディビジョンから"
  [index_created_en]="Agent index created:"
  [index_created_ja]="エージェントインデックス作成:"
  [initializing_en]="Initializing agent activation system..."
  [initializing_ja]="エージェント起動システムを初期化中..."
  [system_ready_en]="Agent system ready! All agents are available for activation."
  [system_ready_ja]="エージェントシステム準備完了。すべてのエージェントが起動可能です。"
  [try_activate_en]="Try: 'Activate [Agent Name] to help me with...'"
  [try_activate_ja]="試す: 'Activate [エージェント名] to help me with...'"
)

# ログ出力関数 / Log output functions
log_info() {
  echo -e "${BLUE}[Agent Activation]${RESET} $*"
}

log_success() {
  echo -e "${GREEN}[Agent Activation]${RESET} $*"
}

# 言語別メッセージ取得 / Get language-specific message
get_message() {
  local key="$1_${AGENCY_LANG}"
  local fallback="$1_en"
  echo "${LOG_MESSAGES[$key]:-${LOG_MESSAGES[$fallback]:-$1}}"
}

# エージェント検出を初期化 / Initialize agent discovery
initialize_agents() {
  local agent_count=0
  local divisions=()

  # 各ディビジョンごとにエージェント数をカウント / Count agents by division
  for division_dir in "$REPO_ROOT"/{engineering,design,marketing,sales,product,project-management,paid-media,strategy,support,testing,game-development,spatial-computing,specialized,integrations}; do
    if [[ -d "$division_dir" ]]; then
      # ディビジョンディレクトリ内のマークダウンファイル数を取得 / Get markdown file count
      local count=$(find "$division_dir" -maxdepth 1 -name "*.md" -type f | wc -l)
      if [[ $count -gt 0 ]]; then
        local division_name=$(basename "$division_dir")
        divisions+=("$division_name: $count agents")
        ((agent_count += count))
      fi
    fi
  done

  # エージェントが見つかった場合、情報を出力 / Print information if agents found
  if [[ $agent_count -gt 0 ]]; then
    local msg="$(get_message loading_agents) $agent_count $(get_message across_divisions) ${#divisions[@]} $(get_message divisions)"
    log_success "$msg"
    for division in "${divisions[@]}"; do
      log_info "  • $division"
    done
  fi
}

# エージェント検索用インデックスを作成 / Create agent index for quick discovery
create_agent_index() {
  local index_file="$REPO_ROOT/.claude/agent-index.json"

  # JSON生成用の一時ファイルを使用 / Use a temporary file for JSON generation
  local temp_json=$(mktemp)
  local first=true

  echo "[" > "$temp_json"

  # エージェントファイルをループして処理 / Loop through agent files
  for agent_file in $(find "$REPO_ROOT" -path "*/integrations" -prune -o -name "*-*.md" -type f -print | sort); do
    # YAMLフロントマターからメタデータを抽出 / Extract agent metadata from YAML frontmatter
    # （日本語を含む文字列に対応） / (Supports Japanese characters)
    local name=$(grep "^name:" "$agent_file" | sed 's/^name: //' | tr -d '"')
    local description=$(grep "^description:" "$agent_file" | sed 's/^description: //')
    local emoji=$(grep "^emoji:" "$agent_file" | sed 's/^emoji: //' | tr -d '"')

    if [[ -n "$name" ]]; then
      if [[ $first == true ]]; then
        first=false
      else
        echo "," >> "$temp_json"
      fi

      # JSON文字列を適切にエスケープ / Properly escape JSON strings (supports Unicode/Japanese)
      name=$(echo -n "$name" | jq -Rs '.')
      description=$(echo -n "$description" | jq -Rs '.')
      emoji=$(echo -n "$emoji" | jq -Rs '.')
      agent_file=$(echo -n "$agent_file" | jq -Rs '.')

      echo -n "{\"name\":$name,\"path\":$agent_file,\"emoji\":$emoji,\"description\":$description}" >> "$temp_json"
    fi
  done

  echo "" >> "$temp_json"
  echo "]" >> "$temp_json"

  # アトミック操作でインデックスを置き換え / Atomically replace index file
  mv "$temp_json" "$index_file"
  log_info "$(get_message index_created) $index_file"
}

# メイン処理 / Main execution
main() {
  log_info "$(get_message initializing)"

  initialize_agents
  create_agent_index

  log_success "$(get_message system_ready)"
  log_info "$(get_message try_activate)"
}

main "$@"
