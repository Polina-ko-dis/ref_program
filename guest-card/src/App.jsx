import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ReactorTheme, Button, IconButton, Icon, Text, DialogWindow, SnackbarWindow} from '@reactor/reactor';
import Navigation from './Navigation.jsx';
import GuestCardPage from './GuestCardPage.jsx';
import {GuestDataWindow, AccumulationsWindow, VoucherWindow} from './modals.jsx';
import {guest as guestMock} from './data.mjs';

function Prototype() {
  const [guest, setGuest] = useState(guestMock);
  const [modal, setModal] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [toast, setToast] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const workspaceScroll = useRef(null);
  const setToastVisible = useCallback(visible => {if (!visible) setToast(null);}, []);
  const setDialogVisible = useCallback(visible => {if (!visible) setDialog(null);}, []);
  const notify = (text, status = 'success') => setToast({text, status, key: Date.now()});

  useEffect(() => {
    if (!window.location.hash) window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#/GuestCard`);
  }, []);

  const closeModal = () => setModal(null);
  const otherPage = title => {
    setMobileOpen(false);
    notify(`В этом прототипе доступна страница «Карта гостя». Раздел «${title}» не подключён.`, 'info');
  };
  const saveGuest = draft => {
    const birthDate = new Intl.DateTimeFormat('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(draft.birthTimestamp)).replace(' г.', '');
    setGuest({...guest, ...draft, birthDate});
    closeModal();
    notify('Данные гостя сохранены');
  };
  const applyAccumulations = () => {closeModal(); notify('Накопления изменены');};
  const assignVoucher = () => {closeModal(); notify('Ваучер присвоен');};

  return <>
    <a className="skip-link" href="#main-content">К содержимому</a>
    <div className="shell">
      <Navigation mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} onNavigate={otherPage}/>
      <div className="workspace">
        <header className="topbar">
          <div className="topbar-actions"><span className="mobile-menu"><IconButton icon="list" hint="Открыть меню" onClick={() => setMobileOpen(true)}/></span><IconButton icon="arrow-left" color="accent" hint="Назад" onClick={() => otherPage('Программа лояльности')}/></div>
          <div className="topbar-user"><IconButton icon="wallet" color="accent" hint="Баланс" onClick={() => otherPage('Баланс')}/><IconButton icon="settings" color="accent" hint="Настройки" onClick={() => otherPage('Настройки')}/><IconButton icon="notification" color="accent" hint="Уведомления" onClick={() => notify('Новых уведомлений нет', 'info')}/><IconButton icon="help" color="accent" hint="Помощь" onClick={() => setDialog('help')}/><span className="user-name"><Icon name="account" color="accent"/><Text text="polina.kozlova" color="accent"/></span></div>
        </header>
        <div className="workspace-scroll" ref={workspaceScroll}>
          <div className="workspace-content">
            <GuestCardPage guest={guest} onEditGuest={() => setModal('guest')} onEditAccumulations={() => setModal('accumulations')} onAssignVoucher={() => setModal('voucher')}/>
            <footer className="footer"><div><Text typography="caption" color="neutral" text="© ООО «ТРЭВЕЛ ЛАЙН СИСТЕМС», 2021 – 2026"/><Text typography="caption" color="neutral" text="TravelLine: Platform — автоматизация процессов для гостиничного бизнеса"/></div><img className="footer-brand" src={`${import.meta.env.BASE_URL}assets/travelline-logo.svg`} alt="TravelLine"/></footer>
          </div>
        </div>
      </div>
    </div>
    <GuestDataWindow open={modal === 'guest'} onClose={closeModal} guest={guest} onSave={saveGuest}/>
    <AccumulationsWindow open={modal === 'accumulations'} onClose={closeModal} guest={guest} accumulations={{nights: 29, amount: 273000}} onApply={applyAccumulations}/>
    <VoucherWindow open={modal === 'voucher'} onClose={closeModal} guest={guest} onApply={assignVoucher}/>
    <DialogWindow type="info" header="Помощь" title="Прототип карты гостя" state={[Boolean(dialog), setDialogVisible]} footer={<Button text="Закрыть" onClick={() => setDialog(null)}/>}><Text text="Локальный прототип карты гостя программы лояльности на компонентах Reactor. Данные гостя, накопления и история операций — мок-данные. Действия «Изменить накопления», «Присвоить ваучер» и редактирование контактов работают в демонстрационном режиме."/></DialogWindow>
    <SnackbarWindow key={toast?.key || 'empty'} text={toast?.text || ''} status={toast?.status || 'success'} state={[Boolean(toast), setToastVisible]} close={() => setToast(null)}/>
  </>;
}

export default function App() {return <ReactorTheme><div id="reactor-app-portal"/><Prototype/></ReactorTheme>;}
