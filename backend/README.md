# Story App Backend API

---

## Introduction :

Express.js backend API for the Story Management Application.  
This backend provides RESTful endpoints for managing stories, chapters, categories, and statuses, supporting all CRUD operations and search/filtering.

---

## Table of Contents

- [Introduction](#introduction-)
- [Features](#features-)
- [Libraries](#libraries-)
- [Project Structure](#project-structure-)
- [APK Link](#website-url-)

---

## Features :

- Story List (get all stories, with search & filter)
- Add Story (create new story with chapters)
- Story Detail (get story by ID)
- Edit Story (update story and chapters)
- Delete Story
- Get available categories and statuses
- Health check endpoint

---

## Libraries :

- **ExpressJS**: Web framework for Node.js
- **CORS**: Enable Cross-Origin Resource Sharing
- **Helmet**: Security middleware for HTTP headers
- **Morgan**: HTTP request logger
- **dotenv**: Environment variable loader
- **Jest**: Testing framework
- **Supertest**: HTTP assertions for testing

---

## Project Structure :

- `server.js` — Main Express server
- `server.test.js` — API tests
- `package.json` — Backend dependencies and scripts
- `README.md` — Backend documentation

---

## Website URL :

Attach the link of your deployed project or YouTube link here

## API Endpoints

### Stories
- `GET /api/stories` - Get all stories (with optional search/filter)
- `GET /api/stories/:id` - Get story by ID
- `POST /api/stories` - Create new story
- `PUT /api/stories/:id` - Update story
- `DELETE /api/stories/:id` - Delete story

### Metadata
- `GET /api/categories` - Get available categories
- `GET /api/statuses` - Get available statuses
- `GET /api/health` - Health check endpoint

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

4. Run tests:
```bash
npm test
```

## API Documentation

### Get All Stories
```http
GET /api/stories?search=moon&category=Technology&status=Draft
```

### Create Story
```http
POST /api/stories
Content-Type: application/json

{
  "title": "Story Title",
  "author": "Author Name",
  "synopsis": "Story synopsis",
  "category": "Technology",
  "keywords": ["tag1", "tag2"],
  "status": "Draft",
  "chapters": []
}
```

### Update Story
```http
PUT /api/stories/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "author": "Updated Author",
  "synopsis": "Updated synopsis",
  "category": "Health",
  "keywords": ["updated"],
  "status": "Publish",
  "chapters": []
}
```

## Response Format

All API responses follow this format:
```json
{
  "success": true,
  "data": {...},
  "message": "Success message",
  "total": 10
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error info"
}
```

## Testing

The backend includes comprehensive tests for all endpoints:

- Unit tests for utility functions
- Integration tests for API endpoints
- Error handling tests
- Validation tests

Run tests with:
```bash
npm test
```

## Security

- Helmet.js for security headers
- CORS configuration
- Input validation
- Error handling middleware
- Rate limiting (can be added)

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Authentication & Authorization
- File upload for story covers
- Real-time updates with WebSocket
- Rate limiting
- API documentation with Swagger