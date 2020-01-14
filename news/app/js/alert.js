class Alert {
    constructor() {
        this.newsContainer = document.querySelector('.news-wrap .row');
    }
    static alertTemplate() {
        return `
        <div class="alert alert-danger alert-dismissible" role="alert">
  		<strong>По вашему запросу, новостей не найдено</strong>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
        `;
    }
    callAlert() {
        const callAlert = Alert.alertTemplate();
        this.newsContainer.insertAdjacentHTML('afterbegin', callAlert);
    }
 }

 const alert = new Alert();
