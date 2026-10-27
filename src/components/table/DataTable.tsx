import { SquarePen, X, Trash2 } from "lucide-react"
import type { UserInterface } from "../../interfaces/UserInterface"
import { DeleteUserForm } from "../common/DeleteUserForm"
import { EditUserForm } from "../common/EditUserForm"
import { Badge } from "../ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useState } from "react"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"

interface DataTableInterface {
	data: UserInterface[]
	columns: any[]
	refetchData: () => void
}

export const DataTable = ({ data, columns, refetchData }: DataTableInterface) => {

	const [openUpdate, setOpenUpdate] = useState<boolean>(false)
	const [openDelete, setOpenDelete] = useState<boolean>(false)

	return (
		<div className="">
			<Table className="border rounded-20">
				<TableCaption className="">A list of your business contacts.</TableCaption>

				<TableHeader>
					<TableRow>
						{columns.map((col: { id: number, title: string }) => (
							<TableHead className="" key={col.id}>{col.title}</TableHead>
						))}
					</TableRow>
				</TableHeader>

				<TableBody>
					{data.map((user: UserInterface, index: number) => (
						<TableRow
							key={user.id}
							className={index % 2 === 1 ? "bg-muted/50" : ""}
						>
							<TableCell className="">{index + 1}.</TableCell>

							{/*<TableCell className="space-x-4">*/}
							<TableCell className="">

								<div className="flex items-center justify-start gap-4">

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

							</TableCell>

							<TableCell className="flex items-center justify-start gap-3">
								<h1 className="">{user.name}</h1>
								<Badge variant="outline" className="">{user.role}</Badge>
							</TableCell>
							<TableCell className="">{user.email}</TableCell>
							<TableCell className="">{user.company}</TableCell>
							<TableCell className="">{user.labels}</TableCell>
							<TableCell className="">{user.stage}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}