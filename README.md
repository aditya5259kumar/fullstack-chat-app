# LinkUp

A full-stack real-time chat application built with React, Node.js, Express, MySQL, Socket.IO, and Redux Toolkit.

LinkUp enables users to communicate instantly through private one-to-one messaging with features such as typing indicators, online presence tracking, read receipts, file sharing, user discovery, and account management.

---

## Live Demo

Will be added soon...

---

## Screenshots

### Inbox Page
![Inbox](./images/inbox.png)

### Find Users Page
![Find Users](./images/find-users.png)

### User Profile
![User Profile](./images/profile.png)

### Mobile Responsive View
![Mobile View](./images/mobile.png)

---

## Features

### Authentication & User Management
- JWT Authentication
- User Signup & Login
- Welcome Email using Nodemailer
- Profile Editing & Profile Picture Upload
- Account Deletion

### Real-Time Communication
- One-to-One Messaging with Socket.IO
- Typing Indicators
- Online / Offline Presence
- Read Receipts & Unread Message Counters

### Messaging Features
- Text Messaging
- Image Sharing
- File Sharing
- Conversation Management

### User Discovery
- Search Users by Username
- Start Chats with New Users
- View Other User Profiles
- Search Existing Conversations

### User Experience
- Dark / Light Theme
- Responsive Design
- Debounced Search
- Redux Toolkit State Management
- MVC Backend Architecture

---

## Tech Stack

### Frontend

- React.js
- Redux Toolkit
- Tailwind CSS
- Axios
- React Router DOM

### Backend

- Node.js
- Express.js

### Database

- MySQL

### Real-Time Communication

- Socket.IO

### Authentication

- JWT (JSON Web Token)

### Email Service

- Nodemailer

### File Uploads

- Multer

### Deployment

- Vercel (Frontend)
- Render (Backend)

---

## Folder Structure

```bash
LinkUp/
│
├── frontend/
│   ├── src/
│   │   ├── components/         
│   │   ├── pages/               
│   │   ├── redux/                          
│   │   ├── assets/             
│   │   ├── socket/            
│   │   ├── App.jsx             
│   │   ├── main.jsx            
│   │   ├── index.css           
│   │   └── App.css             
│   ├── index.html             
│   ├── package.json            
│   ├── package-lock.json       
│   ├── vite.config.js         
│   ├── eslint.config.js       
│   └── .gitignore           
│
├── backend/
│   ├── controllers/           
│   ├── routes/                 
│   ├── models/                 
│   ├── middleware/             
│   ├── socket/                 
│   ├── config/                
│   ├── utils/                       
│   ├── public/                
│   ├── app.js                   
│   ├── package.json            
│   ├── package-lock.json        
│   └── .env                    
│
├── .gitignore                   
└── README.md
```

---

## What I Learned

This project helped me improve my understanding of:

- Real-time communication using Socket.IO
- WebSocket event handling
- Online presence systems
- Read receipt implementation
- File upload workflows
- MySQL database design

---

## Challenges Faced

- Managing real-time Socket.IO events
- Synchronizing online user states
- Implementing typing indicators
- Handling read receipt logic
- Managing unread message counts
- File uploads within chats
- Maintaining real-time UI consistency

---

## Future Improvements

- Group Chat Support
- Message Reactions
- Message Reply Feature
- Message Editing
- Message Deletion for Everyone
- Push Notifications
