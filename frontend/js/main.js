document.addEventListener('DOMContentLoaded', function () {
  var languageSwitcherLinks = document.querySelectorAll('.language-switcher a');

  languageSwitcherLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      var language = event.target.textContent === 'English' ? 'en' : 'ar';
      switchLanguage(language);
    });
  });
});

function switchLanguage(language) {
  fetch(`locales/${language}.json`)
    .then(function (response) {
      return response.json();
    })
    .then(function (translations) {
      updateTranslations(translations);
    });
}

function updateTranslations(translations) {
  document.querySelector('#features h3').textContent = translations.features;
  document.querySelector('#testimonials h3').textContent = translations.testimonials;
  document.querySelector('#faq h3').textContent = translations.faq;
  document.querySelector('#contact h3').textContent = translations.contact;
}


