const crudApi = {
	getAll(route) {
		return [
			{ id: 1, date: '20/01/17', description: 'Electricity', amount: 200, balance: 1000 },
			{ id: 2, date: '21/01/17', description: 'Gas', amount: 300, balance: 800 },
			{ id: 3, date: '22/01/17', description: 'Phone', amount: 100, balance: 400 },
			{ id: 4, date: '23/01/17', description: 'Water', amount: 50, balance: 350 }
		];
	}
};

export default crudApi;
