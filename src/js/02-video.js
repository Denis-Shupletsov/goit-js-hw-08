//* 1. Ознакомься с документацией библиотеки Vimeo плеера.
//* 2. Добавь библиотеку как зависимость проекта через npm.
//* 3. Инициализируй плеер в файле скрипта как это описано в секции pre - existing player, но учти что у тебя плеер добавлен как npm пакет, а не через CDN.
//* 4. Разбери документацию метода on() и начни отслеживать событие timeupdate - обновление времени воспроизведения.
//* 5. Сохраняй время воспроизведения в локальное хранилище.Пусть ключом для хранилища будет строка "videoplayer-current-time".
//* 6. При перезагрузке страницы воспользуйся методом setCurrentTime() для того чтобы возобновить воспроизведение с сохраненной позиции.
//* 7. Добавь в проект библиотеку lodash.throttle и сделай так, чтобы время воспроизведения обновлялось в хранилище не чаще чем раз в секунду.

import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const temporaryKey = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

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