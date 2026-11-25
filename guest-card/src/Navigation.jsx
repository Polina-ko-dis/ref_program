const groups = [
  ['lamp', 'Помощник', true], ['calendar-day', 'Управление номерами', true],
  ['house', 'Настройки гостиницы', true], ['developer-board', 'Управление отелем', true],
  ['room-service', 'Услуги', true], ['hive', 'Менеджер каналов'], ['radar', 'Метапоисковики'],
  ['insights', 'Аналитика'], ['key', 'Ключи', true], ['forum', 'Репутация', true],
  ['cases', 'Управление заказами'], ['mail', 'Маркетинг', true], ['folder', 'Документооборот', true],
  ['report', 'Отчеты', true], ['user-check', 'Онлайн-регистрация', true], ['arrow-circle-double', 'Сравнение цен'],
];

const item = (id, text, props = {}) => ({id, text, tag: `prototype-menu:${text}`, ...props});

export const menuItems = [
  ...groups.map(([icon, text, expandable]) => expandable
    ? {id: icon, icon, text, children: [item(`${icon}-overview`, text)]}
    : item(icon, text, {icon})),
  {id: 'guests', icon: 'users', text: 'Управление гостями', children: [
    item('my-guests', 'Мои гости'),
    {id: 'loyalty', text: 'Программа лояльности', children: [
      item('cards', 'Список карт'),
      item('statistics', 'Статистика'),
      item('guest-card', 'Карта гостя'),
      item('vouchers', 'Ваучеры'),
      item('referral', 'Реферальная программа'),
      item('admin-settings', 'Настройки (admin)', {badge: {text: 'A', type: 'danger'}}),
    ]},
    item('guest-account', 'Личный кабинет гостя'),
    item('crm', 'Интеграция с CRM'),
  ]},
  {id: 'booking', icon: 'book', text: 'Модуль бронирования', children: [item('booking-overview', 'Модуль бронирования')]},
];
