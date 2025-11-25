export function formatCurrency(value: string | number, currency = "GHC") {
  const num = typeof value === "string" ? Number(value) : value;
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).format(num);
}

export function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
