# ⭐ Rockstar Games Authentication Clone




## 🎯 Project Overview
This is a **high-fidelity frontend recreation** of the Rockstar Games Social Club authentication flow.  
This educational portfolio project simulates the complete user journey—from a custom landing page to account creation and final login—using **Local Storage** to mimic a persistent backend database.

> ⚠️ **Disclaimer:**  
> This project is for **educational purposes only** and demonstrates UI/UX and JavaScript logic skills.  
> It is **not** the official Rockstar Games website and is **not affiliated** with Take-Two Interactive or Rockstar Games.

---

## 🚀 Key Features

### 🔐 Anti-Phishing Entry Page (`intro.html`)
- **Transparency First:** A dedicated Disclaimer Page clearly differentiates this project from the official Rockstar site.  
- Users must manually acknowledge the educational nature of the project before entering the demo.

---

### 🧩 Smart Registration Wizard (`register.js`)
A multi-step registration system with complex validation logic:

- **Age Verification:**  
  Validates the user's birthdate and blocks access for users under 18.

- **Policy Acceptance:**  
  Includes a dynamic modal that requires accepting the Terms & Privacy Policy before proceeding.

- **Data Persistence:**  
  Saves Email, Password, Nickname, and Country securely to **Local Storage**.

- **Verification Simulation:**  
  - Mocks an email verification step.  
  - Enforces a strict **6-digit code** format.  
  - Displays a confirmation modal before redirecting to the Login page.

---

### 🔑 Functional Login System (`login.js`)
- **Credential Validation:** Compares the input data with stored Local Storage credentials.  
- **Real-time UI:** Floating Label animations and a Show/Hide Password toggle.  
- **Successful Authentication:** Redirects to the *real* RockstarGames.com website.  
- **Error Handling:** Context-sensitive feedback for wrong passwords or non-existent accounts.

---

## 🛠️ Technical Stack

| Technology | Description |
|-----------|-------------|
| **HTML5** | Semantic structure with strict ID naming for clean DOM manipulation. |
| **CSS3** | Custom variables, responsive Flexbox layout, gold/black Rockstar-style theme. |
| **Vanilla JavaScript (ES6)** | Handles DOM manipulation, validation logic, and Local Storage operations — no frameworks used. |

---

## ⚡ How to Test the Demo

1. **Start:**  
   Open the `intro.html` file in your browser.

2. **Enter Demo:**  
   Click **“Enter Demo Project”** after reading the disclaimer.

3. **Sign Up (register.html):**
   - Enter a valid date of birth (**must be 18+**).  
   - Accept policies via the modal.  
   - Fill in your details (example: `test@demo.com`, `password123`).  
   - Enter **any 6-digit verification code**.  

4. **Login (login.html):**
   - You will be redirected automatically.  
   - Enter the exact credentials you registered with.  

5. **Test Outcomes:**  
   - **Success:** Redirects you to the real Rockstar website.  
   - **Fail:** Enter a wrong password to see specific error messages.

---

## 👤 Author
**Rene Krmac**
