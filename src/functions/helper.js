import { notification } from "antd";

export const showNotification = ({ type, message, title, duration = 2 }) => {
  notification[type ? type : "success"]({
    message: title,
    description: message,
    duration,
  });
};

export const mappingTotalKilo = (list) => {
  let total = { large: 0, middle: 0, small: 0, sum: 0 };
  for (const item of list) {
    // check thùng
    if (item.box_l) total.large += item.box_l * 900;
    if (item.box_m) total.middle += item.box_m * 900;
    if (item.box_s) total.small += item.box_s * 900;
    //check bao
    if (item.bags.length !== 0)
      for (const bag of item.bags) {
        if (bag.type === 1) total.large += bag.kilo * bag.total;
        if (bag.type === 2) total.middle += bag.kilo * bag.total;
        if (bag.type === 3) total.small += bag.kilo * bag.total;
      }
    total.sum = total.large + total.middle + total.small;
  }
  return total;
};

export const formatKilo = (total) => {
  let string = "";
  total >= 1000
    ? (string = total / 1000 + " tấn")
    : total > 100 && total < 1000
    ? (string = total / 100 + " tạ")
    : (string = total + " kg");
  return string;
};

export function vndFormat(x) {
  if (typeof x !== "number") {
    x = parseInt(x);
  }
  if (x > 0) {
    return x.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  }
  return x;
}

export function handleTime(time) {
  const weekdays = {
    Mon: "T2",
    Tue: "T3",
    Wed: "T4",
    Thu: "T5",
    Fri: "T6",
    Sat: "T7",
    Sun: "CN",
  };
  const months = {
    Jan: "Tháng 1",
    Feb: "Tháng 2",
    Mar: "Tháng 3",
    Apr: "Tháng 4",
    May: "Tháng 5",
    Jun: "Tháng 6",
    Jul: "Tháng 7",
    Aug: "Tháng 8",
    Sep: "Tháng 9",
    Oct: "Tháng 10",
    Nov: "Tháng 11",
    Dec: "Tháng 12",
  };
  const array_date = String(new Date(time)).split(" ");

  const _weekday = weekdays[array_date[0]];
  const _month = months[array_date[1]];
  const _day = array_date[2];
  const _year = array_date[3];
  const _time = array_date[4];

  const result = `${_weekday}, ${_day} ${_month} ${_year} - ${_time}`;

  return result;
}

export const handlePhoneNumber = (value) => {
  return value
    .split("")
    .reverse()
    .join("")
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    .split("")
    .reverse()
    .join("");
};

export const handleMoney = (value) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
