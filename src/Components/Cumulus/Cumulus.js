import React, { useEffect, useState } from 'react';
import { TweenLite, TweenMax, Linear } from 'gsap/TweenMax';
import './style.css';

TweenLite.defaultEase = Linear.easeNone;

const cloudBaseHeight = 50;
const cloudBaseWidth = 150;
const chuteMax = window.innerHeight - 10;
const deriveMax = window.innerWidth - 10;
const twoPi = Math.PI * 2;

function random(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min;
}

const Nuage = ({ nuageName }) => {
  return (
    <div>
      <div className="nuage" />
      <div className="surrimage">
        <div className="rimage">{nuageName}</div>
      </div>
    </div>
  );
};

const Cumulus = ({ nuageName, upload, handleSkyLanding }) => {
  // reference to the DOM node
  var cumulus = null;

  useEffect(() => {
    const xradius = random(1) < 0.35 ? random(deriveMax / 3, deriveMax / 2) : random(deriveMax / 6, deriveMax / 3);
    const yradius = random(1) < 0.35 ? random(chuteMax / 3, chuteMax / 2) : random(chuteMax / 6, chuteMax / 3);
    const xdecalage = deriveMax / 2 - cloudBaseWidth / 2;
    const ydecalage = chuteMax / 2 - cloudBaseHeight / 2;
    const xspeed = random(1) < 0.2 ? random(20, 50) : random(50, 150);
    const yspeed = random(1) < 0.2 ? random(20, 50) : random(50, 150);

    TweenLite.set(cumulus, {
      x: random(-twoPi, twoPi) + xdecalage,
      y: random(-twoPi, twoPi) + ydecalage,
    });
    TweenMax.to(cumulus, xspeed, {
      x: '+=' + twoPi,
      repeat: -1,
      modifiers: {
        x: function(x) {
          return Math.cos(x) * xradius + xdecalage;
        },
      },
    });

    TweenMax.to(cumulus, yspeed, {
      y: '+=' + twoPi,
      repeat: -1,
      modifiers: {
        y: function(y) {
          return Math.sin(y) * yradius + ydecalage;
        },
      },
    });
  }, [cumulus]);

  const [isArrived, arrive] = useState(false);

  useEffect(() => {
    if (isArrived) handleSkyLanding();
  }, [isArrived]);

  useEffect(() => {
    if (upload) {
      TweenMax.to(cumulus, random(0.01, 3), {
        y: -100,
        onComplete: () => {
          arrive(true);
        },
      });
    }
    return () => {};
  }, [upload]);

  return (
    <div ref={div => (cumulus = div)} className="cumulus">
      <Nuage nuageName={nuageName} />
    </div>
  );
};

export default Cumulus;
