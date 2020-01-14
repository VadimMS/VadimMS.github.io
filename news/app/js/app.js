const newsService = new NewsService();
const newsUI = new NewsUI();

newsUI.main();
/**
 * UI elements
 */
const form = document.forms.newsControlForm;
const countrySelect = form.country;
const categorySelect = form.category;
const searchNews = document.querySelector('#search');

const onSelectChange = () => {
    const country = countrySelect.value;
    const category = categorySelect.value;

    if (!country) {
        return console.log('Выберите страну');
    }

    if (!category) {
        return console.log('Выберите категорию');
    }

    newsService.getTopHeadlinesNews(response => {
        const { articles } = response;
        newsUI.clearContainer();
        articles.forEach(news => newsUI.addNews(news));
    }, country, category);
};

const onInputKeydown = () => {
    const text = searchNews.value;

    if(text.length > 2) {
    newsService.getTextFromSearchField(response => {
        const { articles } = response;
        newsUI.clearContainer();
        articles.forEach(news => newsUI.addNews(news));
            if(articles.length == 0) {
                alert.callAlert();
            }
    }, text);
    }
 };

countrySelect.addEventListener('change', onSelectChange);
categorySelect.addEventListener('change', onSelectChange);
searchNews.addEventListener('input', onInputKeydown);