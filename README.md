# Office Token System

A simple and efficient Queue Management System designed for office environments to streamline customer flow and service allocation.

## Features

- **Token Generation:** Agents can generate tokens for customers, assigning them unique numbers and purposes.
- **Real-time Updates:** Officers receive real-time updates on token status through WebSocket communication.
- **Token Claiming:** Officers can claim tokens, updating their status to "CLAIMED" to prevent further actions on them.

## Technologies Used

- **Backend:** Node.js with Express
- **Frontend:** Handlebars.js for templating
- **Database:** MongoDB with Mongoose
- **Real-time Communication:** Socket.IO
- **Styling:** CSS

## Prerequisites

- Node.js installed
- MongoDB instance running

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/nalinmathur0/queue-management-system.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd queue-management-system
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Set Up Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```env
     PORT=3000
     BASE_URL=http://localhost:3000
     MONGO_URI=mongodb://localhost:27017/queue_management
     SESSION_SECRET=your_secret_key
     ```
     Replace `your_secret_key` with a secure random string.

## Usage

1. **Build the Project:**
   ```bash
   npm run build
   ```

2. **Start the Application:**
   ```bash
   npm start
   ```

3. **Access the Application:**
   - Open your browser and navigate to `http://localhost:3000`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
