import React, { CSSProperties } from "react"
import { prepareLayout, layout } from "./LayoutEngine"

export const NavigationBar = ({ children, style }: { children: any, style?: CSSProperties }) => {
	const _style: CSSProperties = {...style}
	_style.height = "96px"
	_style.top = 0

	const ref = (element: HTMLDivElement | null) => {
		if (element) {
			prepareLayout(element)
			layout(element)
		}
	}

	return (
		<div className="navigation-bar expandable horizontal applicatal" style={_style} ref={ref}>
			{children}
		</div>
	)
}