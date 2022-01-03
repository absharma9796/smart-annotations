import { PauseCircleFilledRounded, PlayArrowRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import logger from '@utils/logger';
import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from "wavesurfer.js";

type AudioGraphProps = {
    audioUrl: string;
}

const AudioGraph = ({
    audioUrl,
}) => {

    const waveformRef = useRef();
    const wavesurfer = useRef(null);
    const [isPlaying, setisPlaying] = useState(false);

    useEffect(() => {
        logger.info('AudioGraph: initializing wavesurfer', audioUrl);
        if(waveformRef.current) {
            if(wavesurfer.current) wavesurfer.current.destroy();
            wavesurfer.current = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: 'rgba(245,158,11,0.5)',
                progressColor: 'rgba(245,158,11,1)'
            });
            wavesurfer.current.load(audioUrl);
            wavesurfer.current.on('play', () => {
                setisPlaying(true);
            });
            wavesurfer.current.on('pause', () => {
                setisPlaying(false);
            })
            wavesurfer.current.on('ready', function () {
                wavesurfer.current.play();
            });
        }
        return () => {
            logger.info('AudioGraph: destroying wavesurfer');
            wavesurfer.current.destroy();
        }
    }, [audioUrl]);

    return (
        <div className='flex flex-col w-full'>
            <div ref={waveformRef}>
            
            </div>
            <hr />
            <div className="audio-controls p-4">
                <Button 
                    className="capitalize"
                    color="warning"
                    startIcon={isPlaying ? <PauseCircleFilledRounded /> : <PlayArrowRounded />}
                    onClick={() => wavesurfer.current.playPause()}
                >
                    {isPlaying ? 'Pause Audio' : 'Play Audio'}
                </Button>
            </div>
        </div>
    )
}

export default AudioGraph;
