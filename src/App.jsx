import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ReactorTheme, Button, IconButton, Icon, Text, Select, DialogWindow, SnackbarWindow} from '@reactor/reactor';
import Navigation from './Navigation.jsx';
import ReferralPage from './ReferralPage.jsx';
import {createInitialConfig, readConfig, saveConfig, activateConfig, validateConfig, STORAGE_KEY} from './model.mjs';

const getStorage = () => {try {return window.localStorage;} catch {return null;}};
const serialize = value => JSON.stringify(value);
const programKinds = [{value: 'discount', text: 'Скидочная программа'}, {value: 'points', text: 'Балльная программа'}];

function Prototype() {
  const [config, setConfig] = useState(() => readConfig(getStorage()));
  const [snapshot, setSnapshot] = useState(config);
  const [errors, setErrors] = useState({});
  const [dialog, setDialog] = useState(null);
  const [toast, setToast] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [devOpen, setDevOpen] = useState(!new URLSearchParams(window.location.search).has('presentation'));
  const pending = useRef(null);
  const workspaceScroll = useRef(null);
  const dirty = serialize(config) !== serialize(snapshot);
  const setDialogVisible = useCallback(visible => {if (!visible) setDialog(null);}, []);
  const setToastVisible = useCallback(visible => {if (!visible) setToast(null);}, []);

  useEffect(() => {
    if (!window.location.hash) window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#/ReferralProgram`);
  }, []);
  useEffect(() => {
    const prevent = event => {if (dirty) {event.preventDefault(); event.returnValue = '';}};
    window.addEventListener('beforeunload', prevent);
    return () => window.removeEventListener('beforeunload', prevent);
  }, [dirty]);

  const notify = (text, status = 'success') => setToast({text, status, key: Date.now()});
  const update = next => {setConfig(next); setErrors({});};
  const showErrors = nextErrors => {
    setErrors(nextErrors);
    notify('Не удалось сохранить. Исправьте ошибки на странице', 'danger');
    requestAnimationFrame(() => document.querySelector('[role="alert"]')?.scrollIntoView({block: 'center', behavior: 'smooth'}));
  };
  const commit = (next = config, activate = false) => {
    const result = activate ? activateConfig(getStorage(), next) : saveConfig(getStorage(), next);
    if (result.errors) {showErrors(result.errors); return false;}
    if (result.error) {notify(result.error, 'danger'); return false;}
    setConfig(result.config); setSnapshot(result.config); setErrors({});
    notify('Изменения сохранены');
    return true;
  };
  const guard = action => {if (dirty) {pending.current = action; setDialog('unsaved');} else action();};
  const otherPage = title => guard(() => {
    setMobileOpen(false);
    notify(`В этом прототипе доступна страница «Реферальная программа». Раздел «${title}» не подключён.`, 'info');
  });
  const activation = active => {
    if (active) {
      const nextErrors = validateConfig(config, {activation: true});
      if (Object.keys(nextErrors).length) {showErrors(nextErrors); return;}
    }
    setDialog(active ? 'activate' : 'deactivate');
  };
  const chooseKind = kind => guard(() => {const next = createInitialConfig(kind); setConfig(next); setSnapshot(next); setErrors({});});
  const fill = () => {
    const next = createInitialConfig(config.kind);
    next.registration.limited = true; next.registration.limit = 10;
    if (config.kind === 'points') {
      next.registration.points = true; next.registration.amount = 250;
      next.stay.points = true; next.stay.method = 'percent'; next.stay.amount = 10;
      next.invited.points = true; next.invited.amount = 100;
    } else {
      next.registration.voucher = true; next.registration.voucherId = 'free-night';
      next.stay.voucher = true; next.stay.voucherId = 'booking-discount';
      next.invited.voucher = true; next.invited.voucherId = 'hotel-services';
    }
    next.stay.upgrade = true; update(next);
  };
  const reset = () => guard(() => {
    const next = createInitialConfig(config.kind);
    try {getStorage().setItem(STORAGE_KEY, serialize(next));} catch {notify('Не удалось сбросить сохранённые настройки', 'danger'); return;}
    setConfig(next); setSnapshot(next); setErrors({});
    workspaceScroll.current?.scrollTo({top: 0});
  });
  const close = () => setDialog(null);
  const runPending = save => {
    if (save && !commit()) {close(); return;}
    if (!save) {setConfig(structuredClone(snapshot)); setErrors({});}
    const action = pending.current; pending.current = null; close(); action?.();
  };
  const dialogData = {
    unsaved: {type: 'warning', header: 'Сохранение изменений', title: 'У вас есть несохранённые данные', text: 'Если вы уйдёте, введённые данные не будут сохранены.'},
    activate: {type: 'info', header: 'Активация реферальной программы', title: 'Активировать реферальную программу?', text: 'Ваши постоянные гости смогут приглашать друзей по ссылке и получать за это вознаграждения. Приглашённые гости при регистрации получат карту лояльности.'},
    activated: {type: 'info', header: 'Активация реферальной программы', title: 'Реферальная программа активирована', text: 'Теперь ваши постоянные гости могут приглашать своих друзей по ссылке и получать за это вознаграждения. Приглашённые гости сразу при регистрации получат карту лояльности.'},
    deactivate: {type: 'warning', header: 'Деактивация реферальной программы', title: 'Деактивировать реферальную программу?', text: 'Новые вознаграждения за приглашение гостей больше не будут начисляться.'},
    loyalty: {type: 'info', header: 'Программа лояльности', title: 'Бонусы программы лояльности', text: 'В этом примере приглашённые гости получают карту первого уровня. Вознаграждения реферальной программы добавляются к бонусам карты.'},
  }[dialog];
  const dialogFooter = () => <>
    {dialog === 'unsaved' ? <><Button type="primary" text="Сохранить" onClick={() => runPending(true)}/><Button text="Не сохранять" onClick={() => runPending(false)}/><Button text="Отмена" onClick={close}/></>
    : dialog === 'activate' ? <><Button type="primary" text={dirty ? 'Сохранить и активировать' : 'Активировать'} onClick={() => {if (commit(config, true)) setDialog('activated'); else close();}}/><Button text="Отмена" onClick={close}/></>
    : dialog === 'deactivate' ? <><Button type="primary" text={dirty ? 'Сохранить и деактивировать' : 'Деактивировать'} onClick={() => {commit({...config, status: 'inactive'}); close();}}/><Button text="Отмена" onClick={close}/></>
    : <Button text="Закрыть" onClick={close}/>}
  </>;

  return <>
    <a className="skip-link" href="#main-content">К содержимому</a>
    <div className="shell">
      <Navigation mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} onNavigate={otherPage}/>
      <div className="workspace">
        <header className="topbar">
          <div className="topbar-actions"><span className="mobile-menu"><IconButton icon="list" hint="Открыть меню" onClick={() => setMobileOpen(true)}/></span><IconButton icon="arrow-left" color="accent" hint="Назад" onClick={() => otherPage('Программа лояльности')}/><Button type="primary" text="Сохранить" onClick={() => commit()}/></div>
          <div className="topbar-user"><IconButton icon="wallet" color="accent" hint="Баланс" onClick={() => otherPage('Баланс')}/><IconButton icon="settings" color="accent" hint="Настройки" onClick={() => otherPage('Настройки')}/><IconButton icon="notification" color="accent" hint="Уведомления" onClick={() => notify('Новых уведомлений нет', 'info')}/><IconButton icon="help" color="accent" hint="Помощь" onClick={() => setDialog('loyalty')}/><span className="user-name"><Icon name="account" color="accent"/><Text text="polina.kozlova" color="accent"/></span></div>
        </header>
        <div className="workspace-scroll" ref={workspaceScroll}>
          <div className="workspace-content">
            <ReferralPage config={config} onChange={update} errors={errors} onActivation={activation} onLoyalty={() => setDialog('loyalty')}/>
            <footer className="footer"><div><Text typography="caption" color="neutral" text="© ООО «ТРЭВЕЛ ЛАЙН СИСТЕМС», 2021 – 2026"/><Text typography="caption" color="neutral" text="TravelLine: Platform — автоматизация процессов для гостиничного бизнеса"/></div><img className="footer-brand" src={`${import.meta.env.BASE_URL}assets/travelline-logo.svg`} alt="TravelLine"/></footer>
          </div>
        </div>
      </div>
    </div>
    {devOpen ? <aside className="dev-panel" aria-label="Панель прототипа"><Text text="Прототип" color="neutral" typography="caption"/><Select size="md" value={config.kind} options={programKinds} onChange={chooseKind}/><Button text="Заполнить пример" onClick={fill}/><IconButton icon="undo" hint="Сбросить пример" onClick={reset}/><IconButton icon="decline" hint="Скрыть панель прототипа" onClick={() => setDevOpen(false)}/></aside> : <div className="dev-trigger"><IconButton icon="code" hint="Показать панель прототипа" onClick={() => setDevOpen(true)}/></div>}
    <DialogWindow type={dialogData?.type || 'info'} header={dialogData?.header || ''} title={dialogData?.title || ''} state={[Boolean(dialog), setDialogVisible]} footer={dialogFooter}><Text text={dialogData?.text || ''}/></DialogWindow>
    <SnackbarWindow key={toast?.key || 'empty'} text={toast?.text || ''} status={toast?.status || 'success'} state={[Boolean(toast), setToastVisible]} close={() => setToast(null)}/>
  </>;
}
export default function App() {return <ReactorTheme><div id="reactor-app-portal"/><Prototype/></ReactorTheme>;}
