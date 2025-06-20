# 💰 Personal Budget Tracker

A full-stack web application to help users manage their monthly income, expenses, and budgets. The app provides an intuitive interface, data visualization, and secure authentication features.

## 📌 Live Demo

- 🔗 Frontend: [https://budget-tracker-ruddy-seven.vercel.app](https://budget-tracker-ruddy-seven.vercel.app)
- 🔗 Backend API: [https://budget-tracker-5e4q.onrender.com/api](https://budget-tracker-5e4q.onrender.com/api)
- 🔗 GitHub Repository: [https://github.com/yourusername/budget-tracker](https://github.com/yourusername/budget-tracker)

---

## 🚀 Features

- 🔐 User Authentication (JWT-based login)
- 📈 Dashboard summary (Total Income, Total Expenses, Balance)
- 🧾 Add/Edit/Delete transactions
- 📊 Budget vs Expense Chart (D3.js)
- 📂 Categorize transactions (Bills, Groceries, Entertainment, etc.)
- 🔍 Filter & paginate transaction history
- 🧮 Budget input form with live summary
- 📱 Responsive Design

---

## 🛠️ Tech Stack

### Frontend (React)
- ReactJS
- Styled-components
- Axios
- React Router
- D3.js (for charting)
- Vercel (for deployment)

### Backend (Node.js + Express)
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- CORS
- Render (for deployment)
- dotenv

---
📋 API Endpoints
Method	Endpoint	Description
POST	/api/auth/login	User login
GET	/api/transactions	Get all user transactions (filter, pagination supported)
POST	/api/transactions	Add a new transaction
PUT	/api/transactions/:id	Edit a transaction
DELETE	/api/transactions/:id	Delete a transaction
GET	/api/budget	Get user's budget
POST	/api/budget	Set/update budget

---
🤖 Acknowledgements
ChatGPT by OpenAI (for code assistance and structuring)

D3.js (data visualization)

Render & Vercel (deployment)

MongoDB Atlas (database hosting)

---
## 🔐 Test Credentials

You can log in using the following test account: { username: Tester , password: Test1234}
                                
