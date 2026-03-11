#!/usr/bin/env bash
#
# list-agents.sh -- List all available agents and their metadata
#
# Usage:
#   ./scripts/list-agents.sh                    # List all agents
#   ./scripts/list-agents.sh engineering        # List agents from a division
#   ./scripts/list-agents.sh -j                 # Output as JSON
#   ./scripts/list-agents.sh --search keyword   # Search agents
#

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Color codes
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RESET='\033[0m'

# Parse arguments
DIVISION="${1:-}"
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
      echo "Usage: $0 [division] [-j|--json] [--search keyword]"
      echo ""
      echo "Examples:"
      echo "  $0                     # List all agents"
      echo "  $0 engineering         # List engineering agents"
      echo "  $0 design              # List design agents"
      echo "  $0 --search frontend   # Search for agents matching 'frontend'"
      echo "  $0 -j                  # Output as JSON"
      exit 0
      ;;
    *)
      DIVISION="$1"
      shift
      ;;
  esac
done

# Collect agent information
declare -a agents
declare -A agent_data

collect_agents() {
  local search_pattern="${DIVISION:-.}"

  # Find all agent files
  for agent_file in $(find "$REPO_ROOT" -path "*/integrations" -prune -o -name "*-*.md" -type f -print | sort); do
    # Skip if division specified and doesn't match
    if [[ -n "$DIVISION" && "$DIVISION" != "." ]] && [[ "$agent_file" != *"/$DIVISION/"* ]]; then
      continue
    fi

    # Extract metadata
    local name=$(grep "^name:" "$agent_file" | head -1 | sed 's/^name: //' | tr -d '"' || echo "")
    local description=$(grep "^description:" "$agent_file" | head -1 | sed 's/^description: //' | tr -d '"' || echo "")
    local emoji=$(grep "^emoji:" "$agent_file" | head -1 | sed 's/^emoji: //' | tr -d '"' || echo "")
    local color=$(grep "^color:" "$agent_file" | head -1 | sed 's/^color: //' | tr -d '"' || echo "")

    if [[ -n "$name" ]]; then
      # Apply search filter if specified
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

# Output as formatted table
output_table() {
  if [[ ${#agents[@]} -eq 0 ]]; then
    echo "No agents found."
    [[ -n "$DIVISION" ]] && echo "Division: $DIVISION"
    [[ -n "$SEARCH_TERM" ]] && echo "Search: $SEARCH_TERM"
    return 1
  fi

  local current_division=""

  echo ""
  printf "${CYAN}%-45s %-15s ${RESET}\n" "Agent Name" "Category"
  printf "${CYAN}%s${RESET}\n" "--------------------------------------- ------"

  for agent in "${agents[@]}"; do
    IFS='|' read -r emoji description path color <<< "${agent_data[$agent]}"

    # Extract division from path
    local division=$(echo "$path" | sed 's|.*/\([^/]*\)/[^/]*\.md|\1|' | tr '_' ' ')

    # Print agent with truncated description
    local desc_short="${description:0:50}"
    [[ ${#description} -gt 50 ]] && desc_short="${desc_short}..."

    printf "${GREEN}%-3s${RESET} %-42s ${YELLOW}%-15s${RESET}\n" "$emoji" "$agent" "$division"
    printf "    ${RESET}%s\n" "$desc_short"
  done

  echo ""
  printf "Total agents found: ${GREEN}%d${RESET}\n" "${#agents[@]}"
}

# Main execution
collect_agents

if [[ $JSON_OUTPUT == true ]]; then
  output_json
else
  output_table
fi
