
soundPlayer = new Audio('src/music/file3.mp3');

(function () {
    $('.dashboard-nav__item').on('click', function (e) {
        var itemId;
        e.preventDefault();
        $('.dashboard-nav__item').removeClass('dashboard-nav__item--selected');
        $(this).addClass('dashboard-nav__item--selected');
        itemId = $(this).children().attr('href');
        $('.dashboard-content__panel').hide();
        $('.dashboard-content__panel[data-panel-id=' + itemId + ']').show();


        soundPlayer.currentTime = 0;
        soundPlayer.play();

        if($('.dashboard-content__panel[data-panel-id=' + itemId + ']').hasClass('cs404-container')) {
            // TODO: Ошибка должна сносить мозг, иначе это хуйня, а не ошибка
        } else {
            // soundPlayer.pause();
        }

        return console.log(itemId);
    });

    $('.dashboard-list__item').on('click', function (e) {
        var itemId;
        e.preventDefault();
        $('.dashboard-list__item').removeClass('dashboard-list__item--active');
        $(this).addClass('dashboard-list__item--active');
        itemId = $(this).attr('data-item-id');
        $('.dashboard-preview__panel').hide();
        $('.dashboard-preview__panel[data-panel-id=' + itemId + ']').show();
        return console.log(itemId);
    });

}).call(this);

