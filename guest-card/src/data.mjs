// Мок-данные карты гостя: копия карточки 02169100000153 (Иванов Иван) с тестового стенда qatl.ru.
export const guest = {
  lastName: 'Иванов',
  firstName: 'Иван',
  middleName: '',
  phone: '+48616449979',
  email: 'viezd12@gmail.com',
  birthTimestamp: Date.UTC(1999, 10, 11),
};

export const card = {
  number: '02169100000153',
  level: 'VIP VIP 1',
  discount: 30,
};

export const accumulations = {
  nights: 29,
  amount: 273000,
  progress: 100,
  maxLevelReached: true,
  vouchers: 0,
  invitedGuests: 3,
};

export const referralProgress = {
  registeredGuests: 1,
  stayedGuests: 1,
  vouchers: 0,
  nights: 3,
};

export const invitedGuests = [
  {id: 'november-2026', name: 'Петров Петр Петрович', registrationDate: Date.UTC(2026, 10, 24), stayed: true, emailConfirmed: true, reward: 'начислено 3 ночи'},
];

export const attentionText = 'Накопления на карту начисляются через 5 дней после выезда гостя в 10:00 по времени средства размещения.';

// Типы операций: stay — проживание (номер бронирования), level — изменение уровня, accumulation — начисление накоплений, voucher — операции с ваучером.
export const operations = [
  {type: 'level', label: 'Изменение уровня', level: 'SUPER VIP', operationDate: Date.UTC(2026, 10, 24)},
  {type: 'accumulation', label: 'Начисление накоплений', nights: 3, comment: 'Вознаграждение по реферальной программе', operationDate: Date.UTC(2026, 10, 24)},
  {type: 'voucher', label: 'Срок действия ваучера истёк', operationDate: Date.UTC(2026, 8, 17)},
  {type: 'voucher', label: 'Присвоение ваучера', operationDate: Date.UTC(2026, 8, 14)},
  {type: 'stay', label: '25271547', cost: 2000, nights: 2, discountRub: 0, discountPct: 0, level: 'VIP VIP 1', checkoutDate: Date.UTC(2026, 8, 3), operationDate: Date.UTC(2026, 8, 8)},
  {type: 'stay', label: '24101315', cost: 2000, nights: 1, discountRub: 0, discountPct: 0, level: 'VIP VIP 1', checkoutDate: Date.UTC(2026, 5, 2), operationDate: Date.UTC(2026, 8, 8)},
  {type: 'stay', label: '23362037', cost: 192000, nights: 12, discountRub: 0, discountPct: 0, level: 'VIP VIP 1', checkoutDate: Date.UTC(2026, 3, 11), operationDate: Date.UTC(2026, 8, 8)},
  {type: 'stay', label: '23273974', cost: 14000, nights: 3, discountRub: 0, discountPct: 0, level: 'VIP VIP 1', checkoutDate: Date.UTC(2026, 3, 3), operationDate: Date.UTC(2026, 8, 8)},
  {type: 'stay', label: '21506230', cost: 2000, nights: 2, discountRub: 0, discountPct: 0, level: 'VIP VIP 1', checkoutDate: Date.UTC(2025, 11, 7), operationDate: Date.UTC(2026, 8, 8)},
  {type: 'stay', label: '21504896', cost: 10000, nights: 1, discountRub: 0, discountPct: 0, level: 'VIP VIP 1', checkoutDate: Date.UTC(2025, 11, 11), operationDate: Date.UTC(2026, 8, 8)},
  {type: 'level', label: 'Изменение уровня', discountPct: 30, level: 'VIP VIP 1', operationDate: Date.UTC(2026, 8, 8)},
  {type: 'stay', label: '21504686', cost: 10000, nights: 1, discountRub: 0, discountPct: 0, level: 'VIP VIP', checkoutDate: Date.UTC(2025, 11, 11), operationDate: Date.UTC(2026, 8, 8)},
  {type: 'stay', label: '21504558', cost: 10000, nights: 1, discountRub: 0, discountPct: 0, level: 'VIP VIP', checkoutDate: Date.UTC(2025, 11, 11), operationDate: Date.UTC(2026, 8, 8)},
  {type: 'level', label: 'Изменение уровня', discountPct: 23, level: 'VIP VIP', operationDate: Date.UTC(2026, 8, 8)},
  {type: 'stay', label: '21504361', cost: 6000, nights: 1, discountRub: 0, discountPct: 0, level: 'Gold', checkoutDate: Date.UTC(2025, 11, 4), operationDate: Date.UTC(2026, 8, 8)},
  {type: 'stay', label: '21504314', cost: 6000, nights: 1, discountRub: 0, discountPct: 0, level: 'Gold', checkoutDate: Date.UTC(2025, 11, 4), operationDate: Date.UTC(2026, 8, 8)},
  {type: 'stay', label: '21504181', cost: 6000, nights: 1, discountRub: 0, discountPct: 0, level: 'Gold', checkoutDate: Date.UTC(2025, 11, 4), operationDate: Date.UTC(2026, 8, 8)},
  {type: 'stay', label: '21504170', cost: 1000, nights: 1, discountRub: 0, discountPct: 0, level: 'Gold', checkoutDate: Date.UTC(2025, 11, 4), operationDate: Date.UTC(2026, 8, 8)},
  {type: 'level', label: 'Изменение уровня', discountPct: 15, level: 'Gold', operationDate: Date.UTC(2026, 8, 8)},
  {type: 'stay', label: '21492546', cost: 6000, nights: 1, discountRub: 0, discountPct: 0, level: 'Silver22', checkoutDate: Date.UTC(2025, 11, 4), operationDate: Date.UTC(2026, 8, 8)},
  {type: 'level', label: 'Изменение уровня', discountPct: 12, level: 'Silver22', operationDate: Date.UTC(2026, 8, 8)},
  {type: 'stay', label: '21492539', cost: 6000, nights: 1, discountRub: 0, discountPct: 0, level: 'Base', checkoutDate: Date.UTC(2025, 11, 4), operationDate: Date.UTC(2026, 8, 8)},
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
