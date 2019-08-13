import React, { useState, CSSProperties } from "react"
import { prepareLayout, layout } from "./LayoutEngine"
class Task {

	isCancelled: boolean = false

	private execute: () => void

	perform() {
		if (this.isCancelled) {
			return
		}
		this.execute()
	}

	cancel() {
		this.isCancelled = true
	}

	constructor(execute: () => void) {
		this.execute = execute
	}
}

export default ({ children, style }: { children: any, style?: CSSProperties }) => {

	const [windowSize, setWindowSize] = useState({ size: window.screen.width, height: window.screen.height })

	let task: Task | null

	window.addEventListener('resize', (event) => {
		if (task) {
			task.cancel()
		}
		const _task = new Task(() => {
			setTimeout(() => {
				if (!_task.isCancelled) {
					setWindowSize({ size: window.screen.width, height: window.screen.height })
				}
			}, 230)
		})
		task = _task
		_task.perform()
	})

	const ref = (host: HTMLDivElement | null) => {
		if (host) {
			prepareLayout(host)
			layout(host)
		}
	}

	return (
		<div className="host-view" style={style} ref={ref}>
			{children}
		</div>
	)
}