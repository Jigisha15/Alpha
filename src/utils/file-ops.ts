import type { UserInterface } from "../interfaces/UserInterface"

const STORAGE_KEY = "contacts"

export function readData(): UserInterface[] {
	const data = localStorage.getItem(STORAGE_KEY)

	return data ? JSON.parse(data) as UserInterface[] : []
}

export function writeData(payload: UserInterface): void {
	const users = readData()

	users.push(payload)

	localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}