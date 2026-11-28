import { R as Role } from './schema.js-_174nGak.js';

// src/lib/api/groups.ts
var GroupAPI = class {
	groupId;
	constructor(groupId) {
		this.groupId = groupId;
	}
	_makeRequest = async (method, path = "", body) => {
		const options = {
			method,
			headers: {
				"content-type": "application/json",
				accept: "application/json"
			}
		};
		if (body) options.body = JSON.stringify(body);
		return await fetch(`/pdc/groups/${this.groupId}${path}`, options);
	};
	addMember = async (userId, manager = false) => {
		return await this._makeRequest("PUT", `/users/${userId}`, { manager }).then((resp) => resp.json());
	};
	removeMember = async (userId) => {
		return await this._makeRequest("DELETE", `/users/${userId}`).then((resp) => resp.json());
	};
	makeManager = async (userId) => {
		return await this._makeRequest("PATCH", `/users/${userId}`, { manager: true }).then((resp) => resp.json());
	};
	removeManager = async (userId) => {
		return await this._makeRequest("PATCH", `/users/${userId}`, { manager: false }).then((resp) => resp.json());
	};
	isManager = async (userId) => {
		return await this._makeRequest("GET", `/users/${userId}`).then(async (resp) => {
			return (await resp.json()).membership;
		}).then((membership) => membership.roleId === Role.GROUP_MANAGER || membership.roleId === Role.ADMIN);
	};
	delete = async () => {
		return await this._makeRequest("DELETE").then((resp) => resp.json());
	};
	update = async (group) => {
		return await this._makeRequest("PATCH", "/", group).then((resp) => resp.json());
	};
};
var GroupsAPI = class {
	_makeRequest = async (method, body) => {
		const options = {
			method,
			headers: {
				"content-type": "application/json",
				accept: "application/json"
			}
		};
		if (body) options.body = JSON.stringify(body);
		return await fetch(`/pdc/groups`, options);
	};
	create = async (name) => {
		return await this._makeRequest("PUT", { name }).then((resp) => resp.json()).then(({ group }) => group);
	};
};

export { GroupAPI as G, GroupsAPI as a };
//# sourceMappingURL=groups.js-9o7-Je8O.js.map
