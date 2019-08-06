import React, { CSSProperties } from "react"

export default ({ children, style }: { children: any, style?: CSSProperties }) => {

	return (
		<div className="host-view" style={style}>
			{children}
		</div>
	)
}