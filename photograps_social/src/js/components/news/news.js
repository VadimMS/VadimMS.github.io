import { AuthService } from './../../services/auth.service';
import { NewsService } from './../../services/news.service';

export class NewsComponent {
	constructor() {
		this._authService = new AuthService();
		this._newsService = new NewsService();

		this._authToken = this._authService.token;
	}

	async beforeRender() {
		this._token = await this._newsService.getNews(this._authToken);
		console.log(this._token);
	}

	render() {
		return `
		<!-- Component styles -->
		<style>
		${this.style}
		</style>
		<!-- Component html -->
		<div class="iner_news">
		<div class="news">
		<div class="img">
		<img src="${this._token.news[0].owner.avatar}">
		</div>
		<div class="info">
		<div class="name">Name: ${this._token.news[0].owner.full_name}</div>
		<div class="country">Country: ${this._token.news[0].owner.country}</div>
		</div>
		</div>
		
		</div>
		`;
	}
	get style() {
		return `
		.news {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.img {
			padding-right: 5px;
		}

		.info {
			padding-bottom: 10px;
			padding-left: 5px;
		}

		`;
	}
}
