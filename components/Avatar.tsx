import React from 'react';

const Avatar = ({ config, className = '' }) => {
  const { shape, eyes, mouth, color } = config;

  const shapeClasses = {
    circle: 'rounded-full',
    squircle: 'rounded-[2rem]', // A squircle is a rounded square
    bean: 'rounded-[50%_50%_50%_50%/60%_60%_40%_40%]', // A bean-like shape
    diamond: '[clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]',
    ghost: 'rounded-t-full'
  };

  const Eyes = () => {
    const eyeBaseStyle = "absolute top-[35%] w-1/5 h-1/5";
    const leftEyeStyle = `${eyeBaseStyle} left-[20%]`;
    const rightEyeStyle = `${eyeBaseStyle} right-[20%]`;

    switch (eyes) {
      case 'happy':
        return (
          <>
            <div className={leftEyeStyle}>
              <svg viewBox="0 0 20 10"><path d="M 0 10 C 5 0, 15 0, 20 10" stroke="#111827" strokeWidth="3" fill="none" strokeLinecap="round"/></svg>
            </div>
            <div className={rightEyeStyle}>
              <svg viewBox="0 0 20 10"><path d="M 0 10 C 5 0, 15 0, 20 10" stroke="#111827" strokeWidth="3" fill="none" strokeLinecap="round"/></svg>
            </div>
          </>
        );
      case 'wink':
        return (
          <>
            <div className={leftEyeStyle}>
               <svg viewBox="0 0 20 10" className="mt-1"><path d="M 0 5 H 20" stroke="#111827" strokeWidth="3" fill="none" strokeLinecap="round"/></svg>
            </div>
            <div className={`${rightEyeStyle} bg-gray-900 rounded-full`}></div>
          </>
        );
       case 'sad':
        return (
            <>
                <div className={leftEyeStyle}>
                    <svg viewBox="0 0 20 10"><path d="M 0 0 C 5 10, 15 10, 20 0" stroke="#111827" strokeWidth="3" fill="none" strokeLinecap="round"/></svg>
                </div>
                <div className={rightEyeStyle}>
                    <svg viewBox="0 0 20 10"><path d="M 0 0 C 5 10, 15 10, 20 0" stroke="#111827" strokeWidth="3" fill="none" strokeLinecap="round"/></svg>
                </div>
            </>
        );
      case 'surprised':
        return (
            <>
                <div className={`${leftEyeStyle} bg-gray-900 rounded-full w-[22%] h-[22%]`}></div>
                <div className={`${rightEyeStyle} bg-gray-900 rounded-full w-[22%] h-[22%]`}></div>
            </>
        );
      case 'dizzy':
        return (
            <>
                <div className={leftEyeStyle}>
                    <svg viewBox="0 0 20 20"><path d="M 2 2 L 18 18 M 18 2 L 2 18" stroke="#111827" strokeWidth="3" fill="none" strokeLinecap="round"/></svg>
                </div>
                <div className={rightEyeStyle}>
                    <svg viewBox="0 0 20 20"><path d="M 2 2 L 18 18 M 18 2 L 2 18" stroke="#111827" strokeWidth="3" fill="none" strokeLinecap="round"/></svg>
                </div>
            </>
        );
      case 'normal':
      default:
        return (
          <>
            <div className={`${leftEyeStyle} bg-gray-900 rounded-full`}></div>
            <div className={`${rightEyeStyle} bg-gray-900 rounded-full`}></div>
          </>
        );
    }
  };

  const Mouth = () => {
    const mouthStyle = "absolute bottom-[25%] w-2/5 h-1/4 left-[30%]";
    let path = "";
    switch (mouth) {
        case 'laugh':
            path = "M 0 0 C 10 20, 30 20, 40 0 Z";
            return (
              <div className={mouthStyle}>
                <svg viewBox="0 0 40 20"><path d={path} stroke="#111827" strokeWidth="3" fill="#111827" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            );
        case 'sad-open':
            path = "M 0 15 C 10 0, 30 0, 40 15 Z";
             return (
                <div className={mouthStyle}>
                    <svg viewBox="0 0 40 20"><path d={path} stroke="#111827" strokeWidth="3" fill="#111827" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
            );
        case 'surprised':
            return (
              <div className={`${mouthStyle} w-1/4 h-1/4 left-[37.5%] bottom-[22%]`}>
                <div className="w-full h-full rounded-full border-[3px] border-gray-900 bg-transparent"></div>
              </div>
            );
        case 'neutral':
            path = "M 0 10 H 40";
            break;
        case 'frown':
            path = "M 0 15 C 10 5, 30 5, 40 15";
            break;
        case 'smile':
        default:
            path = "M 0 5 C 10 15, 30 15, 40 5";
            break;
    }
    return (
      <div className={mouthStyle}>
        <svg viewBox="0 0 40 20"><path d={path} stroke="#111827" strokeWidth="3" fill="none" strokeLinecap="round"/></svg>
      </div>
    );
  };

  return (
    <div className={`relative aspect-square ${className}`}>
      <div className={`w-full h-full ${color} ${shapeClasses[shape]} transition-all duration-300 ease-in-out shadow-lg`}>
        <Eyes />
        <Mouth />
      </div>
    </div>
  );
};

export default Avatar;