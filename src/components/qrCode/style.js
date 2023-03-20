import { css } from "lit"
const styles = css`
	:host {
		--small-space: 1rem;
		--medium-space: 2rem;
		--padding-bottom: var(--medium-space);
		--radius: 0.75rem;
		display: block;
	}

	article {
		background: var(--white);
		padding: var(--small-space);
		padding-bottom: var(--medium-space);
		margin: 0 var(--medium-space);
		border-radius: calc(var(--radius) * 2);
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: var(--medium-space);
		box-shadow: 0 8px 16px 4px hsl(0 0% 0% / 0.15);
	}

	picture {
		display: flex;
		overflow: hidden;
		width: 100%;
		border-radius: var(--radius);
	}

	::slotted(img) {
		object-fit: cover;
		width: 100%;
	}

	main {
		display: flex;
		flex-direction: column;
		gap: var(--small-space);
		padding: 0 var(--small-space);
	}

	::slotted(h2) {
		font-weight: 700;
		font-size: 1.4rem;
		color: var(--dark-blue);
	}

	::slotted(p) {
		color: var(--grayish-blue);
	}
`

export default styles
