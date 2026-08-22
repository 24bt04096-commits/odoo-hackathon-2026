# 🚀 GitHub Upload & Team Collaboration Guide

This project is configured with 3 separate git branches for 3 team members to upload their work independently to GitHub:

| Team Member | Assigned Branch | Folder Focus / Responsibilities |
| :--- | :--- | :--- |
| **Member 1** | `frontend` | `src/`, UI Components, Pages, React Logic, Styles |
| **Member 2** | `backend` | `server/`, Express API Server, Database (`db.js`, `database.json`) |
| **Member 3** | `features` | Custom Features, Integrations, and Enhancements |

---

## ⚡ Step 1: Remote Repository Connected

Your remote repository URL is configured as:
`https://github.com/24bt04096-commits/odoo-hackathon-2026.git`

To push all 4 branches (`main`, `frontend`, `backend`, `features`) to GitHub, run:

```bash
git push -u origin --all
```


---

## 🎨 Member 1 Instructions (Frontend Branch)

Member 1 is responsible for uploading frontend updates.

### Commands for Member 1:

```bash
# 1. Switch to the frontend branch
git checkout frontend

# 2. Pull latest updates from remote (if any)
git pull origin frontend

# 3. Make your frontend changes in src/, components, CSS, HTML, etc.

# 4. Stage your frontend changes
git add src/ index.html package.json vite.config.js tailwind.config.js

# 5. Commit your work
git commit -m "feat(frontend): updated UI components and pages"

# 6. Upload (push) your work to GitHub
git push -u origin frontend
```

---

## ⚙️ Member 2 Instructions (Backend Branch)

Member 2 is responsible for uploading server and database updates.

### Commands for Member 2:

```bash
# 1. Switch to the backend branch
git checkout backend

# 2. Pull latest updates from remote (if any)
git pull origin backend

# 3. Make your server changes in server/, db.js, index.js, database.json, etc.

# 4. Stage your backend changes
git add server/

# 5. Commit your work
git commit -m "feat(backend): updated REST API endpoints and database logic"

# 6. Upload (push) your work to GitHub
git push -u origin backend
```

---

## 🌟 Member 3 Instructions (Features Branch)

Member 3 is responsible for uploading additional features and integrations.

### Commands for Member 3:

```bash
# 1. Switch to the features branch
git checkout features

# 2. Pull latest updates from remote (if any)
git pull origin features

# 3. Make your feature changes and additions

# 4. Stage your feature changes
git add .

# 5. Commit your work
git commit -m "feat(features): added new project feature modules"

# 6. Upload (push) your work to GitHub
git push -u origin features
```

---

## 🔀 Merging All Work into `main` Branch

When the team is ready to combine all work for final submission:

### Option A: Using GitHub Pull Requests (Recommended for Hackathons)
1. Go to your GitHub repository webpage.
2. Open a **Pull Request (PR)** from `frontend` into `main` and merge.
3. Open a **Pull Request (PR)** from `backend` into `main` and merge.
4. Open a **Pull Request (PR)** from `features` into `main` and merge.

### Option B: Merging locally via Terminal
```bash
git checkout main
git merge frontend
git merge backend
git merge features
git push origin main
```

---

## 🔍 Useful Git Commands Quick Reference

- **Check current branch**: `git branch`
- **Switch branch**: `git checkout <branch_name>`
- **Check status of files**: `git status`
- **View commit history**: `git log --oneline`
