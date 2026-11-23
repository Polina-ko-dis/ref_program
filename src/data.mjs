export const voucherOptions = [
  {value: '', text: 'Выбрать'},
  {value: 'free-night', text: 'Бесплатная ночь'},
  {value: 'booking-discount', text: 'Скидка на проживание 10%'},
  {value: 'hotel-services', text: 'Услуги отеля'},
];
export const accrualOptions = [
  {value: 'fixed', text: 'Фиксированное количество баллов'},
  {value: 'percent', text: 'Процент от общей стоимости бронирования'},
];
const levelUpgradeOption = {value: 'level-up', text: 'На один уровень выше'};
export const upgradeOptions = {
  money: [levelUpgradeOption, {value: 'percent', text: 'По стоимости проживания приглашенного гостя'}],
  nights: [levelUpgradeOption, {value: 'percent', text: 'По числу ночей проживания приглашенного гостя'}],
  mixed: [levelUpgradeOption, {value: 'percent', text: 'По стоимости проживания и числу ночей приглашенного гостя'}],
};
export const accumulationOptions = [
  {value: 'money', text: 'Деньги'},
  {value: 'nights', text: 'Ночи'},
  {value: 'mixed', text: 'Деньги и ночи'},
];
export const upgradeLabels = {
  money: 'Накопления денег',
  nights: 'Накопления ночей',
  mixed: 'Накопления денег и ночей',
};
export const upgradeHints = {
  money: 'Silver - 4000 RUB, Gold - 8000 RUB, VIP - 20000 RUB',
  nights: 'Silver - 4 ночи, Gold - 8 ночей, VIP - 20 ночей',
  mixed: 'Silver - 4 ночи и 4000 RUB, Gold - 8 ночей и 8000 RUB, VIP - 20 ночей и 20000 RUB',
};
export const registrationHint = 'Постоянные гости получат вознаграждения после того, как приглашенный гость подтвердит электронную почту';
export const invitedHint = 'Приглашенные гости получат вознаграждения после подтверждения электронной почты';
