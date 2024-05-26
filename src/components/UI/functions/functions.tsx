const getFormatedDate = (date: string): string => {
  let formated = "";
  const get_date = new Date(date);
  const day = ("00" + get_date.getDate()).slice(-2);
  const month = ("00" + (get_date.getMonth() + 1)).slice(-2);
  const year = get_date.getFullYear();

  formated = `${day}.${month}.${year}`;
  console.log(formated);
  return formated;
};

const formatDateReverse = (dateString: string) => {
  const [year, month, day] = dateString.split("-");

  return `${day}-${month}-${year}`;
};

const getHtmlFormatDate = (date: string): string => {
  let formated = "";
  const get_date = new Date(date);
  const day = ("00" + get_date.getDate()).slice(-2);
  const month = ("00" + (get_date.getMonth() + 1)).slice(-2);
  const year = get_date.getFullYear();
  formated = `${year}-${month}-${day}`;
  return formated;
};

const getDateTime = (date: string): string => {
  const get_date = new Date(date);
  const day = ("00" + get_date.getDate()).slice(-2);
  const month = ("00" + (get_date.getMonth() + 1)).slice(-2);
  const year = get_date.getFullYear();
  const hours = ("00" + get_date.getHours()).slice(-2);
  const minutes = ("00" + get_date.getMinutes()).slice(-2);
  const dateStr = `${day}.${month}.${year} ${hours}:${minutes}`;
  return dateStr;
};

function fieldToArray(
  fields: Record<string, any>
): { key: string; value: any }[] {
  if (!fields) {
    return [];
  }

  const fieldEntries = Object.entries(fields);

  if (fieldEntries.length === 0) {
    return [];
  }

  const resultArray = fieldEntries.map(([key, value]) => ({ key, value }));
  return resultArray;
}

export default function formatBytes(
  bytes: number,
  decimals: number = 2
): string {
  if (bytes === 0) {
    return "0";
  } else {
    var k = 1024;
    var dm = decimals < 0 ? 0 : decimals;
    var sizes = ["байт", "КБ", "МБ", "ГБ", "ТБ"];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
}

const transformDate = (inputDate: string): string => {
  if (typeof inputDate === "string") {
    const parts = inputDate.split("-");

    console.log("====================================");
    console.log("inputDate", inputDate);
    console.log("====================================");

    if (parts.length === 3) {
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];

      return `${day}-${month}-${year}`;
    } else {
      return "Invalid Date";
    }
  } else {
    return "Invalid Date";
  }
};

// Получение значения куки по имени
function getCookie(name: string): string | null {
  const cookieName = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
}

// Проверка на массив массивов
function hasNestedArray(arr: any[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      return true; // Если элемент массив, вернуть true
    }
  }
  return false; // Если ни один элемент не является массивом, вернуть false
}

function hasDoubleNestedArray(arr: any[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      for (let j = 0; j < arr[i].length; j++) {
        if (Array.isArray(arr[i][j])) {
          return true; // Если найден двойной вложенный массив, вернуть true
        }
      }
    }
  }
  return false; // Если двойной вложенный массив не найден, вернуть false
}

const formatDateIntlDateTime = (dateString: string | Date) => {
  const date = new Date(dateString);
  const options = {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
  };

  //@ts-ignore
  return new Intl.DateTimeFormat("ru-RU", options).format(date);
};

const formatDateCustom = (dateString: string | Date) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes} ${day}.${month}.${year} `;
};

const formatDateIntlTimeDate = (dateString: string | Date | undefined) => {
  const date = new Date(dateString === undefined ? "" : dateString);

  // Опции для форматирования времени
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: false, // Использовать 24-часовой формат
  };

  // Опции для форматирования даты
  const dateOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  //@ts-ignore
  const time = new Intl.DateTimeFormat("ru-RU", timeOptions).format(date);
  //@ts-ignore
  const dateComplete = new Intl.DateTimeFormat("ru-RU", dateOptions).format(
    date
  );

  // Возвращаем объединенную строку
  return `${time} ${dateComplete}`;
};
const formatDateIntlDate = (dateString: string | Date | undefined) => {
  const date = new Date(dateString === undefined ? "" : dateString);

  // Опции для форматирования даты
  const dateOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  //@ts-ignore
  const dateComplete = new Intl.DateTimeFormat("ru-RU", dateOptions).format(
    date
  );

  // Возвращаем объединенную строку
  return `${dateComplete}`;
};

export {
  getFormatedDate,
  getDateTime,
  fieldToArray,
  transformDate,
  getHtmlFormatDate,
  getCookie,
  hasNestedArray,
  hasDoubleNestedArray,
  formatDateIntlDateTime,
  formatDateIntlTimeDate,
  formatDateCustom,
  formatDateReverse,
  formatDateIntlDate,
};
