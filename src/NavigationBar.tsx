import React, { CSSProperties } from "react"
import ReactDom from "react-dom"

export default ({ children, style }: { children: any, style?: CSSProperties }) => {
	const _style: CSSProperties = {...style}
	_style.height = "96px"
	_style.top = 0
	return (
		<div className="navigation-bar expandable horizontal applicatal" style={_style}>
			{children}
		</div>
	)
}