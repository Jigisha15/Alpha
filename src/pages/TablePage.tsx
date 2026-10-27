import { type UserInterface } from "../interfaces/UserInterface"
import { DataTable } from "../components/table/DataTable"

interface TablePageInterface {
	data: UserInterface[]
	refetchData: () => void
}

export const TablePage = ({ data, refetchData }: TablePageInterface) => {

	const columns: { id: number, title: string }[] = [
		{
			id: 1,
			title: "Sr. No."
		},
		{
			id: 2,
			title: "Actions"
		},
		{
			id: 3,
			title: "Name"
		},
		{
			id: 4,
			title: "Email Id"
		},
		{
			id: 5,
			title: "Company"
		},
		{
			id: 6,
			title: "Labels"
		},
		{
			id: 7,
			title: "Stage"
		},
	]

	return (
		<div className="">
			<DataTable data={data} columns={columns} refetchData={refetchData} />
		</div>
	)
}