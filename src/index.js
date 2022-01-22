const redirectIfNecessary = (plebPayUrl) => {
  if (
    document.referrer !== "https://www.plebpay.com/" &&
    localStorage.getItem(plebPayUrl) === null
  ) {
    window.location = plebPayUrl;
  } else {
    localStorage.setItem(plebPayUrl, true);
  }
};

const PlebPay = { redirectIfNecessary };

try {
  module.exports = PlebPay;
} catch (e) {
  window.PlebPay = PlebPay;
}
