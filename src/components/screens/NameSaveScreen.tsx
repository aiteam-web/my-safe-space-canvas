import React, { useState, useEffect } from 'react';

interface Props {
  getCanvasDataURL: () => string;
  onSave: (name: string, reflection: string) => void;
}

const NameSaveScreen: React.FC<Props> = ({ getCanvasDataURL, onSave }) => {
  const [name, setName] = useState('');
  const [reflection, setReflection] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    setImageURL(getCanvasDataURL());
  }, [getCanvasDataURL]);

  return (
    <div className="flex flex-col items-center px-6 py-6 gap-5" style={{ minHeight: 600 }}>
      {/* Preview */}
      {imageURL && (
        <img
          src={imageURL}
          alt="Your safe place collage"
          className="w-full object-cover rounded-lg"
          style={{ height: 180, border: '0.5px solid #E9E7E0' }}
        />
      )}

      {/* Name input */}
      <div className="w-full">
        <label className="font-lora text-base font-semibold block mb-1" style={{ color: '#2C2C2A' }}>
          What do you call this place?
        </label>
        <p className="font-inter text-xs mb-2" style={{ color: '#B4B2A9' }}>
          e.g. "My Sunday meadow" · "Where the noise stops" · "Enough"
        </p>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name your place..."
          className="w-full font-inter text-sm p-3 rounded-[10px] outline-none focus:ring-1 focus:ring-primary"
          style={{ background: '#fff', border: '0.5px solid #D3D1C7' }}
        />
      </div>

      {/* Reflection */}
      <div className="w-full" style={{ backgroundColor: '#EAF3DE', borderRadius: 14, padding: '14px 16px' }}>
        <label className="font-inter text-[11px] block mb-2" style={{ color: '#3B6D11' }}>
          If you'd like, write one sentence about why this place matters to you. You don't have to.
        </label>
        <textarea
          value={reflection}
          onChange={e => setReflection(e.target.value)}
          rows={3}
          className="w-full font-inter text-sm p-3 rounded-[10px] outline-none resize-none focus:ring-1 focus:ring-primary"
          style={{ background: '#fff', border: '0.5px solid #D3D1C7' }}
        />
        <p className="font-inter text-[11px] mt-1.5" style={{ color: '#B4B2A9' }}>
          This stays private — only visible to you and your therapist.
        </p>
      </div>

      {/* Buttons */}
      <div className="w-full flex flex-col gap-2.5 mt-auto">
        <button
          onClick={() => onSave(name || 'My Safe Place', reflection)}
          className="w-full py-3.5 rounded-xl font-inter font-medium text-sm transition-all duration-300 hover:opacity-90"
          style={{ backgroundColor: '#5DCAA5', color: '#04342C' }}
        >
          Save my safe place
        </button>
        <button
          className="w-full py-3 rounded-xl font-inter font-medium text-sm transition-all duration-300"
          style={{ backgroundColor: '#fff', border: '1px solid #C0DD97', color: '#3B6D11' }}
        >
          + add to home screen
        </button>
      </div>
    </div>
  );
};

export default NameSaveScreen;
