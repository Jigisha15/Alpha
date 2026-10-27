import { useState, type Dispatch, type SetStateAction } from "react"
import type { UserInterface } from "../../interfaces/UserInterface"
import toast from "react-hot-toast"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { Trash2 } from "lucide-react"

interface DeleteUserFormInterface {
	data: UserInterface
	setOpenDelete: Dispatch<SetStateAction<boolean>>
	refetchData: () => void
}

export const DeleteUserForm = ({ data, setOpenDelete, refetchData }: DeleteUserFormInterface) => {

	const [loading, setLoading] = useState<boolean>(false)

	const handleDeleteUser = () => {
		try {
			setLoading(true)

			const storedContacts = localStorage.getItem("contacts")

			if (!storedContacts) {
				toast.error("No data present")
				return
			}

			const contacts: UserInterface[] = JSON.parse(storedContacts)

			const userExists = contacts.some((user) => user.id === data.id)

			if (!userExists) {
				toast.error("User not found")
				return
			}

			const updatedContacts = contacts.filter((user: UserInterface) => user.id !== data.id)

			localStorage.setItem(
				"contacts",
				JSON.stringify(updatedContacts)
			)

			toast.success("User contact deleted successfully")
			setOpenDelete(false)
			refetchData()

		} catch (error) {
			console.error("Error while deleting user contact:", error)
			toast.error("Error while deleting user contact")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="">
			<h1 className="text-base my-5">
				This action cannot be undone. This will permanently delete {data.name}'s account details from our servers.
			</h1>
			<Button
				onClick={handleDeleteUser}
				className="cursor-pointer"
			>
				{loading ? (
					<div className="flex items-center justify-between gap-2"><Spinner />Deleting...</div>
				) : (
					<div className="flex items-center justify-between gap-2"><Trash2 />Delete</div>
				)}
			</Button>
		</div>
	)
}