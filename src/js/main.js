$(function () {
    let header = $('header'),
        headerContent = $('.header .header-content'),
        lowHead = $('.lower-header'),
        upperHead = $('.upper-header'),
        hamburgerIcon = $('.hamburger-icon'),
        navLink = $('.lower-header .nav-item .nav-link'),
        menu = $('#menu');
    ///**********Dimentions********/
    let headerHeigh = headerContent.innerHeight();
    let lowHeadHeigh = lowHead.innerHeight();
    let upperHeadHeigh = upperHead.innerHeight();
    let menuWidth = menu.innerWidth();
    //************header**********/
    // function toggleStickyclass() {
    //     lowHead.toogleClass('sticky');
    // }
    ///***********nav*********/
    navLink.on('click', function () {
        $(this).parent().addClass('active').siblings().removeClass('active');

    })



    //***********menu********/
    menu.css("left", -menuWidth);
    function setTopMenu() {
        lowHead.hasClass('sticky') ? menu.css("margin-top", lowHeadHeigh) : menu.css("top", 0);
    }


    function checkWindow() {

        if (window.innerWidth <= 768) {


            $('#menu').multilevelpushmenu(
                {
                    container: $('#menu'),
                    fullCollapse: true,
                    collapsed: false,
                    mode: 'cover',
                    backText: 'Back',                                          // Text for 'Back' menu item.
                    backItemClass: 'backItemClass',                            // CSS class for back menu item.
                    backItemIcon: 'fa fa-angle-left',                         // FontAvesome icon used for back menu item.
                    groupIcon: '',

                }
            );


        }

    }
    function animateMinue() {
        menu.animate({
            left: `${menu.hasClass("show") ? 0 : - menuWidth}`
        },
            300
        )


    }
    hamburgerIcon.on('click', function () {
        $(this).find('.icon').toggleClass('fa-arrow-left  fa-bars');
        menu.toggleClass('show')
        animateMinue();
    })
    $(window).on('scroll', function () {
        if (menu.hasClass('show')) {
            hamburgerIcon.click();
        }

        if ($(this).scrollTop() > headerHeigh) {
            if (header.not('.sticky')) {
                header.addClass('sticky')
                upperHead.addClass('d-none');
                // setTopMenu()
            }
        } else {
            if (header.hasClass('sticky')) {
                header.removeClass('sticky');
                upperHead.removeClass('d-none');
                // setTopMenu();
            }

        }

    })



    checkWindow();


})