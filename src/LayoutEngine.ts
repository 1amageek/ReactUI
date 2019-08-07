
export enum Axis {
	horizontal = "horizontal",
	vertical = "vertical"
}

export class LayoutEngine {

	private static getOutsideHeightDeterminedElement(element: HTMLElement): HTMLElement {
		const height = element.style.height
		if (height) {
			return element
		}
		return this.getOutsideHeightDeterminedElement(element.parentElement as HTMLElement)
	}

	private static getOutsideWidthDeterminedElement(element: HTMLElement): HTMLElement {
		const width = element.style.width
		if (width) {
			return element
		}
		return this.getOutsideWidthDeterminedElement(element.parentElement as HTMLElement)
	}

	private static getOutsideDeterminedHeight(element: HTMLElement): number {
		const outsideDeterminedElement = this.getOutsideHeightDeterminedElement(element)
		const height = outsideDeterminedElement.style.height
		if (height) {
			if (height.includes("%")) {
				return outsideDeterminedElement.getBoundingClientRect().height
			}
			return parseInt(height)
		}
		return 0
	}

	private static getOutsideDeterminedWidth(element: HTMLElement): number {
		const outsideDeterminedElement = this.getOutsideWidthDeterminedElement(element)
		const width = outsideDeterminedElement.style.width
		if (width) {
			if (width.includes("%")) {
				return outsideDeterminedElement.getBoundingClientRect().width
			}
			return parseInt(width)
		}
		return 0
	}

	private static getOutsideElementsHeight(element: HTMLElement): number {
		const parent = (element.parentElement as HTMLElement)
		if (parent.className.includes("h-stack")) {
			return 0
		}
		const elements = Array.from(parent.children).filter(item => (!item.isEqualNode(element)) && (!item.className.includes("expandable")))
		const elementsLength = elements.map((element) => (element as HTMLElement).getBoundingClientRect().height).reduce((prev, current) => prev + current, 0)
		return elementsLength
	}

	private static getOutsideElementsWidth(element: HTMLElement): number {
		const parent = (element.parentElement as HTMLElement)
		if (parent.className.includes("v-stack")) {
			return 0
		}
		const elements = Array.from(parent.children).filter(item => (!item.isEqualNode(element)) && (!item.className.includes("expandable")))
		const elementsLength = elements.map((element) => (element as HTMLElement).getBoundingClientRect().width).reduce((prev, current) => prev + current, 0)
		return elementsLength
	}

	private static getInsideElementsHeight(element: HTMLElement): number {
		const elements = Array.from(element.children)
		const elementsLength = elements
		.filter(item => !item.className.includes("expandable"))
		.map((item) => {
			const element = (item as HTMLElement)
			const height = element.style.height
			if (height) {
				if (height.includes("%")) {
					return element.getBoundingClientRect().height
				}
				return parseInt(height)
			}
			if (Array.from(element.children).length === 0) {
				return element.getBoundingClientRect().height
			}
			return this.getInsideElementsHeight(element)
		})
			.reduce((prev, current) => prev + current, 0)
		return elementsLength
	}

	private static getInsideElementsWidth(element: HTMLElement): number {
		const elements = Array.from(element.children)
		const elementsLength = elements
		.filter(item => !item.className.includes("expandable"))
		.map((item) => {
			const element = (item as HTMLElement)
			const width = element.style.width
			if (width) {
				if (width.includes("%")) {
					return element.getBoundingClientRect().width
				}
				return parseInt(width)
			}
			if (Array.from(element.children).length === 0) {
				return element.getBoundingClientRect().width
			}
			return this.getInsideElementsWidth(element)
		})
			.reduce((prev, current) => prev + current, 0)
		return elementsLength
	}

	static getHeightExpandableElements(element: HTMLElement, axis: Axis) {
		return Array.from(this.getOutsideHeightDeterminedElement(element)
					.querySelectorAll(".expandable"))
					.filter((item) => {
						return (item.parentElement as HTMLElement).className.includes("v-stack") ||
						!(item as HTMLElement).className.includes("spacer")
					})
		// switch (axis) {
		// 	case Axis.horizontal: {
		// 		return Array.from(this.getOutsideHeightDeterminedElement(element)
		// 			.querySelectorAll(".expandable"))
		// 			.filter((item) => (item.parentElement as HTMLElement).className.includes("v-stack"))
		// 	}
		// 	case Axis.vertical: {
		// 		return Array.from(this.getOutsideHeightDeterminedElement(element)
		// 			.querySelectorAll(".expandable"))
		// 			.filter((item) => (item.parentElement as HTMLElement).className.includes("v-stack"))
		// 	}
		// }
	}

	static getWidthExpandableElements(element: HTMLElement, axis: Axis) {
		return Array.from(this.getOutsideWidthDeterminedElement(element)
					.querySelectorAll(".expandable"))
					.filter((item) => {
						return (item.parentElement as HTMLElement).className.includes("h-stack") ||
						!(item as HTMLElement).className.includes("spacer")
					})
		// switch (axis) {
		// 	case Axis.horizontal: {
		// 		return Array.from(this.getOutsideWidthDeterminedElement(element)
		// 			.querySelectorAll(".expandable"))
		// 			.filter((item) => {
		// 				(item.parentElement as HTMLElement).className.includes("h-stack") ||
		// 				!(item as HTMLElement).className.includes("spacer")
		// 			})
		// 	}
		// 	case Axis.vertical: {
		// 		return Array.from(this.getOutsideWidthDeterminedElement(element)
		// 			.querySelectorAll(".expandable"))
		// 			.filter((item) => (item.parentElement as HTMLElement).className.includes("h-stack") || (item.parentElement as HTMLElement).className.includes("spacer"))
		// 	}
		// }
	}

	static getOptimizedExpandableHeight(element: HTMLElement, axis: Axis): number {
		const expandables = this.getHeightExpandableElements(element, axis)
		if (expandables.length === 0) {
			return 0
		}
		const maxLength = this.getOutsideDeterminedHeight(element)
		const outsideElementsLength = this.getOutsideElementsHeight(element)
		const inseideElementsLength = this.getInsideElementsHeight(element)
		const growthableLength = maxLength - outsideElementsLength - inseideElementsLength
		const length = growthableLength / expandables.length
		return length
	}

	static getOptimizedExpandableWidth(element: HTMLElement, axis: Axis): number {
		const expandables = this.getWidthExpandableElements(element, axis)
		if (expandables.length === 0) {
			return 0
		}
		const maxLength = this.getOutsideDeterminedWidth(element)
		const outsideElementsLength = this.getOutsideElementsWidth(element)
		const inseideElementsLength = this.getInsideElementsWidth(element)
		const growthableLength = maxLength - outsideElementsLength - inseideElementsLength
		const length = growthableLength / expandables.length
		return length
	}

}