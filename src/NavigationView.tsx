import React, { CSSProperties } from "react"
import { prepareLayout, layout } from "./LayoutEngine"

export const NavigationView = ({ children, style }: { children: any, style?: CSSProperties }) => {

	const _style: CSSProperties = {...style}
	_style.paddingTop = "96px"

	const ref = (element: HTMLDivElement | null) => {
		if (element && element.parentElement) {
			prepareLayout(element.parentElement)
			layout(element.parentElement)
		}
	}

	return (
		<div className="navigation-view column expandable horizontal vertical" style={_style} ref={ref}>
			{children}
		</div>
	)
}