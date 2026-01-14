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

#RATE LIMITER
RATE_LIMITER_WINDOW_MS=
RATE_LIMITER_AUTH_MAX_REQUEST=
RATE_LIMITER_API_MAX_REQUEST=


```

## Getting Started

First, run the development server:

```bash
npm run dev
```

--

# Api Documentation & Configuration.

## User Api Description:

- User can create an account with name, email, password

#### 1. User Register api

- method: `POST` api endpoint: http://localhost:5000/api/v1/user/register

**BODY** FormData
**data type**: form data -> data name
**profile image**: image data -> file name

##### schema design:

```json
{
    "name": string,
    "email": string,
    "password":string,
}
```

##### Request:

```json
{
    "name": "Md Selim",
    "email": "selimakondo58@gmail.com",
    //Password should be min 8 char length & 1 uppercase & lowercase & special character
    "password":"Ss@12345",
}
```

#### Response:

```json
{
    "message": "User Created Successfully.",
    "statusCode": 201,
    "success": true,
    "data": {
        "_id": "688cab104f2d722330f5117d",
        "name": "Md. Selim",
        "email": "selimakondo60@gmail.com",
        "role": "USER",
        "isVerified": "true",
    }
}
```

#### 2. User Update api

- method: `PATCH` api endpoint: http://localhost:5000/api/v1/user

##### Description

**credentials**: true,
**data type**: form data -> data name
**profile image**: image data -> file name

##### schema design:

```json
{
    //update name and profile image
    "name":string;
}
```

##### Request:

```json
{
    "name": "MD SELIM",
}
```

#### Response:

```json
{
    "statusCode": 200,
    "message": "User updated successfully",
    "success": true
    "data": {
        "_id": "688cab104f2d722330f5117d",
        "name": "Md. Selim",
        "email": "selimakondo60@gmail.com",
        "role": "USER",
        "isVerified": "true",
    },
}
```

#### 3. User Update Role

- method: `PATCH` api endpoint: http://localhost:5000/api/v1/user/update-role

##### Description

**credentials**: true,
**Role**: SUPER_ADMIN only

##### schema design:

```json
{
    //email must be valid format
    "email": string,
    //role must be ADMIN OR USER
    "role": string
}
```

#### Request:

```json
{
    "email":"example@gmail.com",
    "role": "ADMIN"
}
```

#### Response:

```json
{
    "statusCode": 200,
    "data": {
       "role": "ADMIN"
    },
    "message": "Update User Role successfully",
    "success": true
}
```

#### 4. Get Me User

- method: `GET` api endpoint: http://localhost:5000/api/v1/user/me

## Description

**credentials**: true,

#### Response:

```json
{
    "statusCode": 200,
    "data":
        {
         "_id": "688cab104f2d722330f5117d",
        "name": "Md. Selim",
        "email": "selimakondo60@gmail.com",
        "profilePhoto": "https://cloudinary.com/exmampele",
        "role": "USER",
        "isVerified": "true",
    },
    "message": "User profile retrieved successfully",
    "success": true
}
```

## Auth Api Description:

- Auth login, logout, change password, reset password,verify email, forgot password method.

#### 1. Auth LogIn

- method: `POST` api endpoint: http://localhost:5000/api/v1/auth/login

##### Description

**credentials**: true,

##### schema design:

```json
{
    "email": string,
    "password":string,
}
```

##### Request:

```json
{
    "email": "selimakondo58@gmail.com",
    //Password should be min 8 char length & 1 uppercase & lowercase & special character
    "password":"Ss@12345",
}
```

#### Response:

```json
{
    "message": "User Logged In Successfully.",
    "statusCode": 200,
    "success": true,
    "data": {
        "_id": "69414049960ca41c72e2998d",
        "email": "ahmedmahabub73@gmail.com",
        "role": "USER",
        "isProfileCompleted": true,
        "isVerified": true,
        "accessToken":"eyJhbGciOiJ",
        "refreshToken":"eyJ"
    }
}
```

#### 2. Auth LogOut

- method: `POST` api endpoint: http://localhost:5000/api/v1/auth/logout

##### Description

**credentials**: true

#### Response:

```json
{
    "message": "User Logged Out Successfully.",
    "statusCode": 200,
    "success": true,
    "data": null
}
```

#### 3. Change Password

- method: `POST` api endpoint: http://localhost:5000/api/v1/auth/change-password

##### Description

**credentials**: true,

##### schema design:

```json
{
    "oldPassword": string,
    "newPassword":string,
}
```

##### Request:

```json
{
    "oldPassword": "Ss@12345",
    //Password should be min 8 char length & 1 uppercase & lowercase & special character
    "newPassword":"Ss@12348",
}
```

#### Response:

```json
{
    "message": "Password changed successfully.",
    "statusCode": 200,
    "success": true,
    "data":null
}
```

#### 8. Refresh Token Get

- method: `POST` api endpoint: http://localhost:5000/api/v1/auth/refresh-token

##### Description

**credentials**: true,

#### Response:

```json
{
    "message": "RefreshToken Undo Successfully.",
    "statusCode": 200,
    "success": true,
    "data":{
        "accessToken":"eyJhbGciOiJ.....",
        "refreshToken":"eyJ...."
    }
}
```

## Book Categories Api Description:

- Travel Type CRUD.

#### 1. CREATE Categories

- method: `POST` api endpoint: http://localhost:5000/api/v1/categories

##### Description

**credentials**: true,
**user role**: ADMIN

##### schema design:

```json
{
    //min 3 characters
    "title": string,
}
```

##### Request:

```json
{
    "title": "Comic",
}
```

#### Response:

```json
{
    "message": "Categories created successfully",
    "statusCode": 201,
    "success": true,
    "data": {
        "_id": "69414049960ca41c72e2998d",
        "title": "Comic",
    }
}
```

#### 2. UPDATE Categories

- method: `PATCH` api endpoint: http://localhost:5000/api/v1/categories/{travel-type-objectid}

##### Description

**credentials**: true,
**user role**: ADMIN

##### schema design:

```json
{
    //min 3 characters
    "title": string,
}
```

##### Request:

```json
{
    "title": "Comic 2",
}
```

#### Response:

```json
{
    "message": "Categories updated successfully",
    "statusCode": 201,
    "success": true,
    "data": {
        "_id": "69414049960ca41c72e2998d",
        "typeName": "Comic 2",
    }
}
```

#### 3. GET ALL CATEGORIES

- method: `GET` api endpoint: http://localhost:5000/api/v1/categories

##### Description

**pagination** support, query data {limit, page}

#### Response:

```json
{
    "message": "Categories retrieved successfully",
    "statusCode": 200,
    "success": true,
    "data": [{
        "_id": "69414049960ca41c72e2998d",
        "typeName": "Comic",
    },...]
}
```

#### 4. DELETE SINGLE CATEGORIES BY ID

- method: `DELETE` api endpoint: http://localhost:5000/api/v1/categories/{objectid}

#### Response:

```json
{
    "message": "Categories deleted successfully",
    "statusCode": 200,
    "success": true,
    "data": null
}
```

## Stats Api Description:

The Stats API provides comprehensive statistics for both users and administrators.

### 1. Get Admin Statistics

Get comprehensive statistics for the entire platform (admin only).

- **Method:** `GET`
- **Endpoint:** `http://localhost:5000/api/v1/stats/admin`
- **Authorization:** Admin only
- **Headers:** `Authorization: <access_token>` or Cookie: `accessToken=<token>`

#### Response:

```json
{
    "statusCode": 200,
    "success": true,
    "message": "Admin statistics retrieved successfully",
    "data": {
        "overview": {
            "totalUsers": 150,
            "totalAdmins": 3,
            "totalBooks": 500,
            "totalCategories": 25,
            "totalReviews": 320,
            "totalReadingActivities": 680
        },
        "thisMonth": {
            "newUsers": 12,
            "newBooks": 25,
            "newReviews": 45
        },
        "readingStats": {
            "wantToRead": 180,
            "currentlyReading": 95,
            "completed": 405
        },
        "reviewStats": {
            "pending": 25,
            "approved": 280,
            "declined": 15
        },
        "popularBooks": [
            {
                "_id": "book_id",
                "title": "The Great Gatsby",
                "author": "F. Scott Fitzgerald",
                "coverImage": "image_url",
                "readCount": 85
            }
        ],
        "topRatedBooks": [
            {
                "_id": "book_id",
                "title": "To Kill a Mockingbird",
                "author": "Harper Lee",
                "coverImage": "image_url",
                "averageRating": 4.8,
                "reviewCount": 42
            }
        ],
        "activeUsers": [
            {
                "_id": "user_id",
                "name": "John Doe",
                "email": "john@example.com",
                "profilePhoto": "photo_url",
                "activityCount": 45
            }
        ],
        "popularCategories": [
            {
                "_id": "category_id",
                "title": "Fiction",
                "bookCount": 120
            }
        ]
    }
}
```

### 2. Get User Statistics

Get personalized statistics for the authenticated user.

- **Method:** `GET`
- **Endpoint:** `http://localhost:5000/api/v1/stats/user`
- **Authorization:** User or Admin
- **Headers:** `Authorization: <access_token>` or Cookie: `accessToken=<token>`

#### Response:

```json
{
    "statusCode": 200,
    "success": true,
    "message": "User statistics retrieved successfully",
    "data": {
        "readingStats": {
            "wantToRead": 12,
            "currentlyReading": 5,
            "completed": 28,
            "total": 45
        },
        "reviewStats": {
            "total": 18,
            "approved": 16,
            "pending": 2,
            "averageRating": 4.2
        },
        "recentlyCompleted": [
            {
                "_id": "reading_id",
                "user": "user_id",
                "book": {
                    "_id": "book_id",
                    "title": "1984",
                    "author": "George Orwell",
                    "coverImage": "image_url",
                    "description": "A dystopian novel..."
                },
                "progress": "READ",
                "createdAt": "2026-01-10T10:30:00.000Z",
                "updatedAt": "2026-01-12T15:45:00.000Z"
            }
        ],
        "currentlyReading": [
            {
                "_id": "reading_id",
                "user": "user_id",
                "book": {
                    "_id": "book_id",
                    "title": "Pride and Prejudice",
                    "author": "Jane Austen",
                    "coverImage": "image_url",
                    "description": "A romantic novel..."
                },
                "progress": "CURRENTLY_READING",
                "createdAt": "2026-01-05T08:20:00.000Z",
                "updatedAt": "2026-01-13T12:30:00.000Z"
            }
        ],
        "favoriteCategories": [
            {
                "_id": "category_id",
                "title": "Classic Literature",
                "count": 8
            },
            {
                "_id": "category_id",
                "title": "Science Fiction",
                "count": 6
            }
        ],
        "recentReviews": [
            {
                "_id": "review_id",
                "book": {
                    "_id": "book_id",
                    "title": "The Hobbit",
                    "author": "J.R.R. Tolkien",
                    "coverImage": "image_url",
                    "description": "A fantasy adventure..."
                },
                "reviewer": "user_id",
                "rating": 5,
                "status": "APPROVE",
                "description": "An amazing adventure story!",
                "createdAt": "2026-01-11T14:20:00.000Z"
            }
        ],
        "activityStats": {
            "activeDaysLast30Days": 18,
            "totalActivities": 63
        }
    }
}
```

### Stats Features:

#### Admin Statistics Include:

- **Overview:** Total counts of users, admins, books, categories, reviews, and reading activities
- **This Month:** New additions this month (users, books, reviews)
- **Reading Statistics:** Breakdown by progress (want to read, currently reading, completed)
- **Review Statistics:** Breakdown by status (pending, approved, declined)
- **Popular Books:** Top 5 most read books
- **Top Rated Books:** Top 5 highest-rated books with average ratings
- **Active Users:** Top 5 most active users by activities
- **Popular Categories:** Top 5 categories by book count

#### User Statistics Include:

- **Reading Statistics:** Personal reading progress breakdown with totals
- **Review Statistics:** Total reviews, approval status, and average rating given
- **Recently Completed:** Last 5 books marked as read
- **Currently Reading:** Books currently in progress
- **Favorite Categories:** Top 5 categories based on completed books
- **Recent Reviews:** Last 5 reviews submitted
- **Activity Statistics:** Active days in last 30 days and total activities

## Development Mode Error Example Schema

#### Response:

```json
{
    "success": false,
    "message": "Review not found",
    "errorSources": [],
    "error": {
        "statusCode": 404
    },
    "stack": "Error: Review not found\n    at F:\\1.Web-Development\\3.Level-2-Course\\16.Final-Project\\bookworm-server-site\\src\\app\\modules\\review\\review.service.ts:97:15\n    at Generator.next (<anonymous>)\n    at fulfilled (F:\\1.Web-Development\\3.Level-2-Course\\16.Final-Project\\bookworm-server-site\\src\\app\\modules\\review\\review.service.ts:5:58)\n    at processTicksAndRejections (node:internal/process/task_queues:103:5)"
}
```

## Production Mode Error Example Schema

#### Response:

```json
{
    "success": false,
    "message": "Review not found",
    "errorSources": [],
    "error": null,
    "stack": null
}
```

---
