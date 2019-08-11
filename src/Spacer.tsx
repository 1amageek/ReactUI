import React, { CSSProperties, createRef, useEffect } from "react"

export default ({ style }: { style?: CSSProperties, minLength?: string }) => {

	const ref = (self: HTMLDivElement) => {
		// if ((self.parentElement as HTMLElement).className.includes("h-stack") && !self.className.includes("horizontal")) {
		// 	self.className += " horizontal"
		// }
		// if ((self.parentElement as HTMLElement).className.includes("v-stack") && !self.className.includes("vertical")) {
		// 	self.className += " vertical"
		// }
	}

	return (
		<div className="spacer expandable" style={style} ref={ref}>
		</div>
	)
}