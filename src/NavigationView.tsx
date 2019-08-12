import React, { CSSProperties } from "react"

export default ({ children, style }: { children: any, style?: CSSProperties }) => {

	const ref = (element: HTMLDivElement) => {
		const elements = Array.from(element.children).filter(item => !item.className.includes("applicatal") && !item.className.includes("navigation-bar"))
		elements.forEach(item => (item as HTMLElement).style.paddingTop = "96px")
	}

	return (
		<div className="navigation-view column expandable horizontal vertical" style={style} ref={ref}>
			{children}
		</div>
	)
}