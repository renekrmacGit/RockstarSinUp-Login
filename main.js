document.addEventListener('DOMContentLoaded', function() {

    // --- Pridobimo vse elemente iz HTML ---
    const finalErrorBox = document.getElementById('final-error-box'); 
    const prijavaTekstZunaj = document.querySelector('.prijava-tekst-zunaj'); 

    // Gumbi
    const gumbNaprejDatum = document.getElementById('gumb-naprej-datum');
    const gumbNazajPolicy = document.getElementById('gumb-nazaj-policy');
    const gumbNaprejPolicy = document.getElementById('gumb-naprej-policy');
    const gumbNazajRacunProfil = document.getElementById('gumb-nazaj-racun-profil');
    const gumbNaprejRacunProfil = document.getElementById('gumb-naprej-racun-profil');

    // Kartice (posamezni koraki)
    const karticaRojstvo = document.getElementById('kartica-rojstvo');
    const karticaPolicy = document.getElementById('kartica-policy');
    const karticaRacunProfil = document.getElementById('kartica-racun-profil'); 

    // Polja za datum
    const selectDan = document.getElementById('select-dan');
    const selectMesec = document.getElementById('select-mesec');
    const selectLeto = document.getElementById('select-leto');

    // Polja za račun (Kartica 3)
    const inputEmail = document.getElementById('email');
    const inputPassword = document.getElementById('password');
    const inputNickname = document.getElementById('nickname');
    
    // Sporočila o napakah
    const errorSporocilo = document.getElementById('error-sporocilo');
    const errorBoxStarost = document.getElementById('error-box-starost');
    const errorPolicy = document.getElementById('error-policy');
    const errorRacun = document.getElementById('error-racun');
    const policyCheckbox = document.getElementById('policy-accept'); 

    let napakaPrikazana = false; // Da vemo, če smo že pokazali napako za starost

    // Elementi za Kartico 4 (Verify)
    const karticaVerify = document.getElementById('kartica-verify');
    const gumbSubmitVerify = document.getElementById('gumb-submit-verify');
    const linkNazajVerify = document.getElementById('link-nazaj-verify');
    const verifyEmailSpan = document.getElementById('verify-email-span');
    const errorVerify = document.getElementById('error-verify');


    // --- KARTICA 1: Preverjanje datuma ---
    gumbNaprejDatum.addEventListener('click', function() {
        if (napakaPrikazana) return; // Ne delaj nič, če je napaka že aktivna
        const dan = selectDan.value;
        const mesec = selectMesec.value;
        const leto = selectLeto.value;

        if (!dan || !mesec || !leto) {
            errorSporocilo.textContent = 'Please select a valid date.';
            errorBoxStarost.style.display = 'none'; 
            return; 
        }

        // Hiter izračun starosti
        const danes = new Date();
        const rojstniDatum = new Date(leto, mesec - 1, dan); 
        let starost = danes.getFullYear() - rojstniDatum.getFullYear();
        const m = danes.getMonth() - rojstniDatum.getMonth();
        if (m < 0 || (m === 0 && danes.getDate() < rojstniDatum.getDate())) {
            starost--;
        }

        // Preveri, če je pod 18
        if (starost < 18) {
            napakaPrikazana = true; 
            errorBoxStarost.style.display = 'block'; 
            errorSporocilo.textContent = ''; 
            
            // Po 2 sekundah prikaži končni error box
            setTimeout(function() {
                errorBoxStarost.style.display = 'none'; 
                karticaRojstvo.style.display = 'none'; 
                prijavaTekstZunaj.style.display = 'none'; 
                finalErrorBox.style.display = 'block'; 
            }, 2000); 
            return; 
        }

        // Če je vse OK, gremo naprej
        errorSporocilo.textContent = ''; 
        errorBoxStarost.style.display = 'none'; 
        karticaRojstvo.style.display = 'none'; 
        prijavaTekstZunaj.style.display = 'none'; 
        karticaPolicy.style.display = 'flex'; 
    });

    // --- KARTICA 2: Gumb "Back" ---
    gumbNazajPolicy.addEventListener('click', function() {
        karticaPolicy.style.display = 'none'; 
        karticaRojstvo.style.display = 'flex'; 
        prijavaTekstZunaj.style.display = 'block'; 
        errorPolicy.textContent = '';
    });

    // --- KARTICA 2: Gumb "Next" ---
    gumbNaprejPolicy.addEventListener('click', function() {
        if (!policyCheckbox.checked) {
            errorPolicy.textContent = 'You must accept the policies to continue.';
            return; 
        }
        
        errorPolicy.textContent = ''; 
        karticaPolicy.style.display = 'none'; 
        karticaRacunProfil.style.display = 'flex'; 
        prijavaTekstZunaj.style.display = 'block'; 
    });

    // --- KARTICA 3: Gumb "Back" ---
    gumbNazajRacunProfil.addEventListener('click', function() {
        karticaRacunProfil.style.display = 'none'; 
        karticaPolicy.style.display = 'flex'; 
        prijavaTekstZunaj.style.display = 'none'; 
    });

    // --- KARTICA 3: Gumb "Next" (Ustvarjanje računa) ---
    gumbNaprejRacunProfil.addEventListener('click', function() {
        const email = inputEmail.value;
        const password = inputPassword.value;
        const nickname = inputNickname.value;

        // Preverimo, če je kaj prazno
        if (!email || !password || !nickname) {
            errorRacun.textContent = 'Please fill in all fields.';
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
             errorRacun.textContent = 'Please enter a valid email address.';
             return;
        }

        // Vse je OK, gremo na verifikacijo
        errorRacun.textContent = '';
        
        karticaRacunProfil.style.display = 'none'; 
        prijavaTekstZunaj.style.display = 'none'; 
        
        karticaVerify.style.display = 'flex'; 
        linkNazajVerify.style.display = 'block'; 
        
        // Vstavimo email v besedilo na kartici 4
        verifyEmailSpan.textContent = email; 
    });

    // --- KARTICA 4: Gumb "Submit" (Verifikacija) ---
    gumbSubmitVerify.addEventListener('click', function() {
        const koda = document.getElementById('verify-code').value;
        if (!koda) {
            errorVerify.textContent = 'Please enter the verification code.';
            return;
        }
        
        errorVerify.textContent = '';
        alert('Verification complete! (Placeholder)'); // Samo za test
    });

    // --- KARTICA 4: Link "Back to sign up" ---
    linkNazajVerify.addEventListener('click', function(e) {
        e.preventDefault(); // Ustavimo default obnašanje linka
        
        karticaVerify.style.display = 'none'; 
        linkNazajVerify.style.display = 'none'; 
        
        karticaRacunProfil.style.display = 'flex'; 
        prijavaTekstZunaj.style.display = 'block'; 
    });


    // Majhen trik za lebdeče labele
    // Doda class 'has-value', če je v polju že kaj napisano (npr. ob osvežitvi)
    document.querySelectorAll('.floating-input').forEach(input => {
        if (input.value) {
            input.classList.add('has-value');
        } else {
            input.classList.remove('has-value');
        }
        // Spremlja vnos in dodaja/odstranjuje class
        input.addEventListener('input', function() {
            if (input.value) {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    });


});
