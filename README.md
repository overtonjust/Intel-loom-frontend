<h1 style="text-align: center;">Intel Loom </h1>
<h3 style="text-align: center;">A Learning Platform for Sharing Skills</h3>

<div align="center">
    <img src="public/Intel_Loom_Logo.png" alt="Intel Loom Logo" width="100"/>
</div>

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Development Team](#development-team)

## Introduction
Our platform offers a dynamic, reciprocal learning environment where learners and experts can engage in real-time, fostering true interaction and collaboration. Intel Loom empowers people to gain new skills, while giving experts the tools they need to make a lasting difference—together, we’re making education accessible, interactive, and effective.

For the backend repository, visit [Intel Loom Backend](https://github.com/overtonjust/Intel-loom-backend).  
You can also view the live site [here](https://intel-loom.netlify.app/).


## Features
- **User Registration and Authentication**: 
- Users can sign up, log in, and manage their accounts.
- **Instructor Profiles**: Instructors can create profiles, upload media, and share links to other resources.
- **Class Management**: Instructors can create classes, and students can book and attend these classes.
- **Instructor Reviews**: Students can leave reviews and ratings for instructors.
- **Secure Sessions**: All user data and session management are secured with best practices.
- **Conference Page**: Host and attend live classes with real-time interaction between instructors and students.

## Technologies Used
- **Frontend**: React, Sass, Netlify for hosting
- **Real-Time Communication**: WebSockets, WebRTC (for live classes)
- **API Communication**: Axios, RESTful API

## Setup and Installation

### Prerequisites
- Node.js and npm installed on your system
- An instance of the backend API running locally or in the cloud
- A `.env` file for environment variables (contact one of the developers listed in the **Contributors** section for access to the required `.env` file)

### Clone the Repository
```
git clone https://github.com/overtonjust/Intel-loom-frontend.git
cd Intel-loom-frontend
```

### Insall the dependencies:
```
npm install
```

#### Add the `.env` file you recieved from the development team.

### Run the developmeny server:
```
npm run dev
```

### Usage 
After starting the frontend server, you can interact with the application via the browser.

#### Key Pages: 
- Sign Up/ Log In: Users can sign up or log in to the platform.

- Instructor Dashboard: Instructers can create profiles, upload videos, and provide additional resources for their classes.

- Student Dashboard: Students can book classes, attend, and leave reviews.

- Conference Page: Join live classes where instructors and students can interact in real-time using video and chat functionalities.

