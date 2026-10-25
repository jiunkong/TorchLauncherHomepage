const languageButton = document.querySelector('.language');
const guide = document.querySelector('#guide-content');

function setLanguage(language, persist = true) {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-ko][data-en]').forEach((element) => {
    element.innerHTML = element.dataset[language];
  });
  if (languageButton) languageButton.textContent = language === 'ko' ? 'EN' : 'KO';
  if (persist) localStorage.setItem('torchlauncher-language', language);
  if (guide) loadGuide(language);
}

function renderMarkdown(markdown) {
  const escapeHtml = (text) => text.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
  const inline = (text) => escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  const blocks = markdown.trim().split(/\n\s*\n/);
  return blocks.map((block) => {
    const lines = block.split('\n');
    if (lines.every((line) => /^#{1,3} /.test(line))) {
      return lines.map((line) => {
        const level = line.match(/^#+/)[0].length;
        return `<h${level}>${inline(line.replace(/^#{1,3} /, ''))}</h${level}>`;
      }).join('');
    }
    if (lines.every((line) => /^- /.test(line))) return `<ul>${lines.map((line) => `<li>${inline(line.slice(2))}</li>`).join('')}</ul>`;
    if (lines.length === 1 && /^> /.test(lines[0])) return `<p>${inline(lines[0].slice(2))}</p>`;
    return `<p>${inline(lines.join(' '))}</p>`;
  }).join('\n');
}

async function loadGuide(language) {
  const path = guide.dataset[`${language}File`];
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error('Guide unavailable');
    guide.innerHTML = renderMarkdown(await response.text());
  } catch {
    guide.innerHTML = `<p class="guide-error">${language === 'ko' ? '가이드를 불러오지 못했습니다. 저장소의 guides 폴더에서 문서를 확인해 주세요.' : 'Could not load the guide. You can find the Markdown source in the guides folder.'}</p>`;
  }
}

const savedLanguage = localStorage.getItem('torchlauncher-language');
const browserLanguage = /^ko(?:-|$)/i.test(navigator.language || '') ? 'ko' : 'en';
const initialLanguage = savedLanguage === 'ko' || savedLanguage === 'en'
  ? savedLanguage
  : browserLanguage;
setLanguage(initialLanguage, false);
languageButton?.addEventListener('click', () => {
  setLanguage(document.documentElement.lang === 'ko' ? 'en' : 'ko');
});
