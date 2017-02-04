import { wrapAsyncFunction } from '../utils/cmp-helpers';

const COVER_OPACITY = 0.2;
const FADE_TIME = 0.2;
const LOADING_POPUP_DELAY = 300;
const LOADING_MSG = '<h3 style="text-align: center">Loading...</h3>';
const LOADING_TITLE = '';

/* global Promise */
const byId = document.getElementById.bind(document);


//-------------------- DOM Manipulation --------------------

function fadeCover(opacity, fadeTime) {
	let modalCover = byId('crud-modal-cover');
	modalCover.style.transition = `opacity ${fadeTime}s linear`;
	modalCover.style.opacity = opacity;
}

function openUpdateDOM() {
	let modalParent = byId('crud-modal-parent');
	let modalDialog = byId('crud-modal-dialog');
	modalParent.classList.add('crud-modal-open');
	let h = modalDialog.offsetHeight;
	let dlgStyle = window.getComputedStyle(modalDialog);
	h += parseInt(dlgStyle.marginTop, 10) + parseInt(dlgStyle.marginBottom, 10);
	modalParent.style.height = '' + h + 'px';
	fadeCover(COVER_OPACITY, FADE_TIME);
}

function closeUpdateDOM() {
	let modalParent = byId('crud-modal-parent');
	modalParent.classList.remove('crud-modal-open');
}


//-------------------- Focus management --------------------

function getFocusTarget() {
	let vm = CrudPopup.vm;
	if (vm.config.showPrompt)
		return byId('crud-popup-prompt');
	else if (vm.config.showOK)
		return byId('crud-popup-ok');
	else if (vm.config.showClose)
		return byId('crud-popup-close');
	return byId('crud-modal-dialog');
}

function checkFocus() {
	let vm = CrudPopup.vm;
	if (vm.isOpen && !vm.hasFocus) {
		vm.activeElement = document.activeElement;
		getFocusTarget().focus();
		vm.hasFocus = true;
	}
	else if (!vm.isOpen && vm.hasFocus) {
		if (vm.activeElement) vm.activeElement.focus();
		vm.hasFocus = false;
	}
}


//-------------------- Config helpers --------------------

function setMessages(msg, title, ok, close) {
	let vm = CrudPopup.vm;
	if (msg) vm.labels.message = msg;
	if (title) vm.labels.title = title;
	if (ok) vm.labels.ok = ok;
	if (close) vm.labels.close = close;
}

function setConfig(showOK, showClose, showPrompt) {
	let vm = CrudPopup.vm;
	vm.config.showOK = showOK;
	vm.config.showClose = showClose;
	vm.config.showPrompt = showPrompt;
}


let CrudPopup = {
	created() {
		CrudPopup.vm = this;
	},
	updated() {
		checkFocus();
	},
	data: function() {
		return {
			isOpen: false,
			isCoverOpen: false,
			labels: {
				title: 'Title',
				message: 'Message',
				ok: 'OK',
				close: 'Close'
			},
			config: {
				showClose: true,
				showOK: false,
				showPrompt: false
			},
			result: {
				okPressed: false,
				closePressed: false,
				prompt: ''
			}
		};
	},
	methods: {
		open() {
			this.isOpen = true;
			this.isCoverOpen = true;
			this.result.okPressed = false;
			this.result.closePressed = false;
			openUpdateDOM();
			return new Promise(resolve => this.closeResolve = resolve);
		},
		close(confirm) {
			fadeCover(0, FADE_TIME);
			setTimeout(_ => this.isCoverOpen = this.isOpen, FADE_TIME * 1000);
			this.isOpen = false;
			this.result.closePressed = !confirm;
			this.result.okPressed = confirm;
			closeUpdateDOM();
			if (this.closeResolve) this.closeResolve(this.result);
		},
		onlyMessage() {
			return !this.config.showOK
				&& !this.config.showClose
				&& !this.labels.title;
		}
	},
	helpers: {
		loading(message = LOADING_MSG, title = LOADING_TITLE) {
			let vm = CrudPopup.vm;
			vm.isOpen = true;
			setTimeout(_ => {
				if (!vm.isOpen) return;
				vm.labels.message = message;
				vm.labels.title = title;
				setConfig(false, false, false);
				vm.open();
			}, LOADING_POPUP_DELAY);
		},
		wrapWithLoading(func, msg) {
			return wrapAsyncFunction(
				(...params) => CrudPopup.helpers.loading(
						msg instanceof Function ? msg(...params) : msg),
				func,
				_ => CrudPopup.vm.close()
			);
		},
		alert(message, title, closeTxt) {
			setMessages(message, title, null, closeTxt);
			setConfig(false, true, false);
			return CrudPopup.vm.open();
		},
		confirm(message, title, okTxt, closeTxt) {
			setMessages(message, title, okTxt, closeTxt);
			setConfig(true, true, false);
			return CrudPopup.vm.open();
		},
		prompt(initialValue, message, title, okTxt, closeTxt) {
			setMessages(message, title, okTxt, closeTxt);
			CrudPopup.vm.result.prompt = initialValue;
			setConfig(true, true, true);
			return CrudPopup.vm.open();
		}
	}
};

export default CrudPopup;
