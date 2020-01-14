import { WinnersService } from './../../services/winners.service';

export class WinnersComponent {
	constructor() {
		this._winnersService = new WinnersService();
	}

	async beforeRender() {
		this._partlimit = await this._winnersService.getWinners(1, 15);
	}

	render() {
		return`
		<!-- Component styles -->
		<style>
		${this.style}
		</style>
		<!-- Component html -->
		<div class="winners">
			<ol>
				<li>
					${this._partlimit.winners[0].submited_time}
				</li>
				<li>
					${this._partlimit.winners[1].submited_time}
				</li>
				<li>
					${this._partlimit.winners[2].submited_time}
				</li>
				<li>
					${this._partlimit.winners[3].submited_time}
				</li>
				<li>
					${this._partlimit.winners[4].submited_time}
				</li>
				<li>
					${this._partlimit.winners[5].submited_time}
				</li>
				<li>
					${this._partlimit.winners[6].submited_time}
				</li>
				<li>
					${this._partlimit.winners[7].submited_time}
				</li>
				<li>
					${this._partlimit.winners[8].submited_time}
				</li>
				<li>
					${this._partlimit.winners[9].submited_time}
				</li>
				<li>
					${this._partlimit.winners[10].submited_time}
				</li>								
			</ol>
		
		</div>
		`;
	}

	get style() {
		return `
			ol {
				margin-left: 50%;
   				 transform: translateX(-20%);
			}
			li {
				margin-top: 10px;
			}
		`;
	}
}
