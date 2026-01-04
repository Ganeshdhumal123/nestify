# 🏠 Nestify

A full-stack web application built with **Express.js**, **MongoDB**, and **EJS** that allows users to list and review properties. 
users can create listings, browse available properties, leave reviews, and manage their accounts with secure authentication.

---

## 🚀 Features

- **User Authentication**: Secure signup and login using Passport.js with local strategy
- **Property Listings**: Create, read, update, and delete property listings
- **Image Upload**: Upload and store images using Cloudinary
- **Reviews System**: Users can add reviews and ratings to properties
- **User Sessions**: Persistent user sessions with MongoDB store
- **Flash Messages**: User-friendly notification system
- **Form Validation**: Server-side validation using Joi
- **Responsive Design**: Mobile-friendly UI with EJS templates
- **Error Handling**: Comprehensive error handling and custom error pages

---

## 🛠️ Tech Stack

### Backend
- **Node.js** (v22.13.0)
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Passport.js** - Authentication middleware

### Frontend
- **EJS** - Templating engine
- **CSS3** - Styling
- **JavaScript** - Client-side scripting

### Additional Libraries
- **Cloudinary** - Image storage and management
- **Multer** - File upload handling
- **express-session** - Session management
- **connect-mongo** - MongoDB session store
- **connect-flash** - Flash message support
- **Joi** - Schema validation
- **method-override** - HTTP method override support
- **dotenv** - Environment variable management

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js v22.13.0 or later
- MongoDB (local or MongoDB Atlas account)
- Cloudinary account (for image uploads)

---

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nestify/nestify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `nestify/nestify` directory:
   ```
   DB_URL=your_mongodb_connection_string
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   SESSION_SECRET=your_session_secret
   ```

4. **Initialize the database** (optional)
   ```bash
   node init/index.js
   ```

---

## 🚀 Getting Started

1. **Start the server**
   ```bash
   node app.js
   ```

2. **Open your browser**
   Navigate to `http://localhost:3000` (or your configured port)

3. **Create an account**
   Sign up with your email and password

4. **Start exploring**
   Browse listings, create your own, and leave reviews

---

## 📁 Project Structure

```
nestify/
├── app.js                 # Main application file
├── cloudConfig.js         # Cloudinary configuration
├── middleware.js          # Custom middleware
├── schema.js              # Joi validation schemas
├── package.json           # Dependencies
│
├── models/                # MongoDB schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── controllers/           # Business logic
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routers/               # Route definitions
│   ├── listing.js
│   ├── reviews.js
│   └── user.js
│
├── views/                 # EJS templates
│   ├── layouts/
│   ├── listings/
│   ├── user/
│   └── includes/
│
├── public/                # Static assets
│   ├── css/
│   ├── js/
│   └── images/
│
├── utilis/                # Utility files
│   ├── ExpressError.js
│   └── wrapAysnc.js
│
└── init/                  # Database initialization
    ├── data.js
    └── index.js
```

---

## 🔐 Security Features

- Password hashing using Passport-Local-Mongoose
- Session-based authentication with MongoDB store
- CSRF protection considerations
- Input validation using Joi schemas
- Custom error handling to prevent information leakage

---

## 📖 API Routes

### User Routes
- `POST /signup` - Register a new user
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

### Listing Routes
- `GET /listings` - View all listings
- `GET /listings/new` - Create listing form
- `POST /listings` - Create a new listing
- `GET /listings/:id` - View listing details
- `GET /listings/:id/edit` - Edit listing form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Review Routes
- `POST /listings/:id/reviews` - Add a review
- `DELETE /listings/:id/reviews/:reviewId` - Delete a review

---

## 🐛 Troubleshooting

**Database Connection Error**
- Verify MongoDB is running and connection string is correct in `.env`

**Image Upload Issues**
- Ensure Cloudinary credentials are correctly set in `.env`
- Check file size limits in multer configuration

**Session Not Persisting**
- Verify MongoDB session store is properly connected
- Clear browser cookies and restart the application

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

---

## 📄 License

This project is licensed under the ISC License.

---

## 💡 Future Enhancements

- Advanced search and filtering options
- User profile customization
- Payment integration
- Email notifications
- Real-time chat support
- Map integration for property locations
- Wishlist functionality

---

**Built with ❤️ - Happy nesting! 🏡**
