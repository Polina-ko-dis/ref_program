import React from 'react';
import {PageTop, Tile, Text, Tag, Button, Icon, HintWindow, InfoAlert, HelpIcon, DataWidget, DataWidgetLayout, Row, Column} from '@reactor/reactor';
import {Table} from '@reactor/table';
import {i} from '@reactor/intl';
import {card, accumulations, attentionText, operations} from './data.mjs';

const levelColors = {
  'SUPER VIP': 'teal',
  'VIP VIP 1': 'purple',
  'VIP VIP': 'deep-orange',
  'Gold': 'amber',
  'Silver22': 'blue-gray',
  'Base': 'blue',
};
const empty = <Text text="—" color="disabled"/>;

export const LevelTag = ({level}) => level ? <Tag color={levelColors[level] || 'blue-gray'} text={level}/> : empty;

function GuestCardWidget({guest, onEditGuest}) {
  const editLabel = text => ({text, lines: 1, onClick: onEditGuest});
  return <DataWidget header="Карта гостя" details={[
      {label: '№', prefix: 'credit-card', values: [card.number]},
      {label: 'Скидка', prefix: 'percent', values: [`${card.level}, ${i.percent(card.discount / 100, 0)}`]},
      {label: editLabel('День рождения'), prefix: 'calendar-today', values: [i.date(guest.birthTimestamp, 'default', 'UTC')]},
      {label: editLabel('E-mail'), prefix: 'mail', values: [guest.email]},
      {label: editLabel('Телефон'), prefix: 'phone', values: [guest.phone]},
    ]}/>;
}

function AccumulationsWidget() {
  return <DataWidget header="Накопления"
    main={{mode: 'pie', value: accumulations.progress, total: 100, partColor: 'warning', text: i.percent(accumulations.progress / 100, 0)}}
    details={[
      {label: 'Проживаний на сумму', values: [i.currencyCode(accumulations.amount, 'RUB', 0)]},
      {label: 'Ночей в гостинице', values: [i.number(accumulations.nights, 0)]},
      {label: 'Достигнут максимальный уровень', values: [{type: 'icon', name: 'success', color: 'success'}]},
      {label: 'Ваучеры', values: [i.number(accumulations.vouchers, 0)]},
    ]}/>;
}

const discountHint = 'Процент скидки, применённый к проживанию по уровню лояльности на момент операции.';
const numberCell = value => value === undefined ? empty : <Text text={i.number(value, 0)}/>;

function OperationIcon({comment}) {
  const icon = <Icon name="chat" size="sm" color="accent"/>;
  return comment === undefined ? icon : <HintWindow text={comment} trigger={<span tabIndex={0} aria-label={comment}>{icon}</span>}/>;
}

function OperationsTile() {
  return <Tile header="История операций">
    <Column gap={24} noGrow>
      <InfoAlert text={attentionText}/>
      <Table width="100%" rowsTransform="noWrap" head={[
        {key: 'operation', content: 'Операция', width: 260},
        {key: 'cost', content: 'Стоимость (RUB)'},
        {key: 'nights', content: 'Ночей'},
        {key: 'discount-rub', content: 'Скидка (RUB)'},
        {key: 'discount-pct', content: <Row alignItems="center" gap={4} noGrow><Text text="Скидка (%)"/><HelpIcon hint={discountHint}/></Row>},
        {key: 'level', content: 'Уровень лояльности'},
        {key: 'checkout', content: 'Дата выезда'},
        {key: 'date', content: 'Дата операции'},
      ]} rows={operations.map((operation, index) => ({key: String(index), cells: [
        <Row alignItems="center" gap={8} noGrow>
          {(operation.type === 'voucher' || operation.comment !== undefined) && <OperationIcon comment={operation.comment}/>}
          <Text text={operation.label} lines={1}/>
        </Row>,
        numberCell(operation.cost),
        numberCell(operation.nights),
        numberCell(operation.discountRub),
        numberCell(operation.discountPct),
        <LevelTag level={operation.level}/>,
        operation.checkoutDate ? i.date(operation.checkoutDate, 'default', 'UTC') : empty,
        i.date(operation.operationDate, 'default', 'UTC'),
      ].map((content, columnIndex) => ({content, key: String(columnIndex)}))}))}/>
    </Column>
  </Tile>;
}

export default function GuestCardPage({guest, onEditGuest, onEditAccumulations, onAssignVoucher}) {
  return <main className="page" id="main-content">
    <div className="page-header">
      <PageTop title={<h1 className="page-heading"><Text text={`${guest.lastName} ${guest.firstName}`} typography="page-title"/><Tag color="purple" text={card.level}/></h1>}/>
    </div>
    <Tile>
      <Row alignItems="center" gap={8} noGrow wrap>
        <Button icon="dynamic" text="Изменить накопления" onClick={onEditAccumulations}/>
        <Button icon="ticket" text="Присвоить ваучер" onClick={onAssignVoucher}/>
      </Row>
    </Tile>
    <div className="guest-card-widgets">
      <DataWidgetLayout maxPerRow={2}>
        <GuestCardWidget guest={guest} onEditGuest={onEditGuest}/>
        <AccumulationsWidget/>
      </DataWidgetLayout>
    </div>
    <OperationsTile/>
  </main>;
}
