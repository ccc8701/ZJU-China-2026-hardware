const OFFSETS = Object.freeze({
  aht: [-180, -50], upper: [-155, -6], middle: [-155, 0], lower: [-155, 8],
  heater: [-140, 55], cooler: [60, -40], pump: [80, 15], cabinet: [-115, 35]
});
const LEFT = new Set(['aht', 'upper', 'middle', 'lower', 'heater', 'cabinet']);
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

// Cards are offset from their true projection anchors; leaders retain the
// physical connection even when a card is moved to keep text legible.
export function layoutLabels(labels, width, height) {
  const compact = width < 500;
  const cardWidth = compact ? 82 : 104;
  const cardHeight = compact ? 31 : 40;
  const margin = compact ? 12 : 20;
  const minTop = 48;
  const maxTop = Math.max(minTop, height - cardHeight - (compact ? 65 : 48));
  const boxes = labels.map((label) => {
    const offsets = OFFSETS[label.id] || [20, 0];
    const dx = compact ? (LEFT.has(label.id) ? -95 : 25) : offsets[0];
    const dy = compact ? offsets[1] * 0.6 : offsets[1];
    return { ...label, width: cardWidth, height: cardHeight, left: clamp(label.x + dx, margin, Math.max(margin, width - margin - cardWidth)), top: clamp(label.y + dy - cardHeight / 2, minTop, maxTop) };
  });
  // Resolve each outside column from top to bottom, then pull back up when a
  // lower card reaches the view boundary. All default-view labels retain 8px.
  for (const side of [true, false]) {
    const column = boxes.filter((box) => box.visible && LEFT.has(box.id) === side).sort((a, b) => a.top - b.top);
    for (let index = 1; index < column.length; index++) column[index].top = Math.max(column[index].top, column[index - 1].top + cardHeight + 8);
    if (column.length && column.at(-1).top > maxTop) {
      column.at(-1).top = maxTop;
      for (let index = column.length - 2; index >= 0; index--) column[index].top = Math.min(column[index].top, column[index + 1].top - cardHeight - 8);
    }
  }
  return boxes.map((box) => {
    const endX = clamp(box.x, box.left, box.left + cardWidth);
    const endY = clamp(box.y, box.top + 6, box.top + cardHeight - 6);
    const dx = endX - box.x, dy = endY - box.y;
    return { ...box, lineLength: Math.hypot(dx, dy), lineAngle: Math.atan2(dy, dx) };
  });
}
