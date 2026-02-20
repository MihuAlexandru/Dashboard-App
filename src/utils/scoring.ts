export function pointsForHints(hintStep: number) {
  if (hintStep === 0) return 3;
  if (hintStep === 1) return 2;
  if (hintStep === 2) return 1;
  return 0;
}
