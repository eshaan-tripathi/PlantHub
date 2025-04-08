# 🌿 Plant Hub – E-commerce Platform with AI

An intelligent and interactive e-commerce web application for buying and selling plants. Built with the MERN stack and enhanced with an AI-powered chatbot, Plant Hub offers a seamless shopping experience with smart recommendations and secure transactions.

## 🚀 Features

- **🛒 E-commerce Functionality**: Users can browse, search, and purchase a wide variety of plants.
- **🧠 AI Chatbot**: Integrated AI-powered chatbot to assist users with queries and suggest plant care tips.
- **📦 Admin Dashboard**: Comprehensive dashboard to manage products, orders, users, and overall platform analytics.
- **💳 Payment Integration**: Secure and seamless checkout using Braintree as the payment gateway.
- **🎨 Responsive UI**: Styled with Bootstrap for a clean, mobile-friendly experience.

## 🛠 Tech Stack

- **Frontend**: React.js, Bootstrap
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **AI Integration**: Chatbot for user support and recommendations
- **Payment Gateway**: Braintree

## 📁 Project Structure

PlantHub/ │ ├── client/ # React Frontend │ ├── public/ │ └── src/ │ ├── components/ │ ├── pages/ │ └── App.js │ ├── backend/ # Node.js + Express Backend │ ├── controllers/ │ ├── models/ │ ├── routes/ │ └── server.js │ ├── .env # Environment Variables ├── README.md └── package.json

bash
Copy
Edit

## 🔐 Setup & Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/plant-hub.git
   cd plant-hub
Install Server Dependencies

bash
Copy
Edit
cd server
npm install
Install Client Dependencies

bash
Copy
Edit
cd ../client
npm install
Add .env File Create a .env file in the server folder and add your environment variables:

env
Copy
Edit
MONGO_URI=your_mongodb_uri
BRAINTREE_MERCHANT_ID=your_merchant_id
BRAINTREE_PUBLIC_KEY=your_public_key
BRAINTREE_PRIVATE_KEY=your_private_key
JWT_SECRET=your_jwt_secret
Run the App

bash
Copy
Edit
# Run backend
cd ../server
npm start

# In a new terminal, run frontend
cd ../client
npm start
