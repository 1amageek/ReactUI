import React, { CSSProperties } from "react"
import { VerticalAlignment } from "."

export const ZStack = ({ children, style, alignment = VerticalAlignment.center, }: { children: any, style?: CSSProperties, alignment?: VerticalAlignment }) => {
	return (
		<div className={"v-stack " + alignment} style={style}>
			{children}
		</div>
	)
}