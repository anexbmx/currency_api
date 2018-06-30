export class DOM {
	static getById(id) {
		return document.getElementById(id);
	}

	static query(tag) {
		return document.querySelector(tag);
	}
	static setContent(tag, content) {
		const element = DOM.query(tag);
		element.textContent = content;
	}

	static setContentAll(query, content) {
		const nodes = document.querySelectorAll(query);
		for(let node of nodes)
			node.textContent = content;
	}

	static currentOption(id) {
		const inputSelect = DOM.getById(id);
		return inputSelect.options[inputSelect.selectedIndex];
	}
}