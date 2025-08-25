
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

* Implement a CI/CD pipeline using GitHub Actions to:
* Automatically run tests on every commit/pull request (Optional).
* Deploy the backend to AWS. (Use the QUT provided EC2 instance)
* Deploy the frontend to AWS.
* Document your CI/CD workflow in the README.

---

**Submission Requirements**

**A report **contains** the following (Provide screenshots as evidence for each implemented task. **The screenshot should **contain** your username** from JIRA, GITHUB, and AWS**):

* **JIRA Project **Management**(Provide screenshots in the **report o**f at least two epics**, **including user story, sub**t**a**sks**. **Please **don’t** provide **the **U**ser Authentication** epic**.**Provide your JIRA Board URL in the report and README file as well.**Through the JIRA Board, we will systematically review the completeness of the project features, organised under Epics, User Stories, and Sub-tasks.**
* Requirement diagram, Block Definition Diagram (BDD), Parametric Diagram (Using project features).
* **GitHub Repository (backend/ and frontend/)** link. We will **review** your code implementation, which you followed from the task description. We will also **review** your commits, main branch, feature branches, and pull requests. **(**Please note that the authorisation** (Log In, Registration)** is the prerequisite for backend development.**)**
* CI/CD pipeline details step by step screenshot.
* README.md with:
* Project setup instructions.
* Public URL of your project.
* Provide a project-specific username and password if we need to access your dashboard.

---

**Assessment Criteria:**

* Clarity and completeness of Jira board and SysML models.
* Adherence to Git best practices and practical contributions.
* Successful implementation, deploymentand CI/CD pipeline.
* Problem-solving skills and the ability to go beyond basic requirements.
