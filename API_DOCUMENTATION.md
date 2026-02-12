# 🚀 Sabina Academy - API Documentation

## Base URL
```
http://localhost:3000/api
```

---

## 📚 COURSES API

### GET /api/courses
Get all courses with optional filtering.

**Query Parameters:**
- `locale` (string): Language code (en/az/ru) - default: 'en'
- `featured` (boolean): Filter featured courses
- `active` (boolean): Filter active courses - default: true

**Example:**
```bash
GET /api/courses?locale=en&featured=true
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "slug": "ielts-preparation",
      "image": "url",
      "icon": "📚",
      "featured": true,
      "active": true,
      "order": 1,
      "translations": [
        {
          "locale": "en",
          "title": "IELTS Preparation",
          "description": "...",
          "highlights": ["..."],
          "duration": "3 months",
          "price": "500 AZN",
          "schedule": "Mon-Wed-Fri"
        }
      ]
    }
  ],
  "count": 5
}
```

### GET /api/courses/[id]
Get single course by ID or slug.

**Query Parameters:**
- `locale` (string): Language code

**Example:**
```bash
GET /api/courses/ielts-preparation?locale=en
```

### POST /api/courses
Create new course (Admin only).

**Body:**
```json
{
  "slug": "new-course",
  "image": "url",
  "icon": "📖",
  "featured": false,
  "active": true,
  "order": 2,
  "translations": [
    {
      "locale": "en",
      "title": "Course Title",
      "description": "Description",
      "highlights": ["Point 1", "Point 2"],
      "duration": "2 months",
      "price": "300 AZN",
      "schedule": "Mon-Fri"
    }
  ]
}
```

### PUT /api/courses/[id]
Update course.

### DELETE /api/courses/[id]
Delete course.

---

## 🏕️ CAMPS API

### GET /api/camps
Get all summer camps.

**Query Parameters:**
- `locale` (string): Language code - default: 'en'
- `year` (number): Filter by year
- `featured` (boolean): Filter featured camps
- `active` (boolean): Filter active camps - default: true

**Example:**
```bash
GET /api/camps?locale=en&year=2026&featured=true
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "slug": "london-2026",
      "year": 2026,
      "location": "London, UK",
      "startDate": "2026-07-01",
      "endDate": "2026-07-21",
      "image": "url",
      "gallery": ["url1", "url2"],
      "featured": true,
      "active": true,
      "spots": 25,
      "price": "2500 EUR",
      "ageRange": "12-17",
      "translations": [...]
    }
  ],
  "count": 3
}
```

### GET /api/camps/[id]
Get single camp by ID or slug.

### POST /api/camps
Create new camp (Admin only).

### PUT /api/camps/[id]
Update camp.

### DELETE /api/camps/[id]
Delete camp.

---

## 🏆 RESULTS API

### GET /api/results
Get all student results.

**Query Parameters:**
- `locale` (string): Language code - default: 'en'
- `featured` (boolean): Filter featured results
- `testType` (string): Filter by test type (IELTS, SAT, etc.)
- `active` (boolean): Filter active results - default: true

**Example:**
```bash
GET /api/results?locale=en&featured=true&testType=IELTS
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "studentName": "Aysel Məmmədova",
      "score": "8.5",
      "testType": "IELTS",
      "image": "url",
      "featured": true,
      "active": true,
      "date": "2024-12-15",
      "translations": [
        {
          "locale": "en",
          "testimonial": "Great experience!",
          "courseType": "IELTS Preparation"
        }
      ]
    }
  ],
  "count": 10
}
```

### GET /api/results/[id]
Get single result by ID.

### POST /api/results
Create new result (Admin only).

### PUT /api/results/[id]
Update result.

### DELETE /api/results/[id]
Delete result.

---

## 📧 CONTACT API

### GET /api/contact
Get all contact submissions (Admin only).

**Query Parameters:**
- `read` (boolean): Filter by read status

**Example:**
```bash
GET /api/contact?read=false
```

### POST /api/contact
Submit contact form.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+994555519933",
  "subject": "Course Inquiry",
  "message": "I want to learn more about IELTS courses."
}
```

**Response:**
```json
{
  "success": true,
  "data": {...},
  "message": "Message sent successfully! We will contact you soon."
}
```

---

## 📊 STATS API

### GET /api/stats
Get website statistics.

**Example:**
```bash
GET /api/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "courses": {
      "total": 5,
      "active": 4,
      "featured": 2,
      "latest": {...}
    },
    "camps": {
      "total": 3,
      "active": 3,
      "featured": 1,
      "latest": {...}
    },
    "results": {
      "total": 10,
      "featured": 3,
      "latest": {...}
    },
    "contacts": {
      "total": 15,
      "unread": 5,
      "latest": {...}
    },
    "overview": {
      "totalCourses": 5,
      "totalCamps": 3,
      "totalResults": 10,
      "unreadContacts": 5
    }
  }
}
```

---

## 🔍 SEARCH API

### GET /api/search
Search across all content.

**Query Parameters:**
- `q` (string, required): Search query
- `locale` (string): Language code - default: 'en'
- `type` (string): Type to search ('courses', 'camps', 'results', 'all') - default: 'all'

**Example:**
```bash
GET /api/search?q=ielts&locale=en&type=all
```

**Response:**
```json
{
  "success": true,
  "query": "ielts",
  "totalResults": 5,
  "data": {
    "courses": [...],
    "camps": [...],
    "results": [...]
  }
}
```

---

## 📝 Response Format

All API responses follow this structure:

### Success Response:
```json
{
  "success": true,
  "data": {...},
  "message": "Optional success message"
}
```

### Error Response:
```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

---

## 🔒 Authentication

Currently, authentication is not enforced on API endpoints. For production:
- Add authentication middleware
- Use API keys or JWT tokens
- Protect admin endpoints (POST, PUT, DELETE)

---

## 💡 Usage Examples

### JavaScript/Fetch
```javascript
// Get courses
const response = await fetch('/api/courses?locale=en')
const data = await response.json()

// Submit contact form
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John',
    email: 'john@example.com',
    message: 'Hello!'
  })
})
```

### cURL
```bash
# Get featured courses
curl "http://localhost:3000/api/courses?locale=en&featured=true"

# Submit contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I want more information"
  }'
```

---

## 🎯 All Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | Get all courses |
| GET | `/api/courses/[id]` | Get single course |
| POST | `/api/courses` | Create course |
| PUT | `/api/courses/[id]` | Update course |
| DELETE | `/api/courses/[id]` | Delete course |
| GET | `/api/camps` | Get all camps |
| GET | `/api/camps/[id]` | Get single camp |
| POST | `/api/camps` | Create camp |
| PUT | `/api/camps/[id]` | Update camp |
| DELETE | `/api/camps/[id]` | Delete camp |
| GET | `/api/results` | Get all results |
| GET | `/api/results/[id]` | Get single result |
| POST | `/api/results` | Create result |
| PUT | `/api/results/[id]` | Update result |
| DELETE | `/api/results/[id]` | Delete result |
| GET | `/api/contact` | Get contacts (admin) |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/stats` | Get statistics |
| GET | `/api/search` | Search content |

---

## ✅ Ready to Use!

All APIs are functional and return properly serialized JSON data. Test them with:

```bash
npm run dev
```

Then visit:
- http://localhost:3000/api/courses
- http://localhost:3000/api/camps
- http://localhost:3000/api/results
- http://localhost:3000/api/stats
