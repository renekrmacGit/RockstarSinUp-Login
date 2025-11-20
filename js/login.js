document.addEventListener('DOMContentLoaded', function() {

    // --- 1. UI (Tvoje obstoječe, da se nič ne pokvari) ---
    const inputs = document.querySelectorAll('.floating-input');
    inputs.forEach(input => {
        const update = () => {
            if (input.value && input.value.trim() !== '') input.classList.add('has-value');
            else input.classList.remove('has-value');
        };
        update();
        input.addEventListener('input', update);
        input.addEventListener('blur', update);
    });

    const toggleBtn = document.getElementById('toggle-password');
    const passInput = document.getElementById('login-password');
    if (toggleBtn && passInput) {
        toggleBtn.addEventListener('click', () => {
            const isPass = passInput.type === 'password';
            passInput.type = isPass ? 'text' : 'password';
            toggleBtn.textContent = isPass ? 'Hide' : 'Show';
        });
    }

    // --- 2. LOGIKA ZA NAPAKE (Rdeči napisi pod polji) ---
    const loginBtn = document.querySelector('.login-gumb');
    
    // Inputi
    const emailIn = document.getElementById('login-email');
    const passIn = document.getElementById('login-password');
    
    // Okvirji (za rdeč rob)
    const groupEmail = document.getElementById('group-email');
    const groupPass = document.getElementById('group-password');

    // Tekstovni prostor za napake (ki smo ga dodali v HTML)
    const errorTxtEmail = document.getElementById('error-email');
    const errorTxtPass = document.getElementById('error-password');

    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // 1. Počisti prejšnje napake (reset)
            resetErrors();

            let hasError = false;

            // 2. Preveri EMAIL
            if (!emailIn.value || !emailIn.value.includes('@')) {
                showError(groupEmail, errorTxtEmail, "Email address is invalid. Please enter a valid email into the email field.");
                hasError = true;
            }

            // 3. Preveri PASSWORD
            if (!passIn.value) {
                showError(groupPass, errorTxtPass, "Password is required. Please enter your password into the password field.");
                hasError = true;
            }

            // 4. Če ni napak, pojdi naprej
            if (!hasError) {
                window.location.href = 'index.html';
            }
        });
    }

    // Pomožna funkcija za prikaz rdeče napake
    function showError(groupElement, textElement, message) {
        // Obarvaj rob rdeče
        if(groupElement) groupElement.classList.add('error-border');
        // Pokaži tekst
        if(textElement) {
            textElement.textContent = message;
            textElement.style.display = 'block';
        }
    }

    // Pomožna funkcija za resetiranje
    function resetErrors() {
        // Odstrani rdeče robove
        if(groupEmail) groupEmail.classList.remove('error-border');
        if(groupPass) groupPass.classList.remove('error-border');
        
        // Skrij tekste
        if(errorTxtEmail) errorTxtEmail.style.display = 'none';
        if(errorTxtPass) errorTxtPass.style.display = 'none';
    }
});