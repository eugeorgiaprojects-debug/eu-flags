import {useState, useRef} from 'react';
import './home.css';

type Track = {
    id: string;
    name: string;
    url: string;
};

const musicFiles = [
    'Austria',
    'Belgium',
    'Bulgaria',
    'Croatia',
    'Cyprus',
    'Czechia',
    'Denmark',
    'Estonia',
    'European-union',
    'Finland',
    'France',
    'Germany',
    'Greece',
    'Hungary',
    'Ireland',
    'Italy',
    'Latvia',
    'Lithuania',
    'Luxembourg',
    'Malta',
    'Netherlands',
    'Poland',
    'Portugal',
    'Romania',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
];

const tracks: Track[] = musicFiles.map((fileName, index) => ({
    id: String(index + 1) + new Date() + Math.random(),
    name: fileName,
    url: `/assets/music/${fileName}.mp3`
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
                        {currentTrack === track.id ? '⏸ Stop' : '▶ Play'} {track.name}
                    </button>
                ))}
            </div>

            <audio ref={audioRef} onError={handleAudioError} controls style={{display: 'none'}}>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}