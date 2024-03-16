# TypeScript Mail Service

This project provides a TypeScript-based mail service for sending emails.

## Installation

To install the TypeScript Mail Service, follow these steps:

1. Clone the repository: `git clone https://github.com/Kutabarik/ts-mail-app.git`
2. Navigate to the project directory: `cd ts-mail-app`
3. Run `cp .env.copy .env`
4. Run the docker-compose `docker compose up -d`

## API Documentation

###  Authentication

#### POST `/register`

**Request:**

* `username`: string, username
* `email`: string, email address
* `password`: string, password

**Response:**

* `status`: 201 Created
* `message`: "User registered successfully"

#### POST `/login`

**Request:**

* `email`: string, email address
* `password`: string, password

**Response:**

* `status`: 200 OK
* `message`: "Authentication successful"

### Mail

#### POST /mail/create

**Request:**

* `recipientId`: number, ID of the recipient
* `subject`: string, subject of the email
* `body`: string, body of the email

**Response:**

* `status`: 200 OK
* `message`: "Mail was sent successfully"

#### GET /mail/all

**Response:**

* `status`: 200 OK
* `data`: array of objects, where each object represents an email:
    * `id`: number, ID of the email
    * `senderId`: number, ID of the sender
    * `recipientId`: number, ID of the recipient
    * `subject`: string, subject of the email
    * `body`: string, body of the email
    * `createdAt`: date, time when the email was created

#### PUT /mail/edit

**Request:**

* `mailId`: number, ID of the email
* `subject`: string, subject of the email
* `body`: string, body of the email

**Response:**

* `status`: 200 OK
* `message`: "Mail was succssfully edited"

#### DELETE /mail/delete

**Request:**

* `mailId`: number, ID of the email

**Response:**

* `status`: 200 OK
* `message`: "Mail was succssfully deleted"