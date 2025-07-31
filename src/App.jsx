import React, { useState, useEffect } from "react";
import pagliImg from "./assets/img/pagli.jpg";

const App = () => {
  const [showSecret, setShowSecret] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  useEffect(() => {
    let audio;
    if (audioStarted) {
      audio = new Audio("/bg.mp3");
      audio.loop = true;
      audio.volume = 0.3;
      audio.play().catch((err) => {
        console.warn("Autoplay blocked:", err);
      });
    }
    return () => {
      if (audio) audio.pause();
    };
  }, [audioStarted]);

  const handleStartAudio = () => {
    setAudioStarted(true);
  };

  const handleSecretClick = () => {
    setLoading(true);
    setTimeout(() => {
      setShowSecret(true);
      setLoading(false);
    }, 10000); // 30 seconds
  };

  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: 80 + Math.random() * 20,
    duration: 5 + Math.random() * 5,
    delay: Math.random() * 5,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    size: 20 + Math.random() * 20,
  }));

  return (
    <>
      <div className="heart-container">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.left}vw`,
              top: `${heart.top}vh`,
              animationDuration: `${heart.duration}s`,
              animationDelay: `${heart.delay}s`,
              backgroundColor: heart.color,
              width: `${heart.size}px`,
              height: `${heart.size}px`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-pink-700 mb-4">Pagli, Tu Mere Liye Special Hai ❤️</h1>

        <p className="text-gray-700 max-w-md mb-6">Ye website tere liye banaya hai. Tu besti toh hai hi, lekin usse bhi zyada hai.</p>

        {!showSecret && !loading && (
          <button onClick={handleSecretClick} className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full shadow-md transition">
            Pagli, Dabaa Na Zara 💌
          </button>
        )}

        {loading && (
          <div className="flex items-center justify-center gap-2 mt-4 text-pink-600 font-semibold">
            <svg className="animate-spin h-5 w-5 text-pink-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            Pagli ke liye surprise tayaar ho raha hai... 💖
          </div>
        )}

        {showSecret && (
          <div className="bg-white p-4 mt-6 rounded-lg shadow-lg max-w-sm">
            <p className="text-pink-600 font-semibold">Best friend ke naam pe hi sahi, tu dil ke bohot kareeb hai... </p>
          </div>
        )}

        <div className="mt-6">
          {!audioStarted && (
            <button onClick={handleStartAudio} className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow-md transition">
              🎵 Play Music
            </button>
          )}
        </div>

        <div className="mt-8">
          <img src={pagliImg} alt="Pagli" className="w-40 h-40 rounded-full object-cover border-4 border-pink-300 shadow-lg" />
          <p className="mt-2 text-sm text-gray-500">~ Tumhara Paglu 🤗</p>
        </div>
      </div>
    </>
  );
};

export default App;
