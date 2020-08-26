# MedPlan
Ironhack Project 3

# Description
Web app available for doctors and individuals (patients).
It enables individuals to book doctor appointments online.
Then the patient can view his appointments (and delete the incoming ones) but also, once the appointment has occured, he will have access to the visit report and the prescriptions.
The prescriptions will also be available in a Medication Planner where all the medications, time and quantities will be viewable in a schedule.

On his side, the doctor can receive bookings, upload the visit report, and add the medications.
This app offers more visiliby to his business and make it easier for the individuals to view the doctors availabilities and book appointments 24/7.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform 
-  **Login:** As a user I can login to the platform
-  **Logout:** As a user I can logout from the platform so no one else can modify my information

* Patient interface
-  **Appointment booking** As a patient I can book doctor appointments
-  **Appointment cancellation** As a patient I can cancel doctor appointments
-  **Medecines planer** As a patient I can access my medecines planner
-  **Profile editing** As a patient I can modify my health and personnal details
-  **Appointment report** As a patient I can download the report of each appointment (uploaded by the doctor)

* Health profesionnal interface
-  **Appointment booking** As a doctor I can check my schedule of patients appointments
-  **Appointment cancellation** As a doctor I can cancel patients appointments
-  **Medecines planer** As a doctor I can add prescriptions to my patients
-  **Profile editing** As a doctor I can modify my profesionnal public page details
-  **Appointment report** As a doctor I uploaded check the report for each appointment
-  **Opening times/schedule** As a doctor I can change my opening times to update my appointment calendar



## Backlog

- Video chat
- 

<br>


# Client / Frontend

## React Router Routes (React App)


| Path                      | Component                      | Permissions | Behavior                                                     |
| ------------------------- | --------------------           | ----------- | ------------------------------------------------------------ |
| `/`                       | SplashPage                     | public `<Route>`            | Home page                                        |
| `/signup`                 | SignupPage                     | anon only  `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | LoginPage                      | anon only `<AnonRoute>`     | Login form, link to signup, navigate to homepage after login  |
| `/logout`                 | n/a                            | user only `<PrivateRoute>`  | Navigate to homepage after logout, expire session             |
| `/backlog/series`         | NavBar, ElementList, FooterBar | user only `<PrivateRoute>`  | Shows all tv series on backlog                                |
| `/backlog/films`          | NavBar, ElementList, FooterBar | user only `<PrivateRoute>`  | Shows all films on backlog                                    |
| `/backlog/games`          | NavBar, ElementList, FooterBar | user only `<PrivateRoute>`  | Shows all games on backlog                                    |
| `/search/series`          | SearchForm, SearchResults      | user only  `<PrivateRoute>` | Search a tv series to be added                                |
| `/search/films`           | SearchForm, SearchResults      | user only `<PrivateRoute>`  | Search a film to be added                                     |
| `/search/games`           | SearchForm, SearchResults      | user only `<PrivateRoute>`  | Search a game to be added                                     |
| `/add/:id`                | ElementInfo                    | user only `<PrivateRoute>`  | Add an element to the backlog                                 |
| `/profile`                | Profile, Stats                 | user only  `<PrivateRoute>` | Check profile with stat information                           |
| `/done/series`            | Done list for Series           | user only  `<PrivateRoute>` | Shows all tv series finished                                  |
| `/done/films`             | Done list for films            | user only `<PrivateRoute>`  | Shows all films finished                                      |
| `/done/games`             | Done list for games            | user only `<PrivateRoute>`  | Shows all videogames finished                                 |
          

## Components

- LoginPage

- SignupPage

- NavBar

- FooterBar

- BackBar

- ElementList

- SearchForm

- SearchResults

- ElementInfo

- Stats

 

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()

- Backlog Service
  - backlog.filter(type, status) // for different types of media and if they are done or not
  - backlog.detail(id)
  - backlog.add(id)
  - backlog.delete(id)
  - backlog.update(id)
  
- External API
  - API for games
  - API for series
  - API for films


<br>


# Server / Backend


## Models

### Patient
- name: {string, required}
- email: {string, required, unique}
- passwordHash: {string, required}
- address: string
- alergies: [string]
- history: [string]
- prescriptions: [prescription: {string, ref:prescription}]

### Doctor
- name: {string, required}
- email: {string, required, unique}
- passwordHash: {string, required}
- address: string
- speciality: {string, enum}
- businessHours: {daysofWeek:[number, enum], startTime: string, endTime: string}
- phone: string
- picture: string

### Appointment
- doctor: {string, ref:doctor}
- patient: {string, ref:patient}
- time: date
- reason: string
- prescription: {string, ref:prescription}

### Prescription

- [medication: {name: string, dosePerTake: number, frequency: {perDay: number, days: number}, startDate: date, endDate: date, comments: string]
- timestamp


<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| POST        | `/auth/signup`                | {name, email, password, usertype, allergies, history}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password on the appropiate collection, and store user and usertype in session |
| POST        | `/auth/login`                 | {email, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user and usertype in session    |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user                                            |
| GET        | `/doctor/search`                 | {speciality, city}  |                | 400          | Returns the entries on doctor collection that match with the speciality and/or city                                             |
| GET         | `/doctor/:doctorId`             |                              |                |           | Returns all the information of the doctor                                           |
| GET         | `/doctor/:doctorId/appointments`              |                              |                |              | Returns all the appointments with the doctor's id                                       |
| PATCH         | `/doctor/:doctorId`                 |                              |                |              | Edit the corresponding value on the doctor's profile |
| POST         | `/patient/:doctorId/appointments`              |      calendar event                        |                |              | Creates an appointment with the doctor's and the session's id and the calendar event data                                         |
| PATCH         | `/patient/:doctorId/appointments`                        |     calendar event                         |             |           | Edit appointment if its patient id is the same as the user and the start date is more than 48h in the future                                       |                                       |
| DELETE      | `/patient/:doctorId/appointments`                 |       calendar event                       |             |           | Delete appointment if its patient id is the same as the user and the start date is more than 48h in the future                                                  |
| GET         | `/patient/:id/profile`                |                              |                |           | Returns all the information of the patient                                       |
| PATCH         | `/patient/:id/profile`                 |                              |                |              | Edit the corresponding value on the patient's profile                                        |
| GET         | `/patient/appointments`                 |       {doctor, specialty, date}                       |                |              |Returns all the appointments with the patient’s id that fit the search criteria                                          |
| GET         | `/patient/appointments/:id/report`                 |                              |                |              |Get the medical report from the appointment                                       |
| GET         | `/patient/planner/`                 |       date                      |                |              |Get all the patient's prescriptions for that day                                        |
| POST         | `/doctor/appointment/:id/report`                 |        report file                      |                |              |Stores the medical report in the appointment                                        |
| DELETE         | `/doctor/appointment/:id/cancel`                 |                             |                |              | Deletes the appointment                                        |
| POST         | `/doctor/appointment/:id/prescription`                 |                             |                |              |Creates the prescription                                        |



<br>



## Links

### Trello

[Link to your trello board](https://trello.com/b/iloDccrZ/backlog-quest) 

### Git

[Client repository Link](https://github.com/jorgeberrizbeitia/backlog-quest)

[Server repository Link](https://github.com/jorgeberrizbeitia/backlog-quest-server)

[Deployed App Link](https://backlog-quest.herokuapp.com/login)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1zndKZ8DC-_i391alptPKsAKanCSXTrLVL39L3xtEjz8/edit?usp=sharing)