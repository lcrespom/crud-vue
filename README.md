# crud-vue

Generic CRUD framework implemented with [Vue.js](https://vuejs.org/).

The framework provides a set of components that generate all the UI for Creating, Reading, Updating and Deleting server-side data via any REST API. The data structures are described through a configuration object, and the framework dynamically generates all the UI tables, forms, widgets, etc., for manipulating the data.

See file [app-config.js](https://github.com/lcrespom/crud-vue/blob/master/src/app-config.js) for a configuration example along with the description of all the possible configuration options. That file is the only non-generic code in the whole application.

To play with it, you can use [Resty](https://github.com/lcrespom/resty.git), which is a simple REST API server that writes its data to plain JSON files.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

The structure of this project is derived from [vue-cli] (https://github.com/vuejs/vue-cli).


## ToDo
- Implement example library
	- ~~Books~~
	- ~~Authors~~
	- ~~Members~~
	- Book items
	- Rentals (past, current, future reservations)
	- Implement full functionality to ensure framework meets expectations
- Setup main layout
	- ~~Left: side menu with all tables~~
	- Right:
		- ~~Item edit form~~
		- ~~Table~~
		- Search button at top of table
- Generic components
	- ~~Menu~~
	- ~~Table~~
	- ~~Form~~
	- ~~Popup~~
		- ~~Loading... => open it when using the REST API~~
		- ~~Confirm (yes/no) => use it to confirm delete~~
		- ~~Alert~~
		- ~~Keyboard support + focus management~~
		- ~~Prompt~~
- ~~Routing~~
- ~~API backends~~
	- ~~Get JSON data from json-generator.com~~
	- ~~Get JSON data from resty~~
- Flexible configuration
	- Non-string types (for table cell and form input)
		- ~~Number~~
		- ~~Select~~
		- ~~Date~~ (test more)
		- Time
	- ~~`attrs` for passing attributes to the form input, e.g. readonly, etc.~~
	- ~~Autofocus~~
	- Custom validation
	- Form sections for grouping with `<fieldset>`
	- ~~Computed fields, used in table column and readonly~~
	- ~~Nested fields, e.g. author.name.first~~
	- ~~HTML cell rendering for validated data (e.g. e-mail with `<a href="mailto:...">`)~~
