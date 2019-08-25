import React, { CSSProperties, useState } from "react"
import { TextFieldType } from "./index"

export const TextField = ({ style, title, type = TextFieldType.text, value, onEditingChanged }: { style?: CSSProperties, title?: string, type?: TextFieldType, value?: string, onEditingChanged: (text: string) => void }) => {

	const _type = type || TextFieldType.text

	const [inputValue, setValue] = useState<string | undefined>(value)

	const onChange = (event: any) => {
		setValue(event.target.value)
		onEditingChanged(event.target.value)
	}

	return (
		<div className="text-field expandable horizontal row" style={style}>
			<input type={_type} placeholder={title} value={inputValue} onChange={onChange} />
		</div>
	)
}