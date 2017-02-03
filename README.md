# crud-vue

> Generic CRUD with Vue

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

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

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
		- Keyboard support + focus management
		- Prompt _(not required yet)_
- ~~Routing~~
- API backends
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
	- custom validation
	- Form sections for grouping with `<fieldset>`
	- ~~Computed fields, used in table column and readonly~~
	- ~~Nested fields, e.g. author.name.first~~
	- ~~HTML cell rendering for validated data (e.g. e-mail with `<a href="mailto:...">`)~~
