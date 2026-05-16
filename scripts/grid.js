(function() {
    function getEmbedRoot() {
        return document.getElementById('embed');
    }

    function isExternalLink(href) {
        try {
            return new URL(href, location.href).origin !== location.origin;
        } catch {
            return false;
        }
    }

    function resolveFetchPath(href) {
        try {
            const url = new URL(href, location.href);
            if (url.origin !== location.origin) return null;
            if (url.search.startsWith('?=')) return url.search.slice(2) + '.html';
            if (url.pathname === location.pathname && url.search) {
                const q = url.search.slice(1);
                if (q.startsWith('=')) return q.slice(1) + '.html';
            }
            return url.pathname + url.search;
        } catch {
            return null;
        }
    }

    function loadHtml(container, href) {
        const path = resolveFetchPath(href);
        if (!path) return;
        fetch(path)
            .then(response => {
                if (!response.ok) throw new Error('Fetch failed');
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
            })
            .catch(() => {
                container.innerHTML = '<p>Could not load embedded content.</p>';
            });
    }

    document.addEventListener('click', function(event) {
        let targetElement = event.target;
        if (targetElement.nodeType !== Node.ELEMENT_NODE) {
            targetElement = targetElement.parentElement;
        }
        const anchor = targetElement && targetElement.closest ? targetElement.closest('a') : null;
        if (!anchor) return;
        const href = anchor.getAttribute('href');
        if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) return;
        if (isExternalLink(href)) return;
        const path = resolveFetchPath(href);
        if (!path) return;
        event.preventDefault();

        const embedRoot = getEmbedRoot();
        if (!embedRoot) return;

        const currentEmbed = anchor.closest('#embed, .embedded-page');
        const target = currentEmbed ? document.createElement('div') : embedRoot;
        if (currentEmbed) {
            target.className = 'embedded-page';
            currentEmbed.parentNode.insertBefore(target, currentEmbed.nextSibling);
        }

        loadHtml(target, href);
        history.pushState({ embed: path }, '', href);
    });

    window.addEventListener('popstate', function(event) {
        const state = event.state;
        if (state && state.embed) {
            const embedRoot = getEmbedRoot();
            if (!embedRoot) return;
            while (embedRoot.firstChild) {
                embedRoot.removeChild(embedRoot.firstChild);
            }
            loadHtml(embedRoot, state.embed);
        }
    });
})();