'use client';

import { useState } from 'react';

export default function Home() {
  const [copied, setCopied] = useState(false);
  
  // Layout settings
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(200);
  
  // Color settings
  const [bgColor, setBgColor] = useState('#1a1a2e');
  const [textColor, setTextColor] = useState('#ffffff');
  const [accentColor, setAccentColor] = useState('#e94560');
  
  // Content settings
  const [title, setTitle] = useState('IDEM 2026');
  
  // Text size settings (as multipliers)
  const [titleSize, setTitleSize] = useState(0.18);
  const [counterSize, setCounterSize] = useState(0.5);
  const [labelSize, setLabelSize] = useState(0.18);
  const [dividerSize, setDividerSize] = useState(0.5);
  
  // Spacing settings (as multipliers)
  const [boxWidth, setBoxWidth] = useState(0.18);
  const [boxHeight, setBoxHeight] = useState(0.45);
  const [gap, setGap] = useState(0.04);
  const [boxY, setBoxY] = useState(0.42);
  const [titleY, setTitleY] = useState(0.08);
  const [boxOpacity, setBoxOpacity] = useState(0.13);
  const [dividerOpacity, setDividerOpacity] = useState(0.3);
  const [dividerWidth, setDividerWidth] = useState(2);
  
  // Animation settings
  const [frames, setFrames] = useState(60);
  const [fps, setFps] = useState(1);
  const [quality, setQuality] = useState(10);

  const baseUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/countdown-gif`
    : '/api/countdown-gif';

  const gifUrl = `${baseUrl}?width=${width}&height=${height}&bgColor=${encodeURIComponent(bgColor)}&textColor=${encodeURIComponent(textColor)}&accentColor=${encodeURIComponent(accentColor)}&title=${encodeURIComponent(title)}&frames=${frames}&fps=${fps}&quality=${quality}&titleSize=${titleSize}&counterSize=${counterSize}&labelSize=${labelSize}&dividerSize=${dividerSize}&boxWidth=${boxWidth}&boxHeight=${boxHeight}&gap=${gap}&boxY=${boxY}&titleY=${titleY}&boxOpacity=${boxOpacity}&dividerOpacity=${dividerOpacity}&dividerWidth=${dividerWidth}`;

  const htmlCode = `<img src="${gifUrl}" alt="Countdown to ${title}" style="display: block; max-width: 100%;" />`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetToDefaults = () => {
    setWidth(600);
    setHeight(200);
    setBgColor('#1a1a2e');
    setTextColor('#ffffff');
    setAccentColor('#e94560');
    setTitle('IDEM 2026');
    setTitleSize(0.18);
    setCounterSize(0.5);
    setLabelSize(0.18);
    setDividerSize(0.5);
    setBoxWidth(0.18);
    setBoxHeight(0.45);
    setGap(0.04);
    setBoxY(0.42);
    setTitleY(0.08);
    setBoxOpacity(0.13);
    setDividerOpacity(0.3);
    setDividerWidth(2);
    setFrames(60);
    setFps(1);
    setQuality(10);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">
            📧 Email Countdown GIF Generator
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Generate dynamic countdown GIFs for your email campaigns. Fully customizable!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Preview Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-3">Live Preview</h2>
            <div className="bg-gray-900 rounded-xl p-4 flex justify-center items-center min-h-[220px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gifUrl}
                alt={`Countdown to ${title}`}
                className="rounded-lg max-w-full"
              />
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              This GIF updates in real-time when loaded.
            </p>
          </div>

          {/* Customization Panel */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Customize</h2>
              <button
                onClick={resetToDefaults}
                className="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
              >
                Reset
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Content */}
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-sm font-medium text-purple-300 mb-2">Content</h3>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-2 py-1.5 bg-white/10 border border-white/20 rounded text-white text-sm"
                  />
                </div>
              </div>

              {/* Dimensions */}
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-sm font-medium text-purple-300 mb-2">Dimensions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Width (px)</label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-white/10 border border-white/20 rounded text-white text-sm"
                      min="200"
                      max="1200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Height (px)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-white/10 border border-white/20 rounded text-white text-sm"
                      min="100"
                      max="600"
                    />
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-sm font-medium text-purple-300 mb-2">Colors</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Background</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-8 w-8 rounded cursor-pointer"
                      />
                      <span className="text-xs text-gray-400">{bgColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Text</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="h-8 w-8 rounded cursor-pointer"
                      />
                      <span className="text-xs text-gray-400">{textColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Accent</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="h-8 w-8 rounded cursor-pointer"
                      />
                      <span className="text-xs text-gray-400">{accentColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Sizes */}
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-sm font-medium text-purple-300 mb-2">Text Sizes</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Title Size ({titleSize})</label>
                    <input
                      type="range"
                      min="0.05"
                      max="0.4"
                      step="0.01"
                      value={titleSize}
                      onChange={(e) => setTitleSize(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Counter Size ({counterSize})</label>
                    <input
                      type="range"
                      min="0.2"
                      max="0.8"
                      step="0.01"
                      value={counterSize}
                      onChange={(e) => setCounterSize(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Label Size ({labelSize})</label>
                    <input
                      type="range"
                      min="0.05"
                      max="0.3"
                      step="0.01"
                      value={labelSize}
                      onChange={(e) => setLabelSize(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Divider Size ({dividerSize})</label>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={dividerSize}
                      onChange={(e) => setDividerSize(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Spacing */}
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-sm font-medium text-purple-300 mb-2">Spacing & Layout</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Box Width ({boxWidth})</label>
                    <input
                      type="range"
                      min="0.1"
                      max="0.3"
                      step="0.01"
                      value={boxWidth}
                      onChange={(e) => setBoxWidth(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Box Height ({boxHeight})</label>
                    <input
                      type="range"
                      min="0.2"
                      max="0.7"
                      step="0.01"
                      value={boxHeight}
                      onChange={(e) => setBoxHeight(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Gap ({gap})</label>
                    <input
                      type="range"
                      min="0.01"
                      max="0.1"
                      step="0.005"
                      value={gap}
                      onChange={(e) => setGap(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Box Y ({boxY})</label>
                    <input
                      type="range"
                      min="0.2"
                      max="0.6"
                      step="0.01"
                      value={boxY}
                      onChange={(e) => setBoxY(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Title Y ({titleY})</label>
                    <input
                      type="range"
                      min="0.02"
                      max="0.2"
                      step="0.01"
                      value={titleY}
                      onChange={(e) => setTitleY(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Opacity & Effects */}
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-sm font-medium text-purple-300 mb-2">Opacity & Effects</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Box Opacity ({boxOpacity})</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={boxOpacity}
                      onChange={(e) => setBoxOpacity(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Divider Opacity ({dividerOpacity})</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={dividerOpacity}
                      onChange={(e) => setDividerOpacity(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Divider Width ({dividerWidth}px)</label>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      step="1"
                      value={dividerWidth}
                      onChange={(e) => setDividerWidth(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Animation */}
              <div>
                <h3 className="text-sm font-medium text-purple-300 mb-2">Animation</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Frames ({frames})</label>
                    <input
                      type="number"
                      value={frames}
                      onChange={(e) => setFrames(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-white/10 border border-white/20 rounded text-white text-sm"
                      min="10"
                      max="120"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">FPS ({fps})</label>
                    <input
                      type="number"
                      value={fps}
                      onChange={(e) => setFps(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-white/10 border border-white/20 rounded text-white text-sm"
                      min="1"
                      max="10"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Quality ({quality})</label>
                    <input
                      type="number"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-white/10 border border-white/20 rounded text-white text-sm"
                      min="1"
                      max="30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HTML Code Section */}
        <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-white">HTML Code for Email</h2>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {copied ? '✓ Copied!' : 'Copy HTML'}
            </button>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
            <code className="text-green-400 font-mono text-xs whitespace-pre-wrap break-all">
              {htmlCode}
            </code>
          </div>
        </div>

        {/* API Documentation */}
        <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-3">All API Parameters</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {[
              ['width', '600', 'GIF width in pixels'],
              ['height', '200', 'GIF height in pixels'],
              ['bgColor', '#1a1a2e', 'Background color'],
              ['textColor', '#ffffff', 'Text color'],
              ['accentColor', '#e94560', 'Accent/box color'],
              ['title', 'IDEM 2026', 'Countdown title'],
              ['titleSize', '0.18', 'Title text size (height multiplier)'],
              ['counterSize', '0.5', 'Counter number size (box height multiplier)'],
              ['labelSize', '0.18', 'Label text size (box height multiplier)'],
              ['dividerSize', '0.5', 'Divider height (box height multiplier)'],
              ['boxWidth', '0.18', 'Box width (width multiplier)'],
              ['boxHeight', '0.45', 'Box height (height multiplier)'],
              ['gap', '0.04', 'Gap between boxes (width multiplier)'],
              ['boxY', '0.42', 'Box Y position (height multiplier)'],
              ['titleY', '0.08', 'Title Y position (height multiplier)'],
              ['boxOpacity', '0.13', 'Box background opacity (0-1)'],
              ['dividerOpacity', '0.3', 'Divider opacity (0-1)'],
              ['dividerWidth', '2', 'Divider width in pixels'],
              ['frames', '60', 'Number of frames (seconds)'],
              ['fps', '1', 'Frames per second'],
              ['quality', '10', 'GIF quality (1-30, lower is better)'],
            ].map(([param, def, desc]) => (
              <div key={param} className="bg-black/30 rounded p-2">
                <code className="text-green-400 font-bold">{param}</code>
                <div className="text-gray-500">Default: {def}</div>
                <div className="text-gray-400">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
