declare module 'gif-encoder-2' {
  type Algorithm = 'neuquant' | 'octree';

  interface GIFEncoder {
    start(): void;
    setRepeat(repeat: number): void;
    setDelay(delay: number): void;
    setQuality(quality: number): void;
    setTransparent(color: number): void;
    addFrame(imageData: Uint8Array): void;
    finish(): void;
    out: {
      getData(): Buffer;
    };
  }

  interface GIFEncoderConstructor {
    new(width: number, height: number, algorithm?: Algorithm, useOptimizer?: boolean): GIFEncoder;
  }

  const GIFEncoder: GIFEncoderConstructor;
  export default GIFEncoder;
}
