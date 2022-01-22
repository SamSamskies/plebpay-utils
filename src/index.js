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

if (typeof window !== "undefined") {
  window.PlebPay = PlebPay;
}

export default PlebPay;
