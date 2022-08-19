async function postData(url = "", data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	});
	location.reload();
	// parses JSON response into native JavaScript objects
}


const postProducto = async (e) => {
	e.preventDefault();
	const titleValue = document.getElementById("title").value;
	const priceValue = document.getElementById("price").value;
	const thumbnailValue = document.getElementById("thumbnail").value;
	const product = {
		title: titleValue,
		price: priceValue,
		thumbnail: thumbnailValue
	};
	await postData("http://localhost:8080/products", product);
};
sendForm = document.getElementById("sendForm");
sendForm.addEventListener("click", postProducto);
