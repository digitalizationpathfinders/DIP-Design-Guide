const guidePages = [
  { title: 'Components', url: 'components.html', summary: 'Browse reusable UI building blocks.' },
  { title: 'Patterns', url: 'patterns.html', summary: 'Discover common form workflows and guidance.' },
  { title: 'Text & translations', url: 'Text & translations.html', summary: 'Writing conventions, CRA guidance, and translation resources.' },
  { title: 'UX Testing', url: 'ux-testing.html', summary: 'Guidance for recruiting participants and running test cycles.' },
  { title: 'Button', url: 'components/button.html', summary: 'Primary and secondary action button guidance.' },
  { title: 'Form field', url: 'components/form-field.html', summary: 'Labels, input layout, and validation messaging.' },
  { title: 'Summary card', url: 'components/summary-card.html', summary: 'Review and confirmation cards for forms.' },
  { title: 'Writing conventions', url: 'text-translations/writing-conventions.html', summary: 'Plain language and writing guidance for form content.' },
  { title: 'CRA writing guidance', url: 'text-translations/cra-writing-guide.html', summary: 'Links and notes for CRA and Canada.ca content rules.' },
  { title: 'Wizard flow', url: 'patterns/wizard.html', summary: 'Multi-step form guidance with progress and navigation.' },
  { title: 'Tabbed navigation', url: 'patterns/tabbed-navigation.html', summary: 'Organize form sections using tabs.' },
  { title: 'Error handling', url: 'patterns/error-handling.html', summary: 'Consistent messaging and focus behavior for errors.' }
];

const contextKey = 'designGuideContext';
const defaultContext = 'outside';

function getRootPrefix() {
  if (location.pathname.includes('/components/') || location.pathname.includes('/patterns/')) {
    return '../';
  }
  return '';
}

function updateContext(context) {
  const body = document.body;
  body.classList.remove('portal-inside', 'portal-outside');
  body.classList.add(context === 'inside' ? 'portal-inside' : 'portal-outside');
  localStorage.setItem(contextKey, context);

  const note = document.querySelector('.context-note');
  if (note) {
    note.textContent = context === 'inside'
      ? 'You are viewing guidance for work inside portals. Follow portal styles and UX expectations.'
      : 'You are viewing guidance for work outside portals on Canada.ca. Use Canada.ca page-level conventions and form styles.';
  }

  document.querySelectorAll('.context-button').forEach(button => {
    const isActive = button.dataset.context === context;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

function initContext() {
  const chosenContext = localStorage.getItem(contextKey) || defaultContext;
  updateContext(chosenContext);
  document.querySelectorAll('.context-button').forEach(button => {
    button.addEventListener('click', () => updateContext(button.dataset.context));
  });
}

function renderSearchResults(query) {
  const resultsRoot = document.getElementById('search-results');
  if (!resultsRoot) return;

  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    resultsRoot.innerHTML = '';
    return;
  }

  const results = guidePages.filter(page => {
    return page.title.toLowerCase().includes(normalizedQuery)
      || page.summary.toLowerCase().includes(normalizedQuery);
  });

  if (!results.length) {
    resultsRoot.innerHTML = `<p class="search-note">No results found for "${query}". Try another keyword.</p>`;
    return;
  }

  const prefix = getRootPrefix();
  resultsRoot.innerHTML = results.map(page => {
    return `<a class="search-card" href="${prefix + page.url}"><h3>${page.title}</h3><p>${page.summary}</p></a>`;
  }).join('');
}

function initSearch() {
  const input = document.getElementById('site-search');
  if (!input) return;

  input.addEventListener('input', () => renderSearchResults(input.value));
  renderSearchResults('');
}

window.addEventListener('DOMContentLoaded', () => {
  initContext();
  initSearch();
});
