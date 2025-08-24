import React, { useEffect, useState } from 'react'

const Loader = ({ 
  size = "large", 
  centered = true, 
  text = "LOADING...", 
  fullscreen = true 
}) => {
  const [particles, setParticles] = useState([])
  const [dataStreams, setDataStreams] = useState([])
  const [mounted, setMounted] = useState(false)

  // Generate particles and data streams
  useEffect(() => {
    setMounted(true)
    const particleCount = 16
    const streamCount = 8
    
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      delay: i * 0.08,
      angle: (i * (360 / particleCount)) % 360,
      speed: 0.8 + (i % 3) * 0.4,
    }))
    
    const newStreams = Array.from({ length: streamCount }, (_, i) => ({
      id: i,
      delay: i * 0.3,
      position: i * 12.5,
      height: 60 + Math.random() * 40,
    }))
    
    setParticles(newParticles)
    setDataStreams(newStreams)
  }, [])

  if (!mounted) return null

  // Enhanced size classes
  const sizeClasses = {
    small: { main: "w-12 h-12", orbit: "w-20 h-20", particles: "w-1 h-1" },
    medium: { main: "w-16 h-16", orbit: "w-28 h-28", particles: "w-1.5 h-1.5" },
    large: { main: "w-24 h-24", orbit: "w-40 h-40", particles: "w-2 h-2" },
    xl: { main: "w-32 h-32", orbit: "w-52 h-52", particles: "w-2.5 h-2.5" },
  }

  const currentSize = sizeClasses[size] || sizeClasses.large

  const containerClasses = centered
    ? "flex flex-col items-center justify-center"
    : "inline-flex flex-col items-center"

  return (
    <div
      role="status"
      className={`${containerClasses} 
      ${fullscreen ? `fixed inset-0 w-screen h-screen z-50 bg-primary-50 dark:bg-secondary-900` : ""} 
      text-secondary-800 dark:text-white
    `}
    style={{
      background: fullscreen
        ? undefined // Use Tailwind classes for bg
        : 'transparent'
    }}
  >
    {/* Animated Grid Background */}
    <div className="absolute inset-0 grid-background opacity-20 pointer-events-none">
      <div className="grid grid-cols-12 grid-rows-12 w-full h-full">
        {[...Array(144)].map((_, i) => (
          <div 
            key={i}
            className="border border-secondary-800/10 dark:border-white/10 animate-pulse grid-cell"
            style={{
              animationDelay: `${(i * 0.02)}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>
    </div>

    {/* Lightning Bolts */}
    <div className="absolute inset-0 lightning-container">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute lightning-bolt"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
            animationDelay: `${i * 0.8}s`
          }}
        >
          <div className="w-0.5 h-16 bg-gradient-to-b from-secondary-800 dark:from-white via-secondary-600 dark:via-blue-300 to-transparent transform rotate-12"></div>
        </div>
      ))}
    </div>

    {/* Data Stream Tubes */}
    <div className="absolute inset-0 data-tubes">
      {dataStreams.map((stream) => (
        <div
          key={stream.id}
          className="absolute data-tube"
          style={{
            left: `${stream.position}%`,
            height: `${stream.height}%`,
            top: '10%',
            animationDelay: `${stream.delay}s`
          }}
        >
          <div className="w-1 h-full bg-gradient-to-b from-transparent via-secondary-800/60 dark:via-blue-300/60 to-transparent rounded-full"></div>
          <div className="absolute top-0 w-1 h-4 bg-secondary-800 dark:bg-blue-300 rounded-full data-pulse"></div>
        </div>
      ))}
    </div>

    {/* Scan Line Effects */}
    <div className="absolute inset-0 scan-effects pointer-events-none">
      <div className="scan-line-horizontal"></div>
      <div className="scan-line-vertical"></div>
    </div>

    {/* Main loader container - should be centered */}
    <div className="relative loader-container">
      {/* Hexagonal Outer Ring */}
      {/* Energy Rings */}
      {/* Orbital Particle System */}
      <div className={`absolute ${currentSize.orbit} -inset-4 particle-system`}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-full h-full particle-orbit"
            style={{ 
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.speed * 3}s`,
              transform: `rotate(${particle.angle}deg)`
            }}
          >
            <div 
              className={`${currentSize.particles} rounded-full particle-glow`}
              style={{ 
                background: `linear-gradient(45deg, #1f2937, #374151)`,
                boxShadow: `0 0 15px rgba(31,41,55,0.6), 0 0 30px rgba(55,65,81,0.3)`
              }}
              // Add a dark mode override
              data-dark={true}
            >
              <div className="w-full h-full bg-secondary-800 dark:bg-blue-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Morphing Geometric Core */}
      <div className={`relative ${currentSize.main} morph-core`}>
        {/* Intense Background Glow */}
        <div 
          className="absolute inset-0 rounded-full core-glow blur-xl"
          style={{ 
            background: `radial-gradient(circle, rgba(31,41,55,0.5) 0%, transparent 70%)`
          }}
        />
        {/* Advanced SVG Spinner */}
        <svg
          className={`${currentSize.main} geometric-spinner relative z-10`}
          viewBox="0 0 120 120"
          fill="none"
        >
          <defs>
            <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="30%" stopColor="#374151" />
              <stop offset="70%" stopColor="#4b5563" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
            <linearGradient id="coreGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0e7ff" />
              <stop offset="30%" stopColor="#a5b4fc" />
              <stop offset="70%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#e0e7ff" />
            </linearGradient>
            <filter id="shadowGlow">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#1f2937" floodOpacity="0.6"/>
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d="M60,15 L95,35 L105,60 L95,85 L60,105 L25,85 L15,60 L25,35 Z"
            fill="url(#coreGradient)"
            filter="url(#shadowGlow)"
            className="morph-path dark:hidden"
          />
          <path
            d="M60,15 L95,35 L105,60 L95,85 L60,105 L25,85 L15,60 L25,35 Z"
            fill="url(#coreGradientDark)"
            filter="url(#shadowGlow)"
            className="morph-path hidden dark:block"
          />
          <circle cx="60" cy="60" r="20" fill="none" 
                 stroke="#4b5563" strokeWidth="2" 
                 strokeDasharray="8 4"
                 className="inner-ring dark:hidden" />
          <circle cx="60" cy="60" r="20" fill="none" 
                 stroke="#a5b4fc" strokeWidth="2" 
                 strokeDasharray="8 4"
                 className="inner-ring hidden dark:block" />
          <circle cx="60" cy="60" r="12" fill="#1f2937" 
                 className="center-core dark:hidden" />
          <circle cx="60" cy="60" r="12" fill="#e0e7ff" 
                 className="center-core hidden dark:block" />
          <circle cx="60" cy="60" r="6" fill="#374151" 
                 className="inner-dot dark:hidden" />
          <circle cx="60" cy="60" r="6" fill="#60a5fa" 
                 className="inner-dot hidden dark:block" />
        </svg>
        {/* Plasma Energy Waves */}
        <div className="absolute inset-0 plasma-waves">
          <div className="plasma-wave-1 dark:bg-blue-300/40" 
               style={{ background: `radial-gradient(circle, rgba(31,41,55,0.4) 0%, transparent 60%)` }} />
          <div className="plasma-wave-2 dark:bg-blue-300/30" 
               style={{ background: `radial-gradient(circle, rgba(55,65,81,0.3) 0%, transparent 60%)` }} />
          <div className="plasma-wave-3 dark:bg-blue-300/20" 
               style={{ background: `radial-gradient(circle, rgba(75,85,99,0.2) 0%, transparent 60%)` }} />
        </div>
      </div>

      {/* Quantum Field Lines */}
      <div className="absolute inset-0 quantum-field">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute quantum-line"
            style={{
              transform: `rotate(${i * 30}deg)`,
              transformOrigin: 'center'
            }}
          >
            <div className="w-px h-20 bg-gradient-to-t from-transparent via-secondary-800/30 dark:via-blue-300/30 to-transparent mx-auto field-line"></div>
          </div>
        ))}
      </div>
    </div>

    {/* Holographic HUD Text Display */}
    {text && (
      <div className="mt-24 mb-8 text-center hud-display">
        {/* Main Text with Gradient */}
        <div
          className="text-2xl font-bold main-text"
          style={{
            background: 
              'linear-gradient(45deg, #1f2937, #4b5563, #374151)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 10px rgba(31, 41, 55, 0.5))'
          }}
        >
          <span className="dark:hidden">{text}</span>
          <span
            className="hidden dark:inline"
            style={{
              background: 'linear-gradient(45deg, #e0e7ff, #a5b4fc, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 10px rgba(96, 165, 250, 0.6))'
            }}
          >
            {text}
          </span>
        </div>
        {/* Glitch Overlay Effects */}
        <div
          className="absolute inset-0 text-2xl font-bold glitch-layer-1 dark:text-blue-300"
          style={{ color: '#374151' }}
        >
          <span className="dark:hidden">{text}</span>
          <span className="hidden dark:inline">{text}</span>
        </div>
        <div
          className="absolute inset-0 text-2xl font-bold glitch-layer-2 dark:text-blue-400"
          style={{ color: '#4b5563' }}
        >
          <span className="dark:hidden">{text}</span>
          <span className="hidden dark:inline">{text}</span>
        </div>
      </div>
    )}

    <style jsx>{`
      .loader-bg {
        animation: bg-pulse 8s ease-in-out infinite;
      }
      
      .grid-cell {
        animation: grid-flicker 3s ease-in-out infinite;
      }
      
      .lightning-bolt {
        animation: lightning-strike 2s ease-in-out infinite;
      }
      
      .data-tube {
        animation: tube-glow 2s ease-in-out infinite;
      }
      
      .data-pulse {
        animation: pulse-travel 3s linear infinite;
      }
      
      .loader-container {
        animation: float-complex 4s ease-in-out infinite;
      }
      
      .hexagon-ring {
        animation: hex-rotate 6s linear infinite;
      }
      
      .ring-outer {
        animation: ring-spin-slow 5s linear infinite;
      }
      
      .ring-middle {
        animation: ring-spin-medium 3s linear infinite reverse;
      }
      
      .ring-inner {
        animation: ring-spin-fast 1.5s linear infinite;
      }
      
      .particle-orbit {
        animation: orbital-dance 3s linear infinite;
      }
      
      .particle-glow {
        position: absolute;
        top: -4px;
        right: -4px;
        animation: particle-pulse 2s ease-in-out infinite;
      }
      
      .morph-core {
        animation: core-morph 3s ease-in-out infinite;
      }
      
      .core-glow {
        animation: intense-glow 2s ease-in-out infinite;
      }
      
      .geometric-spinner {
        animation: geometric-wobble 4s ease-in-out infinite;
      }
      
      .morph-path {
        animation: path-morph 5s ease-in-out infinite;
      }
      
      .inner-ring {
        animation: inner-spin 2s linear infinite;
        transform-origin: center;
      }
      
      .center-core {
        animation: core-pulse 1.5s ease-in-out infinite;
      }
      
      .inner-dot {
        animation: dot-flicker 1s ease-in-out infinite;
      }
      
      .plasma-wave-1, .plasma-wave-2, .plasma-wave-3 {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        opacity: 0;
      }
      
      .plasma-wave-1 {
        animation: plasma-expand 4s ease-out infinite;
      }
      
      .plasma-wave-2 {
        animation: plasma-expand 4s ease-out infinite 1.3s;
      }
      
      .plasma-wave-3 {
        animation: plasma-expand 4s ease-out infinite 2.6s;
      }
      
      .quantum-field {
        animation: field-rotation 8s linear infinite;
      }
      
      .field-line {
        animation: field-pulse 2s ease-in-out infinite;
      }
      
      .hud-display {
        animation: hud-flicker 3s ease-in-out infinite;
      }
      
      .main-text {
        animation: text-shimmer 2s ease-in-out infinite;
      }
      
      .glitch-layer-1 {
        animation: glitch-effect-1 0.4s ease-in-out infinite;
      }
      
      .glitch-layer-2 {
        animation: glitch-effect-2 0.6s ease-in-out infinite;
      }
      
      .system-status {
        animation: status-boot 3s ease-in-out infinite;
      }
      
      .status-bar {
        animation: bar-fill 2s ease-in-out infinite;
      }
      
      .binary-stream {
        animation: binary-scroll 1s linear infinite;
      }
      
      .scan-line-horizontal, .scan-line-vertical {
        position: absolute;
        background: linear-gradient(90deg, transparent, rgba(31, 41, 55, 0.2), transparent);
      }
      
      .scan-line-horizontal {
        width: 100%;
        height: 1px;
        animation: scan-horizontal 4s linear infinite;
      }
      
      .scan-line-vertical {
        width: 1px;
        height: 100%;
        background: linear-gradient(0deg, transparent, rgba(31, 41, 55, 0.2), transparent);
        animation: scan-vertical 3s linear infinite;
      }

      @keyframes bg-pulse {
        0%, 100% { filter: brightness(1) hue-rotate(0deg); }
        50% { filter: brightness(1.1) hue-rotate(10deg); }
      }
      
      @keyframes grid-flicker {
        0%, 100% { opacity: 0.1; }
        50% { opacity: 0.3; }
      }
      
      @keyframes lightning-strike {
        0%, 90%, 100% { opacity: 0; transform: scaleY(1); }
        5%, 10% { opacity: 1; transform: scaleY(1.5); }
      }
      
      @keyframes tube-glow {
        0%, 100% { opacity: 0.6; filter: brightness(1); }
        50% { opacity: 1; filter: brightness(1.3); }
      }
      
      @keyframes pulse-travel {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(200px); opacity: 0; }
      }
      
      @keyframes float-complex {
        0%, 100% { transform: translateY(0px) rotateX(0deg); }
        33% { transform: translateY(-8px) rotateX(2deg); }
        66% { transform: translateY(4px) rotateX(-2deg); }
      }
      
      @keyframes hex-rotate {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.05); }
        100% { transform: rotate(360deg) scale(1); }
      }
      
      @keyframes ring-spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      @keyframes ring-spin-medium {
        from { transform: rotate(0deg); }
        to { transform: rotate(-360deg); }
      }
      
      @keyframes ring-spin-fast {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      @keyframes orbital-dance {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      @keyframes particle-pulse {
        0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
        50% { transform: scale(1.8) rotate(180deg); opacity: 1; }
      }
      
      @keyframes core-morph {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.15) rotate(90deg); }
        50% { transform: scale(0.85) rotate(180deg); }
        75% { transform: scale(1.08) rotate(270deg); }
      }
      
      @keyframes intense-glow {
        0%, 100% { opacity: 0.4; transform: scale(1); }
        50% { opacity: 0.9; transform: scale(1.3); }
      }
      
      @keyframes geometric-wobble {
        0% { transform: rotate(0deg) scale(1); }
        25% { transform: rotate(90deg) scale(1.1); }
        50% { transform: rotate(180deg) scale(0.9); }
        75% { transform: rotate(270deg) scale(1.05); }
        100% { transform: rotate(360deg) scale(1); }
      }
      
      @keyframes path-morph {
        0%, 100% { d: path("M60,15 L95,35 L105,60 L95,85 L60,105 L25,85 L15,60 L25,35 Z"); }
        25% { d: path("M60,10 L100,30 L110,60 L100,90 L60,110 L20,90 L10,60 L20,30 Z"); }
        50% { d: path("M60,20 L90,40 L100,60 L90,80 L60,100 L30,80 L20,60 L30,40 Z"); }
        75% { d: path("M60,12 L98,32 L108,60 L98,88 L60,108 L22,88 L12,60 L22,32 Z"); }
      }
      
      @keyframes inner-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes core-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.4); opacity: 0.8; }
      }
      
      @keyframes dot-flicker {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      
      @keyframes plasma-expand {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(4); opacity: 0; }
      }
      
      @keyframes field-rotation {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes field-pulse {
        0%, 100% { opacity: 0.3; transform: scaleY(1); }
        50% { opacity: 1; transform: scaleY(1.5); }
      }
      
      @keyframes hud-flicker {
        0%, 100% { opacity: 1; filter: brightness(1); }
        25% { opacity: 0.9; filter: brightness(1.2); }
        50% { opacity: 0.95; filter: brightness(0.9); }
        75% { opacity: 1.05; filter: brightness(1.1); }
      }
      
      @keyframes text-shimmer {
        0%, 100% { filter: brightness(1) saturate(1); }
        50% { filter: brightness(1.3) saturate(1.2); }
      }
      
      @keyframes glitch-effect-1 {
        0%, 100% { transform: translate(0); opacity: 0.1; }
        10% { transform: translate(-2px, 1px); opacity: 0.3; }
        20% { transform: translate(1px, -2px); opacity: 0.2; }
        30% { transform: translate(0); opacity: 0.1; }
      }
      
      @keyframes glitch-effect-2 {
        0%, 100% { transform: translate(0); opacity: 0.05; }
        15% { transform: translate(1px, 1px); opacity: 0.2; }
        35% { transform: translate(-1px, -1px); opacity: 0.15; }
        55% { transform: translate(2px, -1px); opacity: 0.1; }
      }
      
      @keyframes status-boot {
        0%, 100% { opacity: 0.7; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.03); }
      }
      
      @keyframes bar-fill {
        0% { transform: scaleX(0.2); }
        100% { transform: scaleX(1); }
      }
      
      @keyframes binary-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-20px); }
      }
      
      @keyframes scan-horizontal {
        0% { top: 0%; opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { top: 100%; opacity: 0; }
      }
      
      @keyframes scan-vertical {
        0% { left: 0%; opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { left: 100%; opacity: 0; }
      }
    `}</style>
  </div>
  )
}

export default Loader