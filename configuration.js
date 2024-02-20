// Maximum slider value
var maxNumberOfDevices = 50;

// Value
var valueMaxNumberOfDevices = 4;
var valuePrices = {
  smartKitEasy: 59,
  smartKitFlex: 69,
  downtimeAnalytics: 79,
  paperless: 89,
  technology: 9
};

// Business
var businessPrices = {
  firstDevice: {
    smartKitEasy: 149,
    smartKitFlex: 159,
    downtimeAnalytics: 169,
    paperless: 179,
    technology: 99
  },
  maxDiscountedPrice: {
    smartKitEasy: 119,
    smartKitFlex: 129,
    downtimeAnalytics: 139,
    paperless: 149,
    technology: 69
  },
  minTotalNumberOfDevicesForMaxDiscount: 50
}

// Berechnet den Preis pro device für das Business-Modell
function computePricePerDeviceBusiness(
  priceForFirstDevice,                   // Preis für Kauf eines einzelnes Devices
  pricePerDeviceWithMaxDiscount,         // Preis pro Device bei maximalem Rabatt
  minTotalNumberOfDevicesForMaxDiscount, // Mindestabnahmemenge für maximalen Rabatt
  numberOfDevices,                       // Anzahl Devices von diesem Hardwaretyp
  type,                                  // Hardwaretyp
  totalNumberOfDevices                   // Ausgewählte Anzahl Devices (alle Hardwarevarianten)
) {
  // Maximaler Rabatt
  if (totalNumberOfDevices >= minTotalNumberOfDevicesForMaxDiscount) {
	return pricePerDeviceWithMaxDiscount;
  }
  
  // Linearer Abfall des Preises pro Gerät
  const maxDiscount = priceForFirstDevice - pricePerDeviceWithMaxDiscount;
  const discountPerDevicePerAdditionalDevice = maxDiscount / (minTotalNumberOfDevicesForMaxDiscount - 1);
  const pricePerDevice = Math.ceil(priceForFirstDevice - (totalNumberOfDevices - 1) * discountPerDevicePerAdditionalDevice);
  return pricePerDevice;
}
