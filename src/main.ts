import "./components"

const eventCatcher = document.body
const displayer = document.querySelector("definition-displayer")

eventCatcher.addEventListener("change-theme", function (event) {
	const theme = (event as CustomEvent).detail
	document.documentElement.className = theme
})

eventCatcher.addEventListener("fetch-error", (event: Event) => {
	event.stopImmediatePropagation()
	const clonedEvent = cloneEvent(event as CustomEvent)
	displayer?.dispatchEvent(clonedEvent)
})

eventCatcher.addEventListener("result-from-search", (event: Event) => {
	event.stopImmediatePropagation()
	const clonedEvent = cloneEvent(event as CustomEvent)
	displayer?.dispatchEvent(clonedEvent)
})

function cloneEvent(event: CustomEvent): CustomEvent {
	const clone = new CustomEvent(event.type, {
		bubbles: true,
		composed: true,
		detail: event.detail,
	})
	return clone
}
