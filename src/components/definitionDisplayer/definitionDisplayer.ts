import { LitElement, html, CSSResultGroup, nothing } from "lit"
import { customElement, state } from "lit/decorators.js"
import { map } from "lit/directives/map.js"
import styles from "./style"

interface Definition {
	word: string
	phonetic: string
	audio: HTMLAudioElement | null
	meanings: Array<WordMeaning>
	source: string
}
interface WordMeaning {
	partOfSpeech: string
	definitions: { example?: string | null; definition: string }[]
	synonyms: String[] | null
	antonyms: String[] | null
}
interface OriginalMeanings {
	partOfSpeech: string
	definitions: { definition: string; example?: string | null }[]
	synonyms: String[]
	antonyms: String[]
}

interface ApiError {
	displayed: boolean
	title?: string
	message?: string
	resolution?: string
}

@customElement("definition-displayer")
export class definitionDisplayer extends LitElement {
	constructor() {
		super()
		this.addEventListener("fetch-error", (event) => this.handleError(event))
		this.addEventListener("result-from-search", (event) =>
			this.handleResult(event)
		)
	}

	@state()
	protected displayError: ApiError = { displayed: false }
	@state()
	protected definition: Definition | null = null

	handleError(event: Event) {
		event.stopPropagation()

		const error = (event as CustomEvent).detail
		console.log(error)
		this.displayError = { ...error, displayed: true }
	}

	handleResult(event: Event) {
		event.stopPropagation()
		console.log(event)
		const { detail } = event as CustomEvent
		const word: Definition = {
			word: detail.word,
			phonetic: detail.phonetic,
			audio: getAudioString(detail.phonetics),
			meanings: mapMeanings(detail.meanings),
			source: detail.sourceUrls[0] ?? null,
		}
		this.displayError = { ...this.displayError, displayed: false }
		this.definition = word
	}

	async playAudio() {
		console.log("here")
		try {
			await this.definition?.audio?.play()
		} catch (error) {
			console.log({ message: "failed to play", error })
		}
	}

	landingPage() {
		return html` <h2 class="welcome">Search for a word to get started!</h2> `
	}
	errorPage() {
		return html`
			<div class="error">
				<p class="emoji">😕</p>
				<h3>${this.displayError.title}</h3>
				<p>${this.displayError.message} ${this.displayError.resolution}</p>
			</div>
		`
	}
	render() {
		console.log(this.definition)
		if (!this.definition && !this.displayError.displayed) {
			return this.landingPage()
		}
		if (this.displayError.displayed || !this.definition) {
			return this.errorPage()
		}
		return html`
			<section class="heading">
				<header>
					<h1>${this.definition.word}</h1>
					<h2>${this.definition.phonetic}</h2>
				</header>
				${this.definition.audio
					? html`
							<picture>
								<img
									@click=${this.playAudio}
									src="images/icon-play.svg"
									alt="play word spelling" />
							</picture>
					  `
					: nothing}
			</section>
			${map(this.definition.meanings, (meaning) => {
				return html`
					<article>
						<header>
							<h3 class="define">${meaning.partOfSpeech}</h3>
						</header>
						<h3>Meaning</h3>
						<ul>
							${map(meaning.definitions, (def) => {
								return html`
									<li>
										<p>${def.definition}</p>
										${def.example
											? html`<blockquote>${def.example}</blockquote>`
											: nothing}
									</li>
								`
							})}
						</ul>
						${meaning.synonyms
							? html`
									<div class="list">
										<h3>Synonyms</h3>
										<h3 class="word-list">
											${map(meaning.synonyms, (w) => html`<span>${w}</span>`)}
										</h3>
									</div>
							  `
							: nothing}
						${meaning.antonyms
							? html`
									<div class="list">
										<h3>Antonyms</h3>
										<h3 class="word-list">
											${map(meaning.antonyms, (w) => html`<span>${w}</span>`)}
										</h3>
									</div>
							  `
							: nothing}
					</article>
				`
			})}
			<hr />
			<section class="source">
				<p class="source">Source</p>
				<a class="source" href=${this.definition.source} target="_blank"
					>${this.definition.source}
					<figure>
						<img src="images/icon-new-window.svg" alt="" /></figure
				></a>
			</section>
		`
	}
	static styles?: CSSResultGroup | undefined = styles
}

export default definitionDisplayer

function getAudioString(array: { audio: string }[]): HTMLAudioElement | null {
	for (const value of array) {
		if (value.audio) {
			return new Audio(value.audio)
		}
	}
	return null
}
function mapMeanings(array: OriginalMeanings[]): WordMeaning[] {
	return array.map((meaning) => {
		return {
			partOfSpeech: meaning.partOfSpeech,
			definitions: meaning.definitions.map((def) => {
				const obj: { definition: string; example?: string } = { definition: "" }
				if (def.example) {
					obj.example = def.example
				}
				obj.definition = def.definition
				return obj
			}),
			synonyms: meaning.synonyms.length > 0 ? meaning.synonyms : null,
			antonyms: meaning.antonyms.length > 0 ? meaning.antonyms : null,
		}
	})
}
