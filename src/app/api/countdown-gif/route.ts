import { NextRequest, NextResponse } from 'next/server';
import GIFEncoder from 'gif-encoder-2';
import { join } from 'path';
import { cwd } from 'process';

// Configure for Node.js runtime - required for canvas
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Target date: April 17, 2026
const TARGET_DATE = new Date('2026-04-17T00:00:00Z');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function getTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const difference = target - now;

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    total: difference,
  };
}

function formatNumber(num: number): string {
  return num.toString().padStart(2, '0');
}

// Cache font registration
let fontRegistered = false;

export async function GET(request: NextRequest) {
  try {
    // Dynamically import @napi-rs/canvas
    const { createCanvas, GlobalFonts } = await import('@napi-rs/canvas');

    // Register font once
    if (!fontRegistered) {
      try {
        const fontPath = join(cwd(), 'public', 'fonts', 'Inter.ttf');
        GlobalFonts.registerFromPath(fontPath, 'Inter');
        fontRegistered = true;
        console.log('Font registered successfully from:', fontPath);
      } catch (fontError) {
        console.error('Failed to register font:', fontError);
        // Continue without custom font - will use default
      }
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const width = parseInt(searchParams.get('width') || '600');
    const height = parseInt(searchParams.get('height') || '200');
    const bgColor = searchParams.get('bgColor') || '#1a1a2e';
    const textColor = searchParams.get('textColor') || '#ffffff';
    const accentColor = searchParams.get('accentColor') || '#e94560';
    const title = searchParams.get('title') || 'IDEM 2026';
    const frames = parseInt(searchParams.get('frames') || '60');

    // Create canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Create GIF encoder
    const encoder = new GIFEncoder(width, height, 'neuquant', true);
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(1000);
    encoder.setQuality(10);

    // Parse colors
    const bgRgb = hexToRgb(bgColor);
    const textRgb = hexToRgb(textColor);
    const accentRgb = hexToRgb(accentColor);

    // Font family to use
    const fontFamily = fontRegistered ? 'Inter' : 'sans-serif';

    // Generate frames
    for (let i = 0; i < frames; i++) {
      // Clear canvas
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      const timeLeft = getTimeLeft(TARGET_DATE);

      if (timeLeft.total <= 0) {
        // Draw "Event Started!"
        ctx.fillStyle = accentColor;
        ctx.font = `bold ${Math.floor(height * 0.25)}px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Event Started!', width / 2, height / 2);
      } else {
        // Draw title
        ctx.fillStyle = textColor;
        ctx.font = `bold ${Math.floor(height * 0.18)}px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(title, width / 2, height * 0.08);

        // Draw countdown boxes
        const boxWidth = width * 0.18;
        const boxHeight = height * 0.45;
        const gap = width * 0.04;
        const startX = (width - (boxWidth * 4 + gap * 3)) / 2 + boxWidth / 2;
        const boxY = height * 0.42;

        const totalSeconds = timeLeft.total / 1000 + i;
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
        const minutes = Math.floor((totalSeconds / 60) % 60);
        const seconds = Math.floor(totalSeconds % 60);

        const timeUnits = [
          { value: days, label: 'DAYS' },
          { value: hours, label: 'HRS' },
          { value: minutes, label: 'MIN' },
          { value: seconds, label: 'SEC' },
        ];

        timeUnits.forEach((unit, index) => {
          const x = startX + index * (boxWidth + gap);

          // Box background
          ctx.fillStyle = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.13)`;
          ctx.fillRect(x - boxWidth / 2, boxY, boxWidth, boxHeight);

          // Number
          ctx.fillStyle = textColor;
          ctx.font = `bold ${Math.floor(boxHeight * 0.5)}px ${fontFamily}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(formatNumber(Math.max(0, unit.value)), x, boxY + boxHeight * 0.4);

          // Label
          ctx.fillStyle = `rgba(${textRgb.r}, ${textRgb.g}, ${textRgb.b}, 0.8)`;
          ctx.font = `bold ${Math.floor(boxHeight * 0.18)}px ${fontFamily}`;
          ctx.fillText(unit.label, x, boxY + boxHeight * 0.78);
        });

        // Target date
        ctx.fillStyle = `rgba(${textRgb.r}, ${textRgb.g}, ${textRgb.b}, 0.6)`;
        ctx.font = `${Math.floor(height * 0.08)}px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(
          `Target: ${TARGET_DATE.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}`,
          width / 2,
          height * 0.95
        );
      }

      // Add frame
      const imgData = ctx.getImageData(0, 0, width, height);
      encoder.addFrame(new Uint8Array(imgData.data.buffer));
    }

    encoder.finish();
    const buffer = encoder.out.getData();

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-cache, no-store, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error generating countdown GIF:', error);
    return NextResponse.json(
      { error: 'Failed to generate countdown GIF', details: String(error) },
      { status: 500 }
    );
  }
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  return { r, g, b };
}
