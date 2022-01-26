import shortHash from "shorthash2";

const getPlebPayRefFromQueryParams = () => {
  const searchParams = new URLSearchParams(window.location.search);

  return searchParams.get("plebPayRef");
};

const createLocalPlebPlayRef = (invoiceId) => {
  return shortHash(`${invoiceId}${window.navigator.userAgent}`);
};

const removePlebPayRefFromQueryParams = () => {
  const currentHref = new URL(window.location.href);

  currentHref.searchParams.delete("plebPayRef");
  window.history.replaceState(null, null, currentHref);
};

const getPlebPayInvoiceId = (plebPlayUrl) => {
  return plebPlayUrl.replace("https://www.plebpay.com/", "");
};

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

const handleSuccess = (plebPlayRef) => {
  localStorage.setItem(plebPlayRef, "1");
  removePlebPayRefFromQueryParams();
};

const redirectIfNecessary = (plebPayUrl) => {
  const localStorageIsAvailable = testLocalStorage();
  const invoiceId = getPlebPayInvoiceId(plebPayUrl);
  const plebPlayRef = createLocalPlebPlayRef(invoiceId);

  if (localStorageIsAvailable && localStorage.getItem(plebPlayRef, "1")) {
    return;
  }

  if (
    document.referrer === "https://www.plebpay.com/" ||
    plebPlayRef === getPlebPayRefFromQueryParams()
  ) {
    if (localStorageIsAvailable) {
      handleSuccess(plebPlayRef);
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
