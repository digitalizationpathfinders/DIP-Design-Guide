const guidePages = [
  { title: 'Components', url: 'components.html', summary: 'Browse reusable UI building blocks.' },
  { title: 'Patterns', url: 'patterns.html', summary: 'Discover common form workflows and guidance.' },
  { title: 'Text & translations', url: 'text-translations.html', summary: 'Writing conventions, CRA guidance, and translation resources.' },
  { title: 'UX Testing', url: 'ux-testing.html', summary: 'Guidance for recruiting participants and running test cycles.' },
  { title: 'Alerts', url: 'components/alerts.html', summary: 'Status and alert messaging for form feedback.' },
  { title: 'Button', url: 'components/button.html', summary: 'Primary and secondary action button guidance.' },
  { title: 'Checkboxes', url: 'components/checkboxes.html', summary: 'Multi-select checkbox patterns and spacing.' },
  { title: 'Expand/collapse', url: 'components/expand-collapse.html', summary: 'Collapsible sections for optional or grouped content.' },
  { title: 'Input fields', url: 'components/input-fields.html', summary: 'Labels, help text, and validation messaging.' },
  { title: 'Radios', url: 'components/radios.html', summary: 'Single-select radio button patterns.' },
  { title: 'Select', url: 'components/select.html', summary: 'Dropdown select lists and multi-select guidance.' },
  { title: 'Stepper', url: 'components/stepper.html', summary: 'Multi-step form progress indicators.' },
  { title: 'Textarea', url: 'components/textarea.html', summary: 'Multi-line text input with optional character limits.' },
  { title: 'Addresses', url: 'patterns/addresses.html', summary: 'Collecting address information with proper field breakdown.' },
  { title: 'Dates', url: 'patterns/dates.html', summary: 'Accepting date input with formatting guidance.' },
  { title: 'Names', url: 'patterns/names.html', summary: 'Collecting name information inclusively.' },
  { title: 'Phone numbers', url: 'patterns/phone-numbers.html', summary: 'Phone number formats and validation.' },
  { title: 'Social insurance numbers', url: 'patterns/social-insurance-numbers.html', summary: 'Secure SIN collection with masking and guidance.' },
  { title: 'Check service is suitable', url: 'patterns/check-service-suitable.html', summary: 'Help users determine if a service meets their needs.' },
  { title: 'Review answers', url: 'patterns/review-answers.html', summary: 'Summary pages for reviewing and editing form data.' },
  { title: 'Start using a service', url: 'patterns/start-using-service.html', summary: 'Guidance for onboarding and getting started flows.' },
  { title: 'Recover from validation errors', url: 'patterns/recover-validation-errors.html', summary: 'Error messaging, focus management, and recovery paths.' },
  { title: 'Confirmation pages', url: 'patterns/confirmation-pages.html', summary: 'Success confirmation with next steps and reference numbers.' },
  { title: 'Service unavailable pages', url: 'patterns/service-unavailable-pages.html', summary: 'Maintenance, outage, and error page guidance.' },
  { title: 'Writing conventions', url: 'text-translations/writing-conventions.html', summary: 'Plain language and writing guidance for form content.' },
  { title: 'CRA writing guidance', url: 'text-translations/cra-writing-guide.html', summary: 'Links and notes for CRA and Canada.ca content rules.' }
];

// Topnav lists for shared navigation
const topNavList = [
  { title: 'Components', url: 'components.html' },
  { title: 'Patterns', url: 'patterns.html' },
  { title: 'Text & translations', url: 'text-translations.html' },
  { title: 'UX Testing', url: 'ux-testing.html' }
];

// Sidebar lists for shared navigation
const componentsList = [
  { title: 'Alerts', url: 'components/alerts.html' },
  { title: 'Button', url: 'components/button.html' },
  { title: 'Checkboxes', url: 'components/checkboxes.html' },
  { title: 'Expand/collapse', url: 'components/expand-collapse.html' },
  { title: 'Input fields', url: 'components/input-fields.html' },
  { title: 'Radios', url: 'components/radios.html' },
  { title: 'Select', url: 'components/select.html' },
  { title: 'Stepper', url: 'components/stepper.html' },
  { title: 'Textarea', url: 'components/textarea.html' }
];

const patternsList = [
  { type: 'header', title: 'Ask users for:' },
  { title: 'Addresses', url: 'patterns/addresses.html' },
  { title: 'Dates', url: 'patterns/dates.html' },
  { title: 'Names', url: 'patterns/names.html' },
  { title: 'Phone numbers', url: 'patterns/phone-numbers.html' },
  { title: 'Social insurance numbers', url: 'patterns/social-insurance-numbers.html' },
  { type: 'header', title: 'Help users to:' },
  { title: 'Check service is suitable', url: 'patterns/check-service-suitable.html' },
  { title: 'Review answers', url: 'patterns/review-answers.html' },
  { title: 'Start using a service', url: 'patterns/start-using-service.html' },
  { title: 'Recover from validation errors', url: 'patterns/recover-validation-errors.html' },
  { type: 'header', title: 'Pages:' },
  { title: 'Confirmation pages', url: 'patterns/confirmation-pages.html' },
  { title: 'Service unavailable pages', url: 'patterns/service-unavailable-pages.html' },
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

function renderSidebar(listName) {
  const sidebar = document.getElementById('site-sidebar');
  if (!sidebar) return;

  const list = listName === 'patterns' ? patternsList : componentsList;
  const prefix = getRootPrefix();

  const html = ['<nav class="sidebar-nav" aria-label="Section navigation">', '<ul>'];
  list.forEach(item => {
    if (item.type === 'header') {
      html.push(`<li class="sidebar-header">${item.title}</li>`);
    } else {
      html.push(`<li><a class="sidebar-link" href="${prefix + item.url}">${item.title}</a></li>`);
    }
  });
  html.push('</ul></nav>');

  sidebar.innerHTML = html.join('');

  // Mark active link
  const current = location.pathname.split('/').pop();
  sidebar.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === current) a.classList.add('active');
  });
}

function renderNavBar(listName) {
        console.log("hello")

  const navbar = document.getElementById('page-nav');
  if (!navbar) return;

  const list = listName;


  const html = ['<nav class="page-nav" aria-label="page navigation">'];
  list.forEach(item => {
    
      html.push(`<a href="${item.url}">${item.title}</a>`);
    
  });
  html.push('</nav>');

  navbar.innerHTML = html.join('');

  // Mark active link
  const current = location.pathname.split('/').pop();
  sidebar.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === current) a.classList.add('active');
  });

}
function initSidebar() {
  const sidebar = document.getElementById('site-sidebar');
  if (!sidebar) return;
  const listName = sidebar.dataset.list || 'components';
  renderSidebar(listName);
}

function initNavBar() {

  const nav = document.getElementById('page-nav');
  if (!nav) return;

  const listName = nav.dataset.list || 'top-nav';
  renderNavBar(listName);

}

window.addEventListener('DOMContentLoaded', () => {
  initContext();
  initSearch();
  initSidebar();
  initNavBar();
});
