import React, { CSSProperties } from "react"

export const Text = ({ children, style }: { children: any, style?: CSSProperties }) => {
	return (
		<p className="text" style={style}>
			{children}
		</p>
	)
}