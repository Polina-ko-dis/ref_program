import React, {useEffect, useRef, useState} from 'react';
import {Icon, Text} from '@reactor/reactor';

// Основа: Polina-ko-dis/LK_B2B, src/Navigation.jsx.
const groups = [
  ['lamp', 'Помощник', true], ['calendar-day', 'Управление номерами', true],
  ['house', 'Настройки гостиницы', true], ['developer-board', 'Управление отелем', true],
  ['room-service', 'Услуги', true], ['hive', 'Менеджер каналов'], ['radar', 'Метапоисковики'],
  ['insights', 'Аналитика'], ['key', 'Ключи', true], ['forum', 'Репутация', true],
  ['cases', 'Управление заказами'], ['mail', 'Маркетинг', true], ['folder', 'Документооборот', true],
  ['report', 'Отчеты', true], ['user-check', 'Онлайн-регистрация', true], ['arrow-circle-double', 'Сравнение цен'],
];
export default function Navigation({mobileOpen, onClose, onNavigate}) {
  const [guestsOpen, setGuestsOpen] = useState(true);
  const [loyaltyOpen, setLoyaltyOpen] = useState(true);
  const [expanded, setExpanded] = useState('');
  const menu = useRef(null);
  useEffect(() => {
    const active = menu.current?.querySelector('[aria-current="page"]');
    if (active) menu.current.scrollTop = Math.max(0, active.offsetTop - menu.current.clientHeight + 180);
  }, [guestsOpen, loyaltyOpen, mobileOpen]);
  const row = (icon, title, arrow, onClick, open) => <button type="button" className="navigation-row" key={title} onClick={onClick} aria-expanded={arrow ? Boolean(open) : undefined}>
    <Icon name={icon} size="sm" color="scaffold-light-foreground"/><Text text={title} color="scaffold-light-foreground"/>
    {arrow && <span className="navigation-arrow"><Icon name={open ? 'arrow-drop-up' : 'arrow-drop-down'} color="scaffold-light-foreground"/></span>}
  </button>;
  const child = (title, {active, level = 2, onClick, arrow, badge} = {}) => <button type="button" key={title} aria-current={active ? 'page' : undefined} className={`navigation-child level-${level}${active ? ' active' : ''}`} onClick={onClick || (() => onNavigate(title))}>
    <Text text={title} color={active ? 'foreground' : 'foreground-inverse'}/>
    {badge && <span className="navigation-badge">A</span>}
    {arrow && <span className="navigation-arrow"><Icon name={arrow} color="foreground-inverse"/></span>}
  </button>;
  return <>
    {mobileOpen && <button className="mobile-scrim" type="button" aria-label="Закрыть меню" onClick={onClose}/>}
    <aside className={`navigation${mobileOpen ? ' mobile-open' : ''}`} aria-label="Главное меню">
      <div className="provider"><Icon name="more-vert" color="foreground-inverse"/><span className="provider-logo">Д</span><div><Text text="Демонстрационная гостиница" color="foreground-inverse"/><Text text="1024 Москва" typography="caption" color="foreground-inverse"/></div></div>
      <nav className="navigation-items" ref={menu}>
        {groups.map(([icon, title, arrow]) => <React.Fragment key={title}>
          {row(icon, title, arrow, () => arrow ? setExpanded(expanded === title ? '' : title) : onNavigate(title), expanded === title)}
          {expanded === title && child(title, {onClick: () => onNavigate(title)})}
        </React.Fragment>)}
        {row('users', 'Управление гостями', true, () => setGuestsOpen(v => !v), guestsOpen)}
        {guestsOpen && <>
          {child('Мои гости')}
          {child('Программа лояльности', {onClick: () => setLoyaltyOpen(v => !v), arrow: loyaltyOpen ? 'arrow-drop-up' : 'arrow-drop-down'})}
          {loyaltyOpen && <>
            {['Список карт', 'Статистика', 'Карта Wallet', 'Ваучеры'].map(title => child(title, {level: 3}))}
            {child('Реферальная программа', {active: true, level: 3, onClick: onClose})}
            {child('Настройки (admin)', {level: 3, badge: true})}
          </>}
          {child('Личный кабинет гостя')}{child('Интеграция с CRM')}
        </>}
        {row('book', 'Модуль бронирования', true, () => onNavigate('Модуль бронирования'))}
      </nav>
    </aside>
  </>;
}
