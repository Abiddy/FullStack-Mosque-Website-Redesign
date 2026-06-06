const GradientDefs = () => (
  <svg
    className="pointer-events-none absolute h-0 w-0 overflow-hidden"
    aria-hidden
  >
    <defs>
      <radialGradient
        id="logo-gradient"
        cx="50%"
        cy="50%"
        r="50%"
      >
        <stop offset="0%" stopColor="#368CFB" />
        <stop offset="50%" stopColor="#5CAEFE" />
        <stop offset="100%" stopColor="#FFEB85" />
      </radialGradient>
      <radialGradient
        id="headline-gradient"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(35.22 -11.4 433.41 134.85 369.8 114)"
      >
        <stop offset="0%" stopColor="#368CFB" />
        <stop offset="30%" stopColor="#5CAEFE" />
        <stop offset="47.5%" stopColor="#85BDE0" />
        <stop offset="65%" stopColor="#AECDC2" />
        <stop offset="82.5%" stopColor="#D6DCA3" />
        <stop offset="100%" stopColor="#FFEB85" />
      </radialGradient>
    </defs>
  </svg>
);

export default GradientDefs;
