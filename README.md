**Rockstar Games Authentication Clone**
A high-fidelity frontend recreation of the Rockstar Games Social Club authentication flow. This project simulates the complete user journey from a custom landing page to account creation and final login, using local storage to simulate a backend database.

⚠️ Disclaimer: This is an educational portfolio project designed to demonstrate UI/UX and JavaScript logic skills. It is not the official Rockstar Games website.

**🚀 Key Features**
1. **Anti-Phishing Entry Page (intro.html)**
To ensure transparency and differentiate this project from the official site, the entry point is a distinct Disclaimer Page.

Users must acknowledge the project is for educational purposes before entering the demo.

2. **Smart Registration Wizard (register.js)**
A multi-step form with logic gating:

Age Verification: Validates the user's birthdate. Automatically blocks access if the user is under 18.

Policy Acceptance: Dynamic modal requiring the user to manually accept Terms & Privacy Policy.

Data Persistence: When a user registers, their Email, Password, Nickname, and Country are saved securely to the browser's Local Storage.

Verification Simulation:

Mock email verification step.

Enforces a strict 6-digit code format.

Upon success, displays a confirmation modal before redirecting to Login.

3. **Functional Login System (login.js)**
Credential Validation: The login form reads from Local Storage to check if the entered email and password match the registered user.

Real-time UI: Features "Floating Label" animations and a Show/Hide Password toggle.

Successful Auth: If credentials match, the user is redirected to the real RockstarGames.com website.

Error Handling: Displays specific error messages for incorrect passwords or non-existent accounts.

**🛠️ Technical Stack**
HTML5: Semantic structure with strict ID naming conventions.

CSS3: Custom styling variables, responsive Flexbox layout, and official-style assets (Gold/Black theme).

Vanilla JavaScript (ES6): No frameworks used. Handles DOM manipulation, form validation, and Local Storage management.

**⚡ How to Test the Demo**
Start: Open intro.html in your web browser.

Enter: Click the "Enter Demo Project" button.

Sign Up:

Enter a date of birth (must be 18+).

Accept policies.

Fill in details (e.g., Email: test@demo.com, Pass: password123).

Enter any 6-digit code in the verification box.

Login:

You will be redirected to login.html.

Enter the exact credentials you just created.

Success: You will be redirected to the real Rockstar website.

Fail: Try entering a wrong password to see the error handling.

**👤 Author**
Rene Krmac

This project is for educational purposes only and is not affiliated with Take-Two Interactive or Rockstar Games.
