import {useState, useRef} from 'react';
import './home.css';
import {musicFiles} from "./home.constants";
import type {Track} from "./home.type";

const tracks: Track[] = musicFiles.map((fileName, index) => ({
    id: String(index + 1) + new Date() + Math.random(),
    name: fileName.fileName,
    url: `/assets/music/${fileName.fileName}.mp3`,
    image: `/assets/images/flags/${fileName.image}.png`
}));

export function Home() {
    const [currentTrack, setCurrentTrack] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlayTrack = (trackId: string, trackUrl: string) => {
        const audio = audioRef.current;
        if (!audio) return;

        if (currentTrack === trackId) {
            if (!audio.paused) {
                audio.pause();
                setCurrentTrack(null);
            } else {
                audio.play();
                setCurrentTrack(trackId);
            }
            return;
        }

        audio.src = trackUrl;
        audio
            .play()
            .then(() => {
                setCurrentTrack(trackId);
            })
            .catch((err) => {
                console.error('Error playing audio:', err);
                setCurrentTrack(null);
            });
    };


    const handleAudioError = () => {
        const audio = audioRef.current;
        if (!audio) return;
        console.error('Audio error:', audio.error);
    };

    return (
        <div className="music-player">
            <div className="buttons-container">
                {tracks.map((track) => (
                    <button
                        key={track.id}
                        onClick={() => handlePlayTrack(track.id, track.url)}
                        className={`music-button ${currentTrack === track.id ? 'active' : ''}`}
                    >
                        <img src={track.image} alt={track.name}/>
                        <span>
                        {track?.name?.replace('-', ' ')}
                        </span>
                    </button>
                ))}
            </div>

            <audio ref={audioRef} onError={handleAudioError} controls style={{display: 'none'}}>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}