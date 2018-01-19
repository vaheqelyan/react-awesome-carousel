export default function calcStepper(position, count, slickElementsCount, width) {
	let c = position / (count * width);
	c = Math.abs(c);
	c = Math.round(c);

	return c;
}
