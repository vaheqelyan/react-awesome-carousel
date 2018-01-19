function gen(number, position, width, likelyWidth, action) {
	const count = number;
	let generate = `${count}`;
	generate = generate.split(".");
	if (generate[1]) {
		let string_number = `${generate[1][0]}.${generate[1].slice(1, generate[1].length)}`;
		if (string_number.split(".")[1].length == 0) {
			string_number = string_number.replace(".", "");
		}
		const generate_to_float_number = parseFloat(string_number);

		if (action == "PLUS") {
			var v1 = width / 10 * generate_to_float_number;
			var v2 = width - v1;
			return Math.abs(position) + v2;
		} else {
			var v1 = width / 10 * generate_to_float_number;
			return Math.abs(position) - v1;
		}
	}
}

export default gen;
