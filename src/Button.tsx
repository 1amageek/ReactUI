import React, { CSSProperties } from "react"

export const Button = ({ children, style, action }: { children: any, style?: CSSProperties, action: () => void }) => {
	return (
		<button className="button" style={style} onClick={action}>
			{children}
		</button>
	)
}