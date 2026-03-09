# 📧 Email Countdown GIF Generator

A Next.js API that generates dynamic countdown GIFs for email campaigns. Since email clients block JavaScript, this solution generates animated GIFs that show a real-time countdown when the email is opened.

## ✨ Features

- 🎯 **Real-time countdown** - GIF updates every time it's loaded
- 📱 **Email client compatible** - Works with Gmail, Outlook, Apple Mail, etc.
- 🎨 **Customizable** - Colors, size, title, all configurable via URL params
- ⚡ **Fast generation** - 60-frame animated GIF generated on-the-fly
- 🚀 **Vercel ready** - Optimized for serverless deployment

## 🚀 Quick Start

### Local Development

```bash
# Navigate to project
cd countdown-gif-api/my-app

# Install dependencies
npm install

# Run dev server
npm run dev
```

Visit `http://localhost:3000` to see the demo page.

### Deploy to Vercel

#### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
cd countdown-gif-api/my-app
vercel --prod
```

#### Option 2: Using GitHub Integration (Recommended)

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click "Add New Project"
4. Import your GitHub repository
5. Click "Deploy"
6. Done! Your API will be live at `https://your-project.vercel.app`

## 📖 Usage

### Basic Usage

Simply use the API endpoint as an image source in your HTML emails:

```html
<img src="https://your-domain.com/api/countdown-gif" 
     alt="Countdown to IDEM 2026" 
     style="display: block; max-width: 100%;" />
```

### Customization

Add query parameters to customize the appearance:

```html
<img src="https://your-domain.com/api/countdown-gif?width=600&height=200&bgColor=%231a1a2e&textColor=%23ffffff&accentColor=%23e94560&title=My%20Event" 
     alt="Countdown" 
     style="display: block; max-width: 100%;" />
```

### Available Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `width` | number | 600 | GIF width in pixels |
| `height` | number | 200 | GIF height in pixels |
| `bgColor` | string | #1a1a2e | Background color (hex) |
| `textColor` | string | #ffffff | Text color (hex) |
| `accentColor` | string | #e94560 | Accent/box color (hex) |
| `title` | string | IDEM 2026 | Countdown title text |
| `frames` | number | 60 | Number of frames (seconds) |
| `fps` | number | 1 | Frames per second |

### Mailchimp Integration

1. In your Mailchimp campaign, add an HTML block
2. Paste the `<img>` tag with your API URL:

```html
<center>
  <img src="https://your-domain.com/api/countdown-gif" 
       alt="Countdown to IDEM 2026" 
       style="display: block; max-width: 100%; height: auto;" />
</center>
```

### Changing the Target Date

Edit the `TARGET_DATE` constant in `src/app/api/countdown-gif/route.ts`:

```typescript
// Example: Change to December 31, 2026
const TARGET_DATE = new Date('2026-12-31T23:59:59Z');
```

Then redeploy:

```bash
vercel --prod
```

## 🔧 How It Works

1. **Email Opens**: When a recipient opens your email, their email client makes a request to load the image
2. **Server Generates GIF**: The API calculates the current time remaining and generates a 60-second animated GIF
3. **No Caching**: Response headers prevent caching, ensuring each request gets a fresh countdown
4. **60-Second Animation**: Each GIF contains 60 frames showing the countdown ticking down second by second

## 🛠️ Technical Details

### Dependencies

- **Next.js** - React framework with API routes
- **@napi-rs/canvas** - Fast canvas implementation for Node.js
- **gif-encoder-2** - Pure JavaScript GIF encoder
- **Sharp** - Image processing (optional, for future enhancements)

### Performance

- GIF generation takes ~100-300ms depending on size
- 60 frames at 600x200px results in ~100-300KB GIF
- Serverless function timeout: 10 seconds (plenty of headroom)

### Limitations

- GIFs are regenerated on each request (no caching by design)
- Maximum recommended size: 800x400px
- Animation loops after 60 seconds (shows the same minute)
- Each email open shows the countdown from "now", not from when email was sent

## 📝 Customization Examples

### Dark Theme (Default)
```
/api/countdown-gif?bgColor=%231a1a2e&textColor=%23ffffff&accentColor=%23e94560
```

### Light Theme
```
/api/countdown-gif?bgColor=%23ffffff&textColor=%23333333&accentColor=%234f46e5
```

### Large Banner
```
/api/countdown-gif?width=800&height=300&title=Summer%20Sale%202026
```

### Compact
```
/api/countdown-gif?width=400&height=120
```

## 🐛 Troubleshooting

### GIF not updating
- Ensure no caching CDN is in front of the API
- Check that `Cache-Control: no-cache` headers are present
- Some email clients cache images aggressively

### GIF too large
- Reduce width/height parameters
- Decrease frame count: `?frames=30`

### Font rendering issues
- The API uses system fonts (Arial)
- For custom fonts, modify the canvas context in the route file

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

---

Made with ❤️ for email marketers who need countdown timers.
