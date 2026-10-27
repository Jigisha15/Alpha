export interface UserInterface {
	id: string
	name: string
	email: string
	company: string
	role: ROLE
	owner: string
	labels: string
	stage: string
	notes: string
}

export const ROLE = {
	Lead: "Lead",
	Prospect: "Prospect",
	Qualified: "Qualified",
	Customer: "Customer"
} as const

export type ROLE = (typeof ROLE)[keyof typeof ROLE]