import React from 'react';
import {PageTop, Tile, Text, HelpIcon, InfoAlert, WarningAlert, SuccessAlert, Switch} from '@reactor/reactor';
import RewardGroup, {ErrorText} from './RewardGroup.jsx';
import {registrationHint, invitedHint} from './data.mjs';

function Introduction({kind}) {
  return <Tile decoration="intro-tile"><div className="intro">
    <Text typography="subtitle" text="Привлекайте новых лояльных гостей через реферальную программу"/>
    <Text style={{lineHeight: '24px'}} text="С помощью реферальной программы ваши постоянные клиенты могут приглашать друзей и родственников и получать за это бонусы или скидки. Каждый приглашенный гость получает карту лояльности, а вы — еще больше прямых бронирований. После активации программы в личном кабинете гостя появится реферальная ссылка для приглашений. Вознаграждение начисляется после регистрации или проживания гостей."/>
    <Text text="Как настроить реферальную программу" style={{fontWeight: 700, lineHeight: '24px'}}/>
    <div className="intro-instructions"><p><Text html text="1. Заполните настройки, учитывая предпочтения гостей по вознаграждениям.<br/>По нашим данным, гостей привлекает:"/></p>
      <ul><li><Text text="Ваучер на бесплатную ночь — больше всего"/></li><li><Text text={kind === 'points' ? 'Баллы и ваучер на скидку при бронировании — немного меньше' : 'Ваучер на скидку при бронировании — немного меньше'}/></li><li><Text text="Повышение уровня лояльности — меньше всего."/></li></ul>
      <p><Text html text={`2. Настраивайте дополнительные вознаграждения для приглашенных гостей<br/>Дополнительные бонусы в виде ваучеров${kind === 'points' ? ' и баллов' : ''} помогают мотивировать новых гостей зарегистрироваться по реферальной ссылке.`}/></p>
    </div>
  </div></Tile>;
}
const GroupTitle = ({text, hint}) => <div className="group-title"><Text text={text} typography="subtitle"/>{hint && <HelpIcon hint={hint}/>}</div>;

export default function ReferralPage({config, onChange, errors, onActivation, onLoyalty}) {
  const update = key => value => onChange({...config, [key]: value});
  const Banner = config.status === 'active' ? SuccessAlert : WarningAlert;
  return <main className="page" id="main-content">
    <PageTop title={<h1 className="page-heading"><Text text="Реферальная программа" typography="page-title" style={{fontSize: 40, lineHeight: '40px', fontWeight: 300}}/></h1>}/>
    {!config.saved ? <Introduction kind={config.kind}/> : <div className="program-status"><Banner text={config.status === 'active' ? 'Реферальная программа активирована' : 'Реферальная программа деактивирована'}/><div className="status-switch"><Switch value={config.status === 'active'} onChange={onActivation} label={{text: 'Активировать реферальную программу', style: {position: 'absolute', width: 1, height: 1, overflow: 'hidden', clipPath: 'inset(50%)'}}}/></div></div>}
    <ErrorText text={errors.rewards}/>
    <Tile header={<Text text="Вознаграждения для постоянных гостей" typography="block-title" style={{fontFamily: "'Open Sans', sans-serif", lineHeight: '24px'}}/>} decoration="rewards-tile">
      <section className="reward-section">
        <GroupTitle text="За регистрацию приглашенного гостя в личном кабинете" hint={registrationHint}/>
        <RewardGroup id="registration" title="За регистрацию приглашенного гостя" value={config.registration} onChange={update('registration')} kind={config.kind} errors={errors} allowLimit/>
      </section>
      <div className="reward-separator"/>
      <section className="reward-section">
        <GroupTitle text="За первое проживание приглашенного гостя"/>
        <RewardGroup id="stay" title="За первое проживание приглашенного гостя" value={config.stay} onChange={update('stay')} kind={config.kind} errors={errors} allowUpgrade/>
      </section>
    </Tile>
    <Tile header={<Text text="Вознаграждения для приглашенных гостей" typography="block-title" style={{fontFamily: "'Open Sans', sans-serif", lineHeight: '24px'}}/>} decoration="rewards-tile">
      <section className="reward-section invited-section">
        <GroupTitle text="За регистрацию в личном кабинете" hint={invitedHint}/>
        <div onClick={event => {if (event.target.closest('a')) {event.preventDefault(); onLoyalty();}}}>
          <InfoAlert text={'При регистрации по реферальной ссылке гость автоматически получает бонусы <a href="#/Settings/StatusLevels">программы лояльности</a>, которые можно использовать при бронировании. Вы также можете добавить дополнительное вознаграждение — все бонусы суммируются.'}/>
        </div>
        <RewardGroup id="invited" title="Награда приглашённому гостю" value={config.invited} onChange={update('invited')} kind={config.kind} errors={errors}/>
      </section>
    </Tile>
  </main>;
}
