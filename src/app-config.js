import CrudTable from './components/CrudTable';

let { editButton, removeButton } = CrudTable.helpers;

export default {
	books:  {
		fields: ['date', 'description', 'amount', 'balance'],
		buttons: [editButton, removeButton]
	}
};

/*
	- title (string): entity title.
		If not present, the capitalized route is used.
	- tableFields (array): fields to be used in table
	- tableLables (array): labels to be used in table.
		If not present, fields are capitalized and used as labels.
	- formFields (array): fields to be used in form
	- formLables (array): labels to be used in form.
		If not present, fields are capitalized and used as labels.
	- buttons (array): buttons to be used in table
	- fields (array): fields to be used in table and form,
		when tableFields or formFields are not present
	- labels (array): labels to be used
*/