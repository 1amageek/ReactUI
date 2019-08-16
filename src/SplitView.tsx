import React, { CSSProperties } from "react"
import { prepareLayout } from "./LayoutEngine"

export const SplitView = ({ children, style, primaryColumnWidth }: { children: any, style?: CSSProperties, primaryColumnWidth?: number }) => {

	const _style: CSSProperties = { ...style }
	_style.gridTemplateColumns = primaryColumnWidth ? `${primaryColumnWidth}px 1fr` : "1fr 1fr"

	const ref = (element: HTMLElement | null) => {
		if (element) {
			prepareLayout(element)
			if (primaryColumnWidth) {
				if (element.children.length > 0) {
					(element.children[0] as HTMLElement).style.width = `${primaryColumnWidth}px`
				}
			}
		}
	}

	return (
		<div className="split-view expandable horizontal vertical row" style={_style} ref={ref}>
			{children}
		</div>
	)
}