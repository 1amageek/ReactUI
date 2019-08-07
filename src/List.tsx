import React, { CSSProperties } from "react"
import ReactDOM from "react-dom"

export default ({ children, style }: { children: any, style?: CSSProperties }) => {

	const ref = (self: HTMLUListElement) => {
		const chidren = Array.from(self.children)
	}

	return (
		<ul className="list expandable" style={style} ref={ref}>
			{React.Children.map(children, (child, index) => {
				return (
					<li className="list-cell">{child}</li>
				)
			})}
		</ul>
	)
}