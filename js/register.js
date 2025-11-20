document.addEventListener('DOMContentLoaded', function() {

    /* --- FUNKCIJE (Validacija & UI) --- */
    
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

    // --- GUMB 1: DATUM -> POLICY ---
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

    // --- GUMB 3: RAČUN ---
    const gumbNazajRacun = document.getElementById('gumb-nazaj-racun-profil');
    if (gumbNazajRacun) {
        gumbNazajRacun.addEventListener('click', () => {
            karticaRacun.style.display = 'none';
            karticaPolicy.style.display = 'flex';
            prijavaTekstZunaj.style.display = 'none';
        });
    }

    const gumbNaprejRacun = document.getElementById('gumb-naprej-racun-profil');
    if (gumbNaprejRacun) {
        gumbNaprejRacun.addEventListener('click', () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const nickname = document.getElementById('nickname').value;

            if (!email || !password || !nickname) {
                errorRacun.textContent = 'Please fill in all fields.';
                return;
            }
            if (!isValidEmail(email)) {
                 errorRacun.textContent = 'Please enter a valid email address.';
                 return;
            }

            // Uspeh
            errorRacun.textContent = '';
            karticaRacun.style.display = 'none';
            prijavaTekstZunaj.style.display = 'none';
            karticaVerify.style.display = 'flex';
            
            const linkNazajVerify = document.getElementById('link-nazaj-verify');
            if(linkNazajVerify) linkNazajVerify.style.display = 'block';
            
            const verifySpan = document.getElementById('verify-email-span');
            if(verifySpan) verifySpan.textContent = email;
        });
    }

    // --- GUMB 4: VERIFY ---
    const gumbVerify = document.getElementById('gumb-submit-verify');
    if (gumbVerify) {
        gumbVerify.addEventListener('click', () => {
            const koda = document.getElementById('verify-code').value;
            if (!koda) {
                errorVerify.textContent = 'Please enter the verification code.';
                return;
            }
            window.location.href = 'login.html';
        });
    }
    
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