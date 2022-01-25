const FingerprintJS = require("@fingerprintjs/fingerprintjs");
const fpPromise = FingerprintJS.load({ monitoring: false });

const testLocalStorage = () => {
  const test = "plebPayTest";

  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

const checkPlebPayRef = () => {
  return fpPromise
    .then((fp) => fp.get())
    .then(({ visitorId }) => {
      const searchParams = new URLSearchParams(window.location.search);

      return visitorId === searchParams.get("plebPayRef");
    });
};

const redirectIfNecessary = async (plebPayUrl) => {
  const localStorageIsAvailable = testLocalStorage();

  if (localStorageIsAvailable && localStorage.getItem(plebPayUrl, "1")) {
    return;
  }

  if (document.referrer === "https://www.plebpay.com/") {
    if (localStorageIsAvailable) {
      localStorage.setItem(plebPayUrl, "1");
    }

    return;
  }

  if (await checkPlebPayRef()) {
    const currentHref = new URL(window.location.href);

    currentHref.searchParams.delete("plebPayRef");
    window.history.replaceState(null, null, currentHref);

    if (localStorageIsAvailable) {
      localStorage.setItem(plebPayUrl, "1");
    }

    return;
  }

  window.location = plebPayUrl;
};

const PlebPay = { redirectIfNecessary };

try {
  module.exports = PlebPay;
} catch (e) {
  window.PlebPay = PlebPay;
}
