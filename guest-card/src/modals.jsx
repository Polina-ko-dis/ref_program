import React, {useEffect, useState} from 'react';
import {ModalWindow, Button, Text, Radio, Field, PhoneField, EmailField, DatePickerField, NumberField, Textarea, ReadOnlyField, SelectField, HelpIcon} from '@reactor/reactor';
import {voucherCategories, voucherTerms} from './data.mjs';

const commentHint = 'Комментарий отображается в истории операций и не показывается гостю.';
const fullName = guest => `${guest.lastName} ${guest.firstName}${guest.middleName ? ` ${guest.middleName}` : ''}`;
const contentSize = () => ({});
const FormRow = ({label, help, hint, children}) => <>
  <div className="form-label"><Text text={label}/>{help && <HelpIcon hint={help}/>}</div>
  <div className="form-control">
    {children}
    {hint && <Text text={hint} typography="caption" color="disabled"/>}
  </div>
</>;

const Footer = ({submitText, onSubmit, onCancel}) => <>
  <Button type="primary" text={submitText} onClick={onSubmit}/>
  <Button text="Отменить" onClick={onCancel}/>
</>;

export function GuestDataWindow({open, onClose, guest, onSave}) {
  const [draft, setDraft] = useState(guest);
  useEffect(() => {if (open) setDraft(guest);}, [open, guest]);
  const set = patch => setDraft({...draft, ...patch});
  const setVisible = visible => {if (!visible) onClose();};
  return <ModalWindow header="Изменить данные гостя" size={contentSize} state={[open, setVisible]} footer={<Footer submitText="Сохранить" onSubmit={() => onSave(draft)} onCancel={onClose}/>}>
    <div className="modal-form">
      <FormRow label="Фамилия"><Field size="stretch" value={draft.lastName} onChange={lastName => set({lastName})}/></FormRow>
      <FormRow label="Имя"><Field size="stretch" value={draft.firstName} onChange={firstName => set({firstName})}/></FormRow>
      <FormRow label="Отчество"><Field size="stretch" value={draft.middleName} onChange={middleName => set({middleName})}/></FormRow>
      <FormRow label="Номер телефона"><PhoneField size="stretch" value={draft.phone} onChange={phone => set({phone})}/></FormRow>
      <FormRow label="E-mail"><EmailField size="stretch" value={draft.email} onChange={email => set({email})}/></FormRow>
      <FormRow label="День рождения"><DatePickerField size="stretch" value={draft.birthTimestamp} onChange={birthTimestamp => set({birthTimestamp})}/></FormRow>
    </div>
  </ModalWindow>;
}

export function AccumulationsWindow({open, onClose, guest, accumulations, onApply}) {
  const [action, setAction] = useState('accrue');
  const [nights, setNights] = useState();
  const [amount, setAmount] = useState();
  const [comment, setComment] = useState('');
  useEffect(() => {if (open) {setAction('accrue'); setNights(); setAmount(); setComment('');}}, [open]);
  const setVisible = visible => {if (!visible) onClose();};
  return <ModalWindow header="Изменение накоплений" size={contentSize} state={[open, setVisible]} footer={<Footer submitText="Применить" onSubmit={() => onApply({action, nights, amount, comment})} onCancel={onClose}/>}>
    <div className="modal-form">
      <FormRow label="ФИО владельца"><ReadOnlyField size="stretch" text={fullName(guest)}/></FormRow>
      <FormRow label="Баланс накоплений">
        <div className="unit-field"><ReadOnlyField size="sm" text={String(accumulations.nights)}/><Text text="ночей"/></div>
        <div className="unit-field"><ReadOnlyField size="sm" text={accumulations.amount.toLocaleString('ru-RU')}/><Text text="RUB"/></div>
      </FormRow>
      <FormRow label="Действие с накоплениями">
        <div className="radio-stack">
          <Radio label="Начислить" selected={action === 'accrue'} onChange={() => setAction('accrue')}/>
          <Radio label="Списать" selected={action === 'withdraw'} onChange={() => setAction('withdraw')}/>
        </div>
      </FormRow>
      <FormRow label="Количество накоплений">
        <div className="unit-field"><NumberField size="sm" value={nights} onChange={setNights} mask="int" placeholder="0"/><Text text="ночей"/></div>
        <div className="unit-field"><NumberField size="sm" value={amount} onChange={setAmount} mask="int" placeholder="0"/><Text text="RUB"/></div>
      </FormRow>
      <FormRow label="Комментарий" hint={commentHint}>
        <Textarea size="stretch" value={comment} onChange={setComment} placeholder="Номер бронирования, причина операции"/>
      </FormRow>
    </div>
  </ModalWindow>;
}

export function VoucherWindow({open, onClose, guest, onApply}) {
  const [category, setCategory] = useState(voucherCategories[0].value);
  const [term, setTerm] = useState(voucherTerms[0].value);
  const [comment, setComment] = useState('');
  useEffect(() => {if (open) {setCategory(voucherCategories[0].value); setTerm(voucherTerms[0].value); setComment('');}}, [open]);
  const setVisible = visible => {if (!visible) onClose();};
  return <ModalWindow header="Присвоение ваучера" size={contentSize} state={[open, setVisible]} footer={<Footer submitText="Применить" onSubmit={() => onApply({category, term, comment})} onCancel={onClose}/>}>
    <div className="modal-form">
      <FormRow label="ФИО владельца"><ReadOnlyField size="stretch" text={fullName(guest)}/></FormRow>
      <FormRow label="Категория ваучера"><SelectField size="stretch" value={category} onChange={setCategory} options={voucherCategories}/></FormRow>
      <FormRow label="Письма гостю о выданном ваучере" help="По умолчанию при присвоении ваучера гостю не отправляются письма. Настроить рассылку можно в разделе «Ваучеры»."><ReadOnlyField size="stretch" text="Не рассылаются"/></FormRow>
      <FormRow label="Срок действия ваучера у гостя"><SelectField size="stretch" value={term} onChange={setTerm} options={voucherTerms}/></FormRow>
      <FormRow label="Комментарий" hint={commentHint}>
        <Textarea size="stretch" value={comment} onChange={setComment} placeholder="Причина присвоения"/>
      </FormRow>
    </div>
  </ModalWindow>;
}
