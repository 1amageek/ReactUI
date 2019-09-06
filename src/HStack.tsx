import React, { CSSProperties } from "react"
import { VerticalAlignment } from "."
import { prepareLayout } from "./LayoutEngine"

export const HStack = ({ children, style, alignment = VerticalAlignment.center, onClick }: { children: any, style?: CSSProperties, alignment?: VerticalAlignment, onClick?: (event: any) => void }) => {

	const ref = (element: HTMLElement | null) => {
		if (element) {
			prepareLayout(element)
		}
	}

	return (
		<div className={"h-stack horizontal row " + alignment} style={style} ref={ref} onClick={onClick}>
			{children}
		</div>
	)
}