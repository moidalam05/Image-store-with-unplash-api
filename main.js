const accessKey = 'PP8Zip1Gtz4QIzTCqZfBhjdQnQxiG_RrqKySTwjjun0';
const formEl = document.querySelector('form');
const searchInputEl = document.querySelector('.search-input');
const searchResultsEl = document.querySelector('.search-results');
const showMoreBtn = document.querySelector('.show-more-btn');

let page = 1;

searchImages = async () => {
	const searchInput = searchInputEl.value;

	const url = `https://api.unsplash.com/search/photos?page=${page}&query=${searchInput}&client_id=${accessKey}`;

	const response = await fetch(url);
	const data = await response.json();

	if (page === 1) {
		searchResultsEl.innerHTML = '';
	}

	const result = data.results;
	result.map((item, index) => {
		searchResultsEl.innerHTML += `<div class="search-result">
				<img
					src="${item.urls.small}"
					alt="images"
				/>
				<a href="${item.links.html}">${item.alt_description}</a>
			</div>`;
	});

	page++;

	if (page > 1) {
		showMoreBtn.style.display = 'block';
	}
};

formEl.onsubmit = (e) => {
	e.preventDefault();
	page = 1;
	searchImages();
};

showMoreBtn.onclick = () => {
	searchImages();
};
