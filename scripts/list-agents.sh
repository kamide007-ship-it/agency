#!/usr/bin/env bash
#
# list-agents.sh -- List all available agents and their metadata
# エージェント一覧表示スクリプト
#
# 使用法 / Usage:
#   ./scripts/list-agents.sh                    # すべて / List all agents
#   ./scripts/list-agents.sh engineering        # ディビジョン指定 / List agents from a division
#   ./scripts/list-agents.sh -j                 # JSON形式 / Output as JSON
#   ./scripts/list-agents.sh --search keyword   # キーワード検索 / Search agents
#   AGENCY_LANG=ja ./scripts/list-agents.sh     # 日本語表示 / Output in Japanese
#

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# 言語設定 / Language setting (default: en)
AGENCY_LANG="${AGENCY_LANG:-en}"

# 出力用色定義 / Color codes
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RESET='\033[0m'

# 言語別メッセージ / Language-specific messages
declare -A MESSAGES=(
  [no_agents_en]="No agents found."
  [no_agents_ja]="エージェントが見つかりません。"
  [division_en]="Division:"
  [division_ja]="ディビジョン:"
  [search_en]="Search:"
  [search_ja]="検索:"
  [agent_name_en]="Agent Name"
  [agent_name_ja]="エージェント名"
  [category_en]="Category"
  [category_ja]="カテゴリー"
  [total_found_en]="Total agents found:"
  [total_found_ja]="見つかったエージェント数:"
)

# メッセージ取得関数 / Get language-specific message
get_msg() {
  local key="$1_${AGENCY_LANG}"
  echo "${MESSAGES[$key]:-${MESSAGES[$1_en]}}"
}

# 引数解析 / Parse arguments
DIVISION=""
JSON_OUTPUT=false
SEARCH_TERM=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    -j|--json)
      JSON_OUTPUT=true
      shift
      ;;
    --search)
      SEARCH_TERM="$2"
      shift 2
      ;;
    -h|--help)
      # ヘルプメッセージ / Help message
      if [[ "$AGENCY_LANG" == "ja" ]]; then
        echo "使用法: $0 [ディビジョン] [-j|--json] [--search キーワード]"
        echo ""
        echo "例:"
        echo "  $0                     # すべてのエージェントを表示"
        echo "  $0 engineering         # エンジニアリングエージェントを表示"
        echo "  $0 design              # デザインエージェントを表示"
        echo "  $0 --search frontend   # 'frontend' に一致するエージェントを検索"
        echo "  $0 -j                  # JSON形式で出力"
      else
        echo "Usage: $0 [division] [-j|--json] [--search keyword]"
        echo ""
        echo "Examples:"
        echo "  $0                     # List all agents"
        echo "  $0 engineering         # List engineering agents"
        echo "  $0 design              # List design agents"
        echo "  $0 --search frontend   # Search for agents matching 'frontend'"
        echo "  $0 -i                  # Output as JSON"
      fi
      exit 0
      ;;
    *)
      DIVISION="$1"
      shift
      ;;
  esac
done

# エージェント情報を集約 / Collect agent information
agents=()
declare -A agent_data

collect_agents() {
  local search_pattern="${DIVISION:-.}"

  # すべてのエージェントファイルを探索 / Find all agent files
  # （日本語メタデータをサポート） / (Supports Japanese metadata)
  for agent_file in $(find "$REPO_ROOT" -path "*/integrations" -prune -o -name "*-*.md" -type f -print | sort); do
    # ディビジョンが指定されている場合はマッチするか確認 / Skip if division specified and doesn't match
    if [[ -n "$DIVISION" && "$DIVISION" != "." ]] && [[ "$agent_file" != *"/$DIVISION/"* ]]; then
      continue
    fi

    # YAMLフロントマターからメタデータを抽出 / Extract metadata (supports Japanese)
    local name=$(grep "^name:" "$agent_file" | head -1 | sed 's/^name: //' | tr -d '"' || echo "")
    local description=$(grep "^description:" "$agent_file" | head -1 | sed 's/^description: //' | tr -d '"' || echo "")
    local emoji=$(grep "^emoji:" "$agent_file" | head -1 | sed 's/^emoji: //' | tr -d '"' || echo "")
    local color=$(grep "^color:" "$agent_file" | head -1 | sed 's/^color: //' | tr -d '"' || echo "")

    if [[ -n "$name" ]]; then
      # 検索フィルタを適用（日本語対応） / Apply search filter if specified
      if [[ -n "$SEARCH_TERM" ]]; then
        if [[ ! "$name" =~ $SEARCH_TERM ]] && [[ ! "$description" =~ $SEARCH_TERM ]]; then
          continue
        fi
      fi

      agents+=("$name")
      agent_data["$name"]="$emoji|$description|$agent_file|$color"
    fi
  done
}

# Output as JSON
output_json() {
  echo "["
  local first=true
  for agent in "${agents[@]}"; do
    IFS='|' read -r emoji description path color <<< "${agent_data[$agent]}"

    if [[ $first == true ]]; then
      first=false
    else
      echo ","
    fi

    printf '  {'
    printf '"name":"%s",' "$agent"
    printf '"emoji":"%s",' "$emoji"
    printf '"path":"%s",' "$path"
    printf '"color":"%s",' "$color"
    printf '"description":"%s"' "$description"
    printf '}'
  done
  echo ""
  echo "]"
}

# フォーマット済みテーブルで出力 / Output as formatted table
output_table() {
  if (( ${#agents[@]} == 0 )); then
    echo "$(get_msg no_agents)"
    [[ -n "$DIVISION" ]] && echo "$(get_msg division) $DIVISION"
    [[ -n "$SEARCH_TERM" ]] && echo "$(get_msg search) $SEARCH_TERM"
    return 1
  fi

  local current_division=""

  echo ""
  printf "${CYAN}%-45s %-15s ${RESET}\n" "$(get_msg agent_name)" "$(get_msg category)"
  printf "${CYAN}%s${RESET}\n" "--------------------------------------- ------"

  # エージェント一覧を表示 / Print agents
  for agent in "${agents[@]}"; do
    IFS='|' read -r emoji description path color <<< "${agent_data[$agent]}"

    # パスからディビジョンを抽出 / Extract division from path
    local division=$(echo "$path" | sed 's|.*/\([^/]*\)/[^/]*\.md|\1|' | tr '_' ' ')

    # 説明文を短縮して表示 / Print agent with truncated description
    local desc_short="${description:0:50}"
    [[ ${#description} -gt 50 ]] && desc_short="${desc_short}..."

    printf "${GREEN}%-3s${RESET} %-42s ${YELLOW}%-15s${RESET}\n" "$emoji" "$agent" "$division"
    printf "    ${RESET}%s\n" "$desc_short"
  done

  echo ""
  printf "$(get_msg total_found) ${GREEN}%d${RESET}\n" "${#agents[@]}"
}

# Main execution
collect_agents

if [[ $JSON_OUTPUT == true ]]; then
  output_json
else
  output_table
fi
