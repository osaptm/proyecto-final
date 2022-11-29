export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

export const getDate = (date) => {
    const dateData = new Date(date);
    const datePurchase = `${months[dateData.getMonth()]
        } ${dateData.getDate()}, ${dateData.getFullYear()}`;
    return datePurchase;
}