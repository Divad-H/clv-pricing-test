// Maximum slider value
var maxNumberOfDevices = 50;

// Value
var valueMaxNumberOfDevices = 4;
var valuePrices = {
  monthlyPayment: {
    smartKitEasy: 69,
    smartKitFlex: 79,
    downtimeAnalytics: 99,
    paperless: 109,
    technology: 35
  },
  yearlyPayment: {
	smartKitEasy: 59,
    smartKitFlex: 64,
    downtimeAnalytics: 84,
    paperless: 89,
    technology: 29
  }
};

// Business
var businessPrices = {
  monthlyPayment: {
    firstDevice: {
      smartKitEasy: 179,
      smartKitFlex: 184,
      downtimeAnalytics: 209,
      paperless: 214,
      technology: 109
    },
    maxDiscountedPrice: {
      smartKitEasy: 139,
      smartKitFlex: 149,
      downtimeAnalytics: 169,
      paperless: 179,
      technology: 69
    }
  },
  yearlyPayment: {
    firstDevice: {
      smartKitEasy: 149,
      smartKitFlex: 154,
      downtimeAnalytics: 174,
      paperless: 179,
      technology: 89
    },
    maxDiscountedPrice: {
      smartKitEasy: 119,
      smartKitFlex: 124,
      downtimeAnalytics: 144,
      paperless: 149,
      technology: 59
    }
  },
  maxTotalNumberOfDevicesForNoDiscount: 1,
  minTotalNumberOfDevicesForMaxDiscount: 50
}

// Berechnet den Preis pro device für das Business-Modell
function computePricePerDeviceBusiness(
  priceForFirstDevice,                   // Preis für Kauf eines einzelnes Devices
  pricePerDeviceWithMaxDiscount,         // Preis pro Device bei maximalem Rabatt
  maxTotalNumberOfDevicesForNoDiscount,  // Maximale Anzahl Devices bei denen es noch keinen Rabatt gibt
  minTotalNumberOfDevicesForMaxDiscount, // Mindestabnahmemenge für maximalen Rabatt
  numberOfDevices,                       // Anzahl Devices von diesem Hardwaretyp
  type,                                  // Hardwaretyp
  totalNumberOfDevices                   // Ausgewählte Anzahl Devices (alle Hardwarevarianten)
) {
  // Maximaler Rabatt
  if (totalNumberOfDevices >= minTotalNumberOfDevicesForMaxDiscount) {
	return pricePerDeviceWithMaxDiscount;
  }
  if (totalNumberOfDevices <= maxTotalNumberOfDevicesForNoDiscount) {
	return priceForFirstDevice;
  }
  
  // Linearer Abfall des Preises pro Gerät
  const maxDiscount = priceForFirstDevice - pricePerDeviceWithMaxDiscount;
  const discountPerDevicePerAdditionalDevice = maxDiscount / (minTotalNumberOfDevicesForMaxDiscount - maxTotalNumberOfDevicesForNoDiscount);
  const pricePerDevice = Math.ceil(priceForFirstDevice - (totalNumberOfDevices - maxTotalNumberOfDevicesForNoDiscount) * discountPerDevicePerAdditionalDevice);
  return pricePerDevice;
}
