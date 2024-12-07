export const getReflectionGradient = (baseColor: string): string => {
  const lighterColor = adjustBrightness(baseColor, 30);
  const darkerColor = adjustBrightness(baseColor, -20);
  
  return `linear-gradient(135deg, 
    ${lighterColor} 0%,
    ${baseColor} 45%,
    ${baseColor} 55%,
    ${darkerColor} 100%)`;
};

export const getHighlightGradient = (): string => {
  return `
    radial-gradient(circle at 30% 30%, 
      rgba(255,255,255,0.5) 0%, 
      rgba(255,255,255,0.2) 20%,
      rgba(255,255,255,0) 60%
    )
  `;
};

const adjustBrightness = (color: string, percent: number): string => {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const r = (num >> 16) + percent;
  const g = ((num >> 8) & 0x00FF) + percent;
  const b = (num & 0x0000FF) + percent;

  const newR = Math.min(255, Math.max(0, r));
  const newG = Math.min(255, Math.max(0, g));
  const newB = Math.min(255, Math.max(0, b));
  
  return `#${(newB | (newG << 8) | (newR << 16)).toString(16).padStart(6, '0')}`;
};