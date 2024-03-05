// Maximum slider value
var maxNumberOfDevices = 50;

// Value
var valueMaxNumberOfDevices = 4;
var valuePrices = {
  monthlyPayment: {
    smartKitEasy: 79,
    smartKitFlex: 84,
    downtimeAnalytics: 104,
    paperless: 109,
    technology: 49
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
      smartKitEasy: 169,
      smartKitFlex: 174,
      downtimeAnalytics: 194,
      paperless: 199,
      technology: 109
    },
    maxDiscountedPrice: {
      smartKitEasy: 139,
      smartKitFlex: 144,
      downtimeAnalytics: 164,
      paperless: 169,
      technology: 79
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
