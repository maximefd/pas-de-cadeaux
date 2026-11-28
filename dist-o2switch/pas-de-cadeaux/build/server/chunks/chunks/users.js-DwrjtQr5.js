// src/lib/api/users.ts
var UserAPI = class {
	userId;
	constructor(userId) {
		this.userId = userId;
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
		return await fetch(`/pdc/users/${this.userId}${path}`, options);
	};
	setActiveGroup = async (groupId) => {
		return await this._makeRequest("PATCH", `/groups/${groupId}`, { active: true }).then((resp) => resp.json()).then(({ membership }) => membership);
	};
	delete = async () => {
		return await this._makeRequest("DELETE");
	};
};
var InviteUsersAPI = class {
	_makeRequest = async (method, body) => {
		const options = {
			method,
			headers: { accept: "application/json" },
			body: JSON.stringify(body)
		};
		return await fetch("/pdc/users/invite", options);
	};
	invite = async (data) => {
		return await this._makeRequest("POST", data);
	};
};
var SystemUsersAPI = class {
	groupId;
	constructor(groupId) {
		this.groupId = groupId;
	}
	_makeRequest = async (method, body) => {
		const options = {
			method,
			headers: {
				"content-type": "application/json",
				accept: "application/json"
			},
			body: JSON.stringify(body)
		};
		return await fetch(`/pdc/users/public`, options);
	};
	create = async (username, name) => {
		return await this._makeRequest("POST", {
			username,
			name,
			groupId: this.groupId
		});
	};
};

export { InviteUsersAPI as I, SystemUsersAPI as S, UserAPI as U };
//# sourceMappingURL=users.js-DwrjtQr5.js.map
