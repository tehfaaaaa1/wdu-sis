## To Be Added
**Surveys**
- Drag & Drop Survey Form Builder (Adding more features) <!-- Note: Add Edit Questions -->
- Question Logic in Surveys (TBA)
- Region & Target Number of Survey Respondents (TBA)
- Verify Respondent Region (TBA)
<!-- - Biodata Respondent (Complete V) (Age, Address, Phone Number, Instance) -->

**Misc**
- Add Icons to needed elements
- Change to / Add Indonesian Language
- better UI/UX
- Dashboard Content
<!-- - Updated Documentation (Fadel)
  - ERD Survey Database (V)
  - Activity Diagram (V) -->

## Need bug fix
- Edit Client can't update (image breaks the form when added)

## Changelog
### 4 Sep 2024

### 3 Sep 2024
- Target Respondent in Surveys (WIP)
- Added required questions
- Profile client fixes
- Implementing save question function (WIP)

### 2 Sep 2024
- Fixed Submission Survey involving checkboxes
- Updated List survey : 
  - A respondent can no longer access the survey after submission.
  - Respondents includes regular user and enumerator
  - Only korlap can edit answer. Not implemented yet

### 30 Aug 2024
- Testing & Debugging

### 29 Aug 2024
- Updated AddQuestion
  - Now uses drag & drop feature
  - Added checkbox / multiple choice
- Expanding Profile Client (WIP)
- Many bug fixes

### 28 Aug 2024
- CRUD Biodata Respondent
- Survey Complete Status
- Added wilayah in list response
- Drag & Drop Question (WIP)
- Expanding Profile Client (WIP)
- Bug fixes

### 27 Aug 2024
- Biodata WIP (Daud)
- List Response & Response Detail WIP (Daud)
- Drag & Drop questions WIP (Pateh)
- Profile Client (thx mas Fadel)
- Show Location in client page

### 26 Aug 2024
- Report Survey to check
- User submit survey
- View clients only for eligible client user
- Added TeamSeeder for convenience
- Bug Fix

### 22 Aug 2024
- Add questions in surveys (WIP)

### 21 Aug 2024
- Setup for questions in surveys (migration)
- UI Changes

### 20 Aug 2024
- Added client page to store all projects for a specific client (e.g. KPK, BKPM)
- White navbar for more modern look
- Removed images from projects

### 19 Aug 2024
- Changed survey list UI
- Image in projects
- Improved UI
- Bug fixes

### 16 Aug 2024
- Finished Project & Survey
- Improved CRUD User
  - Assign user to a team during creation
  - Allow assignment as admin
- Minor changes to UI

### 15 Aug 2024
- Projects 
  - Contains grouped surveys for users to access
  - Currently needs fixing on CRUD Survey
- Added search for user
- Minor changes to UI

### 14 Aug 2024
- CRUD User
- Projects (WIP)

### 13 Aug 2024
- Assigning team admin or editor via team member settings
- New admin role assigned: superadmin (one level above admin)
- Superadmin permission:
  - Has access to "users" list (/users)
  - CRUD team
  - Switching team
- Admin (team administrator) permission:
  - Manage team members
- CRUD Survey v1 & improved UI
- Footer added

### 12 Aug 2024
- Added Surveys, Users, Admin Panel
- Navbar
- Team System
    -  Add, Delete members to the team
    -  CRUD Team
- Authentication for accessing certain pages
