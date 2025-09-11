function googleTranslateElementInit() {
    new google.translate.TranslateElement(
      {pageLanguage: 'en', includedLanguages: 'fr,de,es,zh,ar,sw'},
      'google_translate_element'
    );
  }