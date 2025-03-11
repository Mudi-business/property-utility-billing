# property-utility-billing
A property management application that manages utility bills


# Setup Instructions
Follow these steps to set up the project locally:

Prerequisites 
- nodejs v20 or Higher  
- npm or yarn (package manager)
- Database MySql

Installation
Clone the repository: https://github.com/Mudi-business/property-utility-billing.git
cd property-utility-billing

**Note:**  
This is a monorepo.  
- Make sure to install dependencies into all *frontend* and *backend* directories.  

Install dependencies:
- npm install
# or
- yarn install


Set up the database:
**Note:**
This project uses Sequelize as the Object-Relational Mapping (ORM) tool to interact with the database. The database schema is already defined in the models, so no manual table creation is required.
- Create a MySQL Database
- Update the database connection details in the .env.dev file below *Backend Database Configuration*

# Backend Environment Variables:
- Navigate to the backend directory
The *backend* project requires the following environment variables to be set. Copy the .env.example file to .env.dev and update the values:

# Server Configuration
PASSWORD_HASH=10
PORT=7070
NODE_ENV=development

# Database Configuration
DB_USERNAME=yourusername
DB_PASSWORD=password
DB_NAME=databasename
DB_HOST=localhost
DIALECT=mysql
DB_PORT=3306

# Authentication
ACCESS_TOKEN_EXPIRE=1h
REFRESH_TOKEN_EXPIRE=2h
TOKEN_ALGORITHM=HS25
TOKEN_AUDIENCE=PMS
SECRET='fdsffdjfskfdsfdsfjsdkfjsdkfjdksjflk'


Start the Express server:
- run -> npm run compile
- run -> npm run dev


Access the application:
**Note:** 
*API Documentation (Swagger)*
This project uses Swagger for API documentation. You can access the Swagger UI to explore and interact with the API endpoints.

Open your browser and navigate to http://localhost:7070/swagger-ui (or the port specified in your .env file).

 *Swagger Features*
- Explore API Endpoints: View all available routes, their methods, and descriptions.
- Test Endpoints: Use the "Try it out" feature to make requests directly from the Swagger UI.
- View Request/Response Schemas: See the expected request body, query parameters, and response structures.



# Frontend Environment Variables:
- Navigate to the frontend directory
The *frontend* project requires the following environment variables to be set. Copy the .env.example file to .env.dev and update the values:

FRONTEND_URL=http://localhost:8080
API_URL=http://localhost:7070
PORT=8080


Start the React Application:
**Note:** 
- Make sure to install dependencies first (npm install). 
- npm start

Access the application:
Open your browser and navigate to http://localhost:8080 (or the port specified in your .env file).


# Database Schema
Below is an explanation of the database schema used in this project:

# Tables
Users
- user_id (Primary Key, Auto Increment,UUID)
- first_name (String)
- last_name (String)
- email (String,Unique)
- address (String)
- password (String, Hashed)
- createdAt (Timestamp)
- updatedAt (Timestamp)

Logins
- login_id (Primary Key, Auto Increment,UUID)
- access_token (Text)
- refresh_token (Text)
- user_id (Foreign Key,UUID)
- createdAt (Timestamp)
- updatedAt (Timestamp)


Properties
- property_id (Primary Key, Auto Increment,UUID)
- property_name (String)
- property_type (Enum)
- property_address (String)
- created_by (UUID)
- createdAt (Timestamp)
- updatedAt (Timestamp)

UtilityBills
- utility_bill_id (Primary Key, Auto Increment,UUID)
- property_id (Foreign Key,UUID)
- utility_bill_amount (Double)
- utility_bill_type (Enum)
- utility_bill_date (Timestamp)
- created_by (UUID)
- created_at (Timestamp)
- updated_at (Timestamp)


# Assumptions
Below is a list of assumptions made during the development of this project:

Utility Bill Entry Form
Requirement specify that the form should have a dropdown of properties for user to select while creating Utility Bill but It is assumed that to add new Utility Bill, the adding button will be inside a Utility bills that have been fetched by a specific Property so our assumption is that there was no much need to Add a Utility bill by choosing a Property while we already on a specific Property.

Seed Data,unit testing and other uncomplete Tasks
The requirment insist of adding seed data in the database , but a worry of unspecific date and time of our deadline we were forced to to perform the core task first and so the application assumes that data will be Inputed by user direct.

The application assumes that all user inputs are validated on the client and server side before being sent to the server.

Database Configuration
The project assumes that the database is pre-configured and accessible via the credentials provided in the .env file. No additional setup is required for the database.

Environment Variables
It is assumed that all required environment variables are correctly set in the .env file. If any variables are missing, the application may not function as expected.

