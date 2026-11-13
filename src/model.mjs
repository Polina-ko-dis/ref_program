export const STORAGE_KEY = 'referral-prototype-v1';
const reward = () => ({voucher: false, voucherId: '', points: false, amount: undefined, method: 'fixed', upgrade: false, limited: false, limit: undefined});
export const createInitialConfig = (kind = 'discount') => ({kind, status: 'inactive', saved: false, registration: reward(), stay: reward(), invited: reward()});

export function validateConfig(config, {activation = config.status === 'active'} = {}) {
  const errors = {};
  for (const key of ['registration', 'stay', 'invited']) {
    const item = config[key];
    if (item.voucher && !item.voucherId) errors[`${key}.voucherId`] = 'Выберите категорию ваучера';
    if (config.kind === 'points' && item.points) {
      const percent = key === 'stay' && item.method === 'percent';
      if (!Number.isFinite(item.amount) || item.amount <= 0 || (percent ? item.amount > 100 : !Number.isInteger(item.amount))) {
        errors[`${key}.amount`] = percent ? 'Введите число больше 0 и не больше 100' : 'Введите целое число больше 0';
      }
    }
  }
  const registration = config.registration;
  if (registration.limited && (!Number.isInteger(registration.limit) || registration.limit < 1 || registration.limit > 9999)) {
    errors['registration.limit'] = 'Введите число в интервале от 1 до 9999';
  }
  const hasReward = config.registration.voucher || config.stay.voucher || config.stay.upgrade ||
    (config.kind === 'points' && (config.registration.points || config.stay.points));
  if (activation && !hasReward) errors.rewards = 'Выберите хотя бы одно вознаграждение для постоянных гостей';
  return errors;
}

export function prepareConfig(config) {
  const prepared = structuredClone(config);
  for (const key of ['registration', 'stay', 'invited']) {
    const item = prepared[key];
    if (!item.voucher) item.voucherId = '';
    if (prepared.kind !== 'points') item.points = false;
    if (!item.points) {item.amount = undefined; item.method = 'fixed';}
    if (key !== 'stay') item.upgrade = false;
    if (key !== 'registration') item.limited = false;
    if (!item.limited) item.limit = undefined;
  }
  return prepared;
}

export function readConfig(storage) {
  try {
    const parsed = JSON.parse(storage.getItem(STORAGE_KEY));
    if (!parsed || !['discount', 'points'].includes(parsed.kind) || !['inactive', 'active'].includes(parsed.status) ||
      typeof parsed.saved !== 'boolean' || !['registration', 'stay', 'invited'].every(key => parsed[key] && typeof parsed[key] === 'object')) {
      return createInitialConfig();
    }
    const config = createInitialConfig(parsed.kind);
    config.status = parsed.status;
    config.saved = parsed.saved;
    for (const key of ['registration', 'stay', 'invited']) {
      for (const flag of ['voucher', 'points', 'upgrade', 'limited']) config[key][flag] = parsed[key][flag] === true;
      config[key].voucherId = typeof parsed[key].voucherId === 'string' ? parsed[key].voucherId : '';
      config[key].method = parsed[key].method === 'percent' ? 'percent' : 'fixed';
      for (const number of ['amount', 'limit']) config[key][number] = Number.isFinite(parsed[key][number]) ? parsed[key][number] : undefined;
    }
    return prepareConfig(config);
  } catch {return createInitialConfig();}
}

export function saveConfig(storage, config) {
  const errors = validateConfig(config);
  if (Object.keys(errors).length) return {errors};
  const saved = {...prepareConfig(config), saved: true};
  try {storage.setItem(STORAGE_KEY, JSON.stringify(saved)); return {config: saved};}
  catch {return {error: 'Не удалось сохранить настройки в браузере. Проверьте доступ к локальному хранилищу.'};}
}

export function activateConfig(storage, config) {
  const errors = validateConfig(config, {activation: true});
  if (Object.keys(errors).length) return {errors};
  return saveConfig(storage, {...config, status: 'active'});
}
