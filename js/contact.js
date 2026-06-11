(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
    setupContactForm();
  }

  function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = form.querySelector('button[type=submit]');
      const original = btn.textContent;
      
      btn.textContent = 'Envoi…';
      btn.disabled = true;

      const recaptchaResponse = grecaptcha.getResponse();
      
      if (!recaptchaResponse) {
        alert('Veuillez compléter le reCAPTCHA.');
        btn.textContent = original;
        btn.disabled = false;
        return;
      }

      const templateParams = {
        from_name: form.querySelector('[name="nom"]').value,
        reply_to: form.querySelector('[name="email"]').value,
        subject: form.querySelector('[name="sujet"]').value,
        message: form.querySelector('[name="message"]').value,
        'g-recaptcha-response': recaptchaResponse
      };

      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(() => {
          // Sukse - bouton vèt ✅
          btn.textContent = '✓ Message envoyé';
          btn.style.background = '#36af56';
          btn.style.color = '#ffffff';
          form.reset();
          grecaptcha.reset();
          
          setTimeout(() => {
            btn.textContent = original;
            btn.disabled = false;
            btn.style.background = '';
            btn.style.color = '';
          }, 3000);
        })
        .catch((error) => {
          // Erè - bouton wouj ❌
          console.error('EmailJS error:', error);
          btn.textContent = '✗ Erreur, réessayez';
          btn.style.background = '#e74c3c';
          btn.style.color = '#ffffff';
          
          setTimeout(() => {
            btn.textContent = original;
            btn.disabled = false;
            btn.style.background = '';
            btn.style.color = '';
          }, 3000);
        });
    });
  }
})();