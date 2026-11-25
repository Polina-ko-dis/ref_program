import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button, IconButton, Text} from '@reactor/reactor';
import {clipReviewRect, reviewChanges} from './review.mjs';
import './change-review.css';

export default function ChangeReview({workspaceRef, suspended = false}) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId] = useState(reviewChanges[0].id);
  const [availableIds, setAvailableIds] = useState(reviewChanges.map(change => change.id));
  const [frames, setFrames] = useState([]);
  const launcherRef = useRef(null);
  const changes = reviewChanges.filter(change => availableIds.includes(change.id));
  const active = changes.find(change => change.id === activeId) || changes[0];
  const index = changes.indexOf(active);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.querySelector('a')?.focus();
  }, []);

  const reveal = useCallback(change => {
    if (!change) return;
    setActiveId(change.id);
    const workspace = workspaceRef.current;
    const target = workspace?.querySelector(change.selector);
    if (target) workspace.scrollTo({
      top: workspace.scrollTop + target.getBoundingClientRect().top - workspace.getBoundingClientRect().top - 16,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }, [workspaceRef]);

  useEffect(() => {
    if (!open || suspended) return;
    const workspace = workspaceRef.current;
    if (!workspace) return;
    let scheduled;
    const measure = () => {
      const ids = reviewChanges.filter(change => Array.from(workspace.querySelectorAll(change.selector))
        .some(node => node.getClientRects().length > 0)).map(change => change.id);
      setAvailableIds(previous => previous.join() === ids.join() ? previous : ids);
      const change = reviewChanges.find(item => item.id === activeId && ids.includes(item.id))
        || reviewChanges.find(item => ids.includes(item.id));
      if (change && change.id !== activeId) setActiveId(change.id);
      const area = workspace.getBoundingClientRect();
      const bounds = {left: Math.max(0, area.left), top: Math.max(0, area.top),
        right: Math.min(document.documentElement.clientWidth, area.right), bottom: Math.min(innerHeight, area.bottom)};
      setFrames(change ? Array.from(workspace.querySelectorAll(change.selector))
        .filter(node => node.getClientRects().length > 0)
        .map(node => clipReviewRect(node.getBoundingClientRect(), bounds)).filter(Boolean) : []);
    };
    const schedule = () => {
      cancelAnimationFrame(scheduled);
      scheduled = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(workspace);
    if (workspace.firstElementChild) observer.observe(workspace.firstElementChild);
    const page = workspace.querySelector('main');
    if (page) observer.observe(page);
    workspace.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', schedule);
    const escape = event => {if (event.key === 'Escape') close();};
    document.addEventListener('keydown', escape);
    measure();
    return () => {
      cancelAnimationFrame(scheduled);
      observer.disconnect();
      workspace.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('keydown', escape);
    };
  }, [open, suspended, activeId, workspaceRef, close]);

  if (suspended) return null;
  return <>
    {open && <div className="review-highlights" aria-hidden="true">
      {frames.map((frame, position) => <div className="review-highlight" key={position} style={frame}>
        <span className="review-highlight-number">{index + 1}</span>
      </div>)}
    </div>}
    {open && !collapsed && active && <aside className="review-comment" aria-label="Комментарии к изменениям">
      <div className="review-comment-top">
        <Text typography="caption" color="neutral" text="ПРАВКИ ПО РЕВЬЮ REACTOR"/>
        <div className="review-comment-tools">
          <Button type="link" text="Свернуть" onClick={() => setCollapsed(true)}/>
          <IconButton icon="decline" hint="Закрыть режим изменений" onClick={close}/>
        </div>
      </div>
      <div className="review-comment-body" aria-live="polite" aria-atomic="true">
        <div className="review-comment-title"><span className="review-step">{index + 1}</span><h2><Text typography="subtitle" text={active.title}/></h2></div>
        <div className="review-comparison">
          <div><Text typography="caption" color="neutral" text="Было"/><Text text={active.before}/></div>
          <div><Text typography="caption" color="accent" text="Стало"/><Text text={active.after}/></div>
        </div>
        <Text text={active.description}/>
        <div className="review-reason"><Text typography="caption" color="neutral" text="Почему"/><Text text={active.reason}/></div>
        <Text typography="caption" color="neutral" text={active.source}/>
      </div>
      <div className="review-comment-bottom">
        <Button text="Назад" disabled={index <= 0} onClick={() => reveal(changes[index - 1])}/>
        <Text typography="caption" color="neutral" text={`${index + 1} из ${changes.length}`}/>
        <Button text="Далее" disabled={index >= changes.length - 1} onClick={() => reveal(changes[index + 1])}/>
      </div>
    </aside>}
    <div className="review-launcher" ref={launcherRef}>
      <Button icon="chat" selected={open} text={open ? collapsed ? 'Развернуть комментарий' : 'Скрыть изменения' : 'Что изменилось'}
        onClick={() => {
          if (open && collapsed) {setCollapsed(false); return;}
          if (open) {close(); return;}
          setCollapsed(false); setOpen(true); reveal(active);
        }}/>
      {open && collapsed && <IconButton icon="decline" hint="Закрыть режим изменений" onClick={close}/>}
    </div>
  </>;
}
