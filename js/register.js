document.addEventListener('DOMContentLoaded', function() {

    /* --- FUNKCIJE (Validacija, Timer & UI) --- */

    function initFloatingLabels() {
        const inputs = document.querySelectorAll('.floating-input');
        inputs.forEach(input => {
            // Preveri takoj
            if (input.value) input.classList.add('has-value');
            // Preveri ob spremembah
            input.addEventListener('input', function() {
                if (this.value) this.classList.add('has-value');
                else this.classList.remove('has-value');
            });
            input.addEventListener('blur', function() {
                if (this.value) this.classList.add('has-value');
                else this.classList.remove('has-value');
            });
        });
    }

    function isUnderAge(day, month, year) {
        const danes = new Date();
        const rojstniDatum = new Date(year, month - 1, day);
        let starost = danes.getFullYear() - rojstniDatum.getFullYear();
        const m = danes.getMonth() - rojstniDatum.getMonth();
        if (m < 0 || (m === 0 && danes.getDate() < rojstniDatum.getDate())) {
            starost--;
        }
        return starost < 18;
    }

    function isValidEmail(email) {
        return email.includes('@') && email.includes('.');
    }

    // --- FUNKCIJA ZA TIMER (Časovnik) ---
    function startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        let diff = timer - 1; 
        let interval = setInterval(function () {
            minutes = parseInt(diff / 60, 10);
            seconds = parseInt(diff % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--diff < 0) {
                clearInterval(interval);
                display.textContent = "00:00";
                // Tukaj lahko dodaš logiko, da se gumb za ponoven pošiljanje kode prikaže
                const gumbResend = document.getElementById('resend-code-button');
                if(gumbResend) gumbResend.style.display = 'block';
            }
        }, 1000);
    }
    // ------------------------------------

    /* --- ZAGON --- */
    initFloatingLabels();

    /* --- LOGIKA ZA REGISTRACIJO --- */

    // Elementi
    const prijavaTekstZunaj = document.querySelector('.prijava-tekst-zunaj');
    const finalErrorBox = document.getElementById('final-error-box');

    // Error boxi
    const errorSporocilo = document.getElementById('error-sporocilo');
    const errorBoxStarost = document.getElementById('error-box-starost');
    const errorPolicy = document.getElementById('error-policy');
    const errorRacun = document.getElementById('error-racun');
    const errorVerify = document.getElementById('error-verify');

    // Kartice
    const karticaRojstvo = document.getElementById('kartica-rojstvo');
    const karticaPolicy = document.getElementById('kartica-policy');
    const karticaRacun = document.getElementById('kartica-racun-profil');
    const karticaVerify = document.getElementById('kartica-verify');
    const karticaUspeh = document.getElementById('kartica-uspeh'); // NOVO: Kartica za uspeh

    // --- LOGIKA: Filtriranje vnosa za verify-code (Samo številke) ---
    const verifyCodeInput = document.getElementById('verify-code');
    if (verifyCodeInput) {
        verifyCodeInput.addEventListener('input', function(e) {
            // Zamenja vsak znak, ki ni številka (0-9), s praznim nizom
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }
    // --------------------------------------------------------

    // --- GUMB 1: DATUM -> POLICY --- (Zdaj deluje, ker so funkcije in elementi pravilno definirani zgoraj)
    const gumbDatum = document.getElementById('gumb-naprej-datum');
    if (gumbDatum) {
        gumbDatum.addEventListener('click', function() {
            const d = document.getElementById('select-dan').value;
            const m = document.getElementById('select-mesec').value;
            const y = document.getElementById('select-leto').value;

            if (!d || !m || !y) {
                errorSporocilo.textContent = 'Please select a valid date.';
                errorBoxStarost.style.display = 'none';
                return;
            }

            if (isUnderAge(d, m, y)) {
                errorBoxStarost.style.display = 'block';
                errorSporocilo.textContent = '';
                setTimeout(() => {
                    errorBoxStarost.style.display = 'none';
                    karticaRojstvo.style.display = 'none';
                    prijavaTekstZunaj.style.display = 'none';
                    finalErrorBox.style.display = 'block';
                }, 2000);
                return;
            }

            // Uspeh
            errorBoxStarost.style.display = 'none';
            karticaRojstvo.style.display = 'none';
            prijavaTekstZunaj.style.display = 'none';
            karticaPolicy.style.display = 'flex';
        });
    }

    // --- GUMB 2: POLICY ---
    const gumbNazajPolicy = document.getElementById('gumb-nazaj-policy');
    if (gumbNazajPolicy) {
        gumbNazajPolicy.addEventListener('click', () => {
            karticaPolicy.style.display = 'none';
            karticaRojstvo.style.display = 'flex';
            prijavaTekstZunaj.style.display = 'block';
        });
    }

    const gumbNaprejPolicy = document.getElementById('gumb-naprej-policy');
    if (gumbNaprejPolicy) {
        gumbNaprejPolicy.addEventListener('click', () => {
            const checkbox = document.getElementById('policy-accept');
            if (!checkbox.checked) {
                errorPolicy.textContent = 'You must accept the policies to continue.';
                return;
            }
            errorPolicy.textContent = '';
            karticaPolicy.style.display = 'none';
            karticaRacun.style.display = 'flex';
            prijavaTekstZunaj.style.display = 'block';
        });
    }

    // --- GUMB 3: ACCOUNT CREATION (Shranimo uporabnika) ---
    const gumbNext3 = document.getElementById('gumb-naprej-racun-profil');

    if (gumbNext3) {
        gumbNext3.addEventListener('click', () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const nickname = document.getElementById('nickname').value;

            // 1. Validacija
            if (!isValidEmail(email)) {
                errorRacun.textContent = 'Please enter a valid email address.';
                return;
            }
            if (password.length < 8) {
                errorRacun.textContent = 'Password must be at least 8 characters.';
                return;
            }
            if (!nickname) {
                errorRacun.textContent = 'Please enter a nickname.';
                return;
            }

            // --- SHRANI UPORABNIKA V LOCALSTORAGE ---
            const uporabnik = {
                email: email,
                password: password,
                nickname: nickname
            };

            localStorage.setItem('rockstarUser', JSON.stringify(uporabnik));
            console.log("Uporabnik uspešno shranjen:", uporabnik);
            // ----------------------------------------

            // Nadaljuj na verifikacijo
            errorRacun.textContent = '';
            karticaRacun.style.display = 'none';
            prijavaTekstZunaj.style.display = 'none';
            karticaVerify.style.display = 'flex';

            const linkNazajVerify = document.getElementById('link-nazaj-verify');
            if(linkNazajVerify) linkNazajVerify.style.display = 'block';

            const verifySpan = document.getElementById('verify-email-span');
            if(verifySpan) verifySpan.textContent = email;

            // --- ZAGON ČASOVNIKA: 15 minut ---
            const display = document.querySelector('#cas');
            if(display) startTimer(15 * 60, display); 
            // --------------------------------
        });
    }

    // GUMB NAZAJ iz kartice Racun
    const gumbNazajRacun = document.getElementById('gumb-nazaj-racun-profil');
    if (gumbNazajRacun) {
        gumbNazajRacun.addEventListener('click', () => {
            karticaRacun.style.display = 'none';
            karticaPolicy.style.display = 'flex';
        });
    }

    // --- GUMB 4: VERIFY -> SUCCESS (Potrditev s kodo) ---
    const gumbVerify = document.getElementById('gumb-submit-verify');
    if (gumbVerify) {
        gumbVerify.addEventListener('click', () => {
            const koda = document.getElementById('verify-code').value;

            // 1. Preveri, ali je polje prazno
            if (!koda) {
                errorVerify.textContent = 'Please enter the verification code.';
                return;
            }

            // 2. Preveri, če je koda dolga natanko 6 številk
            if (koda.length !== 6) {
                errorVerify.textContent = 'Verification code must be 6 digits.';
                return;
            }

            // 3. USPEH! Skrij prejšnjo kartico in prikaži sporočilo o uspehu
            errorVerify.textContent = '';
            karticaVerify.style.display = 'none'; 
            
            // POZOR: Prikaz kartice za uspeh
            if (karticaUspeh) {
                karticaUspeh.style.display = 'flex'; 
            }

            // 4. Preusmeritev po 5 sekundah
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 5000); 
        });
    }

    // GUMB NAZAJ iz kartice Verify
    const linkNazajVerify = document.getElementById('link-nazaj-verify');
    if (linkNazajVerify) {
        linkNazajVerify.addEventListener('click', (e) => {
            e.preventDefault();
            karticaVerify.style.display = 'none';
            linkNazajVerify.style.display = 'none';
            karticaRacun.style.display = 'flex';
            prijavaTekstZunaj.style.display = 'block';
        });
    }
});