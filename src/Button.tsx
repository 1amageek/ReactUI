import React, { CSSProperties } from "react"

export const Button = ({ children, style, onClick }: { children: any, style?: CSSProperties, onClick?: (event: any) => void }) => {
	return (
		<button className="button" style={style} onClick={onClick}>
			{children}
		</button>
	)
}