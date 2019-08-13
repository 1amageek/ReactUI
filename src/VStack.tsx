import React, { CSSProperties } from "react"
import { VerticalAlignment } from "."
import { prepareLayout } from "./LayoutEngine"

export default ({ children, style, alignment = VerticalAlignment.center, }: { children: any, style?: CSSProperties, alignment?: VerticalAlignment }) => {

	const ref = (element: HTMLElement | null) => {
		if (element) {
			prepareLayout(element)
		}
	}

	return (
		<div className={"v-stack vertical column " + alignment} style={style} ref={ref}>
			{children}
		</div>
	)
}