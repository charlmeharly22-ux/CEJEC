(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupAdmissionForm();
  }

  function setupAdmissionForm() {
    const form = document.getElementById('admissionForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const msg = form.querySelector('.form-msg');
      const submitBtn = form.querySelector('button[type="submit"]');
      
      // Disable button and show loading
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours...';
      
      // Collect form data
      const formData = {
        prenom: form.querySelector('input[name="prenom"]').value,
        nom: form.querySelector('input[name="nom"]').value,
        email: form.querySelector('input[name="email"]').value,
        tel: form.querySelector('input[name="tel"]').value,
        filiere: form.querySelector('select[name="filiere"]').value,
        motivation: form.querySelector('textarea[name="motivation"]').value
      };

      try {
        // Send to backend - METE URL BACKEND OU LA
        const response = await fetch('https://votre-backend.com/api/admission', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
          msg.textContent = '✓ Demande envoyée avec succès! Notre équipe vous contactera sous 48h.';
          msg.style.color = '#22c55e'; // green
          form.reset();
        } else {
          msg.textContent = '❌ Erreur: ' + (result.message || 'Veuillez réessayer.');
          msg.style.color = '#ef4444'; // red
        }
      } catch (error) {
        msg.textContent = '❌ Erreur de connexion. Vérifiez votre internet et réessayez.';
        msg.style.color = '#ef4444'; // red
        console.error('Erreur:', error);
      } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envoyer ma demande';
      }
    });
  }
})();