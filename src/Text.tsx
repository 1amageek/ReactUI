import React, { CSSProperties } from "react"

export const Text = ({ children, style, onClick }: { children: any, style?: CSSProperties, onClick?: (event: any) => void }) => {
	return (
		<p className="text" style={style} onClick={onClick}>
			{children}
		</p>
	)
}