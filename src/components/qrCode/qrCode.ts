import { LitElement, html } from "lit"
import { customElement } from "lit/decorators.js"
import styles from "./style.js"

@customElement("qr-code")
export class qrCode extends LitElement {
	render() {
		return html`
			<article>
				<header>
					<picture>
						<slot name="qr-code-image">No img provided</slot>
					</picture>
				</header>
				<main>
					<slot name="title">No title provided</slot>
					<slot name="description">No description provided</slot>
				</main>
			</article>
		`
	}

	static styles = styles
}

export default qrCode
