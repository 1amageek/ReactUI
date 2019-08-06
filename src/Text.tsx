import React, { CSSProperties } from "react"

export default ({ children, style }: { children: any, style?: CSSProperties }) => {
	return (
		<p className="text" style={style}>
			{children}
		</p>
	)
}