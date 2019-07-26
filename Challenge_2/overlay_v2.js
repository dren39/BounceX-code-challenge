//-------------My variables------------------------
const body = document.querySelector('body');
const targetDiv = document.querySelector('.product-detail-inner.product-content.is-sticky-element');
const overlayDiv = document.createElement('div');
let itemName = targetDiv.childNodes[1].childNodes[1].innerText;
let displayBool = false;

//------------Styling for overlay and black background--------------
overlayDiv.style.position = 'fixed';
overlayDiv.style.width = '100%';
overlayDiv.style.height = '100%';
overlayDiv.style.top = '0';
overlayDiv.style.left = '0';
overlayDiv.style.right = '0';
overlayDiv.style.bottom = '0';
overlayDiv.style.backgroundColor = 'rgba(0,0,0,0.5)';
overlayDiv.style.zIndex = '2';
overlayDiv.style.textAlign = '-webkit-center';
overlayDiv.style.display = "none";
body.appendChild(overlayDiv);//append the overlay to the body

//----------------Functions----------------
function checkPrice() {
	//This helper funtion checks to see if there's a sales price for the clicked item or not and grabs the price accordingly
	if(targetDiv.childNodes[1].childNodes[3].childNodes[1].childNodes[3]) {
		//This grabs the sales price, splits it into an array, slices out the $ sign, puts it back into a string, then passes it to calculatePrice
		let salesPrice = targetDiv.childNodes[1].childNodes[3].childNodes[1].childNodes[3].childNodes[1].data.split('').slice(1).join('');
		calculateDiscount(salesPrice);
	}
	else {
		//If there is no sales price then use this. Grab the regular price, split it into an array, slice out the $ sign and the weird arrows, join back to string, then passes it to calculatePrice
		let regularPrice = targetDiv.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[1].data;
		let convertPrice = regularPrice.split('').slice(2,regularPrice.length-1).join('')
		calculateDiscount(convertPrice);
	}
}//end of function

function calculateDiscount(price) {
	//This helper function will calculate the discounted price then pass it to displayOverlay
	let discountPrice = parseFloat(price)-(parseFloat(price)*.15);
	displayOverlay(discountPrice);
}//end of function

function styleOverlay() {
	//this helper method styles the overlay message
	const discountContainer = document.querySelector('#discount-container');
	discountContainer.style.textAlign = 'center';
	discountContainer.style.marginTop = '27vh';
	discountContainer.style.backgroundColor = 'white';
	discountContainer.style.width = '53%';
	discountContainer.style.height = '17vh';

	const discountInnerContainer = document.querySelector('#discount-inner-container');
	discountInnerContainer.style.paddingTop = '2vh';

	const headerContainer = document.querySelector('#header-container');
	headerContainer.style.marginBottom = '5vh';

	const header = document.querySelector('#header');
	header.style.fontSize = '2em';

	const btnContainer = document.querySelector('#btn-container');
	btnContainer.style.marginTop = '2vh';
	
	const btn = document.querySelectorAll('.btn');
	for(let i = 0; i < btn.length; i++) {
		btn[i].style.backgroundColor = '#c61616';
		btn[i].style.color = 'white';
		btn[i].style.backgroundColor = 'red';
		btn[i].style.padding = '2% 1vh';
		btn[i].style.textAlign = 'center';
		btn[i].style.display = 'inline-block';
		btn[i].style.fontSize = '1.3em';
		btn[i].style.margin = '-2vh 1vw';
	}
}

function displayOverlay(discountPrice) {
	//This function checks the boolean in state, if true then set display to block
	if(displayBool) {
		overlayDiv.innerHTML = `
		<div id="discount-container">
			<div id="discount-inner-container">
				<div id="header-container">
					<h1 id="header">Get this ${itemName} for $${discountPrice.toFixed(2)} with a 15% discount</h1>
				</div>
				<div id="btn-container">
					<button id="close-btn" class="btn">Close</button>
					<button id="cart-btn" class="btn">Go to cart</button>
				</div>
			</div>
		</div>
		`
		styleOverlay();
		overlayDiv.style.display = 'block';
	}
	else {
		overlayDiv.style.display = 'none';
	}
}//end of function

//------------------------Event listeners-----------------
targetDiv.addEventListener('click', event => {
	//This event listener listens for the clothes size being clicked then changes the boolean then triggers the chain that will display the overlay
	event.preventDefault();
	if(event.target.title === "Select Size: XS" || event.target.title === "Select Size: S" || event.target.title === "Select Size: M" || event.target.title === "Select Size: L" || event.target.title === "Select Size: XL" || event.target.title === "Select Size: XXL") {
		displayBool = !displayBool;
		// displayOverlay();
		checkPrice();
	}
});//end of this event

body.addEventListener('click', event => {
	//This listens to the entire body for a click on a button with an id of close-btn, changes boolean and closes overlay
	event.preventDefault();
	if(event.target.id === "close-btn") {
		displayBool = !displayBool;
		displayOverlay()
	}
	else if(event.target.id === "cart-btn") {
		location.href = "https://www.marmot.com/cart";
	}
})//end of this event