
**Assessment 1 (Total Marks **20**)**

**E-Voting System**

**Objective**
The E-Voting System is a secure and user-friendly platform that allows voters to register, authenticate, and cast their votes online. The system ensures transparency, prevents double voting, and provides real-time vote tallying with an admin dashboard for monitoring results.


**Requirement**

**1. JIRA Board URL**
https://connect-team-i2w4l2xp.atlassian.net/jira/software/projects/EVS/boards/34?atlOrigin=eyJpIjoiNjRhYzc4ZGEzYmRkNDYxZGE5Y2MyMjE3ZDgxNDc4MTAiLCJwIjoiaiJ9

Boards:
*Backlog: Feature requests & tasks
*In Progress: Currently active work
*Done: Completed features & fixes
Workflow:
*Epic → Story → Sub-task
*Sprint planning & burndown tracking


**2. Backend Development (Node.js + Express + MongoDB)**
Stack: Node.js, Express.js, MongoDB
Steps to setup:

# Clone repo
git clone https://github.com/raisenx26/evotingsystem.git
cd e-voting-system/backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Add MongoDB URI, JWT_SECRET, and PORT

# Run server
npm start

backend/
 ├── config/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 └── server.js
 **3.Frontend Development (React.js)**
Stack: React.js, Axios, React Router, TailwindCSS
Setup:
cd ../frontend

# Install dependencies
npm install

# Start development server
npm start

Features:
*Voter registration & login
*Role-based dashboard (Admin / Voter)
*Candidate list & voting page
*Result display page

**4. Authentication & Authorization**

Authentication:
  *JSON Web Token (JWT)-based auth 
  *Passwords encrypted with bcrypt
Authorization:
-Role-based access control
  *Admin: Manage candidates, view voter list, monitor results
  *Voter: Cast a single vote

**5. GitHub Version Control & Branching Strategy**

Main Branches:
  *main → stable production code
  *develop → active development
Feature Branching:
  *feature/feature-name
  *bugfix/bug-name

Workflow:
  *Create feature branch from develop
  *Commit & push changes
  *Open Pull Request → review → merge to develop
  *Periodic merge from develop → main

**7. CI/CD Pipeline Setup**

Tools: GitHub Actions / Jenkins
Pipeline Stages:
  *Build → install dependencies & compile code
  *Test → run unit/integration tests
  *Deploy → auto-deploy to AWS instance


**8. MongoDB**

Database: MongoDB Atlas (cloud) or local MongoDB instance
Collections:
*users → voter/admin info
*candidates → candidate details
*votes → encrypted vote records
Security:
*Enforce unique voter IDs
*One-vote-per-user constraint


**8. AWS Instance**

Instance Link: https://ap-southeast-2.console.aws.amazon.com/ec2/home?region=ap-southeast-2#InstanceDetails:instanceId=i-0bb2b2a9c04b801bf

Deployment:
*Backend: Deployed on EC2 instance with Node.js & PM2
*Frontend: Deployed via S3 + CloudFront (or EC2 with Nginx)
*Database: MongoDB Atlas (recommended) or self-hosted on EC2
Scaling:
*Use Load Balancer & Auto Scaling Groups
*Enable HTTPS via AWS Certificate Manager
