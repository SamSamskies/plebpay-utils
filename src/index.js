const redirectIfNecessary = (plebPayUrl) => {
  if (document.referrer !== "https://www.plebpay.com/") {
    window.location = plebPayUrl;
  }
};

const PlebPay = { redirectIfNecessary };

try {
  module.exports = PlebPay;
} catch (e) {
  window.PlebPay = PlebPay;
}
