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

const redirectIfNecessary = (plebPayUrl) => {
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

  window.location = plebPayUrl;
};

const PlebPay = { redirectIfNecessary };

try {
  module.exports = PlebPay;
} catch (e) {
  window.PlebPay = PlebPay;
}
