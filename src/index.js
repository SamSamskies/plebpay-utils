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

var PlebPay = { redirectIfNecessary };

export default PlebPay;
