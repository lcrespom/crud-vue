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
	return byId('crud-modal-dialog');;
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
			return function(...params) {
				let msgTxt = msg instanceof Function ? msg(...params) : msg;
				CrudPopup.helpers.loading(msgTxt);
				return func(...params)
				.then(x => {
					CrudPopup.vm.close();
					return x;
				});
			};
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
/*
import { Component, ViewChild, AfterViewChecked, Input } from '@angular/core';
import { PopupService } from './popup.service';

const COVER_OPACITY = 0.2;

@Component({
	selector: 'bfe-popup',
	templateUrl: 'popup.component.html',
	styleUrls: ['popup.component.css']
})
export class PopupComponent implements AfterViewChecked {
	@ViewChild('modalCover') modalCover;
	@ViewChild('modalParent') modalParent;
	@ViewChild('modalDialog') modalDialog;
	@ViewChild('prompt') prompt;
	@ViewChild('okButton') okButton;
	@ViewChild('closeButton') closeButton;
	@Input() fadeTime = 0.2;
	activeElement: any;
	closeResolve: (result: PopupResult) => void;
	isOpen = false;
	hasFocus = false;

	labels: PopupLabels = {
		title: 'Title',
		message: 'Message',
		ok: 'OK',
		close: 'Close'
	};

	config: PopupConfig = {
		showClose: true,
		showOK: false,
		showPrompt: false
	};

	result: PopupResult = {
		okPressed: false,
		closePressed: false,
		prompt: ''
	};

	constructor(private popupSvc: PopupService) {
		popupSvc.initialize(this);
	}

	open(): Promise<PopupResult> {
		this.isOpen = true;
		this.result.okPressed = false;
		this.result.closePressed = false;
		this.modalParent.nativeElement.classList.add('bfe-modal-open');
		let h = this.modalDialog.nativeElement.offsetHeight;
		let dlgStyle = window.getComputedStyle(this.modalDialog.nativeElement);
		h += parseInt(dlgStyle.marginTop, 10) + parseInt(dlgStyle.marginBottom, 10);
		this.modalParent.nativeElement.style.height = '' + h + 'px';
		this.fadeCover(COVER_OPACITY);
		return new Promise(resolve => this.closeResolve = resolve);
	}

	close(confirm: boolean) {
		this.fadeCover(0);
		setTimeout(_ => {
			this.isOpen = false;
			this.result.closePressed = !confirm;
			this.result.okPressed = confirm;
			this.modalParent.nativeElement.classList.remove('bfe-modal-open');
			this.closeResolve(this.result);
		}, this.fadeTime * 1000);
	}

	fadeCover(opacity: number) {
		let style = this.modalCover.nativeElement.style;
		style.transition = `opacity ${this.fadeTime}s linear`;
		style.opacity = opacity;
	}

	onlyMessage(): boolean {
		return !this.config.showOK
			&& !this.config.showClose
			&& !this.labels.title;
	}

	ngAfterViewChecked() {
		this.checkFocus();
	}

	checkFocus() {
		if (this.isOpen && !this.hasFocus) {
			this.activeElement = document.activeElement;
			this.getFocusTarget().nativeElement.focus();
			this.hasFocus = true;
		}
		else if (!this.isOpen && this.hasFocus) {
			if (this.activeElement) this.activeElement.focus();
			this.hasFocus = false;
		}
	}

	getFocusTarget() {
		let target = this.modalDialog;
		if (this.config.showPrompt)
			target = this.prompt;
		else if (this.config.showOK)
			target = this.okButton;
		else if (this.config.showClose)
			target = this.closeButton;
		return target;
	}

}

const LOADING_POPUP_DELAY = 300;

@Injectable()
export class PopupService {
	popup: PopupComponent;
	initialLabels: PopupLabels;
	initialConfig: PopupConfig;
	loadingMsg: string = 'Loading...';
	loadingTitle: string = '';

	initialize(popup: PopupComponent) {
		this.popup = popup;
		this.initialLabels = Object.assign({}, popup.labels);
		this.initialConfig = Object.assign({}, popup.config);
	}

	open(labels?: PopupLabels, config?: PopupConfig): Promise<PopupResult> {
		Object.assign(this.popup.labels, this.initialLabels, labels);
		Object.assign(this.popup.config, this.initialConfig, config);
		return this.popup.open();
	}

	close(confirm: boolean) {
		this.popup.close(confirm);
	}

	setLoadingMessage(loadingMsg: string, loadingTitle?: string) {
		this.loadingMsg = loadingMsg;
		this.loadingTitle = loadingTitle;
	}

	setDefaultLabels(labels: PopupLabels) {
		Object.assign(this.initialLabels, labels);
	}

	loading(message = this.loadingMsg, title = this.loadingTitle) {
		this.popup.isOpen = true;
		setTimeout(_ => {
			if (!this.popup.isOpen) return;
			this.open(
				{ message, title },
				{ showClose: false, showOK: false });
				// ,{ keyboard: false, backdrop: 'static' }
		}, LOADING_POPUP_DELAY);
	}

	alert(message: string, title = '', close = this.initialLabels.close) {
		return this.open(
			{ message, title, close },
			{ showClose: true, showOK: false }
		);
	}

	confirm(labels: PopupLabels): Promise<PopupResult> {
		return this.open(labels,
			{ showOK: true, showClose: true, showPrompt: false });
	}

	prompt(labels: PopupLabels, initialValue: string): Promise<PopupResult> {
		//TODO test
		this.popup.result.prompt = initialValue;
		return this.open(labels,
			{ showOK: true, showClose: true, showPrompt: true });
	}
}
*/
