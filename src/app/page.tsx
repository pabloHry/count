'use client';

import { useState } from 'react';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(200);
  const [bgColor, setBgColor] = useState('#1a1a2e');
  const [textColor, setTextColor] = useState('#ffffff');
  const [accentColor, setAccentColor] = useState('#e94560');
  const [title, setTitle] = useState('IDEM 2026');

  const baseUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/countdown-gif`
    : '/api/countdown-gif';

  const gifUrl = `${baseUrl}?width=${width}&height=${height}&bgColor=${encodeURIComponent(bgColor)}&textColor=${encodeURIComponent(textColor)}&accentColor=${encodeURIComponent(accentColor)}&title=${encodeURIComponent(title)}`;

  const htmlCode = `<img src="${gifUrl}" alt="Countdown to ${title}" style="display: block; max-width: 100%;" />`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            📧 Email Countdown GIF Generator
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Generate dynamic countdown GIFs for your email campaigns. 
            Works with Mailchimp, SendGrid, and any email platform that supports images.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Preview Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">Preview</h2>
            <div className="bg-gray-900 rounded-xl p-4 flex justify-center items-center min-h-[250px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gifUrl}
                alt={`Countdown to ${title}`}
                className="rounded-lg max-w-full"
              />
            </div>
            <p className="text-sm text-gray-400 mt-4 text-center">
              This GIF updates in real-time when loaded. Each frame shows the countdown ticking down.
            </p>
          </div>

          {/* Customization Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">Customize</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="IDEM 2026"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="200"
                    max="1200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="100"
                    max="600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Background
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="h-10 w-10 rounded cursor-pointer"
                    />
                    <span className="text-xs text-gray-400">{bgColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Text
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="h-10 w-10 rounded cursor-pointer"
                    />
                    <span className="text-xs text-gray-400">{textColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Accent
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="h-10 w-10 rounded cursor-pointer"
                    />
                    <span className="text-xs text-gray-400">{accentColor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HTML Code Section */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white">HTML Code for Email</h2>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy HTML
                </>
              )}
            </button>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
            <code className="text-green-400 font-mono text-sm whitespace-pre-wrap break-all">
              {htmlCode}
            </code>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold text-white">
                1
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Email Opens</h3>
              <p className="text-gray-300 text-sm">
                When a recipient opens your email, their email client requests the GIF from this server.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold text-white">
                2
              </div>
              <h3 className="text-lg font-medium text-white mb-2">GIF Generated</h3>
              <p className="text-gray-300 text-sm">
                The server calculates the current time remaining and generates a fresh 60-second animated GIF.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold text-white">
                3
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Real-time Countdown</h3>
              <p className="text-gray-300 text-sm">
                The GIF shows a 60-second countdown animation. Each email open gets an updated GIF.
              </p>
            </div>
          </div>
        </div>

        {/* API Documentation */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-4">API Parameters</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-3 px-4 text-gray-300 font-medium">Parameter</th>
                  <th className="py-3 px-4 text-gray-300 font-medium">Type</th>
                  <th className="py-3 px-4 text-gray-300 font-medium">Default</th>
                  <th className="py-3 px-4 text-gray-300 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-mono text-green-400">width</td>
                  <td className="py-3 px-4">number</td>
                  <td className="py-3 px-4">600</td>
                  <td className="py-3 px-4">GIF width in pixels</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-mono text-green-400">height</td>
                  <td className="py-3 px-4">number</td>
                  <td className="py-3 px-4">200</td>
                  <td className="py-3 px-4">GIF height in pixels</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-mono text-green-400">bgColor</td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4">#1a1a2e</td>
                  <td className="py-3 px-4">Background color (hex)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-mono text-green-400">textColor</td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4">#ffffff</td>
                  <td className="py-3 px-4">Text color (hex)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-mono text-green-400">accentColor</td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4">#e94560</td>
                  <td className="py-3 px-4">Accent/box color (hex)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-mono text-green-400">title</td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4">IDEM 2026</td>
                  <td className="py-3 px-4">Countdown title text</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>Target Date: April 17, 2026 (IDEM 2026)</p>
          <p className="mt-2">
            To change the target date, edit the <code className="bg-gray-800 px-1 py-0.5 rounded">TARGET_DATE</code> constant in{' '}
            <code className="bg-gray-800 px-1 py-0.5 rounded">src/app/api/countdown-gif/route.ts</code>
          </p>
        </div>
      </div>
    </div>
  );
}
