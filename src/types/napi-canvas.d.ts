declare module '@napi-rs/canvas' {
  export interface CanvasRenderingContext2D {
    fillStyle: string;
    font: string;
    textAlign: 'left' | 'right' | 'center' | 'start' | 'end';
    textBaseline: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
    fillRect(x: number, y: number, width: number, height: number): void;
    fillText(text: string, x: number, y: number): void;
    getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
  }

  export interface Canvas {
    getContext(contextId: '2d'): CanvasRenderingContext2D;
    width: number;
    height: number;
  }

  export function createCanvas(width: number, height: number): Canvas;
  export function createImageData(width: number, height: number): ImageData;
}
