// src/lib/api/items.ts
var ItemAPI = class {
	itemId;
	constructor(itemId) {
		this.itemId = itemId;
	}
	_makeRequest = async (method, body) => {
		const options = {
			method,
			headers: {
				"content-type": "application/json",
				accept: "application/json"
			}
		};
		if (body) options.body = JSON.stringify(body);
		return await fetch(`/pdc/items/${this.itemId}`, options);
	};
	delete = async () => {
		return await this._makeRequest("DELETE");
	};
};
var ItemsAPI = class {
	_makeRequest = async (method, path, body) => {
		const options = {
			method,
			headers: {
				"content-type": "application/json",
				accept: "application/json"
			}
		};
		if (body) options.body = JSON.stringify(body);
		return await fetch(`/pdc/items${path}`, options);
	};
	clearItemsFromLists = async (groupId, claimed) => {
		const searchParams = new URLSearchParams();
		if (groupId) searchParams.append("groupId", groupId);
		if (claimed) searchParams.append("claimed", `${claimed}`);
		return await this._makeRequest("DELETE", "?" + searchParams.toString());
	};
};

export { ItemsAPI as I, ItemAPI as a };
//# sourceMappingURL=items2.js-C4c-wPjk.js.map
