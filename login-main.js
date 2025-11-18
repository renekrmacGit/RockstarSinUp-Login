document.addEventListener('DOMContentLoaded', function() {
    
    // --- LOGIKA ZA LEBDEČE LABELE (Vzeta iz main.js in izboljšana) ---
    // Ta del doda class 'has-value', ko je v polju tekst, in tako
    // labela ostane zgoraj tudi, ko nisi več v 'focus'.
    
    document.querySelectorAll('.floating-input').forEach(input => {
        
        // Funkcija, ki preveri stanje inputa
        const updateLabelState = () => {
            if (input.value) {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        };

        updateLabelState(); // Preveri ob nalaganju strani (če je browser kaj shranil)
        input.addEventListener('input', updateLabelState); // Preveri ob tipkanju
        input.addEventListener('blur', updateLabelState); // Preveri, ko klikneš ven (to reši tvoj problem)
    });

    // --- LOGIKA ZA SHOW/HIDE GUMB (specifična za login.html) ---
    // ID-ji so vzeti iz tvojega 'login.html'
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('login-password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            // Preveri, ali je tip 'password'
            const isPassword = passwordInput.getAttribute('type') === 'password';
            
            if (isPassword) {
                passwordInput.setAttribute('type', 'text');
                this.textContent = 'Hide'; // Spremeni tekst gumba
            } else {
                passwordInput.setAttribute('type', 'password');
                this.textContent = 'Show'; // Spremeni tekst gumba nazaj
            }
        });
    }
});