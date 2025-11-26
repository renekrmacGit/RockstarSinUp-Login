document.addEventListener('DOMContentLoaded', function() {

    // --- 1. UI: Floating Labels & Password Toggle (Ohranimo, da izgled ostane enak) ---
    const inputs = document.querySelectorAll('.floating-input');
    
    // Funkcija za preverjanje, ali je polje prazno (za premik labele)
    const updateInputState = (input) => {
        if (input.value && input.value.trim() !== '') {
            input.classList.add('has-value');
        } else {
            input.classList.remove('has-value');
        }
    };

    inputs.forEach(input => {
        updateInputState(input); // Preveri takoj ob nalaganju
        input.addEventListener('input', () => updateInputState(input));
        input.addEventListener('blur', () => updateInputState(input));
    });

    // Gumb za prikaz/skrivanje gesla
    const toggleBtn = document.getElementById('toggle-password');
    const passInput = document.getElementById('login-password');
    
    if (toggleBtn && passInput) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Da ne osveži strani po pomoti
            const isPass = passInput.type === 'password';
            passInput.type = isPass ? 'text' : 'password';
            toggleBtn.textContent = isPass ? 'Hide' : 'Show';
        });
    }

    // --- 2. LOGIKA PRIJAVE (Glavna sprememba) ---
    const loginBtn = document.querySelector('.login-gumb');
    const emailIn = document.getElementById('login-email');
    const passIn = document.getElementById('login-password');
    
    // Polja za izpis napak
    const errorTxtEmail = document.getElementById('error-email');
    const errorTxtPass = document.getElementById('error-password');
    const genericErrorBox = document.getElementById('login-error-box'); // Zgornji box za napake

    // Pomožna funkcija: Najde okvir (div) okoli inputa za rdeč rob
    function getGroup(inputElement) {
        return inputElement.closest('.floating-group');
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prepreči osveževanje strani

            // A. Počisti stare napake
            resetErrors();
            
            let hasError = false;
            const emailVal = emailIn.value.trim();
            const passVal = passIn.value;

            // B. Validacija praznih polj (UI)
            if (!emailVal || !emailVal.includes('@')) {
                showFieldError(getGroup(emailIn), errorTxtEmail, "Email address is invalid.");
                hasError = true;
            }

            if (!passVal) {
                showFieldError(getGroup(passIn), errorTxtPass, "Password is required.");
                hasError = true;
            }

            // Če manjka e-mail ali geslo, ustavi tukaj
            if (hasError) return; 

            // C. PREVERJANJE UPORABNIKA (localStorage)
            // Poskusimo dobiti shranjenega uporabnika
            const shranjenUserJSON = localStorage.getItem('rockstarUser');
            
            if (!shranjenUserJSON) {
                // Če v localStorage ni ničesar (uporabnik se še ni registriral)
                showGenericError("Account not found. Please create a new account.");
                return;
            }

            // Pretvorimo tekst nazaj v objekt
            const shranjenUser = JSON.parse(shranjenUserJSON);

            // D. PRIMERJAVA VNOSA S SHRANJENIMI PODATKI
            if (emailVal === shranjenUser.email && passVal === shranjenUser.password) {
                // --- USPEH! ---
                console.log("Prijava uspešna!");
                // Preusmeritev na pravo stran
                window.location.href = 'https://www.rockstargames.com/';
            } else {
                // --- NAPAKA (Geslo ali email se ne ujemata) ---
                showGenericError("The email or password you entered is incorrect.");
            }
        });
    }

    // --- POMOŽNE FUNKCIJE ---

    // Prikaz napake pod specifičnim poljem
    function showFieldError(groupElement, textElement, message) {
        if (groupElement) groupElement.classList.add('error-border');
        if (textElement) {
            textElement.textContent = message;
            textElement.style.display = 'block';
        }
    }

    // Prikaz splošne napake na vrhu kartice
    function showGenericError(msg) {
        if (genericErrorBox) {
            genericErrorBox.textContent = msg;
            genericErrorBox.style.display = 'block';
            
            // Stil za napako (če ni v CSS)
            genericErrorBox.style.color = '#d8000c'; 
            genericErrorBox.style.backgroundColor = '#ffbaba';
            genericErrorBox.style.border = '1px solid #d8000c';
            genericErrorBox.style.padding = '10px';
            genericErrorBox.style.marginBottom = '20px';
            genericErrorBox.style.fontSize = '14px';
            genericErrorBox.style.borderRadius = '3px';
        } else {
            // Varnostna mreža, če elementa ni v HTML
            alert(msg);
        }
    }

    // Funkcija za resetiranje vseh napak
    function resetErrors() {
        // Odstrani rdeče okvirje z vseh inputov
        const groups = document.querySelectorAll('.floating-group');
        groups.forEach(g => g.classList.remove('error-border'));

        // Skrij besedila napak pod polji
        if (errorTxtEmail) errorTxtEmail.style.display = 'none';
        if (errorTxtPass) errorTxtPass.style.display = 'none';

        // Skrij zgornji error box
        if (genericErrorBox) genericErrorBox.style.display = 'none';
    }

});