# Claude Code Integration Guide

This repository contains "The Agency" - a collection of specialized AI agents ready to help you with various tasks.

## Quick Start

When you're working in Claude Code within this repository, you can activate any agent by mentioning them:

```
Activate Frontend Developer and help me build a React component.
```

```
Use the Backend Architect agent to design this API structure.
```

## Available Agents

### 💻 Engineering Division (15+ agents)

**Frontend & Web:**
- Frontend Developer - React/Vue/Angular, UI implementation, performance
- Rapid Prototyper - Fast POC development, MVPs
- Technical Writer - Developer documentation

**Backend & Infrastructure:**
- Backend Architect - API design, database architecture, scalability
- DevOps Automator - CI/CD, infrastructure automation
- Senior Developer - Advanced patterns, architecture decisions

**Specialized Engineering:**
- AI Engineer - ML models, deployment, integration
- Security Engineer - Threat modeling, secure code review
- Mobile App Builder - iOS/Android, React Native, Flutter
- Embedded Firmware Engineer - Bare-metal, RTOS, ESP32/STM32
- Data Engineer - Data pipelines, analytics
- Solidity Smart Contract Engineer - EVM contracts, DeFi
- Autonomous Optimization Architect - LLM routing, cost optimization
- Incident Response Commander - Incident management, post-mortems
- Threat Detection Engineer - SIEM rules, threat hunting
- WeChat Mini Program Developer - WeChat ecosystem

### 🎨 Design Division (8+ agents)

- UI Designer - Visual design, component libraries, design systems
- UX Researcher - User testing, behavior analysis
- UX Architect - Technical architecture, CSS systems
- Brand Guardian - Brand identity, consistency
- Visual Storyteller - Compelling visual narratives
- Whimsy Injector - Creative, unexpected design elements
- Inclusive Visuals Specialist - Accessibility-first design
- Image Prompt Engineer - DALL-E, Midjourney, Stable Diffusion

### 📱 Game Development Division (15+ agents)

**Multi-Engine:**
- Game Designer - Game mechanics, balancing
- Narrative Designer - Story, dialogue, world-building
- Level Designer - Environment design, pacing
- Technical Artist - Shaders, VFX, rendering
- Audio Engineer - Sound design, music integration

**Unity Specialists:**
- Unity Architect - Project architecture, optimization
- Unity Multiplayer Engineer - Networking, multiplayer systems
- Unity Editor Tool Developer - Custom tools, editors

**Unreal Engine Specialists:**
- Unreal Multiplayer Architect - Networking, replication
- Unreal World Builder - Level design, environment
- Unreal Technical Artist - Rendering, optimization
- Unreal Systems Engineer - Gameplay systems

**Godot Specialists:**
- Godot Gameplay Scripter - GDScript, mechanics
- Godot Shader Developer - Custom shaders, effects
- Godot Multiplayer Engineer - Networking

**Roblox Specialists:**
- Roblox Experience Designer - Game design, mechanics
- Roblox Systems Scripter - Lua scripting
- Roblox Avatar Creator - Character design, customization

### 📊 Product & Strategy Division (10+ agents)

- Sprint Prioritizer - Sprint planning, prioritization
- Feedback Synthesizer - Customer feedback analysis
- Trend Researcher - Market trends, research
- Behavioral Nudge Engine - User psychology, CRO
- Project Shepherd - Project management
- Studio Producer - Production oversight
- Studio Operations - Operations management
- Experiment Tracker - A/B testing, experimentation
- Senior Project Manager - Strategic project leadership

### 📢 Marketing Division (12+ agents)

**Content & Social Media:**
- Content Creator - Engaging content development
- LinkedIn Content Creator - Professional content
- Twitter Engager - Twitter/X strategy
- Instagram Curator - Visual content strategy
- TikTok Strategist - Short-form video
- Bilibili Content Strategist - Chinese platform expertise

**Specialized Marketing:**
- SEO Specialist - Search optimization
- App Store Optimizer - ASO, app marketing
- Carousel Growth Engine - Social carousel design
- Growth Hacker - User acquisition, retention
- Social Media Strategist - Overall social strategy
- Baidu SEO Specialist - Chinese search optimization
- Kuaishou Strategist - Chinese short-video platform
- Xiaohongshu Specialist - Chinese lifestyle platform
- WeChat Official Account - WeChat business
- Zhihu Strategist - Chinese Q&A platform
- China Ecommerce Operator - Alipay, WeChat Pay integration
- Reddit Community Builder - Community growth, moderation

### 💰 Sales & Paid Media Division (9+ agents)

**Sales:**
- Account Strategist - Account management strategy
- Proposal Strategist - RFP responses, proposals
- Sales Coach - Sales training, coaching

**Paid Media:**
- PPC Strategist - Google Ads, paid search
- Paid Social Strategist - Facebook, Instagram, LinkedIn ads
- Creative Strategist - Ad creative development
- Search Query Analyst - Keyword research, analysis
- Programmatic Buyer - Programmatic advertising
- Paid Media Auditor - Campaign audits, optimization
- Tracking Specialist - Analytics, measurement

## Agent Activation System

The `.claude/` directory contains configuration for automatic agent discovery and activation:

- **claude.json** - Configuration settings
- **hooks/session-start.sh** - Initialization script that runs when sessions start
- **agent-index.json** - Auto-generated index of all agents (created at session start)

## CLI Tools

List all available agents:
```bash
./scripts/list-agents.sh
```

List agents from a specific division:
```bash
./scripts/list-agents.sh engineering
./scripts/list-agents.sh design
```

Search for agents:
```bash
./scripts/list-agents.sh --search frontend
./scripts/list-agents.sh --search security
```

Output as JSON:
```bash
./scripts/list-agents.sh -j
```

## Using Agents Outside Claude Code

To use agents with other tools, run the installation script:

```bash
# For all tools (interactive)
./scripts/install.sh

# For specific tools
./scripts/install.sh --tool cursor
./scripts/install.sh --tool aider
./scripts/install.sh --tool windsurf
./scripts/install.sh --tool copilot
```

## Agent File Format

Each agent is a Markdown file with YAML frontmatter:

```yaml
---
name: Agent Name
description: What this agent specializes in
color: cyan
emoji: 🎯
vibe: One-sentence personality description
---

# Agent Personality

[Detailed agent instructions...]
```

## How to Add New Agents

1. Create a new markdown file in the appropriate division directory
2. Include YAML frontmatter with name, description, emoji, and color
3. Write comprehensive agent instructions following existing agent patterns
4. Run `./scripts/list-agents.sh` to verify it's discovered
5. Commit and push to your branch

## Troubleshooting

**Agents not appearing in Claude Code:**
- Verify `.claude/claude.json` has `agents_enabled: true`
- Ensure `.claude/hooks/session-start.sh` is executable
- Try reloading the Claude Code session (close and reopen)

**Agent discovery issues:**
- Run `./scripts/list-agents.sh` to test agent detection locally
- Check that agent files follow the naming convention: `division/division-agent-name.md`
- Verify YAML frontmatter is properly formatted

**Need help?**
- See [integrations/claude-code/README.md](integrations/claude-code/README.md) for detailed info
- Check the main [README.md](README.md) for complete agent documentation
- View individual agent files for usage examples

---

🎭 **The Agency** - Your AI specialists, always ready to help. Activate any agent and get started!
