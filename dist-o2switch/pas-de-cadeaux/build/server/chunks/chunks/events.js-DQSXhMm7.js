import { t as toItemOnListDTO, h as hideSecretsFromOwner } from './item-mapper.js-DUyKoq81.js';

var ItemEvent = {
	ITEMS_UPDATE: "items_update",
	ITEM_CREATE: "item_create",
	ITEM_UPDATE: "item_update",
	ITEM_DELETE: "item_delete"
};
var ItemUpdateHandler = class ItemUpdateHandler {
	static event = ItemEvent.ITEM_UPDATE;
	listId;
	hideOffered;
	constructor(listId, hideOffered = false) {
		this.listId = listId;
		this.hideOffered = hideOffered;
	}
	getEventId() {
		return ItemUpdateHandler.event;
	}
	handle(data) {
		return toItemOnListDTO(this.hideOffered ? hideSecretsFromOwner(data) : data, this.listId);
	}
	predicate(data) {
		return data.lists.map((l) => l.list.id).includes(this.listId);
	}
	static listen(source, callback) {
		source.addEventListener(ItemUpdateHandler.event, (e) => {
			callback(JSON.parse(e.data));
		});
	}
};
var ItemCreateHandler = class ItemCreateHandler {
	static event = ItemEvent.ITEM_CREATE;
	listId;
	hideOffered;
	constructor(listId, hideOffered = false) {
		this.listId = listId;
		this.hideOffered = hideOffered;
	}
	getEventId() {
		return ItemCreateHandler.event;
	}
	handle(data) {
		return toItemOnListDTO(this.hideOffered ? hideSecretsFromOwner(data) : data, this.listId);
	}
	predicate(data) {
		return data.lists.map((l) => l.list.id).includes(this.listId);
	}
	static listen(source, callback) {
		source.addEventListener(ItemCreateHandler.event, (e) => {
			callback(JSON.parse(e.data));
		});
	}
};
var ItemDeleteHandler = class ItemDeleteHandler {
	static event = ItemEvent.ITEM_DELETE;
	listId;
	constructor(listId) {
		this.listId = listId;
	}
	getEventId() {
		return ItemDeleteHandler.event;
	}
	handle(event) {
		return { id: event.id };
	}
	predicate(data) {
		return data.lists.map((l) => l.id).includes(this.listId);
	}
	static listen(source, callback) {
		source.addEventListener(ItemDeleteHandler.event, (e) => {
			callback(JSON.parse(e.data));
		});
	}
};
var ItemsUpdateHandler = class ItemsUpdateHandler {
	static event = ItemEvent.ITEMS_UPDATE;
	listId;
	constructor(listId) {
		this.listId = listId;
	}
	getEventId() {
		return ItemsUpdateHandler.event;
	}
	handle(_event) {}
	predicate(_data) {
		return true;
	}
	static listen(source, callback) {
		source.addEventListener(ItemsUpdateHandler.event, () => {
			callback();
		});
	}
};

export { ItemEvent as I, ItemUpdateHandler as a, ItemCreateHandler as b, ItemDeleteHandler as c, ItemsUpdateHandler as d };
//# sourceMappingURL=events.js-DQSXhMm7.js.map
