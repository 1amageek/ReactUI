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

export const HostView = ({ children, style }: { children: any, style?: CSSProperties }) => {

	let task: Task | null

	if (window) {

		const [windowSize, setWindowSize] = useState({ size: window.screen.width, height: window.screen.height })

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
	}

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