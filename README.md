# HK-Lapstore - Full Stack Web Application

This is a **Full Stack Web Application** for **HK-Lapstore**, an online store for managing and purchasing laptops . The project utilizes **Spring Boot** for the backend, **Angular** for the frontend, and **Spring Security with JWT Authentication** for secure user authentication and authorization.

## Technologies Used
- **Frontend**: Angular with Bootstrap 
- **Backend**: Spring Boot (Java)
- **Authentication**: Spring Security with JWT (JSON Web Token)
- **Database**: MySQL 
- **Build Tools**: Maven (for Spring Boot) and npm (for Angular)
- **Version Control**: Git

## Sample View of App
![dashboard](https://github.com/user-attachments/assets/d4020313-59d9-4eab-92d1-5b5e814b8d60)

![products](https://github.com/user-attachments/assets/73d43356-9f6b-4d2c-9a52-eb2542fc6b4a)

![cart](https://github.com/user-attachments/assets/c637c575-2722-488a-ac10-efd95367fdb0)

![product-update](https://github.com/user-attachments/assets/d75fe228-bbce-4c54-9fce-173ffabf5f8d)


## Features
- User registration and login with JWT authentication
- Admin panel for managing products, clients,cart and orders
- Secure authentication with JWT tokens
- CRUD operations for managing products
- Data stored in MySQL 
- Secure password storage with bcrypt hashing

## Project Structure

### Backend - Spring Boot
1. **Controllers**: RESTful APIs for managing users, products,clients and orders.
2. **Services**: Business logic for handling operations.
3. **Repositories**: Interacts with the database.
4. **Entities**: Database models (e.g., Product, User, Order).
5. **Security**: Spring Security configuration, JWT token generation, and user authentication.
6. **DTOs**: Data Transfer Objects for exchanging data between the frontend and backend.

### Frontend - Angular
1. **Components**: UI components for displaying products, managing orders, etc.
2. **Services**: HTTP services for API calls and authentication management.
3. **Routing**: Handles navigation and route protection.
4. **Forms**: Handles user inputs, validation, and form submission (e.g., Registration, Login, Product Edit).
5. **JWT Authentication**: Manages JWT tokens for secure user authentication and authorization.


### Installation Guide
### 1\. **Clone the Repositories**

Start by cloning both the backend and frontend repositories to your local machine.

*    clone https://github.com/yourusername/hk-lapstore-backend.git
    

### 2\. **Set Up Backend (Spring Boot)**

1.  **Install Java **:Ensure that **Java ** is installed on your system. You can download it from [OpenJDK](https://adoptopenjdk.net/).
    
2.  **Configure Database (MySQL)**:
    
    *   propertiesCopy codespring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
    *   spring.datasource.username=root
    *   spring.datasource.password=yourpassword
    *   spring.jpa.hibernate.ddl-auto=update
    *   spring.jpa.show-sql=true
        
3.   mvn clean install
    
4.   mvn spring-boot:runYour backend should now be running at http://localhost:8080.
    

### 3\. **Set Up Frontend (Angular)**

1.  **Install Node.js and npm**:Ensure that **Node.js** and **npm** are installed on your machine. You can download and install Node.js from [nodejs.org](https://nodejs.org/).
    
2.  npm install -g @angular/cli
    
3.  cd hk-lapstore-frontendnpm install
    
4.  ng serve Your frontend should now be running at http://localhost:4200.
    

### 4\. **JWT Authentication Setup**

1.  **Backend - Spring Security Configuration**:
    
    *   The backend is configured with **Spring Security** and **JWT** for user authentication and authorization. The /login endpoint is used to authenticate users and receive a JWT token.
        
    *   The backend includes a filter (JwtAuthenticationFilter) that intercepts requests and verifies the JWT token for protected routes.
        
2.  **Frontend - Angular Authentication**:
    
    *   In the frontend, the login form allows users to authenticate and receive a JWT token. The token is stored in **local storage** and sent with every request that requires authentication.
        
    *   The frontend includes an **HTTP interceptor** to add the JWT token to the headers of the API requests.
        
    
### 5\. **Contributing**

If you'd like to contribute to this project, please follow these steps:

1.  **Fork** the repository on GitHub.
    
2.  **Create a new branch** (git checkout -b feature-branch).
    
3.  **Make your changes** to the code.
    
4.  **Commit your changes** (git commit -am 'Add new feature').
    
5.  **Push to the branch** (git push origin feature-branch).
    
6.  **Open a Pull Request** with a detailed description of your changes.
    

### 6\. **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## Authors

👤 **Hiron Kanishka**

- GitHub: [@hironkanishka](https://linkedin.com/in/hiron-kanishka)
- LinkedIn: [Hiron Kanishka](https://www.linkedin.com/in/hiron-kanishka/)

## Feedback and Contributions

If you have any feedback, suggestions, or would like to contribute to this project, your involvement is highly valued. Feel free to open an issue or submit a pull request with your ideas and enhancements. Remember, this template is a starting point, and the true magic lies in making it your own. Enjoy the journey of creating a stunning portfolio that represents your unique talents and accomplishments!

Happy coding and showcasing!

## Show your support

Give a ⭐️ if you like this project!
