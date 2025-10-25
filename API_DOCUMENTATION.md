# Resume Builder API Documentation

This document describes the backend API endpoints for the Resume Builder application.

## Base URL
```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Authentication
All resume endpoints require authentication using Better Auth sessions. The middleware automatically protects these routes and returns 401 if not authenticated.

## API Endpoints

### 1. Get All Resumes
**GET** `/api/resumes`

Fetches all resumes belonging to the authenticated user.

**Headers:**
```
Cookie: better-auth.session_token=<session-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "507f191e810c19729de860ea",
      "title": "Software Engineer Resume",
      "personal_info": {
        "full_name": "John Doe",
        "profession": "Full Stack Developer",
        "email": "john@example.com",
        "phone": "+1234567890",
        "location": "San Francisco, CA",
        "linkedin": "https://linkedin.com/in/johndoe",
        "website": "https://johndoe.com"
      },
      "professional_summary": "Experienced developer...",
      "experience": [...],
      "project": [...],
      "education": [...],
      "skills": ["JavaScript", "React", "Node.js"],
      "template": "classic",
      "accent_color": "#3B82F6",
      "public": false,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized - Please login"
}
```

---

### 2. Create New Resume
**POST** `/api/resumes`

Creates a new resume for the authenticated user.

**Headers:**
```
Content-Type: application/json
Cookie: better-auth.session_token=<session-token>
```

**Request Body:**
```json
{
  "title": "Software Engineer Resume"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f191e810c19729de860ea",
    "title": "Software Engineer Resume",
    "personal_info": {
      "full_name": "",
      "profession": "",
      "email": "user@example.com",
      "phone": "",
      "location": "",
      "linkedin": "",
      "website": ""
    },
    "professional_summary": "",
    "experience": [],
    "project": [],
    "education": [],
    "skills": [],
    "template": "classic",
    "accent_color": "#3B82F6",
    "public": false,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  "message": "Resume created successfully"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Title is required"
}
```

---

### 3. Get Single Resume
**GET** `/api/resumes/:id`

Fetches a single resume by ID. Public resumes can be accessed by anyone, private resumes only by the owner.

**Parameters:**
- `id` (string): Resume ObjectId

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Software Engineer Resume",
    ...
  }
}
```

**Error Responses:**
- **400 Bad Request:** Invalid resume ID
- **404 Not Found:** Resume not found
- **403 Forbidden:** Unauthorized to view this resume

---

### 4. Update Resume
**PUT** `/api/resumes/:id`

Updates an existing resume. Only the owner can update their resume.

**Headers:**
```
Content-Type: application/json
Cookie: better-auth.session_token=<session-token>
```

**Request Body (all fields optional):**
```json
{
  "title": "Updated Resume Title",
  "personal_info": {
    "full_name": "John Doe",
    "profession": "Senior Developer",
    "email": "john@example.com",
    "phone": "+1234567890",
    "location": "New York, NY",
    "linkedin": "https://linkedin.com/in/johndoe",
    "website": "https://johndoe.com"
  },
  "professional_summary": "Highly skilled developer with 5+ years...",
  "experience": [
    {
      "company": "Tech Corp",
      "position": "Senior Developer",
      "start_date": "2020-01",
      "end_date": "2025-01",
      "description": "Led team of developers...",
      "is_current": true
    }
  ],
  "project": [
    {
      "name": "E-commerce Platform",
      "type": "Web Application",
      "description": "Built a scalable e-commerce platform..."
    }
  ],
  "education": [
    {
      "institution": "University of Technology",
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "graduation_date": "2020-05",
      "gpa": "3.8"
    }
  ],
  "skills": ["JavaScript", "TypeScript", "React", "Node.js", "MongoDB"],
  "template": "modern",
  "accent_color": "#10B981",
  "public": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Resume Title",
    ...
  },
  "message": "Resume updated successfully"
}
```

**Error Responses:**
- **400 Bad Request:** Invalid resume ID
- **401 Unauthorized:** Not logged in
- **403 Forbidden:** Not the owner of this resume
- **404 Not Found:** Resume not found

---

### 5. Delete Resume
**DELETE** `/api/resumes/:id`

Deletes a resume. Only the owner can delete their resume.

**Parameters:**
- `id` (string): Resume ObjectId

**Headers:**
```
Cookie: better-auth.session_token=<session-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Resume deleted successfully"
}
```

**Error Responses:**
- **400 Bad Request:** Invalid resume ID
- **401 Unauthorized:** Not logged in
- **403 Forbidden:** Not the owner of this resume
- **404 Not Found:** Resume not found

---

### 6. Upload Resume File
**POST** `/api/resumes/upload`

Uploads and parses a resume file (PDF or DOCX) to create a new resume with extracted data.

**Headers:**
```
Content-Type: multipart/form-data
Cookie: better-auth.session_token=<session-token>
```

**Request Body:**
```
FormData:
  file: <File> (PDF or DOCX, max 10MB)
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "MyResume",
    "personal_info": {
      "full_name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "linkedin": "https://linkedin.com/in/johndoe",
      ...
    },
    "skills": ["JavaScript", "React", "Node.js"],
    ...
  },
  "message": "Resume uploaded and parsed successfully"
}
```

**Error Responses:**
- **400 Bad Request:** 
  - No file provided
  - Invalid file type (only PDF and DOCX allowed)
  - File size exceeds 10MB limit
- **401 Unauthorized:** Not logged in
- **500 Internal Server Error:** Failed to parse or save resume

---

## Data Models

### Resume Schema
```javascript
{
  userId: ObjectId (ref: "User"),
  title: String (default: "Untitled Resume"),
  public: Boolean (default: false),
  template: String (default: "classic"),
  accent_color: String (default: "#3B82F6"),
  professional_summary: String,
  skills: [String],
  personal_info: {
    full_name: String,
    profession: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    website: String
  },
  experience: [{
    company: String,
    position: String,
    start_date: String,
    end_date: String,
    description: String,
    is_current: Boolean
  }],
  project: [{
    name: String,
    type: String,
    description: String
  }],
  education: [{
    institution: String,
    degree: String,
    field: String,
    graduation_date: String,
    gpa: String
  }],
  createdAt: Date,
  updatedAt: Date
}
```

---

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error description"
}
```

### Common HTTP Status Codes
- **200 OK:** Request successful
- **201 Created:** Resource created successfully
- **400 Bad Request:** Invalid input or validation error
- **401 Unauthorized:** Authentication required
- **403 Forbidden:** Insufficient permissions
- **404 Not Found:** Resource not found
- **500 Internal Server Error:** Server error

---

## Environment Variables

Required environment variables in `.env`:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/aiResumebuilder
MONGODB_DBNAME=aiResumebuilder

# Authentication
BETTER_AUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_AUTH_BASE_URL=http://localhost:3000

# OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

## Usage Examples

### JavaScript/Fetch
```javascript
// Create a new resume
const response = await fetch('/api/resumes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'My New Resume'
  }),
  credentials: 'include' // Important for cookies
});

const data = await response.json();
console.log(data);
```

### cURL
```bash
# Get all resumes
curl -X GET http://localhost:3000/api/resumes \
  -H "Cookie: better-auth.session_token=YOUR_TOKEN"

# Create resume
curl -X POST http://localhost:3000/api/resumes \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=YOUR_TOKEN" \
  -d '{"title":"Software Engineer Resume"}'

# Upload resume file
curl -X POST http://localhost:3000/api/resumes/upload \
  -H "Cookie: better-auth.session_token=YOUR_TOKEN" \
  -F "file=@/path/to/resume.pdf"
```

---

## Rate Limiting & Security

- All endpoints are protected by Better Auth session authentication
- File uploads are limited to 10MB
- Only PDF and DOCX files are accepted for upload
- Resume IDs are validated as MongoDB ObjectIds
- Users can only access/modify their own resumes (except public ones)

---

## Support

For issues or questions, please contact the development team or open an issue on GitHub.
