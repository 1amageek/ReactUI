import React, { CSSProperties } from "react"
import { VerticalAlignment } from "."

export default ({ children, style, alignment = VerticalAlignment.center, }: { children: any, style?: CSSProperties, alignment?: VerticalAlignment }) => {

	return (
		<div className={"v-stack column " + alignment} style={style}>
			{children}
		</div>
	)
}