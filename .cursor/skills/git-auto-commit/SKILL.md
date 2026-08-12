---
name: git-auto-commit
description: Automates Git commits and pushes to the project GitHub repository after significant functional changes.
---
# Git Auto Commit & Push

## Purpose
Ensure all updates, component builds, and significant file edits are continuously tracked and pushed to GitHub.

## Repository Target
https://github.com/BoretskyVladyslav/rocla-leadgen-platform.git

## Workflow Rules
1. Whenever a feature, layout section, or significant update is completed and `npm run build` succeeds:
   - Check status using `git status`.
   - Stage changes using `git add .`.
   - Create a clear, concise commit message following Conventional Commits (e.g., `feat: add product lead form with file upload`, `style: update hero layout tokens`).
   - Push to the remote repository: `git push origin main` (or current active branch).
2. If the git repository is not initialized locally or the remote origin is missing:
   - Run `git init` (if needed).
   - Set remote origin: `git remote add origin https://github.com/BoretskyVladyslav/rocla-leadgen-platform.git` (or update if exists).
   - Ensure the default branch is `main`.
