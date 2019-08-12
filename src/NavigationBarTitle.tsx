import React, { CSSProperties } from "react"

export default ({ children, style }: { children: any, style?: CSSProperties }) => {
	return (
		<div className="navigation-bar-title" style={style}>
			{children}
		</div>
	)
}