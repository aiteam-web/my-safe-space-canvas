import React, { useState, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fabric } from 'fabric';
import WelcomeScreen from './screens/WelcomeScreen';
import CanvasScreen from './screens/CanvasScreen';
import NameSaveScreen from './screens/NameSaveScreen';
import GroundingScreen from './screens/GroundingScreen';
import HistoryDrawer from './HistoryDrawer';

export interface SavedCollage {
  id: string;
  name: string;
  reflection: string;
  imageDataURL: string;
  date: string;
}

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
};

const SafePlaceApp: React.FC = () => {
  const [screen, setScreen] = useState(0); // 0=welcome,1-5=prompts,6=save,7=grounding
  const [showHistory, setShowHistory] = useState(false);
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [savedCollage, setSavedCollage] = useState<SavedCollage | null>(null);

  const handleSave = useCallback((name: string, reflection: string) => {
    if (!canvasRef.current) return;
    const imageDataURL = canvasRef.current.toDataURL({ format: 'png', quality: 1 });
    const collage: SavedCollage = {
      id: Date.now().toString(),
      name,
      reflection,
      imageDataURL,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('safe-place-collages') || '[]');
    existing.push(collage);
    localStorage.setItem('safe-place-collages', JSON.stringify(existing));
    setSavedCollage(collage);
    setScreen(7);
  }, []);

  const getCanvasDataURL = useCallback(() => {
    if (!canvasRef.current) return '';
    return canvasRef.current.toDataURL({ format: 'png', quality: 1 });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F0EDE8' }}>
      <div
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: 420,
          backgroundColor: '#FBF7F2',
          borderRadius: 24,
          boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
          minHeight: 600,
        }}
      >
        <AnimatePresence mode="wait">
          {screen === 0 && (
            <motion.div key="welcome" {...pageTransition}>
              <WelcomeScreen
                onBegin={() => setScreen(1)}
                onShowHistory={() => setShowHistory(true)}
              />
            </motion.div>
          )}
          {screen >= 1 && screen <= 5 && (
            <motion.div key="canvas" {...pageTransition}>
              <CanvasScreen
                promptIndex={screen - 1}
                canvasRef={canvasRef}
                onNext={() => setScreen(s => s + 1)}
                onFinish={() => setScreen(6)}
              />
            </motion.div>
          )}
          {screen === 6 && (
            <motion.div key="save" {...pageTransition}>
              <NameSaveScreen
                getCanvasDataURL={getCanvasDataURL}
                onSave={handleSave}
              />
            </motion.div>
          )}
          {screen === 7 && savedCollage && (
            <motion.div key="grounding" {...pageTransition}>
              <GroundingScreen
                collage={savedCollage}
                onClose={() => setScreen(0)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showHistory && (
        <HistoryDrawer onClose={() => setShowHistory(false)} />
      )}
    </div>
  );
};

export default SafePlaceApp;
