import { NextRequest, NextResponse } from 'next/server';
import GIFEncoder from 'gif-encoder-2';
import { createCanvas } from 'skia-canvas';

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

export async function GET(request: NextRequest) {
  try {
    // Get query parameters for customization
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
    encoder.setRepeat(0); // Loop forever
    encoder.setDelay(1000); // 1 second per frame
    encoder.setQuality(10); // Quality (1-30, lower is better)

    // Generate frames (each frame represents one second)
    for (let i = 0; i < frames; i++) {
      // Clear canvas
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // Calculate time for this frame (current time + i seconds)
      const timeLeft = getTimeLeft(TARGET_DATE);

      // Check if countdown has ended
      if (timeLeft.total <= 0) {
        // Draw "Event Started!" message
        ctx.fillStyle = accentColor;
        ctx.font = `bold ${Math.floor(height * 0.25)}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Event Started!', width / 2, height / 2);
      } else {
        // Draw title
        ctx.fillStyle = textColor;
        ctx.font = `bold ${Math.floor(height * 0.18)}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(title, width / 2, height * 0.08);

        // Draw countdown boxes
        const boxWidth = width * 0.18;
        const boxHeight = height * 0.45;
        const gap = width * 0.04;
        const startX = (width - (boxWidth * 4 + gap * 3)) / 2 + boxWidth / 2;
        const boxY = height * 0.42;

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
          const x = startX + index * (boxWidth + gap);

          // Draw box background (add 20% opacity)
          ctx.fillStyle = hexToRgba(accentColor, 0.13);
          ctx.fillRect(x - boxWidth / 2, boxY, boxWidth, boxHeight);

          // Draw number
          ctx.fillStyle = textColor;
          ctx.font = `bold ${Math.floor(boxHeight * 0.5)}px Arial, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(formatNumber(Math.max(0, unit.value)), x, boxY + boxHeight * 0.4);

          // Draw label
          ctx.fillStyle = hexToRgba(textColor, 0.8);
          ctx.font = `bold ${Math.floor(boxHeight * 0.18)}px Arial, sans-serif`;
          ctx.fillText(unit.label, x, boxY + boxHeight * 0.78);
        });

        // Draw target date
        ctx.fillStyle = hexToRgba(textColor, 0.6);
        ctx.font = `${Math.floor(height * 0.08)}px Arial, sans-serif`;
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

      // Add frame to encoder
      const imageData = ctx.getImageData(0, 0, width, height);
      encoder.addFrame(imageData.data as unknown as Uint8Array);
    }

    encoder.finish();

    // Get the GIF buffer
    const buffer = encoder.out.getData();

    // Return the GIF with no-cache headers
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
      { error: 'Failed to generate countdown GIF' },
      { status: 500 }
    );
  }
}

// Helper function to convert hex color to rgba
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
