import React, { CSSProperties } from "react"
import { HorizontalAlignment } from "."

export default ({ children, style, alignment = HorizontalAlignment.center, }: { children: any, style?: CSSProperties, alignment?: HorizontalAlignment }) => {

	return (
		<div className={"h-stack row " + alignment} style={style}>
			{children}
		</div>
	)
}