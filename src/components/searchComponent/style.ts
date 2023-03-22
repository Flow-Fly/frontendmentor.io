import { css } from "lit"

const styles = css`
	form {
		display: flex;
		align-items: center;
		position: relative;
		margin-top: 1.5rem;
	}
	input {
		width: 100%;
		height: 3rem;
		background-color: hsl(var(--dark-3));
		border: unset;
		border-radius: 1rem;
		padding: 0 3rem 0 1rem;
		transition: background 200ms ease-in-out;
		font-family: inherit;
		font-weight: 700;
		font-size: 1rem;
		color: hsl(var(--light-4));
	}
	input:invalid,
	.invalid {
		outline: 1px solid hsl(var(--red));
	}

	input:not(:invalid, .invalid):focus {
		outline: 1px solid hsl(var(--purple));
	}
	input[type="search"]::-webkit-search-decoration,
	input[type="search"]::-webkit-search-cancel-button,
	input[type="search"]::-webkit-search-results-button,
	input[type="search"]::-webkit-search-results-decoration {
		display: none;
	}

	input::placeholder {
		color: hsl(var(--light-4) / 0.5);
		transition: color 200ms ease-in-out;
	}

	:host-context(html.light) input {
		background-color: hsl(var(--light-3));
		color: hsl(var(--dark-1));
	}
	:host-context(html.light) input::placeholder {
		color: hsl(var(--dark-3) / 0.5);
	}
	picture {
		position: absolute;
		right: 1.5rem;
	}
	h3 {
		color: hsl(var(--red));
		font-weight: 400;
		font-size: 1rem;
	}
`
export default styles
