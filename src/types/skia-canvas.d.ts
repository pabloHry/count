declare module 'skia-canvas' {
  export interface CanvasRenderingContext2D {
    fillStyle: string;
    font: string;
    textAlign: CanvasTextAlign;
    textBaseline: CanvasTextBaseline;
    fillRect(x: number, y: number, width: number, height: number): void;
    fillText(text: string, x: number, y: number): void;
    getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
  }

  export class Canvas {
    constructor(width: number, height: number);
    getContext(contextId: '2d'): CanvasRenderingContext2D;
    width: number;
    height: number;
  }

  export function createCanvas(width: number, height: number): Canvas;
}
