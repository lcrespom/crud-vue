import CrudTable from './components/CrudTable';

let { editButton, removeButton } = CrudTable.helpers;

export default {
	books:  {
		fields: ['date', 'description', 'amount', 'balance'],
		buttons: [editButton, removeButton]
	}
};
