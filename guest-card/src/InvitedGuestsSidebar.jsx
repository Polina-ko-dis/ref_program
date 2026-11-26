import React from 'react';
import {SidebarWindow, CoreTile, Column, Grid, LabelSpan, Text, Link, Tag, Icon, Separator, useIsMobile} from '@reactor/reactor';
import {i} from '@reactor/intl';
import {invitedGuests, referralProgress} from './data.mjs';

function ReferralProgress() {
  const details = [
    {label: 'Зарегистрированные гости', value: i.number(referralProgress.registeredGuests, 0)},
    {label: 'Прожившие гости', value: i.number(referralProgress.stayedGuests, 0)},
    {label: 'Ваучеры', value: i.number(referralProgress.vouchers, 0), color: referralProgress.vouchers === 0 ? 'orange' : 'success'},
    {label: 'Начисления', value: `${i.number(referralProgress.nights, 0)} ночи`},
  ];
  return <CoreTile decoration="invited-guests-progress">
    <CoreTile>
      <Column padding={16} gap={16} noGrow>
        <LabelSpan text="Прогресс по реферальной программе" typography="subtitle"/>
        <Column gap={8} noGrow>
          {details.map(detail => <React.Fragment key={detail.label}>
            <Grid columns="minmax(0, 1fr) auto" gap={8} alignItems="center" overflow="visible">
              <Text text={detail.label}/>
              <Tag color={detail.color ?? 'success'} filled text={detail.value}/>
            </Grid>
            <Separator/>
          </React.Fragment>)}
        </Column>
      </Column>
    </CoreTile>
  </CoreTile>;
}

function InvitedGuest({guest, index, mobile, onOpenGuest}) {
  const details = [
    {label: 'ФИО', content: <Link text={guest.name} onClick={() => onOpenGuest(guest)}/>},
    {label: 'Дата регистрации', content: <Text text={i.date(guest.registrationDate, 'numeric', 'UTC')}/>},
    ...(guest.stayed ? [{label: 'Проживание после приглашения', content: <Icon name="success" color="success" size="sm"/>}] : []),
    {label: 'Email подтвержден', content: guest.emailConfirmed ? <Icon name="success" color="success" size="sm"/> : <Text text="—" color="disabled"/>},
    {label: 'Вознаграждение за друга', content: <Text text={guest.reward}/>},
  ];
  return <section aria-label={`Приглашенный гость ${index + 1}`}>
    <Grid columns={mobile ? 'minmax(0, 1fr)' : '200px minmax(0, 1fr)'} gap={16} alignItems="center" overflow="visible">
      {details.flatMap(detail => [
        <Text key={`${detail.label}-label`} text={detail.label}/>,
        <div key={`${detail.label}-value`}>{detail.content}</div>,
      ])}
    </Grid>
  </section>;
}

export default function InvitedGuestsSidebar({open, onClose, onOpenGuest}) {
  const mobile = useIsMobile();
  const setVisible = visible => {if (!visible) onClose();};
  return <SidebarWindow header="Приглашенные гости" state={[open, setVisible]} actions={{primary: false, cancel: {text: 'Закрыть'}}}>
    <Column gap={24} noGrow>
      <ReferralProgress/>
      {invitedGuests.map((guest, index) => <React.Fragment key={guest.id}>
        {index > 0 && <Separator/>}
        <InvitedGuest guest={guest} index={index} mobile={mobile} onOpenGuest={onOpenGuest}/>
      </React.Fragment>)}
    </Column>
  </SidebarWindow>;
}
