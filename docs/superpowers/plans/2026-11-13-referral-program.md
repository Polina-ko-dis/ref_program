# Referral Program Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Локальная интерактивная копия страницы реферальной программы на настоящих компонентах Reactor.

**Architecture:** Vite и React, ReactorTheme на уровне корня, переиспользованное меню LK_B2B. Общий компонент группы наград и отдельная модель формы управляют зависимыми полями, сохранением и демонстрационными состояниями.

**Tech Stack:** React 19.3, Vite 6, Reactor 0.0.226, CSS с токенами Reactor, Node test runner.

**Spec:** docs/superpowers/specs/2026-11-13-referral-program-design.md

## Global Constraints

- Только локальная работа; сервер слушает 127.0.0.1.
- Настоящие пакеты Reactor из указанного пользователем http://nuget.travelline.lan:8081/repository/npm-group/.
- Визуальный эталон — Figma, начальное состояние — открытый стенд со скидками и выключенными наградами.
- Не сохранять изменения на стенде.
- Референсный репозиторий reference-lk-b2b остаётся отдельным источником.

## Review Focus

- Отключённая награда с пустыми полями не блокирует сохранение.
- Балльные настройки не попадают в сохраняемые скидочные настройки.
- Пустое, отрицательное или дробное ограничение регистраций отклоняется.
- Повреждённый localStorage возвращает исходную конфигурацию без падения.
- Активация не теряет несохранённые изменения.

## Task 1: Рабочая форма и модель

**Files:** package.json, .npmrc, vite.config.mjs, index.html, src/main.jsx, src/App.jsx, src/model.mjs, src/data.mjs, src/Navigation.jsx, src/RewardGroup.jsx, src/ReferralPage.jsx, src/styles.css, tests/model.test.mjs.

**Interfaces:** createInitialConfig(kind) -> Config; validateConfig(config) -> Errors; prepareConfig(config) -> Config; readConfig(storage) -> Config; saveConfig(storage, config) -> {config, error}; Config содержит kind, status, saved, registration, stay, invited. Reward содержит voucher, voucherId, points, amount, method, upgrade, limited, limit.

- [x] Подключить реестр только в .npmrc проекта и установить зависимости.
- [x] Написать проверки обязательности активных наград, очистки скрытых балльных настроек, лимита регистраций, повреждённого хранилища и активации черновика. Запустить до реализации модели и увидеть ожидаемое падение.
- [x] Реализовать модель; выполнить node --test tests/model.test.mjs, ожидаются все успешные проверки.
- [x] Собрать оболочку из меню LK_B2B, компонентов Reactor и статических ресурсов исходного проекта.
- [x] Собрать описание программы и карточки наград по детальным ответам Figma.
- [x] Подключить локальное сохранение, валидацию, подсказки, диалоги и панель демонстрационных вариантов.

## Task 2: Проверка и передача

**Files:** README.md, docs/superpowers/progress.md; необходимые исправления исходников.

**Interfaces:** использует готовую модель и экран Task 1; выдаёт работающий локальный адрес и инструкции.

- [x] Выполнить тесты модели и production build.
- [x] Запустить сервер, открыть встроенный браузер и проверить начальный экран, селекты, награды, сохранение, перезагрузку и активацию.
- [x] Сверить десктопный вид с Figma, проверить узкую ширину, исправить найденные расхождения.
- [x] Провести независимое ревью функциональных рисков и исправить существенные замечания.
- [x] Записать команды запуска и ограничения локальных данных; передать адрес пользователю.
