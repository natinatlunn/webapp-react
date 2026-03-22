import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import "./ReproductorTrailer.css";

export default function ReproductorTrailer({
  mostrarModal,
  setMostrarModal,
  pelicula,
}) {
  const srcVideo = `https://www.youtube.com/embed/${pelicula.trailerId}`;

  const clipperStyle = {
    position: "relative",
    width: "100%",
    paddingBottom: "56.25%",
    height: 0,
    overflow: "hidden",
    backgroundColor: "#000",
    borderRadius: "0 0 12px 12px",
  };

  const iframeStyle = {
    position: "absolute",
    top: "-65px",
    left: 0,
    width: "100%",
    height: "calc(100% + 130px)",
    border: "0",
    filter: "contrast(1.08) brightness(1.05)",
    pointerEvents: "none",
  };

  return (
    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      size="lg"
      centered
      dialogClassName="modal-trailer-dialog"
      contentClassName="modal-trailer-content"
      keyboard={false}
    >
      <Modal.Header closeButton closeVariant="white" className="border-0 pb-0">
        <Modal.Title className="text-white fs-5">
          {pelicula.titulo} - Tráiler
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        className="p-0"
        style={{
          padding: 0,
          backgroundColor: "#000",
          overflow: "hidden",
        }}
      >
        <div style={clipperStyle}>
          {mostrarModal && (
            <MediaController
              style={{
                width: "100%",
                aspectRatio: "16/9",
              }}
            >
              <ReactPlayer
                slot="media"
                src={srcVideo}
                controls={false}
                playing
                style={iframeStyle}
                config={{
                  youtube: {
                    playerVars: {
                      vq: "hd1080",
                      video_quality: "hd1080",
                      suggestedQuality: "hd1080",
                      cc_load_policy: 0,
                      iv_load_policy: 3,
                      modestbranding: 1,
                      rel: 0,
                      showinfo: 0,
                    },
                  },
                }}
              ></ReactPlayer>
              <MediaControlBar>
                <MediaPlayButton />
                <MediaSeekBackwardButton seekOffset={10} />
                <MediaSeekForwardButton seekOffset={10} />
                <MediaTimeRange />
                <MediaTimeDisplay showDuration />
                <MediaMuteButton />
                <MediaVolumeRange />
                <MediaPlaybackRateButton />
                <MediaFullscreenButton />
              </MediaControlBar>
            </MediaController>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
