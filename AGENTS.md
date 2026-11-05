# Project development rules

This repository tracks a static HTML/CSS/JavaScript public website. Preserve the existing stack. Untracked local directories may contain independent applications; do not add, delete or modify them as part of website work.

Read global development rules when available. Choose frontend-design for visual changes, fullstack-development for API/data features, systematic-debugging for failures, and code-review before a requested PR.

## Commands

- Install locked development dependencies: `npm ci`.
- Static regression and syntax checks: `npm run check`.
- Browser setup: `npx playwright install chromium` (CI adds `--with-deps`).
- Browser regressions: `npm run test:e2e`. To use installed Chrome locally: `PW_CHANNEL=chrome npm run test:e2e`.
- Preview locally: `python3 -m http.server 8767 --bind 127.0.0.1`.

Tests isolate external images/fonts; their availability is not covered. Inspect desktop and mobile screenshots for visual changes. Do not put secrets, private student data or credentials in this public website.

## Branches, PRs and production

The default development branch observed during setup is master. Production GitHub Pages publishes from main, which differs from master. Re-check GitHub Pages settings and workflow triggers before every push; do not change main, Pages settings, custom domain or deployment workflow without explicit user approval.

Use a topic branch and a draft PR targeting master for development changes. Run check and test:e2e before marking ready. CI is tests only and runs for pull requests targeting master or manual dispatch. Do not merge PRs or trigger production deployment without explicit confirmation.

## Codex / Claude / Trae collaboration

AGENTS.md is the common project specification. CLAUDE.md imports it; .trae/rules/project_rules.md directs Trae to it. Keep project facts here to avoid contradictory copies.

When multiple agents are authorized, assign each a goal, file scope, base commit, branch and acceptance checks. Use separate worktrees for concurrent edits. A single integrator resolves conflicts and runs combined checks. Handoffs include commit, changed files, exact checks and unresolved findings. No implicit permission to spawn agents, merge or deploy is granted by this file.
