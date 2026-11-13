import React from 'react';
import {Text, Checkbox, Select, NumberField, HelpIcon} from '@reactor/reactor';
import {voucherOptions, accrualOptions} from './data.mjs';

export const ErrorText = ({text}) => text ? <div role="alert" className="field-error"><Text text={text} color="danger" typography="caption"/></div> : null;

function NumberInput({label, value, onChange, disabled, error, percent = false, size = 'xs'}) {
  return <div className={`number-input number-${size}`}><label><span className="sr-only">{label}</span><NumberField value={value} onChange={onChange} disabled={disabled} mask={percent ? 'dec' : 'int'} size="stretch" state={error ? 'danger' : undefined}/></label><ErrorText text={error}/></div>;
}

export default function RewardGroup({id, value, onChange, kind, errors, allowUpgrade, allowLimit, title}) {
  const set = patch => onChange({...value, ...patch});
  const error = field => errors[`${id}.${field}`];
  return <div className="reward-group" role="group" aria-label={title}>
    <div className="setting-row align-top">
      <Text text="Тип вознаграждения"/>
      <div className="reward-options">
        <div className="voucher-line">
          <div className="check-control"><Checkbox value={value.voucher} onChange={voucher => set({voucher})} label="Ваучер категории"/></div>
          <div className="voucher-select"><Select options={voucherOptions} placeholder="Выбрать" size="md" value={value.voucherId} onChange={voucherId => set({voucherId})} disabled={!value.voucher} state={error('voucherId') ? 'danger' : undefined}/><ErrorText text={error('voucherId')}/></div>
        </div>
        {kind === 'points' && <div className="points-option">
          <div className="check-control"><Checkbox value={value.points} onChange={points => set({points})} label="Баллы"/></div>
          {value.points && <div className="dependent-block">
            {id === 'stay' && <div className="setting-row"><Text text="Способ начисления баллов"/><Select options={accrualOptions} value={value.method} onChange={method => set({method, amount: undefined})} size="lg"/></div>}
            <div className="setting-row"><Text text="Размер начисления"/><div className="amount-line"><NumberInput label={`${title}: размер начисления`} value={value.amount} onChange={amount => set({amount})} error={error('amount')} percent={id === 'stay' && value.method === 'percent'} size="sm"/><Text text={id === 'stay' && value.method === 'percent' ? '%' : 'баллов'}/></div></div>
          </div>}
        </div>}
        {allowUpgrade && <div className="upgrade-line"><div className="check-control"><Checkbox value={value.upgrade} onChange={upgrade => set({upgrade})} label="Повышение статуса гостя в Программе лояльности на уровень выше"/></div><HelpIcon hint="Повышаются все уровни, кроме максимального"/></div>}
      </div>
    </div>
    {allowLimit && <div className="setting-row"><Text text="Ограничить"/><div className="limit-line"><div className="check-control"><Checkbox value={value.limited} onChange={limited => set({limited})} label="Только за первые"/></div><NumberInput label="Ограничить количество регистраций" value={value.limit} onChange={limit => set({limit})} disabled={!value.limited} error={error('limit')}/><Text text="регистраций"/></div></div>}
  </div>;
}
