import React from "react";

import gen from "./getNumberDecimal";
import calcStepper from "./calcStepper";

class Carousel extends React.Component {
	index = 1;
	position = 0;
	mousedownClientX = 0;
	mousedownClientY = 0;
	step = 0;
	statusGalleryMove = false;
	scrollStatus = false;
	debounce = true;
	constructor(props) {
		super(props);
		this.state = {
			marginLeft: 0,
			data: props.data
		};

		this.galleryScrolling = ::this.galleryScrolling;
		this.galleryScrollingMouseUp = ::this.galleryScrollingMouseUp;
		this.scrollbarScrolling = ::this.scrollbarScrolling;
		this.scrollbarScrollingMouseUp = ::this.scrollbarScrollingMouseUp;
		this.next = ::this.next;
		this.prev = ::this.prev;
		this.setMargin = ::this.setMargin;
		this.goTo = ::this.goTo;
		this.scroll = ::this.scroll;
		this.move = ::this.move;
	}
	scrollbarScrollingMouseUp() {
		const { touch } = this.props;
		if (!isNaN(this.state.marginLeft)) {
			this.position = this.state.marginLeft;
		}

		if (this.scrollStatus) {
			if (this.props.autoCorrect) {
				var autoCalculate;

				const count = this.position / this.props.itemWidth;
				const x = count;
				const int_part = Math.trunc(x);
				let float_part = Number((x - int_part).toFixed(1));
				float_part = Math.abs(float_part);

				if (float_part > 0.5 || float_part == 0.5) {
					autoCalculate = -gen(count, this.position, this.props.itemWidth, this.props.likelyWidth, "PLUS");
				} else if (float_part < 0.5) {
					autoCalculate = -gen(count, this.position, this.props.itemWidth, this.props.likelyWidth, "MIN");
				}
				if (!isNaN(autoCalculate)) {
					this.position = autoCalculate;
					this.setState({ marginLeft: autoCalculate });
				} else {
					this.forceUpdate();
				}
			}
		}

		if (this.debounce && this.props.onReachForScrollEnd) {
			this.props.onReachEnd();
			setTimeout(() => this.next(), this.props.nextAfterFetchStarts);
		}

		this.scrollStatus = true;
		this.debounce = false;

		if (this.props.enableScrollbar) this.getScrollbar.scrollLeft = Math.abs(this.position);
		this.getScrollbar.removeEventListener(touch ? "touchmove" : "scroll", this.scroll, false);
		this.getScrollbar.removeEventListener(touch ? "touchend" : "mouseup", this.scrollbarScrollingMouseUp, false);
	}
	scrollbarScrolling() {
		const { touch } = this.props;
		this.debounce = true;
		this.scrollStatus = true;
		this.getScrollbar.addEventListener(touch ? "touchmove" : "scroll", this.scroll, false);
		this.getScrollbar.addEventListener(touch ? "touchend" : "mouseup", this.scrollbarScrollingMouseUp, false);
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.data.length !== prevProps.data.length) {
			this.setState({ data: this.props.data });
			this.forceUpdate();
		}
	}
	componentWillUpdate(nextProps, nextState) {
		this.step = calcStepper(this.position, this.props.showCount, this.state.data.length, this.props.itemWidth);
	}
	move(e) {
		const { touch, vertical } = this.props;

		if (vertical) {
			var calc = touch ? this.mousedownClientY - e.touches[0].clientY : this.mousedownClientY - e.clientY;
		} else {
			var calc = touch ? this.mousedownClientX - e.touches[0].clientX : this.mousedownClientX - e.clientX;
		}
		var result = this.position + -calc;

		const pureResult = Math.abs(result);
		if (pureResult >= (this.state.data.length - this.props.showCount) * this.props.itemWidth) {
			result = -(this.state.data.length - this.props.showCount) * this.props.itemWidth;
			if (this.state.marginLeft == 0) result = 0;
			if (this.debounce && this.props.onReachForMove) {
				this.props.onReachEnd();
				setTimeout(() => this.next(), this.props.nextAfterFetchStarts);
				this.debounce = false;
			}
		} else if (result > 0) {
			result = 0;
		}

		this.setState({ marginLeft: result });
		this.statusGalleryMove = true;
	}
	scroll(e) {
		var scrollLeft = e.target.scrollLeft;
		var result = scrollLeft;

		this.position = -result;

		var carouselWidth = (this.state.data.length - this.props.showCount) * this.props.itemWidth;
		if (scrollLeft >= carouselWidth) {
			result = carouselWidth;
			if (this.debounce && this.props.onReachForScroll) {
				this.props.onReachEnd();
				setTimeout(() => this.next(), this.props.nextAfterFetchStarts);
				this.debounce = false;

				this.scrollbarScrollingMouseUp();
			}
		}
		this.setState({ marginLeft: -result });
	}
	galleryScrollingMouseUp() {
		const { touch } = this.props;
		if (!isNaN(this.state.marginLeft)) {
			this.position = this.state.marginLeft;
		}

		if (this.statusGalleryMove) {
			if (this.props.autoCorrect) {
				var autoCalculate;

				const count = this.position / this.props.itemWidth;
				const x = count;
				const int_part = Math.trunc(x);
				let float_part = Number((x - int_part).toFixed(1));
				float_part = Math.abs(float_part);

				float_part = float_part == 0 ? 0.1 : float_part;

				if (float_part > 0.5 || float_part == 0.5) {
					autoCalculate = -gen(count, this.position, this.props.itemWidth, this.props.likelyWidth, "PLUS");
				} else if (float_part < 0.5) {
					autoCalculate = -gen(count, this.position, this.props.itemWidth, this.props.likelyWidth, "MIN");
				}

				if (!isNaN(autoCalculate)) {
					this.position = autoCalculate;
					this.setState({ marginLeft: autoCalculate });
				} else {
					this.forceUpdate();
				}
			}

			if (
				this.debounce &&
				Math.abs(this.position) >= (this.state.data.length - this.props.showCount) * this.props.itemWidth &&
				this.props.onReachForMouseUp
			) {
				this.props.onReachEnd();
				setTimeout(() => this.next(), this.props.nextAfterFetchStarts);
			}
		}

		this.debounce = false;

		this.statusGalleryMove = false;

		this.mousedownClientX = 0;

		if (this.props.enableScrollbar) this.getScrollbar.scrollLeft = Math.abs(this.position);

		this.getGallery.removeEventListener(touch ? "touchmove" : "mousemove", this.move, false);
		this.getGallery.addEventListener(touch ? "touchend" : "mouseup", this.galleryScrollingMouseUp, false);
	}
	galleryScrolling(e) {
		const { touch, vertical } = this.props;
		this.debounce = true;

		if (vertical) {
			this.mousedownClientY = touch ? e.touches[0].clientY : e.clientY;
		} else {
			this.mousedownClientX = touch ? e.touches[0].clientX : e.clientX;
		}
		this.statusGalleryMove = false;
		this.getGallery.addEventListener(touch ? "touchmove" : "mousemove", this.move, false);
		this.getGallery.addEventListener(touch ? "touchend" : "mouseup", this.galleryScrollingMouseUp, false);
	}
	componentDidMount() {
		const { touch } = this.props;
		var quotient = Math.floor(this.props.data.length / this.props.showCount);

		var remainder = this.props.data.length % quotient;

		if (this.props.enableScrollbar) {
			this.getScrollbar = this.refs.c.querySelector(".--rac-component-scrollbar");
			this.getScrollbar.addEventListener(touch ? "touchstart" : "mousedown", this.scrollbarScrolling, false);
		}
		if (this.props.enableMoving) {
			this.getGallery = this.refs.c.querySelector(".--rac-component-ul");

			this.getGallery.addEventListener(touch ? "touchstart" : "mousedown", this.galleryScrolling, false);
		}
	}
	setMargin(step = this.props.showCount) {
		const width = this.props.itemWidth;
		const count = step;

		const g = this.state.data.length;

		if (Math.max(this.position - width * count, -width * (g - count)) == this.position && this.props.infinite == true) {
			this.position = 0;
			this.setState({ marginLeft: 0 });
		} else {
			this.position = Math.max(this.position - width * count, -width * (g - count));

			this.setState({ marginLeft: this.position });
		}

		if (this.props.enableScrollbar) this.getScrollbar.scrollLeft = Math.abs(this.position);
	}
	next = () => this.setMargin();
	prev() {
		const width = this.props.itemWidth;
		const count = this.props.showCount;

		if (this.position == 0 && this.props.infinite == true) {
			this.position = -(this.state.data.length - this.props.showCount) * this.props.itemWidth;
		} else {
			this.position = Math.min(this.position + width * count, 0);
		}
		this.setState({ marginLeft: this.position });

		if (this.props.enableScrollbar) this.getScrollbar.scrollLeft = Math.abs(this.position);
	}
	goTo(c) {
		var pure_position = Math.abs(this.position);
		if (c == Math.floor(this.props.data.length / this.props.showCount) && this.props.onReachForDots) {
			this.props.onReachEnd();
			setTimeout(() => this.next(), this.props.nextAfterFetchStarts);
		}
		if (c > this.index || c == this.index) {
			if (c == Math.floor(this.state.data.length / this.props.showCount)) {
				var result =
					pure_position + (this.state.data.length - pure_position / this.props.itemWidth - this.props.showCount) * this.props.itemWidth;
			} else {
				var v1 = this.props.showCount * this.props.itemWidth;
				var result = c * v1;
			}
		} else {
			if (c == 0) {
				var result = pure_position - pure_position / this.props.itemWidth * this.props.itemWidth;
			} else {
				var result = pure_position - (this.index - c) * (this.props.showCount * this.props.itemWidth);
			}
		}

		if (this.props.enableScrollbar) this.getScrollbar.scrollLeft = result;

		this.position = -result;

		this.setState({ marginLeft: -result });

		this.index = c;
	}

	render() {
		const { step, goTo, next, prev } = this;

		const { data } = this.state;
		const { itemWidth, showCount } = this.props;
		var calc_scrollbar = data.length * itemWidth;
		var calc_carousel_width = itemWidth * showCount;

		var Scrollbar = (
			<div className="--rac-component-scrollbar">
				<div className="--rac-component-inner" style={{ width: `${calc_scrollbar}px` }} />
			</div>
		);

		return (
			<div ref="c" className="--rac-component-carousel" style={{ ...{ width: `${calc_carousel_width}px` }, ...this.props.style }}>
				{this.props.children(
					{
						style: { width: `${calc_carousel_width}px` },
						className: "--rac-component-gallery"
					},
					{
						style: { marginLeft: `${this.state.marginLeft}px` },
						className: "--rac-component-ul"
					},
					data,
					step,
					goTo,
					next,
					prev,
					Scrollbar,
					{ showCount, data, current: step }
				)}
			</div>
		);
	}
}

Carousel.defaultProps = {
	enableScrollbar: false,
	enableMoving: false,
	autoCorrect: false,
	onReachForMouseUp: false,
	onReachForMove: false,
	onReachForScroll: false,
	onReachForScrollEnd: false,
	onReachForDots: false,
	onReachEnd: undefined,
	touch: false,
	infinite: false,
	nextAfterFetchStarts: 0,
	vertical: false,
	style: {}
};

export default Carousel;
