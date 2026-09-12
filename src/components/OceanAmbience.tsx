import React, { useState, useEffect, useRef } from 'react';
import './OceanAmbience.css';

export const OceanAmbience: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const startOceanSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // 1. Generar 3 segundos de buffer de ruido suave (Brownian/Pink noise)
      const bufferSize = ctx.sampleRate * 3;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Filtro browniano simple: integrador con fuga
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // Compensación de ganancia
      }

      // 2. Fuente de ruido en bucle
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      noiseSourceRef.current = noiseSource;

      // 3. Filtro paso bajo dinámico para simular el cuerpo de la ola
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 380;
      filter.Q.value = 1.8;

      // 4. LFO (Oscilador de baja frecuencia) para modular el oleaje (0.12 Hz ~ 8 segundos por ciclo)
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.11; // Ritmo respiratorio de las olas
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 320; // Modulación de frecuencia de corte
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfoRef.current = lfo;

      // 5. Ganancia de modulación de volumen rítmico
      const volumeLfoGain = ctx.createGain();
      volumeLfoGain.gain.value = 0.06;
      lfo.connect(volumeLfoGain);

      // 6. Ganancia maestra con rampa de entrada suave
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 1.8);
      masterGainRef.current = masterGain;

      // Conexión del grafo de audio
      noiseSource.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      // Iniciar reproducción
      noiseSource.start();
      lfo.start();
      setIsPlaying(true);
    } catch (e) {
      console.warn('Web Audio no disponible en este entorno', e);
    }
  };

  const stopOceanSound = () => {
    if (audioCtxRef.current && masterGainRef.current) {
      const ctx = audioCtxRef.current;
      const gain = masterGainRef.current;
      // Rampa de desvanecimiento suave (fade out)
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      setTimeout(() => {
        try {
          noiseSourceRef.current?.stop();
          lfoRef.current?.stop();
          ctx.close();
        } catch (_) {}
        audioCtxRef.current = null;
        masterGainRef.current = null;
        setIsPlaying(false);
      }, 1300);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopOceanSound();
    } else {
      startOceanSound();
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggleSound}
      className={`ocean-ambience-btn ${isPlaying ? 'ocean-ambience-active' : ''}`}
      title={isPlaying ? 'Silenciar paisaje sonoro del océano' : 'Activar sonido relajante del océano (Web Audio)'}
      aria-label="Alternar paisaje sonoro costero"
    >
      <div className="ocean-sound-bars" aria-hidden="true">
        <span className={`sound-bar bar-1 ${isPlaying ? 'sound-bar-animated' : ''}`} />
        <span className={`sound-bar bar-2 ${isPlaying ? 'sound-bar-animated' : ''}`} />
        <span className={`sound-bar bar-3 ${isPlaying ? 'sound-bar-animated' : ''}`} />
      </div>
      <span className="ocean-ambience-label">
        {isPlaying ? 'Oleaje Activo' : 'Sonido Costero'}
      </span>
    </button>
  );
};
