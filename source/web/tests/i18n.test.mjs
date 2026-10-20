import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { MESSAGES, LANGUAGE_STORAGE_KEY, normalizeLanguage, getLanguage, setLanguage, t, translateDom, levelName, levelRange, sensorLabel, firmwareLabel, apiErrorMessage, validationMessage } from '../i18n.js';
import { LEVELS, sensorState, normalizeSnapshot, makeDemo, parseRange, parseLimit, selectDemoLevel } from '../state.js';

test('both UI dictionaries cover the same keys and interpolation parameters', () => {
  const chinese = Object.keys(MESSAGES.zh).sort();
  assert.ok(chinese.length > 200);
  assert.deepEqual(chinese, Object.keys(MESSAGES.en).sort());
  const placeholders = (text) => [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
  for (const key of chinese) {
    assert.ok(MESSAGES.zh[key].trim(), key);
    assert.ok(MESSAGES.en[key].trim(), key);
    assert.deepEqual(placeholders(MESSAGES.zh[key]), placeholders(MESSAGES.en[key]), key);
    if (!key.startsWith('language.')) assert.doesNotMatch(MESSAGES.en[key], /\p{Script=Han}/u, key);
  }
});

test('all static HTML translation attributes resolve in both languages', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const keys = [...html.matchAll(/data-i18n(?:-title|-aria-label|-placeholder)?="([^"]+)"/g)].map((match) => match[1]);
  assert.ok(keys.length > 75);
  for (const key of keys) {
    assert.ok(Object.hasOwn(MESSAGES.zh, key), key);
    assert.ok(Object.hasOwn(MESSAGES.en, key), key);
  }
  assert.match(html, /id="languageToggle"/);
  assert.match(html, /id="thermalFlowState"/);
  assert.match(html, /id="thermalFlowNote"/);
});

test('locale normalization defaults to Chinese and accepts English locale variants', () => {
  for (const input of [undefined, null, '', 'zh', 'zh-CN', 'fr', 1]) assert.equal(normalizeLanguage(input), 'zh');
  for (const input of ['en', 'en-US', 'en_GB', 'EN']) assert.equal(normalizeLanguage(input), 'en');
  assert.equal(normalizeLanguage('english'), 'zh');
});

test('language persistence handles private-mode storage failures without losing the current language', async () => {
  const previousStorage = globalThis.localStorage;
  const previousLanguage = getLanguage();
  const values = new Map();
  try {
    globalThis.localStorage = { getItem: (key) => values.get(key), setItem: (key, value) => values.set(key, value) };
    assert.equal(setLanguage('en'), 'en');
    assert.equal(getLanguage(), 'en');
    assert.equal(values.get(LANGUAGE_STORAGE_KEY), 'en');
    const fresh = await import(`../i18n.js?stored-language=${Date.now()}`);
    assert.equal(fresh.getLanguage(), 'en');
    globalThis.localStorage = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
    assert.equal(setLanguage('zh-CN'), 'zh');
    assert.equal(getLanguage(), 'zh');
    const blocked = await import(`../i18n.js?blocked-storage=${Date.now()}`);
    assert.equal(blocked.getLanguage(), 'zh');
  } finally {
    globalThis.localStorage = previousStorage;
    setLanguage(previousLanguage);
  }
});

test('interpolation is deterministic text and leaves unknown keys identifiable', () => {
  assert.equal(t('ack.confirmed', { action: 'Heating' }, 'en'), 'Heating confirmed by STM32');
  assert.equal(t('updated.ago', { seconds: 12 }, 'en'), 'Reported 12 s ago');
  assert.equal(t('temperature.delay', { seconds: 3 }, 'zh'), '启动等待 3 s');
  assert.equal(t('ack.confirmed', { action: '<b>Heating</b>' }, 'en'), '<b>Heating</b> confirmed by STM32');
  assert.equal(t('missing.translation', {}, 'en'), 'missing.translation');
});

test('translated liquid state stays separate from the original control enums and Chinese business values', () => {
  const state = normalizeSnapshot(makeDemo());
  assert.equal(sensorState(state, 2), '湿态');
  assert.equal(sensorLabel(sensorState(state, 2), 'en'), 'Wet');
  assert.equal(sensorLabel(sensorState(state, 1), 'en'), 'Dry');
  assert.equal(sensorLabel('未知', 'en'), 'Unknown');
  for (const level of Object.keys(LEVELS)) {
    assert.equal(levelName(level, 'zh'), LEVELS[level].name);
    assert.equal(levelRange(level, 'zh'), LEVELS[level].range);
    assert.doesNotMatch(levelName(level, 'en'), /\p{Script=Han}/u);
    assert.doesNotMatch(levelRange(level, 'en'), /\p{Script=Han}/u);
  }
  assert.equal(levelName('unrecognized', 'en'), 'Not configured');
  assert.equal(levelRange('LEVEL_ERR', 'en'), 'Inconsistent probe pattern; volume unknown');
  assert.equal(state.level, 'NORMAL');
});

test('validation errors retain Chinese compatibility while carrying stable bilingual keys', () => {
  const invalid = [
    [() => parseRange('', '30'), 'validation.temperature'],
    [() => parseRange('30', '25'), 'validation.range'],
    [() => parseRange('1.0001', '1.0002'), 'validation.precision'],
    [() => parseLimit('1.5'), 'validation.limit'],
    [() => selectDemoLevel(makeDemo(), 3), 'validation.demoLevel']
  ];
  for (const [operation, key] of invalid) {
    assert.throws(operation, (error) => {
      assert.equal(error.i18nKey, key);
      assert.equal(error.message, t(key, {}, 'zh'));
      assert.equal(validationMessage(error, 'en'), t(key, {}, 'en'));
      return true;
    });
  }
});

test('API errors translate from stable codes, including lowercase development errors', () => {
  assert.equal(apiErrorMessage({ code: 'BUSY', message: 'arbitrary server wording' }, undefined, {}, 'en'), t('api.busy', {}, 'en'));
  assert.equal(apiErrorMessage({ code: 'busy', message: '上一条命令正在等待确认。' }, undefined, {}, 'en'), t('api.busy', {}, 'en'));
  assert.equal(apiErrorMessage({ code: 'SESSION', message: 'anything' }, undefined, {}, 'zh'), t('api.session', {}, 'zh'));
  assert.equal(apiErrorMessage({ code: 'no_hardware' }, undefined, {}, 'en'), t('api.noHardware', {}, 'en'));
  assert.equal(apiErrorMessage({ code: 'STM_ERR', message: 'PUMP_LIMIT' }, undefined, {}, 'en'), 'STM32 returned an error: PUMP_LIMIT');
  assert.equal(apiErrorMessage({ code: 'FUTURE_ERROR', message: '未翻译的服务器信息' }, undefined, {}, 'en'), 'Device error (FUTURE_ERROR). Check live feedback.');
  assert.equal(apiErrorMessage(null, 'error.operation', { status: 503 }, 'en'), 'Device operation failed (503)');
});

test('firmware identity is preserved while the browser-demo description is translated', () => {
  assert.equal(firmwareLabel('纯浏览器演示', 'en'), 'Browser demo');
  assert.equal(firmwareLabel('纯浏览器演示', 'zh'), '纯浏览器演示');
  for (const identity of ['tankctrl-3.0', 'tankweb-1.4', 'browser-demo', '']) assert.equal(firmwareLabel(identity, 'en'), identity);
});

test('DOM copy updates preserve control values, dirty drafts, disabled state and icon children', () => {
  const oldLanguage = getLanguage();
  class Node {
    constructor(attributes, text = '') { this.attributes = new Map(Object.entries(attributes)); this.textContent = text; }
    getAttribute(key) { return this.attributes.get(key); }
    setAttribute(key, value) { this.attributes.set(key, value); }
    matches(selector) { return this.attributes.has(selector.slice(1, -1)); }
  }
  const label = new Node({ 'data-i18n': 'temperature.save' }, '保存温区');
  const icon = new Node({ 'data-lucide': 'check' });
  const input = new Node({ 'data-i18n-aria-label': 'temperature.lower' });
  input.value = '26.50'; input.dataset = { dirty: 'true' }; input.disabled = true;
  const button = new Node({ 'data-i18n-title': 'temperature.save' });
  button.children = [icon, label];
  const root = { querySelectorAll: (selector) => [label, input, button].filter((node) => node.matches(selector)) };
  try {
    setLanguage('en'); translateDom(root);
    assert.equal(label.textContent, 'Save range');
    assert.equal(input.getAttribute('aria-label'), 'Lower limit');
    assert.equal(button.getAttribute('title'), 'Save range');
    assert.equal(input.value, '26.50'); assert.equal(input.dataset.dirty, 'true'); assert.equal(input.disabled, true);
    assert.deepEqual(button.children, [icon, label]);
    setLanguage('zh'); translateDom(root);
    assert.equal(label.textContent, '保存温区'); assert.equal(input.value, '26.50');
  } finally { setLanguage(oldLanguage); }
});


test('confirmed range text is localized with both applied limits', () => {
  const range = { lower: '25.50', upper: '29.50' };
  assert.equal(t('temperature.appliedRange', range, 'zh'), '已应用 25.50–29.50 °C');
  assert.equal(t('temperature.appliedRange', range, 'en'), 'Applied range 25.50–29.50 °C');
});

test('ESP32 automatic ownership, transitions and actionable faults are localized', () => {
  for (const locale of ['zh', 'en']) {
    for (const phase of ['off', 'starting', 'running', 'stopping', 'fault']) {
      const key = `temperature.autoPhase.${phase}`;
      assert.notEqual(t(key, {}, locale), key);
    }
    for (const code of ['AHT_INVALID', 'UART_STALE', 'STM_RESET', 'THERMAL_MAPPING', 'NATIVE_AUTO', 'LOCAL_OVERRIDE', 'CONTROL_FAILED']) {
      const key = `automaticFault.${code}`;
      assert.notEqual(t(key, {}, locale), key);
    }
    assert.match(t('temperature.ownerEsp32', {}, locale), /ESP32/);
    assert.doesNotMatch(t('temperature.autoUnsupported', {}, locale), /更新|Update/);
    assert.match(t('temperature.localHelp', {}, locale), /AUTO/);
    for (const code of ['THERMAL_MAPPING', 'AUTO_SENSOR', 'AUTO_RECOVERY']) {
      assert.notEqual(apiErrorMessage({ code }, undefined, {}, locale), t('api.unknown', { code }, locale));
    }
  }
});
