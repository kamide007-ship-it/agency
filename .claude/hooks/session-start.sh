#!/usr/bin/env bash
#
# Claude Code Session Start Hook - Agent Activation
#
# This hook runs when Claude Code sessions start in the agency repository.
# It initializes the agent activation system and makes all agents discoverable.
#
# Environment variables available:
#   CLAUDE_SESSION_ID - Unique session identifier
#   CLAUDE_REPO_ROOT - Repository root directory
#   CLAUDE_WORKSPACE - Current workspace path

set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RESET='\033[0m'

# Log functions
log_info() {
  echo -e "${BLUE}[Agent Activation]${RESET} $*"
}

log_success() {
  echo -e "${GREEN}[Agent Activation]${RESET} $*"
}

# Initialize agent discovery
initialize_agents() {
  local agent_count=0
  local divisions=()

  # Count agents by division
  for division_dir in "$REPO_ROOT"/{engineering,design,marketing,sales,product,project-management,paid-media,strategy,support,testing,game-development,spatial-computing,specialized,integrations}; do
    if [[ -d "$division_dir" ]]; then
      local count=$(find "$division_dir" -maxdepth 1 -name "*.md" -type f | wc -l)
      if [[ $count -gt 0 ]]; then
        local division_name=$(basename "$division_dir")
        divisions+=("$division_name: $count agents")
        ((agent_count += count))
      fi
    fi
  done

  if [[ $agent_count -gt 0 ]]; then
    log_success "Loaded $agent_count agents across ${#divisions[@]} divisions"
    for division in "${divisions[@]}"; do
      log_info "  • $division"
    done
  fi
}

# Create agent index for quick discovery
create_agent_index() {
  local index_file="$REPO_ROOT/.claude/agent-index.json"

  # Use a temporary file for JSON generation
  local temp_json=$(mktemp)
  local first=true

  echo "[" > "$temp_json"

  for agent_file in $(find "$REPO_ROOT" -path "*/integrations" -prune -o -name "*-*.md" -type f -print | sort); do
    # Extract agent metadata from YAML frontmatter
    local name=$(grep "^name:" "$agent_file" | sed 's/^name: //' | tr -d '"')
    local description=$(grep "^description:" "$agent_file" | sed 's/^description: //')
    local emoji=$(grep "^emoji:" "$agent_file" | sed 's/^emoji: //' | tr -d '"')

    if [[ -n "$name" ]]; then
      if [[ $first == true ]]; then
        first=false
      else
        echo "," >> "$temp_json"
      fi

      # Properly escape JSON strings
      name=$(echo -n "$name" | jq -Rs '.')
      description=$(echo -n "$description" | jq -Rs '.')
      emoji=$(echo -n "$emoji" | jq -Rs '.')
      agent_file=$(echo -n "$agent_file" | jq -Rs '.')

      echo -n "{\"name\":$name,\"path\":$agent_file,\"emoji\":$emoji,\"description\":$description}" >> "$temp_json"
    fi
  done

  echo "" >> "$temp_json"
  echo "]" >> "$temp_json"

  mv "$temp_json" "$index_file"
  log_info "Agent index created: $index_file"
}

# Main execution
main() {
  log_info "Initializing agent activation system..."

  initialize_agents
  create_agent_index

  log_success "Agent system ready! All agents are available for activation."
  log_info "Try: 'Activate [Agent Name] to help me with...'"
}

main "$@"
