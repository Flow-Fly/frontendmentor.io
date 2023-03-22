import { LitElement, html, nothing } from "lit"
import { customElement, state, property } from "lit/decorators.js"
import { styleMap } from "lit/directives/style-map.js"
import style from "./style.js"
interface Fonts {
	readonly [key: string]: string
}

const fontRef: Fonts = {
	"Sans Serif": "Inter",
	Serif: "Lora",
	Mono: "Inconsolata",
}

@customElement("font-selector")
export class fontSelector extends LitElement {
	@property({ type: String }) selectedFont: string = "Sans Serif"
	@property()
	styles: Fonts[] = Object.values(fontRef).map((font) => ({ fontFamily: font }))
	@state()
	private checked: boolean = false

	handleCheck() {
		this.checked = !this.checked
	}

	switchFont(event: Event) {
		const target = event.target as HTMLElement

		document.documentElement.style.setProperty(
			"--current-font",
			target.dataset.font ?? "Inter"
		)
		if (target.textContent) this.selectedFont = target.textContent
	}

	render() {
		console.log(this.selectedFont)
		return html`
			<label for="font-select">
				<p class="current-font">${this.selectedFont}</p>
				<input
					?checked=${this.checked}
					@change=${this.handleCheck}
					type="checkbox"
					id="font-select" />
				<img src="images/icon-arrow-down.svg" alt="font selector" />
			</label>
			${this.checked
				? html`
						<ul>
							${Object.keys(fontRef).map((font, i) => {
								return html`<li style="${styleMap(this.styles[i])}">
									<span data-font=${fontRef[font]} @click="${this.switchFont}"
										>${font}</span
									>
								</li>`
							})}
						</ul>
				  `
				: nothing}
		`
	}

	static styles = style
}

export default fontSelector
