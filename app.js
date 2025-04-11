document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');

    // Function to load and display pages
    async function loadPage(page, isInitialLoad = false) {
        try {
            const response = await fetch(`partials/home.html`);
            if (!response.ok) throw new Error('Page not found');

            contentDiv.innerHTML = await response.text();

            // Only push state if not initial load
            if (!isInitialLoad) {
                history.pushState({ page }, '', `?page=${page}`);
            }
        } catch (err) {
            contentDiv.innerHTML = `<h2>Error loading page</h2>`;
            console.error(err);
        }
    }

    // Handle navigation clicks
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.closest('[data-page]').dataset.page;
            loadPage(page);
        });
    });

    // Handle popstate (back/forward buttons)
    window.addEventListener('popstate', (e) => {
        const urlPage = new URLSearchParams(window.location.search).get('page') || 'home';
        loadPage(urlPage, true); // Pass true to prevent pushState
    });

    // Initial load
    const urlPage = new URLSearchParams(window.location.search).get('page') || 'home';
    loadPage(urlPage, true);
    history.replaceState({ page: urlPage }, '', `?page=${urlPage}`); // Set initial state
});

