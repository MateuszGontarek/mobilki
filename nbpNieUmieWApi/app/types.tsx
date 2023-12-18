export type Currency = {
  code: string;
  currency: string;
  mid: number;
  lastMid: number;
}
export type Data = {
  datasets: {
    data: number[];
  }[];
}
export type CurrencyFromNBP = {
  effectiveDate: string;
  mid: number;
  no: string;
}
type CurrencyToFlagEmoji = {
  [key: string]: string;
}
export const currencyToFlagEmoji: CurrencyToFlagEmoji = {
  AUD: "🇦🇺",
  BGN: "🇧🇬",
  BRL: "🇧🇷",
  CAD: "🇨🇦",
  CHF: "🇨🇭",
  CNY: "🇨🇳",
  CZK: "🇨🇿",
  DKK: "🇩🇰",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  HKD: "🇭🇰",
  HRK: "🇭🇷",
  HUF: "🇭🇺",
  IDR: "🇮🇩",
  ILS: "🇮🇱",
  INR: "🇮🇳",
  ISK: "🇮🇸",
  JPY: "🇯🇵",
  KRW: "🇰🇷",
  MXN: "🇲🇽",
  MYR: "🇲🇾",
  NOK: "🇳🇴",
  NZD: "🇳🇿",
  PHP: "🇵🇭",
  PLN: "🇵🇱",
  RON: "🇷🇴",
  RUB: "🇷🇺",
  SEK: "🇸🇪",
  SGD: "🇸🇬",
  THB: "🇹🇭",
  TRY: "🇹🇷",
  USD: "🇺🇸",
  ZAR: "🇿🇦",
  UAH: "🇺🇦",
  CLP: "🇨🇱",
}
export type Props = {
  currency: Currency;
}
export type Gold = {
  data: string;
  cena: number;
};