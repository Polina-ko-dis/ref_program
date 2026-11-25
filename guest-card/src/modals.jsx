import React, {useEffect, useState} from 'react';
import {ModalWindow, Button, Text, Radio, Field, PhoneField, EmailField, DatePickerField, NumberField, Textarea, ReadOnlyField, SelectField, HelpIcon, Icon} from '@reactor/reactor';
import {voucherCategories, voucherTerms} from './data.mjs';

const commentHint = 'Комментарий отображается в истории операций и не показывается гостю.';
const fullName = guest => `${guest.lastName} ${guest.firstName}${guest.middleName ? ` ${guest.middleName}` : ''}`;
const FieldLabel = ({text}) => <div className="form-row"><Text text={text}/></div>;
const FieldRow = ({children}) => <div className="form-offset field-row">{children}</div>;

const Footer = ({submitText, onSubmit, onCancel}) => <>
  <Button type="primary" text={submitText} onClick={onSubmit}/>
  <Button text="Отменить" onClick={onCancel}/>
</>;

export function GuestDataWindow({open, onClose, guest, onSave}) {
  const [draft, setDraft] = useState(guest);
  useEffect(() => {if (open) setDraft(guest);}, [open, guest]);
  const set = patch => setDraft({...draft, ...patch});
  const setVisible = visible => {if (!visible) onClose();};
  return <ModalWindow header="Изменить данные гостя" state={[open, setVisible]} footer={<Footer submitText="Сохранить" onSubmit={() => onSave(draft)} onCancel={onClose}/>}>
    <div className="modal-form">
      <FieldLabel text="Фамилия"/><FieldRow><Field value={draft.lastName} onChange={lastName => set({lastName})}/></FieldRow>
      <FieldLabel text="Имя"/><FieldRow><Field value={draft.firstName} onChange={firstName => set({firstName})}/></FieldRow>
      <FieldLabel text="Отчество"/><FieldRow><Field value={draft.middleName} onChange={middleName => set({middleName})}/></FieldRow>
      <FieldLabel text="Номер телефона"/><FieldRow><PhoneField value={draft.phone} onChange={phone => set({phone})}/></FieldRow>
      <FieldLabel text="E-mail"/><FieldRow><EmailField value={draft.email} onChange={email => set({email})}/></FieldRow>
      <FieldLabel text="День рождения"/><FieldRow><DatePickerField value={draft.birthTimestamp} onChange={birthTimestamp => set({birthTimestamp})}/></FieldRow>
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
  return <ModalWindow header="Изменение накоплений" state={[open, setVisible]} footer={<Footer submitText="Применить" onSubmit={() => onApply({action, nights, amount, comment})} onCancel={onClose}/>}>
    <div className="modal-form">
      <div className="form-row"><Text text="ФИО владельца карты"/></div>
      <div className="form-offset"><ReadOnlyField text={fullName(guest)}/></div>
      <div className="form-row"><Text text="Баланс накоплений"/></div>
      <div className="form-offset balance-row">
        <ReadOnlyField text={String(accumulations.nights)} suffix="ночей"/>
        <ReadOnlyField text={accumulations.amount.toLocaleString('ru-RU')} suffix="RUB"/>
      </div>
      <div className="form-row"><Text text="Действие с накоплениями"/></div>
      <div className="form-offset radio-row">
        <Radio label="Начислить" selected={action === 'accrue'} onChange={() => setAction('accrue')}/>
        <Radio label="Списать" selected={action === 'withdraw'} onChange={() => setAction('withdraw')}/>
      </div>
      <div className="form-row"><Text text="Количество накоплений"/></div>
      <div className="form-offset balance-row">
        <NumberField value={nights} onChange={setNights} suffix="ночей" mask="int" placeholder="0"/>
        <NumberField value={amount} onChange={setAmount} suffix="RUB" mask="int" placeholder="0"/>
      </div>
      <div className="form-row"><Text text="Комментарий"/></div>
      <div className="form-offset"><Textarea value={comment} onChange={setComment} placeholder="Номер бронирования, причина операции"/></div>
      <Text text={commentHint} typography="caption" color="disabled"/>
    </div>
  </ModalWindow>;
}

export function VoucherWindow({open, onClose, guest, onApply}) {
  const [category, setCategory] = useState(voucherCategories[0].value);
  const [term, setTerm] = useState(voucherTerms[0].value);
  const [comment, setComment] = useState('');
  useEffect(() => {if (open) {setCategory(voucherCategories[0].value); setTerm(voucherTerms[0].value); setComment('');}}, [open]);
  const setVisible = visible => {if (!visible) onClose();};
  return <ModalWindow header="Присвоение ваучера" state={[open, setVisible]} footer={<Footer submitText="Применить" onSubmit={() => onApply({category, term, comment})} onCancel={onClose}/>}>
    <div className="modal-form">
      <div className="form-row"><Text text="ФИО владельца"/></div>
      <div className="form-offset"><ReadOnlyField text={fullName(guest)}/></div>
      <div className="form-row"><Text text="Категория ваучера"/></div>
      <div className="form-offset"><SelectField value={category} onChange={setCategory} options={voucherCategories}/></div>
      <div className="form-row"><Text text="Письма гостю о выданном ваучере"/><HelpIcon hint="По умолчанию при присвоении ваучера гостю не отправляются письма. Настроить рассылку можно в разделе «Ваучеры»."/></div>
      <div className="form-offset"><ReadOnlyField text="Не рассылаются"/></div>
      <div className="form-row"><Text text="Срок действия ваучера у гостя"/></div>
      <div className="form-offset"><SelectField value={term} onChange={setTerm} options={voucherTerms}/></div>
      <div className="form-row"><Text text="Комментарий"/></div>
      <div className="form-offset"><Textarea value={comment} onChange={setComment} placeholder="Причина присвоения"/></div>
      <Text text={commentHint} typography="caption" color="disabled"/>
    </div>
  </ModalWindow>;
}
