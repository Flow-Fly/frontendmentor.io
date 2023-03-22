import { css } from "lit"

const styles = css`
	:host {
		position: relative;
	}
	.current-font {
		font-weight: 700;
		font-size: var(--text-m);
		color: hsl(var(--light-4));
		transition: color 200ms ease-in-out;
	}
	:host-context(html.light) .current-font {
		color: hsl(var(--dark-1));
	}
	label {
		display: flex;
		gap: 1rem;
		align-items: center;
		cursor: pointer;
	}

	img {
		rotate: 90deg;
		transition: rotate 200ms ease-in-out;
	}
	input {
		appearance: none;
		position: absolute;
		pointer-events: none;
	}
	input:checked + img {
		rotate: 0deg;
	}

	li > :is(span:hover, span:focus-visible) {
		color: hsl(var(--purple));
	}

	li > span {
		cursor: pointer;
	}

	ul {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: hsl(var(--dark-2));
		position: absolute;
		top: 100%;
		min-width: 10rem;
		right: -1rem;
		padding: 1.5rem;
		list-style: none;
		color: hsl(var(--light-4));
		font-weight: 700;
		font-size: var(--text-m);
		border-radius: 1rem;
		box-shadow: 0 6px 20px 8px hsl(var(--purple) / 0.7);
	}
	:host-context(html.light) ul {
		color: hsl(var(--dark-1));
		background-color: hsl(var(--light-4));
	}
`

export default styles
