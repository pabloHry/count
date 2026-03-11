import { NextRequest, NextResponse } from 'next/server';
import GIFEncoder from 'gif-encoder-2';
import { join } from 'path';
import { cwd } from 'process';

// Configure for Node.js runtime - required for canvas
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Default target date: April 17, 2026
const DEFAULT_TARGET_DATE = '2026-04-17T00:00:00Z';

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
      }
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    
    // Layout parameters
    const width = parseInt(searchParams.get('width') || '600');
    const height = parseInt(searchParams.get('height') || '200');
    
    // Color parameters
    const bgColor = searchParams.get('bgColor') || '#1a1a2e';
    const textColor = searchParams.get('textColor') || '#ffffff';
    const accentColor = searchParams.get('accentColor') || '#e94560';
    
    // Content parameters
    const title = searchParams.get('title') || 'IDEM 2026';
    const frames = parseInt(searchParams.get('frames') || '60');
    
    // Text size parameters (as multipliers of default)
    const titleSize = parseFloat(searchParams.get('titleSize') || '0.18');
    const counterSize = parseFloat(searchParams.get('counterSize') || '0.5');
    const labelSize = parseFloat(searchParams.get('labelSize') || '0.18');
    const dividerSize = parseFloat(searchParams.get('dividerSize') || '0.5');
    
    // Spacing parameters
    const boxWidth = parseFloat(searchParams.get('boxWidth') || '0.18');
    const boxHeight = parseFloat(searchParams.get('boxHeight') || '0.45');
    const gap = parseFloat(searchParams.get('gap') || '0.04');
    const boxY = parseFloat(searchParams.get('boxY') || '0.42');
    const titleY = parseFloat(searchParams.get('titleY') || '0.08');
    const boxOpacity = parseFloat(searchParams.get('boxOpacity') || '0.13');
    const dividerOpacity = parseFloat(searchParams.get('dividerOpacity') || '0.3');
    const dividerWidth = parseFloat(searchParams.get('dividerWidth') || '2');
    
    // Animation parameters
    const fps = parseInt(searchParams.get('fps') || '1');
    const quality = parseInt(searchParams.get('quality') || '10');
    
    // Target date parameter
    const targetDateParam = searchParams.get('targetDate');
    let targetDate: Date;
    
    if (targetDateParam) {
      // Parse ISO date string (e.g., "2026-04-17T00:00:00Z" or "2026-04-17")
      targetDate = new Date(targetDateParam);
      if (isNaN(targetDate.getTime())) {
        // Invalid date, fall back to default
        targetDate = new Date(DEFAULT_TARGET_DATE);
      }
    } else {
      targetDate = new Date(DEFAULT_TARGET_DATE);
    }

    // Create canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Create GIF encoder
    const encoder = new GIFEncoder(width, height, 'neuquant', true);
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(1000 / fps);
    encoder.setQuality(quality);

    // Parse colors
    const textRgb = hexToRgb(textColor);
    const accentRgb = hexToRgb(accentColor);

    // Font family to use
    const fontFamily = fontRegistered ? 'Inter' : 'sans-serif';

    // Calculate layout
    const actualBoxWidth = width * boxWidth;
    const actualBoxHeight = height * boxHeight;
    const actualGap = width * gap;
    const actualBoxY = height * boxY;
    const startX = (width - (actualBoxWidth * 4 + actualGap * 3)) / 2 + actualBoxWidth / 2;

    // Generate frames
    for (let i = 0; i < frames; i++) {
      // Clear canvas
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      const timeLeft = getTimeLeft(targetDate);

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
        ctx.font = `bold ${Math.floor(height * titleSize)}px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(title, width / 2, height * titleY);

        // Calculate time values for this frame
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
          const x = startX + index * (actualBoxWidth + actualGap);

          // Box background
          ctx.fillStyle = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${boxOpacity})`;
          ctx.fillRect(x - actualBoxWidth / 2, actualBoxY, actualBoxWidth, actualBoxHeight);

          // Number
          ctx.fillStyle = textColor;
          ctx.font = `bold ${Math.floor(actualBoxHeight * counterSize)}px ${fontFamily}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(formatNumber(Math.max(0, unit.value)), x, actualBoxY + actualBoxHeight * 0.4);

          // Label
          ctx.fillStyle = `rgba(${textRgb.r}, ${textRgb.g}, ${textRgb.b}, 0.8)`;
          ctx.font = `bold ${Math.floor(actualBoxHeight * labelSize)}px ${fontFamily}`;
          ctx.fillText(unit.label, x, actualBoxY + actualBoxHeight * 0.78);

          // Draw vertical bar divider after each box except the last one
          if (index < timeUnits.length - 1) {
            const barX = x + actualBoxWidth / 2 + actualGap / 2;
            const barHeight = actualBoxHeight * dividerSize;
            const barY = actualBoxY + (actualBoxHeight - barHeight) / 2;
            ctx.fillStyle = `rgba(${textRgb.r}, ${textRgb.g}, ${textRgb.b}, ${dividerOpacity})`;
            ctx.fillRect(barX - dividerWidth / 2, barY, dividerWidth, barHeight);
          }
        });
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
