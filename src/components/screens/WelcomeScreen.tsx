import React from 'react';
import WelcomeIllustration from '../WelcomeIllustration';

interface Props {
  onBegin: () => void;
  onShowHistory: () => void;
}

const WelcomeScreen: React.FC<Props> = ({ onBegin, onShowHistory }) => (
  <div className="flex flex-col items-center justify-between min-h-[600px] px-6 py-6">
    {/* Top bar */}
    <div className="w-full flex justify-between items-center">
      <button className="text-lg font-inter" style={{ color: '#888780' }}>←</button>
      <button onClick={onShowHistory} className="font-inter" style={{ color: '#888780', fontSize: 20 }}>🕐</button>
    </div>

    {/* Center content */}
    <div className="flex flex-col items-center text-center gap-5 flex-1 justify-center">
      <WelcomeIllustration />
      <h1 className="font-lora font-semibold text-[22px]" style={{ color: '#2C2C2A' }}>
        Your safe place is waiting.
      </h1>
      <p className="font-inter text-sm leading-[1.7]" style={{ color: '#888780', maxWidth: 320 }}>
        You'll build it yourself — one gentle prompt at a time. A blank canvas, your own colours, your own marks.
      </p>
    </div>

    {/* Bottom */}
    <div className="w-full flex flex-col items-center gap-3">
      <button
        onClick={onBegin}
        className="w-full py-3.5 rounded-xl font-lora text-[15px] font-medium transition-all duration-300 hover:opacity-90"
        style={{ backgroundColor: '#5DCAA5', color: '#04342C' }}
      >
        Begin when you're ready
      </button>
      <span className="font-inter text-xs" style={{ color: '#B4B2A9' }}>
        About 15 mins · save anytime
      </span>
    </div>
  </div>
);

export default WelcomeScreen;
