import { Http } from './../core/http';
import { ENV } from './../config/env';

export class WinnersService {
    getWinners(part, limit) {
        const http = new Http();

        return new Promise((resolve, reject) => {
            http.get(`${ENV.apiUrl}/public/winners?part=${part}&limit=${limit}`)
            .then(response => {
                if (!response.winners) {
                    return reject(response);
                }
                resolve(response);
            })
            .catch(err => reject(err));
        });
    }
}