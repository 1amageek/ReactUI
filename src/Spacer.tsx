import React, { CSSProperties } from "react"

export const Spacer = ({ style }: { style?: CSSProperties, minLength?: string }) => {

	return (
		<div className="spacer expandable" style={style}>
		</div>
	)
}