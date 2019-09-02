import React, { CSSProperties } from "react"
import { VerticalAlignment } from "."
import { prepareLayout } from "./LayoutEngine"

export const VStack = ({ children, style, alignment = VerticalAlignment.center, onClick }: { children: any, style?: CSSProperties, alignment?: VerticalAlignment, onClick?: (event: any) => void }) => {

	const ref = (element: HTMLElement | null) => {
		if (element) {
			prepareLayout(element)
		}
	}

	return (
		<div className={"v-stack vertical column " + alignment} style={style} ref={ref} onClick={onClick}>
			{children}
		</div>
	)
}