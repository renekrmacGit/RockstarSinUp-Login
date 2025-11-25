Rockstar Games Authentication Clone
This is a frontend project that replicates the Sign In and Sign Up flows of the Rockstar Games Social Club. The project is built exclusively using vanilla HTML, CSS, and JavaScript, without any external frameworks or libraries.

📂 Project Overview
The application simulates the complete user journey, from age verification to the final login. The focus is on DOM manipulation, multi-step form validation, and specific CSS styling techniques (e.g., "floating labels").

🛠️ Implemented Features
1. Registration (index.html & register.js)
The registration process is divided into a multi-step "Wizard" logic, where JavaScript controls the transitions:

Step 1: Age Verification (Age Gate):

Logic validates the input birthdate against the current date.

The isUnderAge() function automatically blocks registration if the user is under 18 and displays a specific error message.

Step 2: Policy Acceptance:

Dynamically generates a modal window (createPolicyModal) displaying the Terms of Service.

Users must manually check the boxes to proceed.

Step 3: Account Creation:

Email Validation: Checks for correct format (must contain @ and .).

Password Validation: Checks for length and required content.

Step 4: Verification:

Simulates an email verification code input. Clicking "Submit" redirects the user to the login page.

2. Login (login.html & login.js)
The login page contains the following logic:

Floating Labels:

Custom CSS/JS logic (initFloatingLabels) moves the label above the input field when the user starts typing or when the field contains a value.

Password Visibility Toggle:

A "Show/Hide" button allows switching the input type between password and text.

Input Validation:

On clicking "Sign in", the script validates that fields are not empty and the email format is valid.

Error Handling: Invalid fields receive a red border (CSS class .error-border) and an error message is displayed below the field.

Success simulates a redirection to index.html.

3. User Interface (CSS)
Visual Identity: Uses the specific Rockstar Games color palette (Rockstar Gold #fcaf17, dark grey backgrounds).

Custom Checkboxes: Standard checkboxes are restyled using CSS pseudo-elements (::after and ::before).

Responsive Design: Uses Flexbox to center cards and adapt the layout for different screen sizes.

🚀 How to Run
Since this project does not use Node.js or build tools, running it is simple:

Download all files into the same folder (maintaining the js/ and styles/ structure).

Open the index.html file (for Registration) or login.html file (for Login) directly in your web browser.

⚠️ Limitations
No Backend: This project does not have a backend system. Data is not stored in a database; all logic runs in the browser.

Security: Validation is client-side only and serves to demonstrate UI/UX skills.

👤 Author
Rene Krmac
