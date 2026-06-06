import { useEffect, useRef } from "react";
import Hls, { type HlsConfig } from "hls.js";

const MUX_HLS_URL =
  "https://stream.mux.com/02gzwandixH4J534bd00JsCvlFfw6ha101WQ00C9b3sGibM.m3u8";

const HLS_CONFIG: Partial<HlsConfig> = {
  capLevelToPlayerSize: false,
  maxMaxBufferLength: 30,
  maxBufferLength: 20,
  maxBufferSize: 60 * 1000 * 1000,
};

function setHighestQuality(hls: Hls) {
  const { levels } = hls;
  if (levels.length > 0) {
    hls.currentLevel = levels.length - 1;
  }
}

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.play().catch(() => {});
    };

    const nativeHls =
      video.canPlayType("application/vnd.apple.mpegurl") !== "";

    if (nativeHls) {
      video.src = MUX_HLS_URL;
      video.addEventListener("loadedmetadata", play);
      return () => video.removeEventListener("loadedmetadata", play);
    }

    if (!Hls.isSupported()) return;

    const hls = new Hls(HLS_CONFIG);
    hls.loadSource(MUX_HLS_URL);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      setHighestQuality(hls);
      play();
    });

    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (!data.fatal) return;
      switch (data.type) {
        case Hls.ErrorTypes.NETWORK_ERROR:
          hls.startLoad();
          break;
        case Hls.ErrorTypes.MEDIA_ERROR:
          hls.recoverMediaError();
          break;
        default:
          hls.destroy();
          break;
      }
    });

    return () => {
      hls.destroy();
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};

export default VideoBackground;
