const player = new VideoPlayer({
    videoUrl: './video/BananaSong.mp4',
    videoContainer: 'body',
    volume: 0.5,
});

player.init();

console.log(player);