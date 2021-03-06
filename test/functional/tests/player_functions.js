define([], function () {

    return {

        loadStream: function (stream) {
            player.attachSource(stream.url);
        },

        getDuration: function () {
            return player.duration();
        },

        play: function () {
            player.play();
        },

        pause: function () {
            player.pause();
        },

        stop: function () {
            player.stop();
        },

        seek: function (pos, done) {
            var onSeeked = function () {
                player.off('playbackSeeked', onSeeked);
                done(true);
            };

            player.on('playbackSeeked', onSeeked, this);
            player.seek(pos);
        }
    };
});
