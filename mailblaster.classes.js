export class MailBlaster extends HTMLElement {
	constructor() {
		super();
		return this;
	}
	connectedCallback() {
		let str = `<mailblaster-modal></mailblaster-modal>`
		this.innerHTML = str;
		document.querySelector("#mailblaster-modal-main").style.display = 'block';

	}

}
customElements.define("mailblaster-main", MailBlaster);

export class MailBlasterOpenButton extends HTMLElement {
	constructor() {
		super();
		return this;
	}

	connectedCallback() {
		let str = `<button class="w3-button w3-large w3-round w3-light-blue">Send Blast Mail</button>`;
		this.innerHTML = str;
		this.onclick = (event) => {
			let docBody = document.querySelector("body");
			let mbItem = document.createElement("mailblaster-main");
			docBody.appendChild(mbItem);
		}
	}
}
customElements.define("mailblaster-button-open", MailBlasterOpenButton);


class MailBlasterModal extends HTMLElement {
	constructor() {
		super();
		return this;
	}

	connectedCallback() {
		let str = `<div id="mailblaster-modal-main" class="w3-modal">
  <div class="w3-modal-content" id="mailblaster-modal-content">
    <div class="w3-container" id="mailblaster-modal-container">
      <span onclick="document.querySelector('mailblaster-main').outerHTML=''" 
      class="w3-button w3-display-topright">&times;</span>
		<span class="w3-xxlarge w3-align-center w3-dark-blue">Send a New Blast Mail</span>
		<div class="w3-panel" id="mailblaster-modal-body">
      	<p>First you must choose which E-Mail addresses to send the Blast Mail to</p>
      	<p><mailblaster-button-choose-recipients></mailblaster-button-choose-recipients></p>
      </div>
    </div>
  </div>
</div>`
		this.innerHTML = str;
	}

	setModalBody(bodyContents)  {
		document.querySelector("#mailblaster-modal-body").innerHTML = bodyContents;
	}
	setRecipients(recipientsArray) {
		document.querySelector("mailblaster-main").recipients = recipientsArray;
	}
	setDocuments(documentsArray) {
		document.querySelector("mailblaster-main").documents = documentsArray;
	}

}
customElements.define("mailblaster-modal", MailBlasterModal);


class MailBlasterButtonChooseRecipients extends HTMLElement {
	constructor() {
		super();
		return this;
	}

	connectedCallback() {
		let str = `<button class="w3-button w3-blue w3-large w3-round" id="mailblaster-choose-recipients-button">Choose Recipients</button>`;
		this.innerHTML = str;
		this.onclick = (event) => {
			document.querySelector("mailblaster-modal").setModalBody(`<p> Select which people from the list below to send the Blast Mail to</p><p><mailblaster-form-choose-recipients></mailblaster-form-choose-recipients></p>`);
		}
	}
	
}
customElements.define("mailblaster-button-choose-recipients", MailBlasterButtonChooseRecipients);