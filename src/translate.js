export default function googleTranslateElementInit() {
  const userLang = navigator.language || navigator.userLanguage || 'en';

  if (window.google && window.google.translate) {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,es,fr,de,zh-CN,ja,ru,ar,pt,it',
        autoDisplay: true,
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      'google_translate_element'
    );

    if (userLang !== 'en') {
      const selectLanguage = () => {
        const iframe = document.querySelector('iframe.goog-te-menu-frame');
        if (!iframe) {
          setTimeout(selectLanguage, 500);
          return;
        }
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        const langAnchor = [...innerDoc.querySelectorAll('a')].find(a =>
          a.textContent.toLowerCase().includes(userLang.split('-')[0])
        );
        if (langAnchor) langAnchor.click();
      };

      selectLanguage();
    }
  }
}
