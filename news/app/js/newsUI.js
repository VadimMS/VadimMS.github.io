class NewsUI {
    constructor() {
        this.newsContainer = document.querySelector('.news-wrap .row');
        this.newsMain = document.querySelector('.form-wrap');
    }

     static tempalteMain() {
        return `
                    <div class="card">
                <form name="newsControlForm">
                    <div class="row">
                        <div class="col s12 m6">
                            <div class="input-field col s12">
                                <select name="country" id="country">
                                    <option value="" disabled selected>Choose your country</option>
                                    <option value="ua">Ukraine</option>
                                    <option value="us">United States</option>
                                    <option value="ve">Venuzuela</option>
                                </select>
                                <label>Country</label>
                            </div>
                        </div>
                        <div class="col s12 m6">
                            <div class="input-field col s12">
                                <select name="category" id="category">
                                    <option value="" disabled selected>Choose your category</option>
                                    <option value="science">Science</option>
                                    <option value="sports">Sports</option>
                                    <option value="technology">Technology</option>
                                </select>
                                <label>Category</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input placeholder="Search news" id="search" type="text">
                            <label for="search">Search</label>
                        </div>
                    </div>
                </form>
            </div>
        `;
    }

    main() {
        const main = NewsUI.tempalteMain();
        this.newsMain.insertAdjacentHTML('afterbegin', main);
    }
    addNews(news) {
        const tempalte = NewsUI.newsTemplate(news);
        this.newsContainer.insertAdjacentHTML('afterbegin', tempalte);
    }

    clearContainer() {
        this.newsContainer.innerHTML = '';
    }

    static newsTemplate(news) {
        return `
        <div class="col-5 s12 m6">
            <div class="card">
                <div class="card-image">
                    <img src="${news.urlToImage}">
                </div>
                <div class="card-content">
                    <span class="card-title">${news.title || ''}</span>

                    <p>${news.description || ''}</p>
                </div>
                <div class="card-action">
                    <a href="${news.url}" target="_blank">Read more</a>
                </div>
            </div>
        </div>
        `;
    }
}