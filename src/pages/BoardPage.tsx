import type { Dispatch, SetStateAction } from "react"
import { CardTemplate } from "../components/board/CardTemplate"
import type { UserInterface } from "../interfaces/UserInterface"
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban"

interface BoardPageInterface {
	data: UserInterface[]
	setData: Dispatch<SetStateAction<UserInterface[]>>,
	refetchData: () => void
}

export const BoardPage = ({ data, setData, refetchData }: BoardPageInterface) => {

	const handleUpdateRole = (args: any) => {
		if (args.requestType !== "cardChanged") return

		const changedRecords = args.changedRecords as UserInterface[]

		setData((prevData) =>
			prevData.map((user) => {
				const changedUser = changedRecords.find(
					(record) => record.id === user.id
				)

				return changedUser
					? { ...user, role: changedUser.role }
					: user
			})
		)

		refetchData()
	}

	return (
		<div className="App">
			<KanbanComponent
				id="kanban"
				keyField="role"
				dataSource={data}
				actionComplete={handleUpdateRole}
				cardSettings={{
					headerField: "id",
					template: (props: UserInterface) => CardTemplate({ user: props, refetchData })
				}}
			//enableTooltip={true}
			//tooltipTemplate={CardToolTipTemplate.bind(this)}
			>
				<ColumnsDirective>
					<ColumnDirective
						headerText="Lead"
						keyField="Lead"
					/>
					<ColumnDirective
						headerText="Prospect"
						keyField="Prospect"
					/>
					<ColumnDirective
						headerText="Qualified"
						keyField="Qualified"
					/>
					<ColumnDirective
						headerText="Customer"
						keyField="Customer"
					/>
				</ColumnsDirective>
			</KanbanComponent>
		</div>
	)
}