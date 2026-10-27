import { SquarePen, Trash2, X } from "lucide-react"
import type { UserInterface } from "../../interfaces/UserInterface"
import { Card } from "../ui/card"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { EditUserForm } from "../common/EditUserForm"
import { useState } from "react"
import { DeleteUserForm } from "../common/DeleteUserForm"

interface CardTemplateInterface {
	user: UserInterface
	refetchData: () => void
}

export const CardTemplate = ({ user, refetchData }: CardTemplateInterface) => {

	const [openUpdate, setOpenUpdate] = useState<boolean>(false)
	const [openDelete, setOpenDelete] = useState<boolean>(false)

	return (
		<Card className="w-full border-0 rounded-sm border-l-4 border-black py-3 px-4 gap-5">
			<div className="flex items-center justify-between">
				<h1 className="font-semibold">{user.name}</h1>

				<div className="flex items-center justify-center gap-3">

					<AlertDialog open={openUpdate} onOpenChange={setOpenUpdate}>
						<AlertDialogTrigger className="cursor-pointer border rounded-full bg-green-50 border-green-200  p-2">
							<SquarePen color="green" size={18} />
						</AlertDialogTrigger>

						<AlertDialogContent className="">
							<AlertDialogHeader>

								<AlertDialogTitle className="flex items-center justify-between w-full">
									<h1>Edit <span className="font-semibold">{user.name}'s</span> Details</h1>
									<AlertDialogCancel className="cursor-pointer"><X /></AlertDialogCancel>
								</AlertDialogTitle>

								<EditUserForm data={user} setOpenUpdate={setOpenUpdate} refetchData={refetchData} />

							</AlertDialogHeader>
						</AlertDialogContent>
					</AlertDialog>

					<AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
						<AlertDialogTrigger className="cursor-pointer border rounded-full bg-red-50 border-red-200 p-2">
							<Trash2 color="red" size={18} />
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle className="flex items-center justify-between w-full">
									<h1>Delete <span className="font-semibold">{user.name}'s</span> Details</h1>
									<AlertDialogCancel className="cursor-pointer"><X /></AlertDialogCancel>
								</AlertDialogTitle>
								<DeleteUserForm data={user} setOpenDelete={setOpenDelete} refetchData={refetchData} />
							</AlertDialogHeader>
						</AlertDialogContent>
					</AlertDialog>

				</div>
				{/*<Badge variant="outline" className="">{user.stage}</Badge>*/}
			</div>
			<div className="space-y-1">
				<h1 className="">Email : {user.email}</h1>
				<h1 className="">Company : {user.company}</h1>
				<h1 className="">Role : {user.role}</h1>
				<h1 className="">Stage : {user.stage}</h1>
			</div>
		</Card>
	)
}