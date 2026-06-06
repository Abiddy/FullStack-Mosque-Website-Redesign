import { useEffect, useState } from "react";

type TypewriterTextProps = {
  text: string;
  speed?: number;
  className?: string;
};

const TypewriterText = ({
  text,
  speed = 50,
  className = "",
}: TypewriterTextProps) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypewriterText;
