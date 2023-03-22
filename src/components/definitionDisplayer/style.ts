import { css } from "lit"

const styles = css`
	h3:not(.define, .word-list) {
		color: hsl(var(--light-1));
		font-weight: 200;
	}

	.welcome,
	.heading {
		margin-top: 2rem;
	}
	section.heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.heading > header {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		max-width: 80%;
	}

	.heading picture {
		cursor: pointer;
	}
	h1 {
		font-size: calc(2rem + 2vw);
		margin: 0;
		overflow-wrap: break-word;
		white-space: normal;
		max-width: 100%;
	}
	h2 {
		font-size: calc(1.5rem + 0.75vw);
		margin: 0;
	}
	h3 {
		font-size: calc(1.25rem + 0.5vw);
	}
	a {
		color: black;
		font-weight: 200;
	}
	:host-context(html.dark) :is(.welcome, h1, h3.define, p, a) {
		color: hsl(var(--light-4));
	}

	h3.define {
		font-style: oblique 10deg;
		overflow: hidden;
		position: relative;
	}

	h3.define::after {
		content: "";
		display: inline-block;
		height: 1px;
		background: hsl(var(--light-1));
		position: absolute;
		width: 100%;
		top: 50%;
		margin-left: 1rem;
	}

	hr {
		border: 0.5px solid hsl(var(--light-1));
		margin-bottom: 1rem;
	}

	p,
	blockquote {
		font-weight: 100;
		margin: 0;
	}
	h2 {
		color: hsl(var(--purple));
		font-weight: 200;
	}
	.welcome {
		text-align: center;
	}

	:host-context(html.dark) .source {
		font-size: var(--text-s);
		line-height: var(--line-t-s);
	}
	:host-context(html.dark) p.source {
		color: hsl(var(--light-1));
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-left: 1rem;
	}

	li {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	li::before {
		position: absolute;
		content: "\\2022";
		color: hsl(var(--purple));
		display: inline-flex;
		width: 1rem;
		height: 1rem;
		display: grid;
		place-items: center;
		left: -1.25rem;
		top: 0;
	}

	.list {
		display: flex;
		gap: 1rem;
		font-weight: 400;
		font-size: 1rem;
	}
	.word-list {
		display: flex;
		gap: 0.5rem;
		font-weight: 700;
		flex-wrap: wrap;
	}
	.word-list > span {
		color: hsl(var(--purple));
	}

	blockquote,
	blockquote::before,
	blockquote::after {
		color: hsl(var(--light-1));
	}
	blockquote::after {
		content: "\\201D";
	}
	blockquote::before {
		content: "\\201C";
	}

	section.source {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		flex-wrap: wrap;
		margin-bottom: 2rem;
	}
	p.source {
		font-size: var(--text-s);
		text-decoration: underline;
	}

	figure {
		margin: 0;
	}
	a {
		display: flex;
		gap: 1rem;
	}

	.emoji {
		font-size: 4rem;
	}
	.error {
		margin-top: 3rem;
		text-align: center;
	}
`
export default styles
