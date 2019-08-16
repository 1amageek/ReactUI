import React, { CSSProperties } from "react"
import { HorizontalAlignment } from "."
import { prepareLayout } from "./LayoutEngine"

export const HStack = ({ children, style, alignment = HorizontalAlignment.center, }: { children: any, style?: CSSProperties, alignment?: HorizontalAlignment }) => {

	const ref = (element: HTMLElement | null) => {
		if (element) {
			prepareLayout(element)
		}
	}

	return (
		<div className={"h-stack horizontal row " + alignment} style={style} ref={ref}>
			{children}
		</div>
	)
}