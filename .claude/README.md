# Claude Code Agent Activation

This directory contains the Claude Code configuration for the Agency repository, enabling automatic agent discovery and activation.

## How It Works

When you open this repository in Claude Code:

1. **Session Start Hook** - The `hooks/session-start.sh` script automatically runs, initializing the agent system
2. **Agent Discovery** - All agents are indexed and made discoverable within your Claude Code session
3. **Agent Index** - A JSON index is created for quick agent lookup

## Activating Agents

In any Claude Code conversation within this repository, you can activate an agent by name:

```
Activate Frontend Developer and help me build a React component.
```

```
Use the Backend Architect agent to design a microservices architecture.
```

```
Can the Security Engineer agent review this code for vulnerabilities?
```

## Available Agent Categories

- **Engineering** (15+ agents) - Frontend developers, backend architects, DevOps, security engineers, and more
- **Design** (8+ agents) - UI/UX designers, brand guardians, visual storytellers
- **Marketing** (12+ agents) - Content creators, SEO specialists, social media strategists
- **Sales** (3+ agents) - Account strategists, proposal writers, sales coaches
- **Product** (3+ agents) - Sprint prioritizers, feedback synthesizers, trend researchers
- **Project Management** (5+ agents) - Project shepherds, studio producers, experiment trackers
- **Paid Media** (6+ agents) - PPC specialists, creative strategists, tracking experts
- **Strategy** (agents) - Strategic planners and advisors
- **Support** (agents) - Customer support specialists
- **Game Development** (15+ agents) - Unity, Unreal, Godot, Roblox specialists
- **Spatial Computing** (agents) - AR/VR specialists

## Configuration

The `claude.json` file controls agent activation behavior:

- `agents_enabled` - Enable/disable agent system
- `agents_directory` - Location of agent files (defaults to repository root)
- `auto_activate` - Automatically initialize on session start
- `session_hooks` - Scripts to run when sessions start

## Hooks

### session-start.sh

Runs automatically when a Claude Code session starts in this repository. It:

- Discovers and counts all available agents
- Creates an agent index for quick lookup
- Reports agent availability to the session

You can modify this script to customize agent initialization behavior.

## Manual Agent Installation

If you want to use agents outside this repository:

```bash
# Copy agents to your Claude Code agents directory
./scripts/install.sh --tool claude-code

# Or manually copy specific divisions
cp engineering/*.md ~/.claude/agents/
cp design/*.md ~/.claude/agents/
```

## Troubleshooting

If agents aren't appearing:

1. Check that `agents_enabled` is `true` in `claude.json`
2. Verify the `session-start.sh` script is executable: `chmod +x .claude/hooks/session-start.sh`
3. Look for the agent index file at `.claude/agent-index.json`
4. Ensure you're in a Claude Code session (not using Claude Code CLI in a non-web environment)

## More Information

See the [main README](../README.md) for complete documentation on The Agency and its agents.
