export const LANGUAGE_STORAGE_KEY = 'tanklab-language';
export const SUPPORTED_LANGUAGES = Object.freeze(['zh', 'en']);

// Keep UI copy out of protocol and control state. Keys are shared by both locales.
export const MESSAGES = Object.freeze({
  zh: Object.freeze({
    'page.title': 'FLOW / 储液罐控制台',
    'api.uiVersion': '页面版本过旧，请重新打开设备网页。',
    'brand.name': '储液罐控制台', 'brand.home': '储液罐控制台首页',
    'language.switch': '切换语言：中文 / English', 'language.current': '当前语言：中文',
    'network.settings': 'Wi-Fi 设置', 'network.eyebrow': '本地网络',
    'network.title': '连接设备热点', 'network.close': '关闭连接信息',
    'network.intro': '手机或电脑连接以下热点，在浏览器打开设备地址。网页和三维模型均由 ESP32 本地提供。',
    'network.ssid': 'Wi-Fi 名称', 'network.password': 'Wi-Fi 密码', 'network.address': '设备地址',
    'network.helper': '连接后无需访问互联网。3D 演示仅在浏览器中运行，实时设备模式通过 UART 获取 STM32 反馈。',
    'network.done': '知道了',
    'panel.eyebrow': '设备控制面板', 'panel.title': '设备控制', 'mode.group': '数据模式',
    'mode.real': '实时设备', 'mode.demo': '3D 演示', 'mode.browserDemo': '纯浏览器演示', 'mode.mockApi': '模拟 API',
    'mode.demoNote': '仅在浏览器中演示，按钮不会向设备发送命令。',
    'mode.mockNote': '开发服务模拟 API，未连接实际硬件。',
    'mode.realNote': '读取 STM32 反馈，操作等待设备确认。',
    'connection.demo': '演示模式', 'connection.mock': '模拟设备', 'connection.online': '设备在线',
    'connection.connecting': '正在连接', 'connection.offline': '设备离线',
    'temperature.control': '温度控制', 'temperature.lower': '温度下限', 'temperature.upper': '温度上限',
    'temperature.save': '保存温区', 'temperature.auto': '自动温控', 'temperature.autoDescription': '根据设定温区自动控制',
    'temperature.autoDisplayedDescription': '按显示温度和设定温区自动控制',
    'temperature.heat': '加热', 'temperature.cool': '冷却',
    'temperature.appliedRange': '已应用 {lower}–{upper} °C', 'temperature.appliedRangeUnknown': '等待已应用温区',
    'temperature.controlSample': '自动温控依据', 'temperature.controlNote': '自动温控使用页面显示温度，实测样本用于有效性保护。',
    'temperature.control.below': '低于下限 · 需要加热', 'temperature.control.within': '温区内 · 保持',
    'temperature.control.above': '高于上限 · 需要冷却', 'temperature.control.unknown': '等待有效温度',
    'temperature.autoUnsupported': '当前 STM32 固件或通道配置不符合此程序的通信配置，自动温控暂不可用。',
    'temperature.ownerEsp32': 'ESP32 自动温控 · STM32 执行继电器指令',
    'temperature.ownerStm32': 'STM32 自动温控', 'temperature.ownerDemo': '浏览器自动温控演示',
    'temperature.localHelp': '使用网页自动温控时，请保持 STM32 实体菜单 AUTO 关闭；两种自动控制不能同时使用。',
    'temperature.autoPhase.off': '自动温控已关闭', 'temperature.autoPhase.starting': '自动温控启动中 · 等待输出确认',
    'temperature.autoPhase.running': '自动温控运行中', 'temperature.autoPhase.stopping': '自动温控停止中 · 等待关闭确认',
    'temperature.autoPhase.fault': '自动温控故障 · 已停止调节', 'temperature.autoFaultUnknown': '请核对通信、传感器和继电器反馈，再手动重新开启。',
    'automaticFault.AHT_INVALID': '温度样本无效或已过期', 'automaticFault.UART_STALE': '两板通信已过期，输出状态需核对',
    'automaticFault.STM_RESET': 'STM32 已重启，需要手动重新开启', 'automaticFault.THERMAL_MAPPING': '冷热通道配置不匹配',
    'automaticFault.NATIVE_AUTO': 'STM32 实体 AUTO 已开启，网页自动控制已退出',
    'automaticFault.LOCAL_OVERRIDE': '输出被其他操作改变，网页自动控制已退出',
    'automaticFault.CONTROL_FAILED': '输出指令未完成确认，请核对继电器反馈',
    'temperature.manualHelp': '手动加热 / 冷却会退出自动模式，两路互斥。',
    'temperature.measured': '实测温度', 'temperature.estimated': '估算温度', 'temperature.estimateSource': '运行推算',
    'temperature.delay': '启动等待 {seconds} s', 'temperature.hold': '保持估算值', 'temperature.frozen': '估算已暂停',
    'temperature.heatingEstimate': '加热估算', 'temperature.coolingEstimate': '冷却估算', 'temperature.runningEstimate': '运行估算',
    'temperature.waiting': '等待样本', 'temperature.invalid': '样本无效', 'temperature.valid': '有效样本',
    'humidity.label': '相对湿度', 'process.label': '运行状态', 'process.connectHelp': '连接 ESP32 后显示设备反馈',
    'process.waiting': '等待连接', 'process.offline': '设备离线', 'process.lastFeedback': '保留上次回报，执行器当前状态未知',
    'process.noFeedback': '尚未收到 STM32 状态', 'process.heating': '加热', 'process.cooling': '冷却', 'process.dispensing': '出液',
    'process.hold': '温区保持', 'process.idle': '设备待机', 'process.automatic': '自动控制 · 跟随设定温区',
    'process.manual': '手动控制 · 等待操作',
    'pump.control': '水泵控制', 'pump.limit': '连续运行时限', 'pump.limitAria': '泵连续运行时限', 'unit.seconds': '秒',
    'pump.save': '保存', 'pump.start': '启动水泵', 'pump.stop': '停止', 'pump.current': '本次', 'pump.total': '累计',
    'pump.running': '运行中', 'pump.limited': '达到时限', 'pump.stopped': '已停止',
    'level.monitor': '液位监测', 'level.upper': '上位', 'level.middle': '中位', 'level.lower': '下位',
    'level.waiting': '等待三点液位数据', 'level.last': '上次：{range}',
    'level.EMPTY.name': '低液量', 'level.EMPTY.range': '液位低于下位传感器',
    'level.LOW.name': '少量', 'level.LOW.range': '液位在下位与中位之间',
    'level.NORMAL.name': '正常', 'level.NORMAL.range': '液位在中位与上位之间',
    'level.FULL.name': '满液', 'level.FULL.range': '液位高于上位传感器',
    'level.LEVEL_ERR.name': '液位异常', 'level.LEVEL_ERR.range': '探头组合不连续，液量未知',
    'level.LEVEL_NC.name': '未配置', 'level.LEVEL_NC.range': '液位传感器未完整配置',
    'level.unknownCaption': '{range}；模型不推断液量。',
    'level.demoCaption': '抽水演示已加速，液面随抽水下降；水流与传热场为示意。',
    'level.realCaption': '液面表示三点液位区间；水流与传热场按运行状态示意。',
    'level.demo': '演示液位', 'level.demoEmpty': '低于下位', 'level.demoLow': '下–中', 'level.demoNormal': '中–上', 'level.demoFull': '满液',
    'sensor.unknown': '未知', 'sensor.wet': '湿态', 'sensor.dry': '干态',
    'state.waitingData': '等待数据', 'state.waiting': '等待状态', 'state.unknown': '状态未知', 'state.previous': '上次回报',
    'state.on': '开启', 'state.off': '关闭', 'state.running': '运行', 'state.stopped': '停止', 'state.idle': '待机', 'state.closed': '已关闭',
    'stop.all': '全部停止', 'stop.caption': 'STOP ALL',
    'view.aria': '储液罐三维实时可视化', 'view.eyebrow': '实时过程视图', 'view.title': '看见每一个运行状态', 'view.model': '3D 透视',
    'view.reset': '复位视角', 'view.resetAria': '复位三维视角', 'view.reduceMotion': '减少动态效果',
    'view.sceneAria': '可拖动旋转、滚轮缩放的三维罐体',
    'view.canvasAria': '储罐三维可视化，可拖动旋转、滚轮缩放。液位为传感器区间示意。',
    'view.demoSource': '浏览器演示 · 不控制硬件', 'view.mockSource': '模拟 API · 非硬件状态',
    'view.simulatedSource': 'STM32 模拟启用', 'view.realSource': 'STM32 实时反馈',
    'view.waiting': '等待设备连接', 'view.offline': '设备状态已离线',
    'view.offlineKnown': '显示上次回报。执行器当前状态未知，动态效果已暂停。',
    'view.offlineUnknown': '状态恢复后，模型将继续跟随设备反馈。',
    'view.tryDemo': '先体验 3D 演示', 'view.hint': '拖动旋转 · 滚轮缩放',
    'view.webglTitle': '浏览器未能启动 3D', 'view.webglDetail': '请使用支持 WebGL2 的浏览器。设备控制和数据读取仍可使用。',
    'legend.liquid': '液体', 'legend.heat': '热流', 'legend.cold': '冷端吸热',
    'callout.upper': '上位传感器', 'callout.middle': '中位传感器', 'callout.lower': '下位传感器',
    'callout.aht': '温度 / 湿度', 'callout.pump': '出液水泵', 'callout.heater': '侧贴陶瓷片', 'callout.cooler': '制冷组件与风扇',
    'callout.cabinet': '控制柜', 'callout.cabinetInfo': '电源 / 控制',
    'strip.control': '控制模式', 'strip.heater': '加热 · {channel}', 'strip.cooler': '冷却 · {channel}', 'strip.pump': '水泵 · CH1',
    'strip.auto': '自动温控', 'strip.manual': '手动控制', 'strip.heating': '正在加热', 'strip.cooling': '正在冷却', 'strip.dispensing': '正在出液',
    'updated.demo': '浏览器本地演示', 'updated.none': '尚未收到状态', 'updated.ago': '回报 {seconds} 秒前',
    'thermal.title': '传热场', 'thermal.fieldLabel': '三维示意温度场', 'thermal.low': '较低温', 'thermal.high': '较高温',
    'thermal.volume': '体积温度场', 'thermal.flux': '热流方向', 'thermal.dissipation': '散热路径',
    'thermal.paused': '反馈中断 · 已暂停', 'thermal.pausedNote': '等待设备实时状态，动态传热场已暂停。',
    'thermal.unknown': '液位未知 · 温度场隐藏', 'thermal.unknownNote': '液位组合未确认，暂不推断液体内传热。',
    'thermal.empty': '低液量 · 壁面传导', 'thermal.emptyNote': '液位低于下位探头，液面仅按区间示意；剩余液量未测得。',
    'thermal.heating': '加热 · 侧壁传热', 'thermal.heatingNote': '热量由陶瓷片经罐壁向液体内部扩散，暖色色场展示受热范围和温度梯度。',
    'thermal.cooling': '冷却 · 吸热 / 散热', 'thermal.coolingNote': '冷端从液体吸热，蓝色色场展示冷却范围；热量经鳍片和风扇排入空气。',
    'thermal.coolingLowNote': '低液位已覆盖冷端下部，蓝色色场从接触区向液体内扩展；热量经鳍片和风扇排入空气。',
    'thermal.idle': '待机 · 温度均化', 'thermal.idleNote': '温差逐步扩散；示意场未标定功率、流速或局部温度。',
    'action.range': '温区', 'action.auto': '自动温控', 'action.pump': '水泵', 'action.heat': '加热', 'action.cool': '冷却',
    'action.pump_limit': '泵时限', 'action.stop': '全部停止', 'action.device': '设备操作',
    'ack.waiting': '等待设备状态', 'ack.pending': '{action}等待 STM32 确认…', 'ack.confirmed': '{action}已由 STM32 确认',
    'ack.autoPending': 'ESP32 自动温控等待继电器状态确认…', 'ack.autoConfirmed': 'ESP32 自动温控状态已确认',
    'ack.acceptedUnknown': '设备已接收，后续状态未确认。请核对实时状态。',
    'ack.unconfirmed': '未收到设备确认。命令没有自动重发。',
    'ack.sessionChanged': '设备通信会话已变化，操作结果未知。请重新核对状态。',
    'ack.timeout': '等待确认超时。操作结果未知，未自动重发。',
    'ack.mockConnected': '开发模拟数据已连接', 'ack.connected': 'STM32 状态已连接',
    'ack.demoUpdated': '{action} · 浏览器演示已更新', 'ack.demoToast': '{action}演示已更新（未发送硬件命令）',
    'ack.demoMode': '纯浏览器演示，未控制硬件', 'ack.reading': '读取设备状态…',
    'error.noSession': '尚未取得设备会话。', 'error.operation': '设备操作失败 ({status})', 'error.notAccepted': '设备未接收命令。',
    'error.interrupted': '请求中断，执行结果未知。未自动重发；可使用全部停止。',
    'validation.temperature': '请填写有效温度。', 'validation.range': '温区须满足 −40°C ≤ 下限 < 上限 ≤ 85°C。',
    'validation.precision': '上限至少应比下限高 0.01°C。', 'validation.limit': '泵运行时限须为 1–300 秒的整数。',
    'validation.demoLevel': '演示液位组合无效。',
    'fault.PUMP_LIMIT': '泵已达到连续运行时限', 'fault.AHT_ERR': '温湿度读取失败', 'fault.AHT_STALE': '温湿度样本过期', 'fault.SENSOR_ERROR': '传感器异常',
    'api.origin': '跨来源控制请求已拒绝。', 'api.contentType': '控制请求必须使用 application/json。',
    'api.bodyTooLarge': '控制请求超过允许长度。', 'api.json': '控制请求格式无效。',
    'api.session': '设备会话已过期，请等待实时状态刷新后操作。', 'api.argument': '控制参数无效，请核对温区、时限和开关值。',
    'api.busy': '上一条命令等待 STM32 确认；可使用全部停止。', 'api.offline': '需要有效的 STM32 实时状态后才能启动或配置。',
    'api.tx': 'UART2 请求发送不完整；命令没有自动重发。', 'api.stm': 'STM32 返回错误：{detail}',
    'api.incompatible': 'STM32 固件协议不兼容，需要 tankctrl-3.0 / protocol 1。',
    'api.thermalMapping': '当前 STM32 固件或冷热通道配置不匹配。',
    'api.autoSensor': '自动温控需要有效、最新的实测数据；请关闭温度及液位模拟。',
    'api.autoRecovery': '正在等待继电器关闭确认，请稍后再开启自动温控。',
    'api.ack': '设备确认与请求参数不一致。', 'api.reply': '未收到匹配的 STM32 状态回复。',
    'api.status': 'STM32 状态格式无效。', 'api.reset': 'STM32 已重启；待确认命令已取消，正在重新校验协议。',
    'api.frame': 'UART2 回复无效或过长。', 'api.protocol': 'UART2 通信协议格式无效。',
    'api.timeout': '800 ms 内未收到匹配的 STM32 回复；命令没有自动重发。',
    'api.stale': 'STM32 状态已过期，请等待通信和实时状态恢复。', 'api.notFound': '设备 API 路径或请求方法不存在。',
    'api.hotspot': 'ESP32 热点启动失败。', 'api.noHardware': '开发服务器未连接实际设备。',
    'api.development': '本地开发服务器未连接硬件，请使用浏览器演示模式。',
    'api.unknown': '设备返回错误（{code}），请核对实时状态。'
  }),
  en: Object.freeze({
    'page.title': 'FLOW / Tank console',
    'api.uiVersion': 'This page is outdated. Reopen the device webpage.',
    'brand.name': 'Tank console', 'brand.home': 'Tank console home',
    'language.switch': 'Switch language: 中文 / English', 'language.current': 'Current language: English',
    'network.settings': 'Wi-Fi settings', 'network.eyebrow': 'LOCAL NETWORK',
    'network.title': 'Connect to the hotspot', 'network.close': 'Close connection information',
    'network.intro': 'Connect your phone or computer to this hotspot, then open the device address in a browser. The ESP32 hosts this page and the 3D model locally.',
    'network.ssid': 'Wi-Fi name', 'network.password': 'Wi-Fi password', 'network.address': 'Device address',
    'network.helper': 'Internet access is not required. The 3D demo runs in your browser; Live device mode receives STM32 feedback over UART.',
    'network.done': 'Got it',
    'panel.eyebrow': 'CONTROL PANEL', 'panel.title': 'Device controls', 'mode.group': 'Data source',
    'mode.real': 'Live device', 'mode.demo': '3D demo', 'mode.browserDemo': 'Browser demo', 'mode.mockApi': 'Mock API',
    'mode.demoNote': 'Browser demonstration only. Buttons do not send commands to hardware.',
    'mode.mockNote': 'Development API simulation. No physical hardware is connected.',
    'mode.realNote': 'Reading STM32 feedback. Operations wait for device confirmation.',
    'connection.demo': 'Demo mode', 'connection.mock': 'Mock device', 'connection.online': 'Device online',
    'connection.connecting': 'Connecting', 'connection.offline': 'Device offline',
    'temperature.control': 'Temperature', 'temperature.lower': 'Lower limit', 'temperature.upper': 'Upper limit',
    'temperature.save': 'Save range', 'temperature.auto': 'Auto control', 'temperature.autoDescription': 'Maintain the configured temperature range',
    'temperature.autoDisplayedDescription': 'Control the displayed temperature within the set range',
    'temperature.heat': 'Heating', 'temperature.cool': 'Cooling',
    'temperature.appliedRange': 'Applied range {lower}–{upper} °C', 'temperature.appliedRangeUnknown': 'Awaiting applied range',
    'temperature.controlSample': 'Auto control input', 'temperature.controlNote': 'Auto control uses the displayed temperature; measured samples remain required for validity checks.',
    'temperature.control.below': 'Below range · Heat needed', 'temperature.control.within': 'In range · Hold',
    'temperature.control.above': 'Above range · Cool needed', 'temperature.control.unknown': 'Awaiting valid temperature',
    'temperature.autoUnsupported': 'The current STM32 firmware or channel configuration does not match this program. Auto control is unavailable.',
    'temperature.ownerEsp32': 'ESP32 Auto control · STM32 executes relay commands',
    'temperature.ownerStm32': 'STM32 Auto control', 'temperature.ownerDemo': 'Browser Auto control demo',
    'temperature.localHelp': 'Keep AUTO off in the STM32 physical menu while using web Auto control. The two controllers cannot run together.',
    'temperature.autoPhase.off': 'Auto control off', 'temperature.autoPhase.starting': 'Starting Auto control · Awaiting output confirmation',
    'temperature.autoPhase.running': 'Auto control running', 'temperature.autoPhase.stopping': 'Stopping Auto control · Awaiting off confirmation',
    'temperature.autoPhase.fault': 'Auto control fault · Adjustment stopped', 'temperature.autoFaultUnknown': 'Check communication, sensors and relay feedback before enabling Auto again.',
    'automaticFault.AHT_INVALID': 'Temperature sample is invalid or expired', 'automaticFault.UART_STALE': 'Board communication expired; verify output states',
    'automaticFault.STM_RESET': 'STM32 restarted; enable Auto again manually', 'automaticFault.THERMAL_MAPPING': 'Heat/cool channel configuration does not match',
    'automaticFault.NATIVE_AUTO': 'STM32 physical AUTO was enabled; web Auto control exited',
    'automaticFault.LOCAL_OVERRIDE': 'Another operation changed the outputs; web Auto control exited',
    'automaticFault.CONTROL_FAILED': 'Output command was not confirmed; verify relay feedback',
    'temperature.manualHelp': 'Manual heating or cooling exits Auto mode. Only one can run at a time.',
    'temperature.measured': 'Measured temperature', 'temperature.estimated': 'Estimated temperature', 'temperature.estimateSource': 'Runtime model',
    'temperature.delay': 'Starting in {seconds} s', 'temperature.hold': 'Estimate held', 'temperature.frozen': 'Estimate paused',
    'temperature.heatingEstimate': 'Heating estimate', 'temperature.coolingEstimate': 'Cooling estimate', 'temperature.runningEstimate': 'Runtime estimate',
    'temperature.waiting': 'Awaiting sample', 'temperature.invalid': 'Invalid sample', 'temperature.valid': 'Valid sample',
    'humidity.label': 'Relative humidity', 'process.label': 'Process state', 'process.connectHelp': 'Connect ESP32 to see device feedback',
    'process.waiting': 'Awaiting connection', 'process.offline': 'Device offline', 'process.lastFeedback': 'Last report retained; current actuator state is unknown',
    'process.noFeedback': 'No STM32 status received', 'process.heating': 'Heating', 'process.cooling': 'Cooling', 'process.dispensing': 'Dispensing',
    'process.hold': 'Holding range', 'process.idle': 'Device idle', 'process.automatic': 'Auto control · Following the set range',
    'process.manual': 'Manual control · Awaiting an operation',
    'pump.control': 'Pump', 'pump.limit': 'Continuous run limit', 'pump.limitAria': 'Pump continuous run limit', 'unit.seconds': 's',
    'pump.save': 'Save', 'pump.start': 'Start pump', 'pump.stop': 'Stop', 'pump.current': 'Current', 'pump.total': 'Total',
    'pump.running': 'Running', 'pump.limited': 'Limit reached', 'pump.stopped': 'Stopped',
    'level.monitor': 'Liquid level', 'level.upper': 'Upper', 'level.middle': 'Middle', 'level.lower': 'Lower',
    'level.waiting': 'Awaiting three-probe level data', 'level.last': 'Last: {range}',
    'level.EMPTY.name': 'Very low', 'level.EMPTY.range': 'Below the lower probe',
    'level.LOW.name': 'Low', 'level.LOW.range': 'Between the lower and middle probes',
    'level.NORMAL.name': 'Normal', 'level.NORMAL.range': 'Between the middle and upper probes',
    'level.FULL.name': 'Full', 'level.FULL.range': 'Above the upper probe',
    'level.LEVEL_ERR.name': 'Level fault', 'level.LEVEL_ERR.range': 'Inconsistent probe pattern; volume unknown',
    'level.LEVEL_NC.name': 'Not configured', 'level.LEVEL_NC.range': 'Level probes are not fully configured',
    'level.unknownCaption': '{range}; liquid volume is not inferred.',
    'level.demoCaption': 'Demo drawdown is accelerated. The surface falls as the pump runs; water flow and thermal fields are illustrative.',
    'level.realCaption': 'The surface shows the three-probe level interval. Water flow and thermal fields illustrate the reported operating state.',
    'level.demo': 'Demo level', 'level.demoEmpty': 'Very low', 'level.demoLow': 'Lower–mid', 'level.demoNormal': 'Mid–upper', 'level.demoFull': 'Full',
    'sensor.unknown': 'Unknown', 'sensor.wet': 'Wet', 'sensor.dry': 'Dry',
    'state.waitingData': 'Awaiting data', 'state.waiting': 'Awaiting status', 'state.unknown': 'State unknown', 'state.previous': 'Last report',
    'state.on': 'On', 'state.off': 'Off', 'state.running': 'Running', 'state.stopped': 'Stopped', 'state.idle': 'Idle', 'state.closed': 'Off',
    'stop.all': 'Stop all', 'stop.caption': 'ALL OUTPUTS',
    'view.aria': 'Live 3D tank visualization', 'view.eyebrow': 'LIVE PROCESS VIEW', 'view.title': 'Every operating state, visible', 'view.model': '3D cutaway',
    'view.reset': 'Reset view', 'view.resetAria': 'Reset the 3D view', 'view.reduceMotion': 'Reduce motion',
    'view.sceneAria': '3D tank. Drag to rotate and scroll to zoom',
    'view.canvasAria': '3D tank visualization. Drag to rotate and scroll to zoom. The liquid level illustrates a probe interval.',
    'view.demoSource': 'Browser demo · No hardware control', 'view.mockSource': 'Mock API · No hardware state',
    'view.simulatedSource': 'STM32 simulation enabled', 'view.realSource': 'Live STM32 feedback',
    'view.waiting': 'Awaiting device connection', 'view.offline': 'Device feedback is offline',
    'view.offlineKnown': 'Showing the last report. Current actuator state is unknown; animations are paused.',
    'view.offlineUnknown': 'The model will follow device feedback when the connection returns.',
    'view.tryDemo': 'Explore the 3D demo', 'view.hint': 'Drag to rotate · Scroll to zoom',
    'view.webglTitle': '3D could not start', 'view.webglDetail': 'Use a browser with WebGL2 support. Device controls and telemetry are still available.',
    'legend.liquid': 'Liquid', 'legend.heat': 'Heat flow', 'legend.cold': 'Cold-side heat uptake',
    'callout.upper': 'Upper probe', 'callout.middle': 'Middle probe', 'callout.lower': 'Lower probe',
    'callout.aht': 'Temp / humidity', 'callout.pump': 'Outlet pump', 'callout.heater': 'Ceramic heater', 'callout.cooler': 'Peltier + fan',
    'callout.cabinet': 'Control cabinet', 'callout.cabinetInfo': 'Power / control',
    'strip.control': 'CONTROL', 'strip.heater': 'HEATER · {channel}', 'strip.cooler': 'COOLER · {channel}', 'strip.pump': 'PUMP · CH1',
    'strip.auto': 'Auto control', 'strip.manual': 'Manual control', 'strip.heating': 'Heating', 'strip.cooling': 'Cooling', 'strip.dispensing': 'Dispensing',
    'updated.demo': 'Local browser demo', 'updated.none': 'No status received', 'updated.ago': 'Reported {seconds} s ago',
    'thermal.title': 'Heat transfer', 'thermal.fieldLabel': '3D thermal field', 'thermal.low': 'Cool', 'thermal.high': 'Warm',
    'thermal.volume': 'Volume thermal field', 'thermal.flux': 'Heat-flow direction', 'thermal.dissipation': 'Heat rejection',
    'thermal.paused': 'Feedback lost · Paused', 'thermal.pausedNote': 'Awaiting live device feedback. Thermal field animation is paused.',
    'thermal.unknown': 'Unknown level · Field hidden', 'thermal.unknownNote': 'The probe pattern is unconfirmed; heat transfer inside the liquid is not inferred.',
    'thermal.empty': 'Very low level · Wall conduction', 'thermal.emptyNote': 'Below the lower probe. The surface illustrates the level interval; residual liquid volume is not measured.',
    'thermal.heating': 'Heating · Sidewall transfer', 'thermal.heatingNote': 'Heat spreads from the ceramic plate through the tank wall into the liquid. Warm volume color shows the heated region and thermal gradient.',
    'thermal.cooling': 'Cooling · Heat uptake / rejection', 'thermal.coolingNote': 'The cold contact absorbs heat from the liquid. Blue volume color shows the cooled region; heat exits through the fins and fan.',
    'thermal.coolingLowNote': 'At low level, the liquid covers the lower cold contact. Blue volume color spreads into the liquid; heat exits through the fins and fan.',
    'thermal.idle': 'Idle · Thermal equalization', 'thermal.idleNote': 'Temperature differences diffuse. The field is not calibrated for power, velocity, or local temperature.',
    'action.range': 'Temperature range', 'action.auto': 'Auto control', 'action.pump': 'Pump', 'action.heat': 'Heating', 'action.cool': 'Cooling',
    'action.pump_limit': 'Pump limit', 'action.stop': 'Stop all', 'action.device': 'Device operation',
    'ack.waiting': 'Awaiting device status', 'ack.pending': '{action}: awaiting STM32 confirmation…', 'ack.confirmed': '{action} confirmed by STM32',
    'ack.autoPending': 'ESP32 Auto control: awaiting relay state confirmation…', 'ack.autoConfirmed': 'ESP32 Auto control state confirmed',
    'ack.acceptedUnknown': 'The device accepted the command, but the resulting state is unconfirmed. Check live feedback.',
    'ack.unconfirmed': 'No device confirmation received. The command was not automatically retried.',
    'ack.sessionChanged': 'The device session changed. The operation result is unknown; check live feedback again.',
    'ack.timeout': 'Confirmation timed out. The result is unknown; the command was not retried.',
    'ack.mockConnected': 'Development mock data connected', 'ack.connected': 'STM32 feedback connected',
    'ack.demoUpdated': '{action} · Browser demo updated', 'ack.demoToast': '{action} demo updated (no hardware command sent)',
    'ack.demoMode': 'Browser demo only; no hardware control', 'ack.reading': 'Reading device status…',
    'error.noSession': 'No device session is available yet.', 'error.operation': 'Device operation failed ({status})', 'error.notAccepted': 'The device did not accept the command.',
    'error.interrupted': 'Request interrupted; the result is unknown. It was not retried. Stop all remains available.',
    'validation.temperature': 'Enter valid temperatures.', 'validation.range': 'The range must satisfy −40°C ≤ lower < upper ≤ 85°C.',
    'validation.precision': 'The upper limit must be at least 0.01°C above the lower limit.', 'validation.limit': 'The pump limit must be a whole number from 1 to 300 seconds.',
    'validation.demoLevel': 'Invalid demonstration probe pattern.',
    'fault.PUMP_LIMIT': 'Pump continuous run limit reached', 'fault.AHT_ERR': 'Temperature / humidity read failed', 'fault.AHT_STALE': 'Temperature / humidity sample expired', 'fault.SENSOR_ERROR': 'Sensor fault',
    'api.origin': 'Cross-origin control requests are rejected.', 'api.contentType': 'Control requests must use application/json.',
    'api.bodyTooLarge': 'The control request exceeds the size limit.', 'api.json': 'The control request is not valid JSON.',
    'api.session': 'The device session expired. Wait for live feedback to refresh before controlling.', 'api.argument': 'Invalid control arguments. Check the range, time limit, and switch values.',
    'api.busy': 'A command is awaiting STM32 confirmation. Stop all can preempt it.', 'api.offline': 'Fresh STM32 feedback is required before starting or configuring outputs.',
    'api.tx': 'UART2 could not queue the entire request. The command was not retried.', 'api.stm': 'STM32 returned an error: {detail}',
    'api.incompatible': 'Incompatible STM32 firmware protocol; tankctrl-3.0 / protocol 1 is required.',
    'api.thermalMapping': 'The current STM32 firmware or heat/cool channel configuration does not match.',
    'api.autoSensor': 'Auto control needs valid, fresh measurements. Turn off temperature and level simulation.',
    'api.autoRecovery': 'Awaiting relay off confirmation. Enable Auto control again once this completes.',
    'api.ack': 'Device confirmation does not match the requested parameters.', 'api.reply': 'No matching STM32 status response received.',
    'api.status': 'Invalid STM32 status format.', 'api.reset': 'STM32 restarted. Pending controls were canceled; the protocol is being revalidated.',
    'api.frame': 'The UART2 response is invalid or oversized.', 'api.protocol': 'Invalid UART2 protocol format.',
    'api.timeout': 'No matching STM32 reply within 800 ms. The command was not automatically retried.',
    'api.stale': 'STM32 feedback expired. Wait for communication and live status to recover.', 'api.notFound': 'Unknown device API path or method.',
    'api.hotspot': 'The ESP32 hotspot could not start.', 'api.noHardware': 'No physical device is connected to the development server.',
    'api.development': 'The local server is not connected to hardware. Use Browser demo mode.',
    'api.unknown': 'Device error ({code}). Check live feedback.'
  })
});

export function normalizeLanguage(value) {
  return typeof value === 'string' && /^en(?:[-_]|$)/i.test(value) ? 'en' : 'zh';
}

function savedLanguage() {
  try { return normalizeLanguage(globalThis.localStorage?.getItem(LANGUAGE_STORAGE_KEY)); }
  catch { return 'zh'; }
}

let language = savedLanguage();
export const getLanguage = () => language;

export function setLanguage(value) {
  language = normalizeLanguage(value);
  try { globalThis.localStorage?.setItem(LANGUAGE_STORAGE_KEY, language); } catch { /* Private browsing may deny storage. */ }
  return language;
}

export function t(key, params = {}, locale = language) {
  const template = MESSAGES[normalizeLanguage(locale)][key] ?? MESSAGES.zh[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (match, name) => Object.hasOwn(params, name) ? String(params[name]) : match);
}

export function translateDom(root = globalThis.document) {
  if (!root?.querySelectorAll) return;
  const attributes = [['data-i18n', null], ['data-i18n-title', 'title'], ['data-i18n-aria-label', 'aria-label'], ['data-i18n-placeholder', 'placeholder']];
  for (const [source, target] of attributes) {
    const nodes = [...root.querySelectorAll(`[${source}]`)];
    if (root.matches?.(`[${source}]`)) nodes.unshift(root);
    for (const node of nodes) {
      const value = t(node.getAttribute(source));
      if (target) node.setAttribute(target, value);
      else node.textContent = value;
    }
  }
}

export const levelName = (level, locale = language) => t(`level.${Object.hasOwn(MESSAGES.zh, `level.${level}.name`) ? level : 'LEVEL_NC'}.name`, {}, locale);
export const levelRange = (level, locale = language) => t(`level.${Object.hasOwn(MESSAGES.zh, `level.${level}.range`) ? level : 'LEVEL_NC'}.range`, {}, locale);
export const sensorLabel = (value, locale = language) => t(value === '湿态' ? 'sensor.wet' : value === '干态' ? 'sensor.dry' : 'sensor.unknown', {}, locale);
export const firmwareLabel = (value, locale = language) => value === '纯浏览器演示' ? t('mode.browserDemo', {}, locale) : value;

const API_ERROR_KEYS = Object.freeze({
  ORIGIN: 'api.origin', CONTENT_TYPE: 'api.contentType', BODY_TOO_LARGE: 'api.bodyTooLarge', JSON: 'api.json',
  SESSION: 'api.session', SESSION_MISMATCH: 'api.session', BAD_ARGUMENT: 'api.argument', INVALID_REQUEST: 'api.argument',
  UI_VERSION: 'api.uiVersion',
  BUSY: 'api.busy', OFFLINE: 'api.offline', TX_PARTIAL: 'api.tx', STM_ERR: 'api.stm', UNMATCHED_ERR: 'api.stm',
  INCOMPATIBLE: 'api.incompatible', BAD_ACK: 'api.ack', BAD_REPLY: 'api.reply', BAD_STAT: 'api.status',
  STM_RESET: 'api.reset', UART_FRAME: 'api.frame', UART_PROTOCOL: 'api.protocol', TIMEOUT: 'api.timeout',
  STALE: 'api.stale', NOT_FOUND: 'api.notFound', METHOD_NOT_ALLOWED: 'api.notFound', AP_START: 'api.hotspot',
  NO_HARDWARE: 'api.noHardware', DEVELOPMENT_SERVER: 'api.development',
  THERMAL_MAPPING: 'api.thermalMapping', AUTO_SENSOR: 'api.autoSensor', AUTO_RECOVERY: 'api.autoRecovery'
});

// API messages are localized by stable machine codes, never by their current English wording.
export function apiErrorMessage(error, fallbackKey = 'ack.unconfirmed', params = {}, locale = language) {
  const code = String(error?.code ?? '').toUpperCase();
  if (!code) return t(fallbackKey, params, locale);
  const key = API_ERROR_KEYS[code];
  return key ? t(key, { ...params, detail: error?.message || code }, locale) : t('api.unknown', { code }, locale);
}

export function validationMessage(error, locale = language) {
  return error?.i18nKey ? t(error.i18nKey, error.i18nParams ?? {}, locale) : t('api.argument', {}, locale);
}
