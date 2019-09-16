/*             API endpoints: */
/*  recipients expects a JSON array of valid recipients */
const MAILBLASTER_FETCH_RECIPIENTS_API = "/recipients.js";

/* documents API expects a JSON array of valid documents */
const MAILBLASTER_FETCH_DOCUMENTS_API = "/mailblaster/fetch/documents";


export function fetchRecipients() {
	window.w3.getHttpObject(MAILBLASTER_FETCH_RECIPIENTS_API, processRecipients);
}

export function processRecipients(myRecipientsObject) {
	document.querySelector("mailblaster-main").setRecipients(myRecipientsObject);
}


export class MailBlaster extends HTMLElement {
	constructor() {
		super();
		return this;
	}
	connectedCallback() {
		let str = `<mailblaster-modal></mailblaster-modal>`
		this.innerHTML = str;
		document.querySelector("#mailblaster-modal-main").style.display = 'block';
		fetchRecipients();
		this.documents = {};
		this.fields = {};
		this.fields["to"] = "";
		this.fields["body"] = "";

	}
	setRecipients(newRecipients) {
		this.recipients = newRecipients;
	}
	setDocuments(newDocuments) {
		this.documents = newDocuments;
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
</div>`;
		this.innerHTML = str;
	}

	setModalBody(bodyContents) {
		document.querySelector("#mailblaster-modal-body").innerHTML = bodyContents;
	}
	setRecipients(recipientsArray) {
		document.querySelector("mailblaster-main").setRecipients(recipientsArray);
	}
	setDocuments(documentsArray) {
		document.querySelector("mailblaster-main").setDocuments(documentsArray);
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
			document.querySelector("mailblaster-modal").setModalBody(`<p> <span class="w3-panel">Select which people from the list below to send the Blast Mail to.<br>Click on <b>Next</b> to continue</span><span class="w3-panel w3-align-right"><mailblaster-form-choose-recipients-finished-button></mailblaster-form-choose-recipients-finished-button></span></p><p><span class="w3-border-black"><mailblaster-form-choose-recipients></mailblaster-form-choose-recipients></span></p>`);
		}
	}

}
customElements.define("mailblaster-button-choose-recipients", MailBlasterButtonChooseRecipients);


class MailBlasterFormChooseRecipients extends HTMLElement {
	constructor() {
		super();
		return this;
	}

	connectedCallback() {
		let str = `<ul id="mailblaster-form-choose-recipient-list" class="w3-ul w3-hoverable">
  <li class="mailblaster-recipient-row w3-display-container w3-border-black w3-bar" w3-repeat="Recipients" onclick="this.querySelector('input').checked = !this.querySelector('input').checked"><input type="checkbox" class="w3-display-left w3-bar-item"  checked/><span class="w3-display-center w3-bar-item mailblaster-recipient-name">{{Name}}</span><span class="w3-display-right w3-bar-item mailblaster-recipient-email"> {{Email}}</span></li>
</ul>`;
		this.innerHTML = str;
		window.w3.displayObject("mailblaster-form-choose-recipient-list", document.querySelector("mailblaster-main").recipients);


	}
}

customElements.define("mailblaster-form-choose-recipients", MailBlasterFormChooseRecipients);


class MailBlasterFormChooseRecipientsFinishedButton extends HTMLElement {
	constructor() {
		super();
		return this;
	}

	connectedCallback() {
		let str = `<button class="w3-button w3-blue w3-large w3-round" id="mailblaster-choose-documents-button">Next Step</button>`;
		this.innerHTML = str;
		this.onclick = (event) => {
			let newRecipients = [];
			document.querySelectorAll(".mailblaster-recipient-row").forEach(function(item) {
				if (item.querySelector("input").checked) {
					newRecipients.push(item.querySelector(".mailblaster-recipient-email").innerHTML);
				}
			});
			document.querySelector("mailblaster-main").fields["to"] = newRecipients.join(", ");
			//alert("to: " + newRecipients)
			document.querySelector("mailblaster-modal").setModalBody("<span class='w3-panel'><p>The selected meeting documents will be attached to e-mail and sent to the recipients you selected. </p><p> Now, please enter a subject and a plain text message to send out.  Click <b> Send</b> once finished.</p></span><p><mailblaster-form-message></mailblaster-form-message></p> ");
		}
	}
}

customElements.define("mailblaster-form-choose-recipients-finished-button", MailBlasterFormChooseRecipientsFinishedButton);


class MailBlasterFormMessage extends HTMLElement {
	constructor() {
		super();
		return this;	
	}
	connectedCallback() {
		let str = `<p><div class="w3-panel w3-border w3-hover-border-blue w3-border-black"><div class="w3-bar w3-padding-2 " style="width: 100%"><span class="w3-bar-item"><label>Subject</label></span><input type="text" class="w3-border w3-border-black w3-hover-border-blue w3-bar-item" style="width: 40vw" name="subject" id="mailblaster-message-subject" /><br></div>
<div class="w3-bar w3-padding-2 " style="width: 100%"><span class="w3-bar-item"><label>Content</label></span><textarea class="w3-border w3-border-black w3-hover-border-blue w3-bar-item" style="width: 40vw; height: 40vh" name="body" id="mailblaster-message-body" ></textarea><br></div>		
		
		
		</div></p>`;
		this.innerHTML = str;
	}
}

customElements.define("mailblaster-form-message", MailBlasterFormMessage);

