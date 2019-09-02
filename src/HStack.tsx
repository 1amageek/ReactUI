import React, { CSSProperties } from "react"
import { HorizontalAlignment } from "."
import { prepareLayout } from "./LayoutEngine"

export const HStack = ({ children, style, alignment = HorizontalAlignment.center, onClick }: { children: any, style?: CSSProperties, alignment?: HorizontalAlignment, onClick?: (event: any) => void }) => {

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