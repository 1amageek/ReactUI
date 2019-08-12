import React, { CSSProperties } from "react"
import { NavigationBarAlignment } from "."

export default ({ children, style, alignment }: { children: any, style?: CSSProperties, alignment: NavigationBarAlignment }) => {
	return (
		<div className={"navigation-bar-item " + alignment} style={style}>
			{children}
		</div>
	)
}