jQuery(function ($) {
    var $button = $('.mobile-header-nav-toggle');
    var $menu = $('.mobile-header-menu-container');

    function showMenu(e) {
        e.preventDefault();
        $menu.prop('hidden', false);
        $button.addClass('active');
    }
    function hideMenu(e) {
        e.preventDefault();
        $menu.prop('hidden', true);
        $button.removeClass('active');
    }
    function toggleMenu(e) {
        e.preventDefault();
        if ($menu.prop('hidden')) {
            showMenu(e);
        } else {
            hideMenu(e);
        }
    }

    $button.on('click', toggleMenu);
    $menu.on('click', hideMenu);
    $menu.children().on('click', function (e) { e.stopPropagation() })
});
