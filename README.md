# Book Worm Server Site By Node, Express, Ts, Mongoose

Book Worm Server is website where user can track their reading books.

## Features of this website:

    * User register/login

## Tech Stack:

    - **Runtime:** Node
    - **Language:** Typescript
    - **Framework:** Express
    - **Database & ODM:** MongoDB & Mongoose.
    - **Authorization & Authentication:** Json Web Token (Jwt)
    - **Data Validation & Security:** Zod, Bcrypt, Rate Limiter.

# Set Up and Installation

**Clone the repository**

```bash

git clone git@github.com:mdselimme/Book-Worm-Server-Code.git

```

**Set up .env file with requirement variables**

```env

# initialize server environment variables
PORT=
NODE_ENV=
DB_URL=

#BCRYPT
BCRYPT_SALT_ROUNDS=

#CLOUDINARY CONFIG
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_SECRET=CLOUDINARY_URL=

#Default Admin User
DEFAULT_ADMIN_NAME=
DEFAULT_ADMIN_EMAIL=
DEFAULT_ADMIN_PASSWORD=

#JWT
JWT_ACCESS_TOKEN_SECRET=
JWT_ACCESS_TOKEN_EXPIRED=
JWT_REFRESH_TOKEN_SECRET=
JWT_REFRESH_TOKEN_EXPIRED=

```

## Getting Started

First, run the development server:

```bash
npm run dev
```

--
