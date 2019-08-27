import React, { CSSProperties } from "react"

export const Toggle = ({ value, style, onChanged }: { value: boolean, style?: CSSProperties, onChanged: (event: any) => void  }) => {
	return (
		<input type="checkbox" checked={value} onChange={onChanged} style={style}  />
	)
}