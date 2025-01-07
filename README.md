# JobFit

Job Fit is a web application designed to facilitate job seekers and recruiters in the hiring process. It includes features such as job posting, job application, profile management, and AI-powered job recommendations.

## Project Structure
The project consists of a Next.js application that handles both the frontend and backend, with API interactions for core functionalities. Additionally, a Flask server is used exclusively to serve the endpoint for AI-powered job recommendations.

![diagram1](https://github.com/M0Leo/job-fit-analyzer/assets/80783747/9e84db14-6d37-4e8f-9ecd-83d142051eb9)

## SQL Schema Diagram

![DB Diagram](https://github.com/M0Leo/job-fit-analyzer/assets/80783747/1deac693-4534-4f42-9d66-0b16f60e6606)
   
## User Types
- **Admin**
- **Job Seeker**
- **Recruiter**

## Admin Features
- Full CRUD operations on:
  - Applications
  - Users
  - Jobs
  - Etc.

## Job Seeker Features  
1. Apply for a job.
2. View/Update Profile.
3. Create and edit their profiles with relevant information.
4. View Applications.
5. Upload CV/Resume.
6. Verify Email and Phone number.

## Recruiter Features
1. Post a Job.
2. Manage job status and details.
3. View Applicants of the job.
4. Download applicant’s CV.
5. Accept or reject an application.

## Job Search and Filters
- Implementing a job search functionality with filters for:
  - Location
  - Industry
  - Job type
  - And more.
 
## Email Service with Brevo
- **Application Submission:**
  - Send confirmation email when a job seeker applies for a job.
- **Application Acceptance:**
  - Notify job seeker via email when their application is accepted.
- **Application Rejection:**
  - Notify job seeker via email when their application is rejected.

## AI-Powered Job Recommendation and Search
- The AI system should analyze user preferences and job listings to provide personalized job recommendations.

## Technologies & Libraries 

### Frontend and Backend (Next.js)
- **React**
- **Next.js**
- **TypeScript**
- **Emotion**
- **Material UI**
- **Prisma**
- **NextAuth.js**
- **Nodemailer**
- **React Hook Form**
- **Day.js**
- **React Icons**
- **Sonner**
- **Zod**
- **Brevo (SendinBlue)**

### Python (Flask)
- **Flask**
- **NumPy**
- **Pandas**
- **scikit-learn**
- **fuzzywuzzy**

## Getting Started

Ensure that you have the following:

- [Node.js](https://nodejs.org/en) and npm
- [MySQL](https://www.mysql.com/)
- Create [brevo](https://www.brevo.com/) account, you'll need this for SMTP email services

1. Clone the project repository:
   Use Git to clone the project repository to your local machine.

   ```bash
   git clone https://github.com/M0Leo/job-fit-analyzer.git
   ```

2. Navigate to the Project Directory
   Change your current directory to the project folder.

   ```bash
   cd job-fit-analyzer
   ```

3. Set up environment variables:

   Simply add the environment variables in your application by creating a .env file based on the provided .env.example template and replacing the example values with your actual configuration.

5. Install project dependencies:
   Use npm to install the project dependencies specified in the package.json file.

   ```bash
   npm install
   ```
6. Prisma configurations & Database seeding
   ```bash
   npx prisma migrate dev
   ```
   Seeding the database
   ```bash
   npm run seed
   ```
6. Run Flask server

   ```bash
     npm run flask-dev
     # or
     npm run flask-prod
    ```
7. Run for development mode

   ```bash
   npm run dev
   ```
8. Build & Start for production mode
   ```bash
   npm run build
   npm run start
   ```

