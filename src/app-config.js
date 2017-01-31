import CrudTable from './components/CrudTable';
let { editButton, removeButton } = CrudTable.helpers;
import { TextAreaComponent } from './components/crud-input';


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
		form: {
			newTitle: 'New book',
			editTitle: 'Edit book',
			fields: ['title', 'author', 'genre', 'synopsis']
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
			},
			synopsis: {
				component: TextAreaComponent
			}
		}
	},

	authors: {
		api: {
			getAll: 'get/VkaDRWPDz'
		},
		table: {
			fields: ['name.first', 'name.last', 'birth', 'death'],
			labels: ['Name', 'Surname', 'Birth', 'Death'],
			hdrClasses: ['', '', 'text-right', 'text-right'],
			cellClasses: ['', '', 'text-right', 'text-right']
		},
		meta: {
			birth: {
				type: 'date',
				cellClass: dt => new Date(dt).getFullYear() < 2000 ? 'text-danger' : ''
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
			hdrClasses: ['', 'text-center', 'text-center', 'text-right'],
			cellClasses: ['', 'text-center', 'text-center', 'text-right'],
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

	- fields (array): fields to be used in table and form when not present in their
		respective sections.
	- lables (array): labels to be used in table and form when not present in their
		respective sections. Labels are optional, and if not found, fields are
		capitalized and used as labels.

	- table:
		- fields (array): fields to be used in table
		- labels (array): labels to be used in table
		- buttons (array): buttons to be used in table
		- hdrClasses (array): classes to apply to header cells
		- cellClasses (array): classes to apply to data cells
	- form:
		- fields (array): fields to be used in form
		- labels (array): labels to be used in form

	- Field meta:
		- type: string, date, time, email, select, or custom-registered type handler.
			Types are a way to reuse common meta rules: if a rule is not found in
			the "meta" structure, it is searched in the type.
		- listData: array of value/label pairs used by the 'select' type
		- cellRender: custom cell rendering function. Returns plain text.
		- cellRenderHTML: custom cell rendering function that returns HTML.
			=> Rendering user-provided content in HTML should be avoided,
				see https://vuejs.org/v2/guide/syntax.html#Raw-HTML.
				Whenever possible, use the cellRenderNode alternative instead.
		- cellRenderNode: custom cell rendering function that returns a
			virtual DOM node.
		- cellClass: custom function to compute cell class from cell value
		- component: Vue component used to render the input in a form
		- focus: focus on form input (defaults to first input in form)
		- attrs: attributes to be applied to the form input for this field
*/
