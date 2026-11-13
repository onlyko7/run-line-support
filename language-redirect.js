(() => {
  // 지원하는 언어 코드와 페이지 경로를 한곳에서 관리한다.
  const supportedLanguages = ["ko", "en", "ja"];
  const scriptUrl = document.currentScript?.src;
  const siteBase = new URL("./", scriptUrl);
  const query = new URLSearchParams(window.location.search);
  const requestedLanguage = query.get("lang")?.toLowerCase();
  const browserLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language || ""];
  const browserPreference = browserLanguages
    .map((language) => language.toLowerCase().split(/[-_]/)[0])
    .find((language) => supportedLanguages.includes(language));

  // URL에 언어 선택값이 있으면 사용하고, 아니면 브라우저 선호 언어를 사용하며, 둘 다 지원하지 않으면 영어를 선택한다.
  const selectedLanguage = supportedLanguages.includes(requestedLanguage)
    ? requestedLanguage
    : browserPreference || "en";

  // 한국어 페이지는 루트에 있으므로, 선택 결과가 영어 또는 일본어일 때 대응 페이지로 이동한다.
  if (selectedLanguage !== "ko") {
    const isPrivacyPage = window.location.pathname.endsWith("/privacy.html");
    const destination = new URL(
      `${selectedLanguage}/${isPrivacyPage ? "privacy.html" : ""}`,
      siteBase,
    );
    window.location.replace(destination.href);
  }
})();
