// Мок-данные карты гостя: копия карточки 02169100000153 (Иванов Иван) с тестового стенда qatl.ru.
export const guest = {
  lastName: 'Иванов',
  firstName: 'Иван',
  middleName: '',
  phone: '+48616449979',
  email: 'viezd12@gmail.com',
  birthDate: '11 ноября 1999',
  birthTimestamp: Date.UTC(1999, 10, 11),
};

export const card = {
  number: '02169100000153',
  level: 'VIP VIP 1',
  discount: 'VIP VIP 1, 30%',
};

export const accumulations = {
  nights: 29,
  amount: 273000,
  amountLabel: '273 000 RUB',
  progress: 100,
  maxLevelReached: true,
  vouchers: 0,
};

export const attentionText = 'Накопления на карту начисляются через 5 дней после выезда гостя в 10:00 по времени средства размещения.';

// Типы операций: stay — проживание (номер бронирования), level — изменение уровня, voucher — операции с ваучером.
export const operations = [
  {type: 'level', label: 'Изменение уровня', comment: 'Вознаграждение по реферальной программе', level: 'SUPER VIP', operationDate: '24 ноября 2026'},
  {type: 'voucher', label: 'Срок действия ваучера истёк', operationDate: '17 сентября 2026'},
  {type: 'voucher', label: 'Присвоение ваучера', operationDate: '14 сентября 2026'},
  {type: 'stay', label: '25271547', cost: 2000, nights: 2, discountRub: 0, discountPct: 0, level: 'VIP VIP 1', checkoutDate: '3 сентября 2026', operationDate: '8 сентября 2026'},
  {type: 'stay', label: '24101315', cost: 2000, nights: 1, discountRub: 0, discountPct: 0, level: 'VIP VIP 1', checkoutDate: '2 июня 2026', operationDate: '8 сентября 2026'},
  {type: 'stay', label: '23362037', cost: 192000, nights: 12, discountRub: 0, discountPct: 0, level: 'VIP VIP 1', checkoutDate: '11 апреля 2026', operationDate: '8 сентября 2026'},
  {type: 'stay', label: '23273974', cost: 14000, nights: 3, discountRub: 0, discountPct: 0, level: 'VIP VIP 1', checkoutDate: '3 апреля 2026', operationDate: '8 сентября 2026'},
  {type: 'stay', label: '21506230', cost: 2000, nights: 2, discountRub: 0, discountPct: 0, level: 'VIP VIP 1', checkoutDate: '7 декабря 2025', operationDate: '8 сентября 2026'},
  {type: 'stay', label: '21504896', cost: 10000, nights: 1, discountRub: 0, discountPct: 0, level: 'VIP VIP 1', checkoutDate: '11 декабря 2025', operationDate: '8 сентября 2026'},
  {type: 'level', label: 'Изменение уровня', discountPct: 30, level: 'VIP VIP 1', operationDate: '8 сентября 2026'},
  {type: 'stay', label: '21504686', cost: 10000, nights: 1, discountRub: 0, discountPct: 0, level: 'VIP VIP', checkoutDate: '11 декабря 2025', operationDate: '8 сентября 2026'},
  {type: 'stay', label: '21504558', cost: 10000, nights: 1, discountRub: 0, discountPct: 0, level: 'VIP VIP', checkoutDate: '11 декабря 2025', operationDate: '8 сентября 2026'},
  {type: 'level', label: 'Изменение уровня', discountPct: 23, level: 'VIP VIP', operationDate: '8 сентября 2026'},
  {type: 'stay', label: '21504361', cost: 6000, nights: 1, discountRub: 0, discountPct: 0, level: 'Gold', checkoutDate: '4 декабря 2025', operationDate: '8 сентября 2026'},
  {type: 'stay', label: '21504314', cost: 6000, nights: 1, discountRub: 0, discountPct: 0, level: 'Gold', checkoutDate: '4 декабря 2025', operationDate: '8 сентября 2026'},
  {type: 'stay', label: '21504181', cost: 6000, nights: 1, discountRub: 0, discountPct: 0, level: 'Gold', checkoutDate: '4 декабря 2025', operationDate: '8 сентября 2026'},
  {type: 'stay', label: '21504170', cost: 1000, nights: 1, discountRub: 0, discountPct: 0, level: 'Gold', checkoutDate: '4 декабря 2025', operationDate: '8 сентября 2026'},
  {type: 'level', label: 'Изменение уровня', discountPct: 15, level: 'Gold', operationDate: '8 сентября 2026'},
  {type: 'stay', label: '21492546', cost: 6000, nights: 1, discountRub: 0, discountPct: 0, level: 'Silver22', checkoutDate: '4 декабря 2025', operationDate: '8 сентября 2026'},
  {type: 'level', label: 'Изменение уровня', discountPct: 12, level: 'Silver22', operationDate: '8 сентября 2026'},
  {type: 'stay', label: '21492539', cost: 6000, nights: 1, discountRub: 0, discountPct: 0, level: 'Base', checkoutDate: '4 декабря 2025', operationDate: '8 сентября 2026'},
];

export const voucherCategories = [
  {value: 'good-evening', text: 'Добрый вауечер господа и дамы'},
  {value: 'free-night', text: 'Бесплатная ночь'},
  {value: 'booking-discount', text: 'Скидка при бронировании'},
];

export const voucherTerms = [
  {value: 'unlimited', text: 'Бессрочно'},
  {value: 'month', text: '1 месяц'},
  {value: 'quarter', text: '3 месяца'},
];
