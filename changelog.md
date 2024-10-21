## October
### 8 Oct 2024
- Feature Available : Question Logic
  - Placed under text editor
- Refitted UI to implement Question Logic

### 7 Oct 2024
- Entering Development : Question Logic

### 4 Oct 2024
- Barchart data for city and province WIP
- More updates on Survey Details (location)
- Feature Available : Text Editor in AddQuestions

### 3 Oct 2024
- In Development : Text Editor
- Added start time and submit in Report and Submission
- Bug Fixes to flow

### 2 Oct 2024
- Added image and paragraph in AddQuestion

## September
### 30 Sep 2024
- Added Map in Location Survey
- Updated Export Responses
- Updated Mail Layout

### 29 Sep 2024
- vIf adjust for target and status bar listsurvey
- Showing city regency in list response

### 27 Sep 2024
- Further adjustments to City & Regency in Create Survey

### 26 Sep 2024
- Entering Development :
    - Export survey responses to Excel
    - Email sender
- Updates to City & Regency

### 25 Sep 2024
- Added Target Response for City & Regency
- City & Regency is now available in Survey List

### 24 Sep 2024
- Debounce inputs on submission to prevent lag
- Updated middleware
- Bug fixes

### 23 Sep 2024
- Added Charts in AllReport.vue

### 21 Sep 2024
- Adding image and details listsurvey listprojects

### 20 Sep 2024
- Paginated User List & User Search Feature
- No Team/Client in User List
- UI Updates

### 19 Sep 2024
- Added flows in forms / questionnaires (testing)
    - Flows : Rules for questions where if a respondent choose a specific choice, direct them to a "unique" page
    - CRUD flows
- Updated List and Create Survey
    - Dropdown -> checkbox for selecting multiple regions
    - Location Target
    - Sum of target respondent

### 18 Sep 2024
- Prototyping Flows Feature
- ListResponse tweaks

### 17 Sep 2024
- Flows Feature Concept

### 13 Sep 2024
- Cleaning up pages in SubmissionSurveys (few bugs left)
- Updated ReportSurvey to match recent changes (pages)
- Bug fix & Updated UI in many pages/views

### 12 Sep 2024
- Added pages in SubmissionSurveys (WIP)
- Added dropdown for logic and delete in AddQuestions

### 11 Sep 2024
- Finally fixed edit client unable to update images (so long partner)
- Logic in AddQuestion to check for duplicate question choice in a question
- Changed selecting client in CRUD User from radios to use dropdown instead

### 10 Sep 2024
- No survey edits permitted when it is published
- Initialize/create a page if there are no pages
- ListSurvey & ReportSurvey bug fix

### 9 Sep 2024
- Save Alert in AddQuestion
- Ability to remove pages in AddQuestions
- Updated report & submission survey to get pages

### 6 Sep 2024
- Updated AddQuestions :
  - Insert page
  - Need to fix submission survey after this ;-;
- Change Survey Open/Close Status
- Provinces and Target Respondent (WIP) <!-- no cities/regencies yet -->
- Bug Fixes

### 4 Sep 2024
- Updated AddQuestions.vue : <!-- this is complex ngl -->
  - Replaced submit questions with save function
- Bug Fix

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

## August
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
