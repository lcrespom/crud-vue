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
	- Books
	- Authors
	- Members
	- Book items
	- Rentals (past, current, future reservations)
- Setup main layout
	- ~~Left: side menu with all tables~~
	- Right:
		- Table with all items + search button + new button
		- Item edit form
- Generic components
	- Table (WIP)
	- form
	- ~~Menu~~
	- Popup
		- Loading... => open it when using the REST API
		- Alert
		- Confirm (yes/no)
		- Prompt
- Routing
- Get JSON data from json-generator.com
- Flexible configuration
	- Non-string types
		- Number
		- Select
		- Date
		- etc
	- ~~Computed fields, used in table column and readonly~~
	- ~~Nested fields, e.g. author.name.first~~
	- ~~HTML cell rendering for validated data (e.g. e-mail with `<a href="mailto:...">`)~~
