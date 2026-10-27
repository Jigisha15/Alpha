import { useEffect, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react"
import { ROLE, type UserInterface } from "../../interfaces/UserInterface"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import toast from "react-hot-toast"
import { Spinner } from "../ui/spinner"
import { SquarePen } from "lucide-react"
import { Textarea } from "../ui/textarea"

interface EditUserFormInterface {
	data: UserInterface
	setOpenUpdate: Dispatch<SetStateAction<boolean>>
	refetchData: () => void
}

export const EditUserForm = ({ data, setOpenUpdate, refetchData }: EditUserFormInterface) => {

	const [loading, setLoading] = useState<boolean>(false)
	const [formData, setFormData] = useState<UserInterface>({
		id: "",
		name: "",
		email: "",
		company: "",
		labels: "",
		notes: "",
		owner: "",
		role: ROLE.Customer,
		stage: ""
	})

	useEffect(() => {
		setFormData(data)
	}, [data])

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	const handleUpdateUser = () => {
		try {
			setLoading(true)

			const storedContacts = localStorage.getItem("contacts")

			if (!storedContacts) {
				toast.error("No data present")
				return
			}

			const contacts: UserInterface[] = JSON.parse(storedContacts)

			const userExists = contacts.some(
				(user) => user.id === formData.id
			)

			if (!userExists) {
				toast.error("User not found")
				return
			}

			const updatedContacts = contacts.map((user) =>
				user.id === formData.id
					? { ...user, ...formData }
					: user
			)

			localStorage.setItem(
				"contacts",
				JSON.stringify(updatedContacts)
			)

			toast.success("Contact updated successfully")
			setOpenUpdate(false)
			refetchData()

		} catch (error) {
			console.error("Error while updating user contact:", error)
			toast.error("Error while updating user contact")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="space-y-4 w-full">

			<div className="space-y-1 w-full">
				<Label htmlFor="name">Name</Label>
				<Input
					type="text"
					name="name"
					id="name"
					value={formData.name}
					onChange={handleChange}
				/>
			</div>

			<div className="space-y-1 w-full">
				<Label htmlFor="email">Email</Label>
				<Input
					type="email"
					name="email"
					id="email"
					value={formData.email}
					onChange={handleChange}
				/>
			</div>

			<div className="space-y-1 w-full">
				<Label htmlFor="company">Company</Label>
				<Input
					type="text"
					name="company"
					id="company"
					value={formData.company}
					onChange={handleChange}
				/>
			</div>

			<div className="space-y-1 w-full">
				<Label htmlFor="owner">Owner</Label>
				<Input
					type="text"
					name="owner"
					id="owner"
					value={formData.owner}
					onChange={handleChange}
				/>
			</div>

			<div className="space-y-1 w-full">
				<Label htmlFor="labels">Labels</Label>
				<Input
					type="text"
					name="labels"
					id="labels"
					value={formData.labels}
					onChange={handleChange}
				/>
			</div>

			<div className="space-y-1 w-full">
				<Label htmlFor="stage">Stage</Label>
				<Input
					type="text"
					name="stage"
					id="stage"
					value={formData.stage}
					onChange={handleChange}
				/>
			</div>

			<div className="space-y-1 w-full">
				<Label htmlFor="notes">Notes</Label>
				<Textarea
					name="notes"
					id="notes"
					value={formData.notes}
					onChange={handleChange}
				/>
			</div>

			<Button
				onClick={handleUpdateUser}
				className="cursor-pointer"
			>
				{loading ? (
					<div className="flex items-center justify-between gap-2"><Spinner />Updating...</div>
				) : (
					<div className="flex items-center justify-between gap-2"><SquarePen />Update</div>
				)}
			</Button>

		</div>
	)
}