import React from 'react';
import {PageTop, Tile, Text, Tag, Button, Icon, IconButton, InfoAlert, HelpIcon, DataWidget} from '@reactor/reactor';
import {card, accumulations, attentionText, operations} from './data.mjs';

const levelColors = {
  'SUPER VIP': 'teal',
  'VIP VIP 1': 'purple',
  'VIP VIP': 'deep-orange',
  'Gold': 'amber',
  'Silver22': 'blue-gray',
  'Base': 'blue',
};
const formatNumber = value => value.toLocaleString('ru-RU');
const empty = <Text text="—" color="disabled"/>;

export const LevelTag = ({level}) => level ? <Tag color={levelColors[level] || 'blue-gray'} text={level}/> : empty;

function GuestCardWidget({guest, onEditGuest}) {
  const editLabel = text => ({text, onClick: onEditGuest});
  return <div className="guest-card-widget">
    <DataWidget header="Карта гостя" details={[
      {label: '№', prefix: 'credit-card', values: [card.number]},
      {label: 'Скидка', prefix: 'percent', values: [card.discount]},
      {label: editLabel('День рождения'), prefix: 'calendar-today', values: [guest.birthDate]},
      {label: editLabel('E-mail'), prefix: 'mail', values: [guest.email]},
      {label: editLabel('Телефон'), prefix: 'phone', values: [guest.phone]},
    ]}/>
  </div>;
}

function AccumulationsWidget() {
  return <DataWidget header="Накопления"
    main={{mode: 'pie', value: accumulations.progress, total: 100, partColor: 'warning', text: `${accumulations.progress}%`}}
    details={[
      {label: 'Проживаний на сумму', values: [accumulations.amountLabel]},
      {label: 'Ночей в гостинице', values: [formatNumber(accumulations.nights)]},
      {label: 'Достигнут максимальный уровень', values: [{type: 'icon', name: 'success', color: 'success'}]},
      {label: 'Ваучеры', values: [formatNumber(accumulations.vouchers)]},
    ]}/>;
}

const discountHint = 'Процент скидки, применённый к проживанию по уровню лояльности на момент операции.';
const numberCell = value => value === undefined ? empty : <Text text={String(value)}/>;

function OperationsTile() {
  return <Tile header="История операций">
    <div className="table-scroll">
      <table className="operations-table">
        <thead>
          <tr>
            <th className="col-operation"><Text text="Операция"/></th>
            <th className="col-number col-wrap"><Text text="Стоимость (RUB)"/></th>
            <th className="col-number"><Text text="Ночей"/></th>
            <th className="col-number"><Text text="Скидка (RUB)"/></th>
            <th className="col-number"><span className="header-label"><Text text="Скидка (%)"/><HelpIcon hint={discountHint}/></span></th>
            <th className="col-level col-wrap"><Text text="Уровень лояльности"/></th>
            <th className="col-date"><Text text="Дата выезда"/></th>
            <th className="col-date"><Text text="Дата операции"/></th>
          </tr>
        </thead>
        <tbody>
          {operations.map((operation, index) => <tr key={index}>
            <td className="col-operation">
              <span className="operation-label">
                {operation.type === 'voucher' && <Icon name="chat" size="sm" color="accent"/>}
                {operation.comment !== undefined && <IconButton icon="chat" size="sm" color="neutral" hint={operation.comment}/>}
                <Text text={operation.label}/>
              </span>
            </td>
            <td className="col-number">{operation.cost === undefined ? empty : <Text text={formatNumber(operation.cost)}/>}</td>
            <td className="col-number">{numberCell(operation.nights)}</td>
            <td className="col-number">{numberCell(operation.discountRub)}</td>
            <td className="col-number">{numberCell(operation.discountPct)}</td>
            <td className="col-level"><LevelTag level={operation.level}/></td>
            <td className="col-date">{operation.checkoutDate ? <Text text={operation.checkoutDate}/> : empty}</td>
            <td className="col-date"><Text text={operation.operationDate}/></td>
          </tr>)}
        </tbody>
      </table>
    </div>
  </Tile>;
}

export default function GuestCardPage({guest, onEditGuest, onEditAccumulations, onAssignVoucher}) {
  return <main className="page" id="main-content">
    <div className="page-header">
      <PageTop title={<h1 className="page-heading"><Text text={`${guest.lastName} ${guest.firstName}`} typography="page-title" style={{fontSize: 40, lineHeight: '40px', fontWeight: 300}}/><Tag color="purple" text={card.level}/></h1>}/>
    </div>
    <Tile decoration="actions-tile">
      <div className="actions-block">
        <Button icon="dynamic" text="Изменить накопления" onClick={onEditAccumulations}/>
        <Button icon="ticket" text="Присвоить ваучер" onClick={onAssignVoucher}/>
      </div>
    </Tile>
    <div className="cards-grid">
      <GuestCardWidget guest={guest} onEditGuest={onEditGuest}/>
      <AccumulationsWidget/>
    </div>
    <InfoAlert text={attentionText}/>
    <OperationsTile/>
  </main>;
}
