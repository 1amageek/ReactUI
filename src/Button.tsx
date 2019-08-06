import React, { CSSProperties } from "react"

export default ({ children, style, action }: { children: any, style: CSSProperties, action: () => void }) => {
	return (
		<div className="button" style={style} onClick={action}>
			{children}
		</div>
	)
}