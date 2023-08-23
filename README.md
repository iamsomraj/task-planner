# Task Planner Pro - A Modern Fullstack Personal Task Manager

Built with the Next.js App Router, TypeScript, Tailwind and Firebase

## Demo

✅ [Preview] [https://task-planner-pro.vercel.app/]

## Features

- Google SSO
- Home Page for viewing personal tasks
- Option to Create new Task
- Option to edit Task title and description
- Ability to mark task as completed
- Option to delete task
- much more

## Run This Application

Following steps are required to run the application:

- Open Terminal

- Clone Task Planner Pro Repository

```bash
    git clone https://github.com/iamsomraj/task-planner.git
```

- Go to Root Directory of task-planner

- Setup Environment Variables

To run this project, you will need to add the following environment variables to your .env file ( `.env.example` )

- `NEXT_PUBLIC_FIREBASE_API_KEY` : api-key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` : auth-domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` : project-id
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` : storage-bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` : sender-id
- `NEXT_PUBLIC_FIREBASE_APP_ID` : app-id

Create these environment variables, save them in root folder. File name can be `.env.local`.

- Start task-planner

```bash
  npm run dev
```

## Tech Stack

**App:**

- Next JS 13 (App Router, Server Components, Client Components)
- Tailwind CSS
- Firebase

**Language Used:**

- Typescript

## Feedback

If you have any feedback or you want to give me some tips related to development or even documentation, please reach out to me at iamsomraj@gmail.com.
