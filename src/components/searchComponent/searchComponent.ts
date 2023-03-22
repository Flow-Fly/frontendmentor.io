import { LitElement, html, nothing, CSSResultGroup } from "lit"
import { customElement, query, property } from "lit/decorators.js"
import styles from "./style"
import { classMap } from "lit/directives/class-map.js"

@customElement("search-component")
export class searchComponent extends LitElement {
	@query('input[type="search"]')
	searchField!: HTMLInputElement

	@property({ type: Object }) inputError: {
		invalid: boolean
		message: string
	} = {
		invalid: false,
		message: "",
	}

	@property({ type: String, attribute: true }) api: string = ""

	async handleSubmit(event: Event) {
		event.preventDefault()
		if (this.searchField.value === "") {
			this.inputError = {
				message: "Whoops, can't be empty...",
				invalid: !this.inputError.invalid,
			}
			setTimeout(() => {
				this.inputError = { message: "", invalid: false }
			}, 1500)
			return
		}
		try {
			const raw = await fetch(`${this.api}/${this.searchField.value}`)

			if (raw.status !== 200)
				throw Error("Something went wrong.", { cause: raw })
			const [response] = await raw.json()
			const eventToEmit = new CustomEvent("result-from-search", {
				bubbles: true,
				composed: true,
				detail: response,
			})
			this.dispatchEvent(eventToEmit)
			// Send event
		} catch (error: any) {
			const cause = await error.cause.json()
			// console.error({ error: error.message, status: error.cause })
			const eventToEmit = new CustomEvent("fetch-error", {
				bubbles: true,
				composed: true,
				detail: cause,
			})
			this.dispatchEvent(eventToEmit)
		}
	}
	render() {
		return html`
			<form @submit=${this.handleSubmit}>
				<input
					class=${classMap(this.inputError)}
					placeholder="Search a word"
					type="search"
					pattern="^\\w+\\s*$"
					title="Only one word allowed" />
				<picture>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 18 18">
						<path
							fill="none"
							stroke="#A445ED"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z" />
					</svg>
				</picture>
			</form>
			${this.inputError.invalid
				? html`<h3>${this.inputError.message}</h3>`
				: nothing}
		`
	}

	static styles?: CSSResultGroup | undefined = styles
}

export default searchComponent
