import "../css/common.css";
import Player from '@vimeo/player';
var throttle = require('lodash.throttle');

const temporaryKey = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const onPlay = function (e) {
    const strigifyData = JSON.stringify(e);
    localStorage.setItem(temporaryKey, strigifyData);
};

player.on('timeupdate', throttle(onPlay, 1000));

function resumePlaybackEl() {
    if (JSON.parse(localStorage.getItem(temporaryKey)) === null) {
        return;
    }
    const paused = JSON.parse(localStorage.getItem(temporaryKey))['seconds'];
    if (paused) {
        player
            .setCurrentTime(paused)
            .then(function (seconds) { })
            .catch(function (error) {
                switch (error.name) {
                    case 'Error':
                        break;
                    default:
                        break;
                }
            });
    }
}
resumePlaybackEl();