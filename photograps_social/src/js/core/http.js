export class Http {
	post(url, data) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-type': 'application/json',
				},
			})
			.then(response => response.json())
			.then(data => resolve(data))
			.catch(err => reject(err));
		});
	}
	get(url, token) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'GET',
				headers: {
					'x-access-token': token,
				},
			})
			.then(response => response.json())
			.then(data => resolve(data))
			.catch(err => reject(err));
		});
	}
}