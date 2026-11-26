import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ReactorApp, IconButton, Text, Row, DialogWindow, SnackbarWindow, useIsMobile} from '@reactor/reactor';
import {Scaffold, ScaffoldLogoCard, RibbonBackground, RibbonButtonBack, RibbonButtonUserMenuView} from '@reactor/scaffold-ui';
import {menuItems} from './Navigation.jsx';
import GuestCardPage from './GuestCardPage.jsx';
import {GuestDataWindow, AccumulationsWindow, VoucherWindow} from './modals.jsx';
import InvitedGuestsSidebar from './InvitedGuestsSidebar.jsx';
import {guest as guestMock, accumulations} from './data.mjs';

function Prototype() {
  const [guest, setGuest] = useState(guestMock);
  const [modal, setModal] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [toast, setToast] = useState(null);
  const [menuNavigation, setMenuNavigation] = useState(0);
  const invitedGuestsLinkRef = useRef(null);
  const mobile = useIsMobile();
  const setToastVisible = useCallback(visible => {if (!visible) setToast(null);}, []);
  const setDialogVisible = useCallback(visible => {if (!visible) setDialog(null);}, []);
  const notify = (text, status = 'success') => setToast({text, status, key: Date.now()});

  useEffect(() => {
    if (!window.location.hash) window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#/GuestCard`);
  }, []);
  useEffect(() => {
    document.getElementById('guest-card')?.scrollIntoView({block: 'nearest'});
  }, [menuNavigation]);

  const closeModal = () => setModal(null);
  const closeInvitedGuests = () => {closeModal(); invitedGuestsLinkRef.current?.focus();};
  const otherPage = title => {
    notify(`В этом прототипе доступна страница «Карта гостя». Раздел «${title}» не подключён.`, 'info');
  };
  const saveGuest = draft => {
    setGuest({...guest, ...draft});
    closeModal();
    notify('Данные гостя сохранены');
  };
  const applyAccumulations = () => {closeModal(); notify('Накопления изменены');};
  const assignVoucher = () => {closeModal(); notify('Ваучер присвоен');};
  const navigateMenu = event => {
    const tag = event.target.closest('[tag]')?.getAttribute('tag');
    if (!tag?.startsWith('prototype-menu:')) return;
    event.preventDefault();
    event.stopPropagation();
    const title = tag.slice('prototype-menu:'.length);
    if (mobile) setMenuNavigation(current => current + 1);
    if (title !== 'Карта гостя') otherPage(title);
  };

  return <>
    <a className="skip-link" href="#main-content">К содержимому</a>
    <div className="prototype-shell" onClickCapture={navigateMenu}>
      <Scaffold key={menuNavigation} menu={{items: menuItems, selectedItem: 'guest-card'}}
        logo={<ScaffoldLogoCard letter="М" title="МУЗ включение 2" text="8133 Москва"/>}
        ribbon={<RibbonBackground>
          <Row alignItems="center" justifyContent="space-between" padding={{left: 16, right: 8}}>
            <RibbonButtonBack onClick={() => otherPage('Программа лояльности')}/>
            <Row alignItems="center" gap={8} justifyContent="flex-end" noGrow>
              {!mobile && <><IconButton icon="wallet" color="accent" hint="Баланс" onClick={() => otherPage('Баланс')}/><IconButton icon="settings" color="accent" hint="Настройки" onClick={() => otherPage('Настройки')}/></>}
              <IconButton icon="notification" color="accent" hint="Уведомления" onClick={() => notify('Новых уведомлений нет', 'info')}/>
              <IconButton icon="help" color="accent" hint="Помощь" onClick={() => setDialog('help')}/>
              <RibbonButtonUserMenuView data={{text: 'polina.kozlova', onClick: () => otherPage('Профиль пользователя')}} disabled={false} mobile={mobile}/>
            </Row>
          </Row>
        </RibbonBackground>}>
        <div className="workspace-scroll">
          <div className="workspace-content">
            <GuestCardPage guest={guest} onEditGuest={() => setModal('guest')} onEditAccumulations={() => setModal('accumulations')} onAssignVoucher={() => setModal('voucher')} onOpenInvitedGuests={() => setModal('invited-guests')} invitedGuestsLinkRef={invitedGuestsLinkRef}/>
            <footer className="footer"><div><Text typography="caption" color="neutral" text="© ООО «ТРЭВЕЛ ЛАЙН СИСТЕМС», 2021 – 2026"/><Text typography="caption" color="neutral" text="TravelLine: Platform — автоматизация процессов для гостиничного бизнеса"/></div><img className="footer-brand" src={`${import.meta.env.BASE_URL}assets/travelline-logo.svg`} alt="TravelLine"/></footer>
          </div>
        </div>
      </Scaffold>
    </div>
    <GuestDataWindow open={modal === 'guest'} onClose={closeModal} guest={guest} onSave={saveGuest}/>
    <AccumulationsWindow open={modal === 'accumulations'} onClose={closeModal} guest={guest} accumulations={accumulations} onApply={applyAccumulations}/>
    <VoucherWindow open={modal === 'voucher'} onClose={closeModal} guest={guest} onApply={assignVoucher}/>
    <InvitedGuestsSidebar open={modal === 'invited-guests'} onClose={closeInvitedGuests} onOpenGuest={invitedGuest => notify(`Переход к карточке «${invitedGuest.name}» пока не подключён.`, 'info')}/>
    <DialogWindow type="info" header="Помощь" title="Прототип карты гостя" state={[Boolean(dialog), setDialogVisible]} actions={{primary: false, cancel: {text: 'Закрыть'}}}><Text text="Локальный прототип карты гостя программы лояльности на компонентах Reactor. Данные гостя, накопления и история операций — мок-данные. Действия «Изменить накопления», «Присвоить ваучер» и редактирование контактов работают в демонстрационном режиме."/></DialogWindow>
    <SnackbarWindow key={toast?.key || 'empty'} text={toast?.text || ''} status={toast?.status || 'success'} state={[Boolean(toast), setToastVisible]} close={() => setToast(null)}/>
  </>;
}

export default function App() {return <ReactorApp><Prototype/></ReactorApp>;}
