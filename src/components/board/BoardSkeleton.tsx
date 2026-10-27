import { Spinner } from "../ui/spinner"

export const BoardSkeleton = () => {
	return (
		<div className="text-base flex items-center justify-center gap-3">
			<Spinner />Loading...
		</div>
	)
}