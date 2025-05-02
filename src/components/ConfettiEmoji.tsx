
import React, { useEffect, useState } from 'react';

interface EmojiProps {
  emoji: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const Emoji: React.FC<EmojiProps> = ({ emoji, x, y, size, delay, duration }) => {
  return (
    <div
      className="absolute animate-fade-in"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        fontSize: `${size}px`,
        opacity: 0,
        animation: `fade-and-float ${duration}ms ease-out ${delay}ms forwards`
      }}
    >
      {emoji}
    </div>
  );
};

const ConfettiEmoji = () => {
  const [emojis, setEmojis] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    const confettiEmojis = ['🎉', '🎊', '✨', '🚀', '💡', '🔥', '⚡️', '🏆'];
    const newEmojis = [];
    
    for (let i = 0; i < 15; i++) {
      const emoji = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.floor(Math.random() * 16) + 14;
      const delay = Math.random() * 1000;
      const duration = Math.random() * 1000 + 2000;
      
      newEmojis.push(
        <Emoji
          key={i}
          emoji={emoji}
          x={x}
          y={y}
          size={size}
          delay={delay}
          duration={duration}
        />
      );
    }
    
    setEmojis(newEmojis);
  }, []);
  
  return (
    <div className="relative w-36 h-36 overflow-hidden">
      {emojis}
    </div>
  );
};

export default ConfettiEmoji;
