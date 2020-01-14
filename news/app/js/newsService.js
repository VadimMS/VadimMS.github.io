const http = new CustomHttp();

class NewsService {
    constructor() {
        this.apiUrl = 'https://newsapi.org/v2/top-headlines';
        this.apiKey = '9c27b0f722b84da5a08312d2b125351b';
        this.country = 'ua';
        this.category = 'technology';
    }

    /**
     * Get all Top Headlines News 
     */
    getTopHeadlinesNews(callback, country = this.country, category = this.category) {
        http.get(`${this.apiUrl}?country=${country}&category=${category}&apiKey=${this.apiKey}`, callback);
    }

    /**
     * Get news by text from search field
     */
    getTextFromSearchField(callback, text) {
        http.get(`${this.apiUrl}?q=${text}&apiKey=${this.apiKey}`, callback);
    }
}