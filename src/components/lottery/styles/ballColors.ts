import { BallColorRange } from '../types';

export const BALL_COLOR_RANGES: BallColorRange[] = [
  { max: 20, color: '#00E676', name: 'lime' },    // Bright lime green (1-20)
  { max: 40, color: '#FFD600', name: 'yellow' },  // Vivid yellow (21-40)
  { max: 60, color: '#FF1744', name: 'red' },     // Bright red (41-60)
  { max: 80, color: '#FF4081', name: 'pink' },    // Vibrant pink (61-80)
  { max: 99, color: '#2979FF', name: 'blue' },    // Electric blue (81-99)
];

export const getBallColor = (number: number): string => {
  const range = BALL_COLOR_RANGES.find(range => number <= range.max);
  return range?.color || BALL_COLOR_RANGES[0].color;
};