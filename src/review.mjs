// The Tile selectors use its header/content structure, without generated CSS class names.
export const reviewChanges = [
  {
    id: 'tile-headings', title: 'Заголовки карточек',
    selector: '.rewards-tile > :first-child',
    before: 'Open Sans · 24/24 px', after: 'Roboto Condensed · 24/28 px · 400',
    description: 'Заголовок передаётся строкой в Tile. Reactor сам создаёт TileHeader и применяет block-title.',
    reason: 'Ручная подмена font-family и line-height обходила типографику Reactor. Кроме того, Open Sans под прежним именем не был подключён.',
    source: 'ReferralPage.jsx · Tile / TileHeader',
  },
  {
    id: 'page-heading', title: 'Заголовок страницы', selector: '.page-heading',
    before: '40/40 px · задан вес 300', after: '40/48 px · вес 400',
    description: 'Убраны ручные размер, межстрочный интервал и вес. Заголовок использует токен page-title; семантический h1 сохранён.',
    reason: 'Размеры и шрифт теперь задаёт текущая тема Reactor. Удалены лишние импорты Roboto Condensed 300, которые не использовал этот токен.',
    source: 'ReferralPage.jsx, main.jsx · page-title',
  },
  {
    id: 'introduction', title: 'Текст вводной карточки', selector: '.intro > :nth-child(2), .intro > :nth-child(3)',
    before: 'Абзац 14/24 px; подзаголовок вручную', after: 'paragraph 14/20 px; subtitle 16/24 px',
    description: 'Основной абзац вернулся к paragraph. Для «Как настроить реферальную программу» выбран готовый subtitle.',
    reason: 'Вместо смешения ручных настроек используются два штатных уровня типографики. Содержание инструкции сохранено.',
    source: 'ReferralPage.jsx · Text',
  },
  {
    id: 'tile-spacing', title: 'Отступы карточек', selector: '.rewards-tile',
    before: 'Шапка: 16 px; содержимое: 32 / 16 / 24 px', after: 'Шапка: 16 / 24 px; содержимое: 24 px',
    description: 'Удалены CSS-переопределения внутренних отступов двух карточек наград, в том числе для узкого экрана.',
    reason: 'Шапка и содержимое используют стандартную геометрию Tile. Это согласованное возвращение к компоненту, а не исправление бизнес-логики.',
    source: 'styles.css · Tile',
  },
  {
    id: 'form-labels', title: 'Подписи настроек', selector: '.setting-row > :first-child',
    before: 'Обычный Text вместо подписи формы', after: 'Штатный компонент Label',
    description: '«Тип вознаграждения», «Ограничить» и подписи полей начисления баллов переведены на Label.',
    reason: 'Для подписей формы в Reactor предусмотрен Label. Внешне изменение небольшое; значения и поведение полей не менялись.',
    source: 'RewardGroup.jsx · Label',
  },
  {
    id: 'separator', title: 'Разделитель групп', selector: '.reward-separator',
    before: 'Линия, нарисованная собственным CSS', after: 'Компонент Separator',
    description: 'Между регистрацией и первым проживанием установлен Separator. Внешние отступы разделителя сохранены.',
    reason: 'Цвет и толщина линии теперь приходят из Reactor, без дублирования стилей компонента.',
    source: 'ReferralPage.jsx, styles.css · Separator',
  },
];

export function clipReviewRect(rect, bounds) {
  const left = Math.max(rect.left - 3, bounds.left);
  const top = Math.max(rect.top - 3, bounds.top);
  const right = Math.min(rect.right + 3, bounds.right);
  const bottom = Math.min(rect.bottom + 3, bounds.bottom);
  return right > left && bottom > top ? {left, top, width: right - left, height: bottom - top} : null;
}
