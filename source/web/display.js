// Presentation roles are independent of the STM32 protocol's channel names.
export function displayThermalAction(action, state) {
  if (!state.thermalDisplaySwapped) return action;
  return action === 'heat' ? 'cool' : action === 'cool' ? 'heat' : action;
}

export function thermalToggleCommand(displayAction, rawState) {
  if (displayAction !== 'heat' && displayAction !== 'cool') throw new Error('无效温控操作。');
  const action = displayThermalAction(displayAction, rawState);
  return { action, enabled: !rawState[action] };
}

export function projectDisplayState(rawState) {
  const swapped = rawState.thermalDisplaySwapped;
  const heat = swapped ? rawState.cool : rawState.heat;
  const cool = swapped ? rawState.heat : rawState.cool;
  const thermal = rawState.automaticOwner === 'esp32' ? heat ? 'HEAT' : cool ? 'COOL' : rawState.auto && rawState.automaticPhase === 'running' ? 'HOLD' : 'IDLE' : !swapped ? rawState.thermal : rawState.thermal === 'HEAT' ? 'COOL' : rawState.thermal === 'COOL' ? 'HEAT' : rawState.thermal;
  return { ...rawState, measuredTempC: rawState.tempC, tempC: rawState.displayTempC,
    heat, cool, thermal };
}

// Compare the backend-selected input, including the shared displayed temperature.
export function controlTemperatureAssessment(state) {
  const { controlTempC, lowerCenti, upperCenti } = state;
  if (!state.sensorFresh || !Number.isFinite(controlTempC) ||
      !Number.isFinite(lowerCenti) || !Number.isFinite(upperCenti) || lowerCenti >= upperCenti) return 'unknown';
  const centi = Math.round(controlTempC * 100);
  return centi < lowerCenti ? 'below' : centi > upperCenti ? 'above' : 'within';
}

export function thermalRelayChannels(state) {
  const fallback = state.thermalDisplaySwapped ? { pump: 1, heat: 3, cool: 2 } : { pump: 1, heat: 2, cool: 3 };
  const channels = state.relayChannels;
  if (!channels || !['pump', 'heat', 'cool'].every((role) => Number.isInteger(channels[role]) && channels[role] >= 1 && channels[role] <= 3) ||
      new Set(Object.values(channels)).size !== 3) return fallback;
  return { pump: channels.pump, heat: channels.heat, cool: channels.cool };
}

export function canEnableAutomatic(state) {
  return state.sensorFresh && Number.isFinite(state.controlTempC) && state.thermalControlReady !== false && !state.automaticShutdownPending &&
    (state.automaticOwner !== 'esp32' || !state.simulation);
}

export function canToggleThermal(displayAction, state) {
  if (displayAction !== 'heat' && displayAction !== 'cool') return false;
  const action = displayThermalAction(displayAction, state);
  return !state.automaticShutdownPending || Boolean(state[action]);
}

export function isThermalShutdown(request) {
  return request?.action === 'stop' || request?.action === 'auto' && request.args?.enabled === false;
}

export function automaticToggleEnabled(state, request = null) {
  // A second click must cancel a submitted start even before its HTTP reply.
  if (request?.action === 'auto') return !request.args.enabled;
  return !(state.auto || state.automaticPhase === 'starting');
}

export function automaticControlPresentation(state, request = null) {
  const phase = isThermalShutdown(request) ? 'stopping' : request?.action === 'auto' && request.args?.enabled ? 'starting' :
    state.automaticOwner === 'esp32' ? state.automaticPhase : state.auto ? 'running' : 'off';
  return { phase, key: `temperature.autoPhase.${phase}`,
    active: !state.stale && state.auto && phase === 'running',
    pending: phase === 'starting' || phase === 'stopping',
    fault: phase === 'fault' };
}

export function confirmedControlRange(state) {
  if (!Number.isFinite(state.lowerCenti) || !Number.isFinite(state.upperCenti) || state.lowerCenti >= state.upperCenti) return null;
  return { lower: (state.lowerCenti / 100).toFixed(2), upper: (state.upperCenti / 100).toFixed(2) };
}
