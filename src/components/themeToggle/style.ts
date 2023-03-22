import { css } from "lit"

const styles = css`
	:host {
		border-radius: 100vw;
		outline: 2px solid var(--purple);
	}
	label {
		position: relative;
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}
	input {
		margin: 0;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 100vw;
		appearance: none;
		outline-offset: 4px;
	}
	span#theme-toggle {
		position: relative;
		width: 2.5rem;
		height: 1.25rem;
		background-color: hsl(var(--light-1));
		border-radius: 100vw;
		transition: background-color 400ms ease-in-out;
	}

	#theme-toggle::after {
		content: "";
		position: absolute;
		background-color: hsl(var(--light-4));
		border-radius: 50%;
		height: 1rem;
		width: 1rem;
		top: 50%;
		left: 5%;
		translate: 0 -50%;
		transition: translate 200ms ease-in-out;
	}

	input:checked + #theme-toggle {
		background-color: hsl(var(--purple));
	}
	input:checked + #theme-toggle::after {
		translate: 125% -50%;
	}

	picture > svg path {
		transition: stroke 400ms ease-in-out;
	}

	input:checked ~ picture > svg path {
		stroke: hsl(var(--purple));
	}
`
export default styles
