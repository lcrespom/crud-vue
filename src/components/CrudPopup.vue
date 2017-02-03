<template>
	<div>
		<!-- Full page cover that disables interaction with popup background -->
		<div tabindex="-1" role="dialog" class="crud-modal" id="crud-modal-cover"
			:class ="{ 'crud-cover-open': isCoverOpen }">
		</div>
		<!-- Popup content -->
		<div tabindex="-1" role="dialog" aria-labelledby="crud-popup-label"
			id="crud-modal-parent" @keyup.esc="close(false)"
			class="normal-font crud-modal">
			<div class="modal-dialog" role="document" id="crud-modal-dialog">
				<div class="modal-content">
					<div class="modal-header" :class="{ borderless: onlyMessage() }">
						<button v-if="config.showClose || config.showOK" type="button" class="close"
							@click="close(false)"
							data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title" id="crud-popup-label">{{labels.title}}</h4>
					</div>
					<div class="modal-body">
						<div class="popup-message" v-html="labels.message"></div>
						<form v-if="config.showPrompt" class="popup-prompt"
							@submit="$event.preventDefault(); close(true)">
							<input v-model="result.prompt" id="crud-popup-prompt"
								class="popup-prompt" type="text" style="width: 100%">
						</form>
					</div>
					<div class="modal-footer" :class="{ borderless: onlyMessage() }">
						<button v-if="config.showClose" type="button"
							@click="close(false)" id="crud-popup-close"
							class="btn btn-default popup-close" data-dismiss="modal">
							{{labels.close}}
						</button>
						<button v-if="config.showOK" type="button"
							@click="close(true)" id="crud-popup-ok"
							class="btn btn-primary popup-ok" data-dismiss="modal">
							{{labels.ok}}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./crud-popup.js"></script>

<style scoped>
.crud-modal {
	position: fixed;
	top: 0; bottom: 0; left: 0; right: 0;
	z-index: -1000;
	opacity: 0;
}

.crud-cover-open {
	display: block;
	opacity: 0.2;
	background-color: black;
	z-index: 2000;
}

.crud-modal-open {
	display: block;
	opacity: 1;
	margin: auto;
	z-index: 2001;
	outline: 0;
}

.borderless {
	border: 0;
}
</style>