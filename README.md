# Mobile Application: Seekers (Backend)
## Project Description :briefcase:
Seekers is a social network-based mobile app for travelers to share experiences. The app was developed by a four-person group for the **Lab 3** course in the Software Engineering program at **UCLA (Universidad Centroccidental Lisandro Alvarado)** from November 2023 to May 2024. The assigned tutor was engineer Jorge Chiquín.

### Update :construction:
The project was uploaded to GitHub as submitted for evaluation in the course. Only dependencies were updated.

I will **update** this project until it is completed as planned in the course.

## Project Requirements :clipboard:
The requirements described below were proposed by the tutor for the development of the course.

### <ins>Overview</ins>
This is a social network of any kind, such as: altruistic, buying and selling, educational, travel, food, etc. (choose one). The objective is to build an application that allows for the development of diverse interaction dynamics between the types of actors who interact within it, allowing at least these features:

1. Access module that allows registration and then login.
2. View and edit your own profile information such as phone number, address, likes, profile picture, etc.
3. Create a post with photos (at least one), a description, tags, and/or hashtags to facilitate searches by other users.
4. Delete your own post only if it hasn't been 24 hours since it was created.
5. View a timeline of the posts available on the platform, allowing you to:
- Like or unlike it
- Mark as favorite
- Comment
6. Posts marked as favorites must be available in a separate section that allows you to view them again and unfavorite them if you so desire.
7. Be able to view another user's profile and the posts they have made.
8. Search for posts by keywords in the description, tags, etc.

### <ins>Solution Architecture:</ins>
It must be a native or hybrid Android application (responsive or progressive web applications are not acceptable) where the business logic must be in a RESTful web API using the JSON data exchange standard. They must use JWT-based authentication.

You are free to choose the technology to use on both the frontend and backend, taking into account time, the knowledge of your team members, and the potential future benefits of the experience/portfolio.

**Frontend (to name a few):**
- React Native
- Ionic
- JS Framework + Cordova
- Java or Kotlin (native app)

**Backend (to name a few):**
- Nodejs
- Python
- Java
- Ruby
- Golang

**Database (to name a few):**
- PostgreSQL
- MySQL
- MongoDB

### <ins>Best development practices:</ins>
These best practices, rather than being included in the grade, will provide you with knowledge and experience for future projects. They are optional, so it is not necessary to apply them all, but it is desirable. I list them in order of relevance from highest to lowest:
- Use Git and GitHub/GitLab/BitBucket
- ​​Store passwords in encrypted form
- Use paginated query services
- Document the API in Postman or with Swagger
- Use Docker
- Use i18n in the frontend and backend

## Technologies :computer:
The API was created with **Node.js** was chosen as the JavaScript runtime environment and **Express.js** was used as the backend framework. **MongoDB** was chosen as the non-relational database due to the type of application, and **Cloudinary** was used for image and video management with its free trial. It also includes **JWT (JSON Web Token)** for authentication.

## How to get started :rocket:

### Prerequisites:
- Have **Node.JS (LTS v22.14.0 or higher)** installed.

### Steps:

1. Download the latest version of the repository. There are two options:
   1. Download from GitHub in .rar format and then extract the files.
   2. Clone the repository by copying and pasting the following line of code into a command prompt (e.g., Windows CMD):

```
git clone https://github.com/deibysprogrammer/seekers-backend.git
```

2. Download the project's dependencies by running the following line of code:

```
npm install
```

3. To start the server, run the following line of code:

```
npm start
```

You can also run directly:

```
node app.js
```

To test that the server is online, copy the following address into a browser [localhost:8080](http://localhost:8080/). A message like this should appear: **It's working**

## author :black_nib:
Deibys Chávez - [deibysprogrammer](https://github.com/deibysprogrammer)