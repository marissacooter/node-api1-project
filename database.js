let users = [
    { id: "1", name: "Jane Doe", bio: "Not Tarzan's wife, another Jane"},
    { id: "2", name: "John Doe", bio: "blah blah blah"}
]

function getUsers() {
	return users
}

function getUserById(id) {
    return users[id - 1]
}

function createUser(data) {
	const payload = {
		id: String(users.length + 1),
		...data,
	}

	users.push(payload)
	return payload
}

function updateUser(id, data) {
	const index = users.findIndex(u => u.id === id)
	users[index] = {
		...users[index],
		...data,
	}
	
	return users[index]
}

function deleteUser(id) {
	users = users.filter(u => u.id != id)
}

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
}