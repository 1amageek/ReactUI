import React, { CSSProperties } from "react"

export const NavigationBarTitle = ({ children, style }: { children: any, style?: CSSProperties }) => {
	return (
		<div className="navigation-bar-title" style={style}>
			{children}
		</div>
	)
}