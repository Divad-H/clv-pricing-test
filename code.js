const maxNumberOfDevices = 200;

// Value
const valueMaxNumberOfDevices = 4;
const valuePrices = {
  smartKitEasy: 59,
  smartKitFlex: 69,
  downtimeAnalytics: 79,
  paperless: 89,
  technology: 9
};

// Business
const businessPrices = {
  initial: {
    smartKitEasy: 149,
    smartKitFlex: 159,
    downtimeAnalytics: 169,
    paperless: 179,
    technology: 99
  },
  final: {
    smartKitEasy: 119,
    smartKitFlex: 129,
    downtimeAnalytics: 139,
    paperless: 149,
    technology: 69
  },
  minDevicesForFinalPrice: 50
}


const thumbSize = 69;

const pricingSlider = document.querySelector(".c-range");

const pricingInput = {
  el: pricingSlider.querySelector("input")
};
pricingInput.spanEl = pricingSlider.querySelector("span")

pricingInput.el.setAttribute("max", maxNumberOfDevices);

const pricingCards = document.querySelectorAll(".c-pricing-tier");
pricingOutputs = {
}
for (let i = 0; i < pricingCards.length; i++) {
  const pricingCard = pricingCards[i];
  const priceEl = pricingCard.querySelector(".c-pricing-tier__price-number");
  const requiredDevicesText = pricingCard.querySelector(".c-pricing-tier__required");
  const pricingType = pricingCard.getAttribute("data-pricing-type");
  pricingOutputs[pricingType] = {
	priceEl: priceEl,
	pricingCard: pricingCard,
	requiredDevicesText: requiredDevicesText
  };
}

const hardwareInputs = document.querySelectorAll(".c-hardware-input");
pricingInput.hardwareInputs = hardwareInputs;

handlePricingSlide(pricingInput, pricingOutputs);
window.addEventListener("input", function() {
  handlePricingSlide(pricingInput, pricingOutputs);
});
window.onresize = function() {
  handlePricingSlide(pricingInput, pricingOutputs);
};
setTimeout(function() {
  handlePricingSlide(pricingInput, pricingOutputs);
}, 10);

function handlePricingSlide(input, pricingOutputs) {
  let hardwareType = "smartKitEasy";
  for (let i = 0; i < input.hardwareInputs.length; ++i) {
	if (input.hardwareInputs[i].checked) {
	  hardwareType = input.hardwareInputs[i].value;
	}
  }
	
  const numberOfDevices = input.el.value;
  input.spanEl.innerHTML = numberOfDevices;
  
  const multiplier = (numberOfDevices - 1) / (input.el.max - 1);
  const thumbOffset = thumbSize * multiplier;
  const priceInputOffset =
    (thumbSize - input.spanEl.clientWidth) / 2;
  input.spanEl.style.left =
    input.el.clientWidth * multiplier - thumbOffset + priceInputOffset + "px";
	
  const businessPrices = computeBusinessPrice(numberOfDevices, hardwareType);
  pricingOutputs.business.priceEl.innerHTML = businessPrices.pricePerDevice;
  const valuePrices = computeValuePrice(numberOfDevices, hardwareType);
  pricingOutputs.value.priceEl.innerHTML = valuePrices.pricePerDevice;
  if (numberOfDevices > valueMaxNumberOfDevices) {
	pricingOutputs.value.pricingCard.classList.add("is-disabled");
	pricingOutputs.value.requiredDevicesText.innerHTML = "Bis zu " + valueMaxNumberOfDevices + " Devices";
  } else {
	pricingOutputs.value.pricingCard.classList.remove("is-disabled");
	pricingOutputs.value.requiredDevicesText.innerHTML = "";
  }
}

function computeBusinessPrice(numberOfDevices, type) {
  if (numberOfDevices >= businessPrices.minDevicesForFinalPrice) {
	return { pricePerDevice: businessPrices.final[type], totalPrice: numberOfDevices * businessPrices.final[type] };
  }	  
  
  const limitDiscount = businessPrices.initial[type] - businessPrices.final[type];
  const discountPerDevicePerAdditionalDevice = limitDiscount / (businessPrices.minDevicesForFinalPrice - 1);
  
  const pricePerDevice = Math.ceil(businessPrices.initial[type] - (numberOfDevices - 1) * discountPerDevicePerAdditionalDevice);
  const totalPrice = pricePerDevice * numberOfDevices;
  return { pricePerDevice: pricePerDevice, totalPrice: totalPrice };
}

function computeValuePrice(numberOfDevices, type) {
  return { pricePerDevice: valuePrices[type], totalPrice: numberOfDevices * valuePrices[type] };
}