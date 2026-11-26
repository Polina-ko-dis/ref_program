import React, {useEffect, useRef, useState} from 'react';
import {IconButton, SelectField, SelectPopup, Text, TileSurface} from '@reactor/reactor';

const programKinds = [
  {value: 'discount', text: 'Скидочная программа'},
  {value: 'points', text: 'Балльная программа'},
];
const accumulationOptions = [
  {value: 'money', text: 'Деньги'},
  {value: 'nights', text: 'Ночи'},
  {value: 'mixed', text: 'Деньги и ночи'},
];

function PrototypeSelect({value, options, onChange}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const closeOutside = event => {if (!rootRef.current?.contains(event.target)) setOpen(false);};
    window.addEventListener('pointerdown', closeOutside, true);
    return () => window.removeEventListener('pointerdown', closeOutside, true);
  }, [open]);
  const choose = next => {
    onChange(next);
    setOpen(false);
    buttonRef.current?.focus();
  };
  const keyDown = event => {
    if (open && event.key === 'Escape') {
      event.stopPropagation();
      setOpen(false);
      buttonRef.current?.focus();
    }
  };
  return <div className="guest-prototype-select" ref={rootRef} onKeyDownCapture={keyDown} onBlur={event => {if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);}}>
    <SelectField size="md" value={value} options={options} ref={buttonRef} onClick={() => setOpen(current => !current)}/>
    {open && <div className="guest-prototype-options"><TileSurface popup><SelectPopup value={value} options={options} onChange={choose}/></TileSurface></div>}
  </div>;
}

export default function PrototypePanel({settings, onChange}) {
  const [open, setOpen] = useState(() => !new URLSearchParams(window.location.search).has('presentation'));
  return <div className="guest-prototype-layer">
    {open ? <aside className="guest-prototype-panel" aria-label="Панель прототипа">
      <span className="guest-prototype-title"><Text text="Прототип" color="neutral" typography="caption"/></span>
      <div className="guest-prototype-kind" role="group" aria-label="Тип программы">
        <PrototypeSelect value={settings.kind} options={programKinds} onChange={kind => onChange({...settings, kind})}/>
      </div>
      <div className="guest-prototype-accumulation" role="group" aria-label="Тип накопления">
        <PrototypeSelect value={settings.accumulation} options={accumulationOptions} onChange={accumulation => onChange({...settings, accumulation})}/>
      </div>
      <div className="guest-prototype-close"><IconButton icon="decline" title="Скрыть панель прототипа" aria-label="Скрыть панель прототипа" onClick={() => setOpen(false)}/></div>
    </aside> : <div className="guest-prototype-trigger">
      <IconButton icon="code" title="Показать панель прототипа" aria-label="Показать панель прототипа" onClick={() => setOpen(true)}/>
    </div>}
  </div>;
}
