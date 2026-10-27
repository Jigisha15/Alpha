import { Skeleton } from "../ui/skeleton"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

export const TableSkeleton = () => {
	return (
		<div className="">
			<Table className="">
				<TableCaption>A list of your business contacts.</TableCaption>
				<TableHeader className="w-full">
					<TableRow className="w-full">
						{Array.from({ length: 5 }).map((_, index) => (
							<TableHead className="" key={index}>
								<Skeleton className="w-65 h-5 rounded-full" />
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody className="w-full">
					{Array.from({ length: 5 }).map((_, index) => (
						<TableRow key={index} className="w-full">
							<TableCell className="font-medium">
								<Skeleton className="w-full h-5 rounded-full" />
							</TableCell>
							<TableCell>
								<Skeleton className="w-full h-5 rounded-full" />
							</TableCell>
							<TableCell>
								<Skeleton className="w-full h-5 rounded-full" />
							</TableCell>
							<TableCell className="text-right">
								<Skeleton className="w-full h-5 rounded-full" />
							</TableCell>
							<TableCell className="text-right">
								<Skeleton className="w-full h-5 rounded-full" />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}