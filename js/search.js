document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  let searchData;
  let searchTimeout;

  // Fetch search data
  fetch('/search.json')
    .then(response => response.json())
    .then(data => {
      searchData = data;
    })
    .catch(error => console.error('Error loading search data:', error));

  // Add loading state
  const setLoading = (isLoading) => {
    searchInput.style.backgroundImage = isLoading 
      ? 'url("/images/loading.gif")'
      : 'none';
  };

  // Debounced search function
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (query.length < 2) {
      searchResults.style.display = 'none';
      return;
    }

    // Set a timeout for the search
    searchTimeout = setTimeout(() => {
      const results = searchData
        .filter(item => 
          item.title.toLowerCase().includes(query) || 
          item.content.toLowerCase().includes(query)
        )
        .slice(0, 6);

      if (results.length > 0) {
        searchResults.innerHTML = results.map(result => {
          // Highlight matching text
          const title = result.title.replace(
            new RegExp(query, 'gi'),
            match => `<span style="color: var(--primary-color)">${match}</span>`
          );
          
          return `
            <div class="search-result-item">
              <a href="${result.url}">${title}</a>
            </div>
          `;
        }).join('');
        searchResults.style.display = 'block';
      } else {
        searchResults.innerHTML = `
          <div class="search-result-item">
            <span style="color: var(--meta-color)">No results found</span>
          </div>
        `;
        searchResults.style.display = 'block';
      }
    }, 300); // 300ms delay
  });

  // Handle keyboard navigation
  searchInput.addEventListener('keydown', (e) => {
    const items = searchResults.getElementsByClassName('search-result-item');
    const current = searchResults.querySelector('.search-result-item:hover');
    let index = Array.from(items).indexOf(current);

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      
      if (e.key === 'ArrowDown') {
        index = index < items.length - 1 ? index + 1 : 0;
      } else {
        index = index > 0 ? index - 1 : items.length - 1;
      }

      items[index]?.querySelector('a')?.focus();
    }
  });

  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.style.display = 'none';
    }
  });

  // Focus search input when pressing '/'
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });
});