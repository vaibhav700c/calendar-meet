# Fetch Details Feature

The **Fetch Details** section allows you to view and manage startup application data stored in MongoDB. This feature provides a comprehensive dashboard with search, filtering, and export capabilities.

## Features

### 📊 Overview Dashboard
- Total applications count
- Number of startups seeking mentorship
- Total funding amount requested (displayed in lakhs for amounts ≥ ₹1 lakh)
- Number of different startup stages

### 🔍 Advanced Search & Filtering
- **Global Search**: Search across startup names, founder names, emails, descriptions, stages, and audiences
- **Stage Filter**: Filter by startup development stage
- **Mentorship Filter**: Filter by mentorship requirements
- **Sortable Columns**: Click on column headers to sort data

### 📋 Data Table Features
- **Responsive Design**: Works on desktop and mobile devices
- **Expandable Rows**: Click on any row to view detailed information
- **Contact Information**: Quick access to email and phone numbers
- **LinkedIn Integration**: Direct links to LinkedIn profiles
- **Export Functionality**: Download data as CSV

### 🎨 User Interface
- Consistent with the existing calendar application theme
- Blue gradient styling matching the brand
- Hover effects and smooth transitions
- Loading states and error handling

## Setup

### 1. Environment Variables
Add the following to your `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string_here
```

### 2. MongoDB Collection Structure
The feature expects a MongoDB database named `baldmann` with a collection named `applications` with documents in this format:

```json
{
  "_id": ObjectId,
  "user_id": "string",
  "audience": "string",
  "competitors": "string", 
  "created_at": Date,
  "description": "string",
  "differentiation": "string",
  "email": "string",
  "fullname": "string",
  "fundingamount": Number,
  "fundinguse": "string",
  "inspiration": "string",
  "linkedin": "string",
  "mentorship": Boolean,
  "monetization": "string",
  "phone": "string",
  "pitch": "string",
  "previousgrants": "string",
  "problem": "string",
  "stage": "string",
  "startupname": "string",
  "teamsize": Number,
  "teamskills": "string",
  "updated_at": Date,
  "whyfund": "string"
}
```

### 3. Database Connection
The application automatically connects to MongoDB using the connection string provided in the environment variables. The connection is optimized for both development and production environments.

## Navigation

Access the Fetch Details section through:
- **Desktop**: Sidebar navigation → "Fetch Details"
- **Mobile**: Bottom tab navigation → Database icon

## Performance

- Data is fetched server-side for optimal performance
- Search and filtering are handled client-side for responsive interactions
- Table virtualization ensures smooth scrolling with large datasets
- Optimized MongoDB queries with proper indexing recommendations

## Security

- Environment variables are properly secured
- MongoDB connection uses authenticated connections
- No sensitive data is exposed in client-side code
- Input sanitization prevents injection attacks