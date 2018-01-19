import React from "react";

export default class Dots extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			s: this.calcInitialState(false)
		};

		this.goTo = this.goTo.bind(this);
		this.calcInitialState = this.calcInitialState.bind(this);
		window.dots = this;
	}

	goTo = indx => this.props.goTo(indx);

	componentWillReceiveProps({ current }) {
		if (current !== this.props.current) {
			const s = this.state.s;
			for (let i = 0; i < s.length; i++) {
				if (i == current) {
					s[i].active = true;
				} else {
					s[i].active = false;
				}
			}

			this.setState({ s });
		}
	}
	componentWillMount() {
		const s = this.state.s;
		for (let i = 0; i < s.length; i++) {
			if (i == this.props.current) {
				s[i].active = true;
			} else {
				s[i].active = false;
			}
		}
		this.setState({ s });
	}

	calcInitialState(setActive = false) {
		let ii;
		if (setActive) {
			ii = this.state.s[this.props.current].i;
		}
		const c = [];
		for (let i = 0; i < this.props.data.length / this.props.showCount; i++) {
			if (typeof ii == "number" && ii === i) {
				c.push({ i, active: true });
			} else {
				c.push({ i, active: false });
			}
		}

		return c;
	}

	componentDidUpdate({ data }, prevState) {
		if (this.props.data.length !== data.length) {
			this.setState({ s: this.calcInitialState(true) });
		}
	}
	render() {
		const c = [];
		for (let i = 0; i < this.state.s.length; i++) {
			c.push(this.props.renderDots(i, this.goTo, this.state.s[i].active, this.activePosition));
		}

		return (
			<ul className="--rac-component-dots" {...this.props}>
				{c}
			</ul>
		);
	}
}
