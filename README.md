# 🚀 Automating Backend Tests with GitHub Actions  
Check it out on YouTube: **[Click here to watch](https://youtu.be/6nyQDTg8xPw)** 🎬  
This **pull request** introduces a **GitHub Actions workflow** to automate backend testing for the **book reservation application**. The workflow ensures all tests are executed automatically, improving **code quality and stability**.  

## ✨ What's New?  
✅ Added a **GitHub Actions workflow** (`.github/workflows/ci.yml`).  
✅ Runs on **every push and pull request to the `main` branch**.  
✅ **Tests also run on every deployment** to maintain stability.  
✅ Installs dependencies using `npm ci` and runs tests in **test mode**.  

## 🧪 **Test Coverage**  
The workflow runs automated tests for the following **API endpoints**:  

### **1️⃣ `POST /reservations`** 📝  
🔹 Tests **creating a new reservation**.  
🔹 Ensures a **`200` status code** response.  
🔹 Confirms the **reservation ID is included** in the response.  
🔹 Checks if an **admin notification is triggered**.  

### **2️⃣ `PUT /reservations/:id`** 🔄  
🔹 Tests **updating a reservation’s status** (e.g., `"approved"`).  
🔹 Verifies a **`200` status code**.  
🔹 Ensures the **status update is reflected** in the response.  
🔹 Checks if a **user notification is sent**.  

### **3️⃣ `GET /`** 🌐  
🔹 Tests the **root route**.  
🔹 Confirms the **server is running**.  
🔹 Ensures it returns a **`200` status code**.  

## ⚙️ **Workflow Details**  
🔧 Runs on **`ubuntu-latest`**.  
📦 Installs dependencies and **clears npm cache** before running tests.  
❌ If tests **fail**, the workflow exits with an **error code**.  
🚀 **Tests also run on every deployment** to maintain a **stable** application.  

## 📌 **Confirmation**  
✅ Please check the **GitHub Actions logs** or **attached screenshot** to verify that the workflow is running successfully.  

![GitHub Actions Workflow](https://github.com/abdullah75f/book-reservation-backend-training/raw/main//image.png)
![GitHub Actions Workflow](https://github.com/abdullah75f/book-reservation-backend-training/raw/main//image1.png)
![GitHub Actions Workflow](https://github.com/abdullah75f/book-reservation-backend-training/raw/main//image2.png)



