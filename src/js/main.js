$(function () {
    let header = $('header'),
        headerContent = $('.header .header-content'),
        lowHead = $('.lower-header'),
        upperHead = $('.upper-header'),
        hamburgerIcon = $('.hamburger-icon'),
        navLink = $('.lower-header .nav-item .nav-link'),
        // searchInput = $('.search-area .search'),
        searchIcon = $('.link-search')
    menuLink = $('#menu .nav-list a'),
        menu = $('#menu');
    ///**********Dimentions********/
    let headerHeigh, lowHeadHeigh, upperHeadHeigh, menuWidth;

    function calcDimetions() {
        headerHeigh = headerContent.innerHeight(),
            lowHeadHeigh = lowHead.innerHeight(),
            upperHeadHeigh = upperHead.innerHeight(),
            menuWidth = menu.innerWidth();
    }

    //************header**********/
    //************search icon**********/
    //
    function controlSearchicon(icon) {
        icon.hasClass('fa-arrow-left') ? searchIcon.fadeOut(100) : searchIcon.fadeIn(100);
    }


    ///***********nav-minue-active*********/
    navLink.on('click', function () {
        $(this).parent().addClass('active').siblings().removeClass('active');
    });

    menuLink.on('click', function () {
        $(this).parent().addClass('active').siblings().removeClass('active');

    })



    //***********menu********/
    menu.css("left", -menuWidth);
    function initiaizeMenu() {
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
    function setTopMenu() {
        //lowHead.hasClass('sticky') ? menu.css("top", headerHeigh) : menu.css("top", 0);
        menu.css("top", headerHeigh)
    }

    function animateMinue() {

        menu.animate({
            left: `${menu.hasClass("show") ? 0 : - menuWidth}`
        },
            200
        )



    }

    ///////////////////////////////
    hamburgerIcon.on('click', function () {

        $(this).find('.icon').toggleClass('fa-arrow-left  fa-bars');
        menu.toggleClass('show')
        animateMinue();
        controlSearchicon($(this).find('.icon'));
    })
    $(window).on('scroll', function () {
        if (menu.hasClass('show')) {
            hamburgerIcon.click();
        }

        if ($(this).scrollTop() > headerHeigh) {
            if (header.not('.sticky')) {
                header.addClass('sticky')
                upperHead.addClass('d-none');
                calcDimetions();///to handle minue top-remove h top
                setTopMenu()
            }
        } else {
            if (header.hasClass('sticky')) {
                header.removeClass('sticky');
                upperHead.removeClass('d-none');
                calcDimetions()
                setTopMenu();
            }

        }

    })

    ///*********checkWindow *************/
    function checkWindow() {

        if (window.innerWidth <= 768) {

            //  menu.css("left", -menuWidth);
            initiaizeMenu();
            menuWidth = menu.innerWidth();
            calcDimetions();
            setTopMenu();
            animateMinue();



        }

    }
    ////*************************************** */

    calcDimetions();
    checkWindow();
    $(window).on('resize', function () {
        checkWindow();
        calcDimetions();
        setTopMenu();
    });


})