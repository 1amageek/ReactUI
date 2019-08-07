import React, { CSSProperties, createRef, useEffect } from "react"
import ReactDOM from "react-dom"
import { setFlagsFromString } from "v8";

export default ({ style }: { style?: CSSProperties, minLength?: string }) => {
	return (
		<div className="spacer expandable" style={style}>
		</div>
	)
}