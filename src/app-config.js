import CrudTable from './components/CrudTable';
let { editButton, removeButton } = CrudTable.helpers;


export default {
	_apiPrefix: 'http://beta.json-generator.com/api/json/',
	books:  {
		api: {
			getAll: 'get/N1V5Cxwvz'
		},
		table: {
			fields: 'title author genre'.split(' '),
			buttons: [editButton, removeButton]
		},
		meta: {
			genre: {
				type: 'select',
				listData: [
					{ value: 'FAN', label: 'Fantasy' },
					{ value: 'SF', label: 'Science fiction' },
					{ value: 'WE', label: 'Western' },
					{ value: 'MY', label: 'Mystery' }
				]
			}
		}
	},

	authors: {
		api: {
			getAll: 'get/VkaDRWPDz'
		},
		table: {
			fields: ['name.first', 'name.last', 'birth', 'death'],
			labels: ['Name', 'Surname', 'Birth', 'Death']
		},
		meta: {
			birth: {
				type: 'date'
			},
			death: {
				type: 'date'
			}
		}
	},

	members: {
		api: {
			getAll: 'get/EJp007vDG'
		},
		table: {
			fields: ['name', 'email', 'phone', 'birth'],
			labels: ['Name', 'e-mail', 'Phone', 'Birth'],
			buttons: [editButton, removeButton]
		},
		meta: {
			name: {
				cellRender: name => name.first + ' ' + name.last
			},
			birth: {
				type: 'date'
			},
			email: {
				type: 'email'
			}
		}
	}
};

/*
	- _apiPrefix (string): global prefix for all API URLs
	_ _apiHandler (object): global handler for all API calls

	- api (object):
		- handler (object): handler for API calls.
			If not present, the default REST implementation is used.
		- prefix (string): prefix to be used for all URLs
		- getAll (string): URL for API table request
		- put (string): URL for updating a record
		- post (string): URL for adding a record
		- delete (string): URL for deleting a record

	- title (string): entity title.
		If not present, the capitalized route is used.

	- tableFields (array): fields to be used in table
	- tableLables (array): labels to be used in table.
		If not present, fields are capitalized and used as labels.

	- formFields (array): fields to be used in form
	- formLables (array): labels to be used in form.
		If not present, fields are capitalized and used as labels.

	- fields (array): fields to be used in table and form,
		when tableFields or formFields are not present
	- labels (array): labels to be used
	- buttons (array): buttons to be used in table

	- Field meta:
		- type: string, date, time, email, select, or custom-registered type handler
		- listData: array of value/label pairs used by the 'select' type
		- cellRender: custom cell rendering function. Returns plain text.
		- cellRenderHTML: custom cell rendering function that returns HTML.
			=> Rendering user-provided content in HTML should be avoided,
				see https://vuejs.org/v2/guide/syntax.html#Raw-HTML.
				Whenever possible, use the cellRenderNode alternative instead.
		- cellRenderNode: custom cell rendering function that returns a
			virtual DOM node.
*/