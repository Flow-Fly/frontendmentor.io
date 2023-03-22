import { LitElement, html, CSSResultGroup, css } from "lit"
import { customElement, state, query, property } from "lit/decorators.js"
import styles from "./style"
@customElement("theme-toggle")
export class themeToggle extends LitElement {
	@property()
	// Add public properties (attributes) here
	@state()
	theme = this.preferedTheme
	// Add private properties here
	@query("css-selector")
	// css selector
	get preferedTheme() {
		let theme: string | null = localStorage.getItem("theme")
		if (theme) {
			this.updateTheme(theme)
			return theme
		}
		theme = matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light"
		// Should emit a custom event to modify the app based on the theme retrieved

		this.updateTheme(theme)
		return theme
	}
	set preferedTheme(newTheme: string) {
		localStorage.setItem("theme", newTheme)
		this.theme = newTheme

		this.updateTheme(newTheme)
	}

	async updateTheme(theme: string) {
		const event = new CustomEvent("change-theme", {
			bubbles: true,
			composed: true,
			detail: theme,
		})
		await this.updateComplete
		console.log(theme)
		this.dispatchEvent(event)
	}

	otherTheme(current: string): string {
		return current === "dark" ? "light" : "dark"
	}
	render() {
		return html`
			<label for="theme-input">
				<input
					?checked=${this.theme === "dark"}
					type="checkbox"
					@change=${() => (this.preferedTheme = this.otherTheme(this.theme))}
					id="theme-input" />
				<span id="theme-toggle"></span>
				<picture>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="22"
						height="22"
						viewBox="0 0 22 22">
						<path
							fill="none"
							stroke="#838383"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z" />
					</svg>
				</picture>
			</label>
		`
	}

	static styles?: CSSResultGroup | undefined = styles
}

export default themeToggle
