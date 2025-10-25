# Resume Builder - Backend Documentation

## 🎉 Backend Implementation Complete

Your resume builder now has a **production-ready backend** with complete CRUD operations for resume management.

---

## 📁 Backend Structure

```
resumebuilder/
├── app/
│   ├── api/
│   │   ├── auth/              # Authentication endpoints (Better Auth)
│   │   ├── resumes/           # Resume management APIs
│   │   │   ├── route.js       # GET (all) & POST (create)
│   │   │   ├── [id]/
│   │   │   │   └── route.js   # GET, PUT, DELETE single resume
│   │   │   └── upload/
│   │   │       └── route.js   # POST file upload & parse
│   │   ├── sample/            # Sample data endpoints
│   │   └── utils/
│   │       └── apiHelpers.js  # Utility functions
│   └── lib/
│       └── auth.ts            # Better Auth configuration
├── configs/
│   ├── db.js                  # MongoDB connection
│   ├── ai.js                  # OpenAI/Gemini config
│   ├── imagekit.js            # ImageKit config
│   └── multer.js              # File upload config
├── models/
│   └── Resume.js              # Mongoose Resume schema
└── middleware.ts              # Auth & route protection
```

---

## 🚀 API Endpoints

### Authentication
- **POST** `/api/auth/sign-up` - User registration
- **POST** `/api/auth/sign-in` - User login
- **POST** `/api/auth/sign-out` - User logout
- **GET** `/api/auth/session` - Get current session

### Resume Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/resumes` | Get all user resumes | ✅ |
| POST | `/api/resumes` | Create new resume | ✅ |
| GET | `/api/resumes/:id` | Get single resume | Public if `public: true` |
| PUT | `/api/resumes/:id` | Update resume | ✅ Owner only |
| DELETE | `/api/resumes/:id` | Delete resume | ✅ Owner only |
| POST | `/api/resumes/upload` | Upload & parse resume file | ✅ |

### Sample Data (for development)
- **GET** `/api/sample` - Get all sample resumes
- **GET** `/api/sample/:id` - Get single sample resume

📖 **Full API documentation:** See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 🗄️ Database Schema

### Resume Model
```javascript
{
  userId: ObjectId,              // Reference to authenticated user
  title: String,                 // Resume title
  public: Boolean,               // Public visibility
  template: String,              // Template name (classic, modern, etc.)
  accent_color: String,          // Theme color
  professional_summary: String,  // Summary text
  skills: [String],             // Array of skills
  
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

## 🔐 Authentication & Security

### Better Auth Integration
- Session-based authentication
- Secure cookie management
- Google OAuth support (optional)
- Email/password authentication

### Middleware Protection
Routes protected by middleware:
- `/dashboard/*` - Dashboard pages
- `/builder/*` - Resume builder
- `/api/resumes/*` - Resume APIs (except public reads)

### Security Features
- ✅ User authentication required for CRUD operations
- ✅ Users can only access/modify their own resumes
- ✅ Public resumes accessible by anyone
- ✅ MongoDB ObjectId validation
- ✅ File upload size limits (10MB)
- ✅ File type restrictions (PDF, DOCX only)
- ✅ Input sanitization

---

## 🔧 Configuration

### Required Environment Variables

Create a `.env` file (see `.env.example`):

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/aiResumebuilder
MONGODB_DBNAME=aiResumebuilder

# Authentication
BETTER_AUTH_SECRET=your-secret-key-minimum-32-characters
NEXT_PUBLIC_AUTH_BASE_URL=http://localhost:3000

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# AI (Optional - for AI features)
GEMINI_API_KEY=your-gemini-api-key
GEMINI_BASI_URL=https://generativelanguage.googleapis.com/v1beta/openai/

# ImageKit (Optional - for image uploads)
IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
IMAGEKIT_URL_ENDPOINT=your-imagekit-url-endpoint
```

---

## 🏃 Running the Application

### Development
```bash
npm run dev
```
Server runs on: `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

### Testing Endpoints
```bash
# Install httpie or use curl
npm install -g httpie

# Test endpoints
http GET localhost:3000/api/resumes Cookie:"better-auth.session_token=YOUR_TOKEN"
```

---

## 💾 Database Setup

### Local MongoDB
1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   brew services start mongodb-community
   # or
   sudo systemctl start mongod
   ```
3. Update `MONGODB_URI` in `.env`

### MongoDB Atlas (Cloud)
1. Create account: https://www.mongodb.com/cloud/atlas
2. Create cluster and database
3. Get connection string
4. Update `MONGODB_URI` in `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aiResumebuilder
   ```

---

## 🧪 API Testing Examples

### Using JavaScript/Fetch
```javascript
// Get all resumes
const resumes = await fetch('/api/resumes', {
  credentials: 'include'
}).then(r => r.json());

// Create resume
const newResume = await fetch('/api/resumes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'My Resume' }),
  credentials: 'include'
}).then(r => r.json());

// Update resume
const updated = await fetch(`/api/resumes/${resumeId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    title: 'Updated Title',
    skills: ['JavaScript', 'React', 'Node.js']
  }),
  credentials: 'include'
}).then(r => r.json());

// Delete resume
await fetch(`/api/resumes/${resumeId}`, {
  method: 'DELETE',
  credentials: 'include'
});

// Upload resume file
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const result = await fetch('/api/resumes/upload', {
  method: 'POST',
  body: formData,
  credentials: 'include'
}).then(r => r.json());
```

---

## 🔌 Integration with Frontend

### Update Dashboard to Use Real API

Replace dummy data calls in `app/(dashboard)/dashboard/page.jsx`:

```javascript
// OLD
const fetchResumes = async () => {
  setAllResumes(dummyResumeData || []);
};

// NEW
const fetchResumes = async () => {
  try {
    const response = await fetch('/api/resumes', {
      credentials: 'include'
    });
    const data = await response.json();
    if (data.success) {
      setAllResumes(data.data || []);
    }
  } catch (error) {
    console.error('Error fetching resumes:', error);
  }
};

// Create Resume
const createResume = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/resumes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
      credentials: 'include'
    });
    const data = await response.json();
    if (data.success) {
      router.push(`/builder/${data.data._id}`);
    }
  } catch (error) {
    console.error('Error creating resume:', error);
  }
};

// Delete Resume
const handleDelete = async (resumeObj) => {
  if (!window.confirm('Are you sure?')) return;
  
  try {
    const response = await fetch(`/api/resumes/${resumeObj._id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (response.ok) {
      setAllResumes(prev => prev.filter(r => r._id !== resumeObj._id));
    }
  } catch (error) {
    console.error('Error deleting resume:', error);
  }
};
```

### Update Builder Page

In `app/(dashboard)/builder/[resumeid]/page.jsx`:

```javascript
// Load resume from API
const loadExistingResume = async (id) => {
  try {
    const response = await fetch(`/api/resumes/${id}`, {
      credentials: 'include'
    });
    const data = await response.json();
    if (data.success) {
      setResumeDate(data.data);
      document.title = data.data.title;
    }
  } catch (error) {
    console.error('Error loading resume:', error);
  }
};

// Save changes
const saveResume = async (updates) => {
  try {
    const response = await fetch(`/api/resumes/${resumeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
      credentials: 'include'
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error saving resume:', error);
    return false;
  }
};
```

---

## 🛠️ Utility Functions

Located in `app/api/utils/apiHelpers.js`:

```javascript
import { 
  successResponse, 
  errorResponse,
  unauthorizedError,
  notFoundError,
  withAuth 
} from '@/app/api/utils/apiHelpers';

// Example usage in route handlers
export const GET = withAuth(async (req, context, session) => {
  // session.user.id is available
  const data = await fetchData(session.user.id);
  return successResponse(data);
});
```

---

## 🐛 Troubleshooting

### Common Issues

**1. MongoDB Connection Failed**
```
Error: MONGODB_URI is not defined
```
Solution: Ensure `.env` file exists with `MONGODB_URI`

**2. Authentication Issues**
```
Error: Unauthorized - Please login
```
Solution: User must be logged in. Check Better Auth session.

**3. Module Not Found**
```
Module not found: Can't resolve '@/...'
```
Solution: Check `tsconfig.json` has paths configured:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**4. CORS Errors**
- Make sure to use `credentials: 'include'` in fetch calls
- Cookies must be enabled

---

## 📊 Performance & Production

### Optimizations
- ✅ MongoDB connection pooling (cached connection)
- ✅ Lean queries for better performance
- ✅ Indexed userId for fast lookups
- ✅ Auto-indexing disabled in production
- ✅ Optimized Next.js build configuration

### Deployment Checklist
- [ ] Set strong `BETTER_AUTH_SECRET` (min 32 chars)
- [ ] Use MongoDB Atlas for production database
- [ ] Set `NODE_ENV=production`
- [ ] Configure proper CORS if using separate domains
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting (recommended)
- [ ] Regular database backups

### Recommended Hosting
- **Vercel** - Zero config deployment for Next.js
- **Railway** - Easy MongoDB + Node.js hosting
- **AWS/Azure/GCP** - Full control, scalable

---

## 📚 Additional Resources

- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Better Auth Docs](https://better-auth.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Mongoose Documentation](https://mongoosejs.com/)

---

## ✅ What's Implemented

- ✅ Complete REST API for resume CRUD
- ✅ User authentication & authorization
- ✅ MongoDB integration with Mongoose
- ✅ File upload & parsing (PDF/DOCX)
- ✅ Public/private resume visibility
- ✅ Session-based auth with Better Auth
- ✅ Error handling & validation
- ✅ API helper utilities
- ✅ Production-ready build
- ✅ Comprehensive documentation

---

## 🚀 Next Steps

1. **Update Frontend:** Replace dummy data with API calls
2. **Test Endpoints:** Use Postman/Insomnia to test APIs
3. **Deploy:** Choose hosting platform and deploy
4. **Monitor:** Set up error tracking (Sentry, etc.)
5. **Enhance:** Add features like PDF generation, AI suggestions

---

## 📞 Support

For questions or issues:
1. Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
2. Review this README
3. Check console logs for errors
4. Verify environment variables

**Backend is production-ready and fully functional! 🎉**
