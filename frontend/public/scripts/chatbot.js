class Chatbot {
	constructor() {
		this.args = {
			openButton: document.querySelector(".chatbot__button"),
			chatbot: document.querySelector(".chatbot__support"),
			sendButton: document.querySelector(".send__button"),
		};
		this.state = false;
		this.messages = [];
	}

	display() {
		const { openButton, chatbot, sendButton } = this.args;

		openButton.addEventListener("click", () => this.toggleState(chatbot));

		sendButton.addEventListener("click", () => this.onSendButton(chatbot));

		const node = chatbot.querySelector("input");
		node.addEventListener("keyup", ({ key }) => {
			if (key === "Enter") {
				this.onSendButton(chatbot);
			}
		});
	}

	toggleState(chatbot) {
		this.state = !this.state;
		// show or hides the box
		if (this.state) {
			chatbot.classList.add("chatbot--active");
		} else {
			chatbot.classList.remove("chatbot--active");
		}
	}
	createMessageElement(message, classNameRole) {
		const messageEl = document.createElement("div");
		messageEl.className = `messages__item ${classNameRole}`;
		messageEl.innerText = message;
		this.args.chatbot.querySelector(".chatbot__messages").append(messageEl);
	}
	/**
	 * @param {HTMLDivElement} chatbot
	 * @returns
	 */
	async onSendButton(chatbot) {
		const textInputEl = chatbot.querySelector("input");
		let message = textInputEl.value;
		if (!message) return;
		this.resetTextInput();
		this.createMessageElement(message, "messages__item--operator");
		this.scrollToChatTop();
		const answer = await this.ask(message);
		this.createMessageElement(
			answer,
			"messages__item messages__item--visitor"
		);
		this.scrollToChatTop();
	}
	async ask(question) {
		const response = await fetch("http://localhost:3009/ask", {
			method: "POST",
			body: JSON.stringify({ question }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		return data.answer;
	}
	scrollToChatTop() {
		const chatboxesMessagesEl =
			this.args.chatbot.querySelector(".chatbot__messages");
		chatboxesMessagesEl.scrollTo({
			top: chatboxesMessagesEl.scrollHeight,
		});
	}
	resetTextInput() {
		const textInputEl = this.args.chatbot.querySelector("input");
		textInputEl.value = "";
		textInputEl.focus();
	}
}

const chatbot = new Chatbot();
chatbot.display();
