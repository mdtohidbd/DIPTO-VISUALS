import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";

import { loadFull } from "tsparticles";
export default function Particle() {
  const [init, setInit] = useState(false);
  useEffect(() => {
    console.log("init");
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
  };

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          style={{
            zIndex: -1,

          }}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "grab",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 8,
                },
                grab: {
                  distance: 200,
                  links: {
                    opacity: 0.8,
                    color: "#f7655e",
                  }
                },
              },
            },
            particles: {
              color: {
                value: ["#ed2218", "#ff736e", "#e84e46"],
              },
              links: {
                color: "#f7655e",
                distance: 120,
                enable: true,
                opacity: 0.4,
                width: 1.5,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 1.5,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 350,
              },
              opacity: {
                value: { min: 0.1, max: 0.7 },
                animation: {
                  enable: true,
                  speed: 1,
                  minimumValue: 0.1,
                  sync: false
                }
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 6 },
                animation: {
                  enable: true,
                  speed: 2,
                  minimumValue: 0.5,
                  sync: false
                }
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </>
  );
}