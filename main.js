
const hardwareTypes = [
  'smartKitEasy',
  'smartKitFlex',
  'downtimeAnalytics',
  'paperless',
  'technology'
];
const thumbSize = 69;

const pricingSliders = document.querySelectorAll(".c-range");
const pricingInputs = {};

for (let si = 0; si < pricingSliders.length; ++si) {
  const pricingSlider = pricingSliders[si];
  const hardwareType = pricingSlider.getAttribute('data-slider-hardware');
  pricingInputs[hardwareType] = {
    el: pricingSlider.querySelector("input")
  };
  const pricingInput = pricingInputs[hardwareType];

  pricingInput.spanEl = pricingSlider.querySelector("span")
  
  pricingInput.el.setAttribute("max", maxNumberOfDevices);
  
}
const pricingCards = document.querySelectorAll(".c-pricing-tier");
pricingOutputs = {
}
for (let i = 0; i < pricingCards.length; i++) {
  const pricingCard = pricingCards[i];
  const priceEl = pricingCard.querySelector(".c-pricing-tier__price-number");
  const requiredDevicesText = pricingCard.querySelector(".c-pricing-tier__required");
  const pricingType = pricingCard.getAttribute("data-pricing-type");
  const totalPriceMonthlyEl = pricingCard.querySelector(".c-pricing-monthly");
  const totalPriceYearlyEl = pricingCard.querySelector(".c-pricing-yearly");
  const yearlyPaymentTextEl = pricingCard.querySelector(".c-yearly-billing");
  pricingOutputs[pricingType] = {
    priceEl: priceEl,
    pricingCard: pricingCard,
    requiredDevicesText: requiredDevicesText,
    totalPriceMonthlyEl: totalPriceMonthlyEl,
    totalPriceYearlyEl: totalPriceYearlyEl,
    yearlyPaymentTextEl: yearlyPaymentTextEl
  };
}
const billingPeriodInputs = document.querySelectorAll(".c-billing-input");

handlePricingSlide(pricingInputs, pricingOutputs, billingPeriodInputs);
window.addEventListener("input", function() {
  handlePricingSlide(pricingInputs, pricingOutputs, billingPeriodInputs);
});
window.onresize = function() {
  handlePricingSlide(pricingInputs, pricingOutputs, billingPeriodInputs);
};
setTimeout(function() {
  handlePricingSlide(pricingInputs, pricingOutputs, billingPeriodInputs);
}, 10);

function handlePricingSlide(inputs, pricingOutputs, billingPeriodInputs) {
  let isYearlyPayment = true;
  for (let i = 0; i < billingPeriodInputs.length; ++i) {
    if (billingPeriodInputs[i].checked) {
      isYearlyPayment = billingPeriodInputs[i].value == 'yearlyPayment';
	}
  }
  const billingPeriodText = isYearlyPayment ? 'Jährlich abgerechnet ' : 'Monatlich abgerechnet';
  pricingOutputs.business.yearlyPaymentTextEl.innerHTML = billingPeriodText;
  pricingOutputs.value.yearlyPaymentTextEl.innerHTML = billingPeriodText;
  
  let totalNumberOfDevices = 0;
  for (let i = 0; i < hardwareTypes.length; ++i) {
	totalNumberOfDevices += +inputs[hardwareTypes[i]].el.value;
  }
  
  let averageBusinessPrices = {
	pricePerDevice: 0,
	totalPrice: 0,
  }
  let averageValuePrices = {
	pricePerDevice: 0,
	totalPrice: 0,
  }

  for (let i = 0; i < hardwareTypes.length; ++i) {	
    const input = inputs[hardwareTypes[i]];
    const numberOfDevices = input.el.value;
    input.spanEl.innerHTML = numberOfDevices;
    
    const multiplier = (numberOfDevices) / (input.el.max);
    const thumbOffset = thumbSize * multiplier;
    const priceInputOffset =
      (thumbSize - input.spanEl.clientWidth) / 2;
    input.spanEl.style.left =
      input.el.clientWidth * multiplier - thumbOffset + priceInputOffset + "px";
	  
    const businessPrices = computeBusinessPrice(numberOfDevices, hardwareTypes[i], totalNumberOfDevices, isYearlyPayment);
    const valuePrices = computeValuePrice(numberOfDevices, hardwareTypes[i], isYearlyPayment);
	if (totalNumberOfDevices > 0) {
	  averageBusinessPrices.pricePerDevice += businessPrices.pricePerDevice * numberOfDevices / totalNumberOfDevices;
	  averageBusinessPrices.totalPrice += businessPrices.totalPrice;
	  averageValuePrices.pricePerDevice += valuePrices.pricePerDevice * numberOfDevices / totalNumberOfDevices;
	  averageValuePrices.totalPrice += valuePrices.totalPrice;
	}
  }
  
  pricingOutputs.business.priceEl.innerHTML = Math.round(averageBusinessPrices.pricePerDevice);
  pricingOutputs.value.priceEl.innerHTML = Math.round(averageValuePrices.pricePerDevice);
  pricingOutputs.business.totalPriceYearlyEl.innerHTML = Math.round(averageBusinessPrices.totalPrice * 12) + "€";
  pricingOutputs.value.totalPriceYearlyEl.innerHTML = Math.round(averageValuePrices.totalPrice * 12) + "€";
  pricingOutputs.business.totalPriceMonthlyEl.innerHTML = Math.round(averageBusinessPrices.totalPrice) + "€";
  pricingOutputs.value.totalPriceMonthlyEl.innerHTML = Math.round(averageValuePrices.totalPrice) + "€";

  if (totalNumberOfDevices > valueMaxNumberOfDevices) {
	pricingOutputs.value.pricingCard.classList.add("is-disabled");
	pricingOutputs.value.requiredDevicesText.innerHTML = "BIS ZU " + valueMaxNumberOfDevices + " DEVICES";
	pricingOutputs.business.pricingCard.classList.remove("is-disabled");
	pricingOutputs.business.requiredDevicesText.innerHTML = "";
  } else if (totalNumberOfDevices == 0) {
	pricingOutputs.value.pricingCard.classList.add("is-disabled");
	pricingOutputs.value.requiredDevicesText.innerHTML = "WÄHLEN SIE DEVICES AUS";
	pricingOutputs.business.pricingCard.classList.add("is-disabled");
	pricingOutputs.business.requiredDevicesText.innerHTML = "WÄHLEN SIE DEVICES AUS";
  } else {
	pricingOutputs.value.pricingCard.classList.remove("is-disabled");
	pricingOutputs.value.requiredDevicesText.innerHTML = "";
	pricingOutputs.business.pricingCard.classList.remove("is-disabled");
	pricingOutputs.business.requiredDevicesText.innerHTML = "";
  }
}

function computeBusinessPrice(numberOfDevices, type, totalNumberOfDevices, isYearlyPayment) {
  const pricePerDevice = computePricePerDeviceBusiness(
    businessPrices[isYearlyPayment ? 'yearlyPayment' : 'monthlyPayment'].firstDevice[type],
	businessPrices[isYearlyPayment ? 'yearlyPayment' : 'monthlyPayment'].maxDiscountedPrice[type],
	businessPrices.minTotalNumberOfDevicesForMaxDiscount,
	numberOfDevices,
	type,
	totalNumberOfDevices
  );
  return { pricePerDevice: pricePerDevice, totalPrice: numberOfDevices * pricePerDevice };	  
}

function computeValuePrice(numberOfDevices, type, isYearlyPayment) {
  return { 
    pricePerDevice: valuePrices[isYearlyPayment ? 'yearlyPayment' : 'monthlyPayment'][type], 
	totalPrice: numberOfDevices * valuePrices[isYearlyPayment ? 'yearlyPayment' : 'monthlyPayment'][type] 
  };
}
