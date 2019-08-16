import React, { CSSProperties } from "react"
import { prepareLayout } from "./LayoutEngine"

export const NavigationView = ({ children, style }: { children: any, style?: CSSProperties }) => {

	const _style: CSSProperties = {...style}
	_style.paddingTop = "96px"

	const ref = (element: HTMLDivElement | null) => {
		if (element) {
			const elements = Array.from(element.children).filter(item => !item.className.includes("applicatal") &&
				!item.className.includes("navigation-bar") &&
				(item.className.includes("expandable") && item.className.includes("vertical")))
			// elements.forEach(item => (item as HTMLElement).style.paddingTop = "96px")
			prepareLayout(element)
		}
	}

	return (
		<div className="navigation-view column expandable horizontal vertical" style={_style} ref={ref}>
			{children}
		</div>
	)
}