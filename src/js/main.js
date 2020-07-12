$(function () {
    let header = $('header'),
        headerContent = $('.header .header-content'),
        lowHead = $('.lower-header'),
        upperHead = $('.upper-header'),
        hamburgerIcon = $('.hamburger-icon'),
        navLink = $('.lower-header .nav-item .nav-link'),
        searchIcon = $('.link-search')
    menuLink = $('#menu .nav-list a'),
        menu = $('#menu'),
        outLContainer = $('.out-lcontainer'),
        //////////////
        homeProducts = $('.home-products-li'),
        productSelect = $('.product-select');

    ///**********Dimentions********/
    let headerHeigh, lowHeadHeigh, upperHeadHeigh, menuWidth;

    function calcDimetions() {
        headerHeigh = headerContent.innerHeight();
        lowHeadHeigh = lowHead.innerHeight();
        upperHeadHeigh = upperHead.innerHeight();
        menuWidth = menu.innerWidth();


    }

    //************header******************************************************************************/
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
    function setTopValue() {
        header.hasClass('sticky') ? $('body').css("padding-top", headerHeigh + 100) : $('body').css("padding-top", 0);
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

        if ($(this).scrollTop() > 100) {
            if (header.not('.sticky')) {
                header.addClass('sticky')
                upperHead.addClass('d-none');
                calcDimetions();///to handle minue top-remove h top
                setTopValue();
            }
        } else {
            if (header.hasClass('sticky')) {
                header.removeClass('sticky');
                upperHead.removeClass('d-none');
                calcDimetions();
                setTopValue();
            }

        }

    })

    ///*********checkWindow *************/
    function checkWindow() {
        let leftOffset = outLContainer.offset().left,//for verical slider
            righttOffset = outLContainer.offset().reight;

        if (window.innerWidth < 768) {

            //  menu.css("left", -menuWidth);
            initiaizeMenu();
            menuWidth = menu.innerWidth();
            calcDimetions();
            setTopValue();
            animateMinue();

            outLContainer.css('margin-left', 0);
            // outLContainer.css('margin-reight', +righttOffset);



        } else {
            calcDimetions();
            let leftOffset = outLContainer.offset().left,//for verical slider
                righttOffset = outLContainer.offset().reight;
            outLContainer.css('margin-left', -leftOffset);
            // outLContainer.css('margin-reight', -leftOffset);
        }

    }
    //************End Header******************************************************************************/

    //************Main Content******************************************************************************/
    let colorSlider = $(".colors-types .slick-slider");
    ///////////////init slicks////////////////////////////////////////
    function initColorsSlick() {
        colorSlider.slick({
            vertical: true,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,

            // centerMode: false,
            prevArrow: ".colors-types .prev-arrow",
            nextArrow: ".colors-types .next-arrow",
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        vertical: false,
                        arrows: false,
                        centerMode: true,
                        // centerPadding: '40px',
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                // {
                //   breakpoint: 480,
                //   settings: {
                //     arrows: false,
                //     centerMode: true,
                //     centerPadding: '40px',
                //     slidesToShow: 1
                //   }
                // }
            ]


        });

    }

    function initLipsSlick(slickLips) {

        $('.lipsStick .slick-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,

            dots: true,
            autoplay: true,

        });
    }

    /////////////////////////////////////////////////////////////////

    productSelect.text(homeProducts.attr('data-path'));
    /////////////**view********** */




    function setProdType(lipsobj) {
        let colors = lipsobj[0].colors,
            img = lipsobj[1].selectedimg,
            { src, srcset, name, deg } = img;


        colors.map(item => {
            let { backgroundColor, name, deg } = item;
            // style="color: red"
            let style = `background-color:${backgroundColor}`
            // colorSlider

            let sliderItem = `<div class='slider-item' data-name=${name} data-deg=${deg} id=${name} style=${style}>
                             <span class="name">${name}</span>
                             <div class='selected-container'>
                             <img src="imgs/selected.jpg"
                             srcset="imgs/selected@2x.jpg 2x,
                                     imgs/selected@3x.jpg 3x"
                             class="Selected">
                              </div>
                             <span class="deg">${deg}</span>
                            </div>`;

            colorSlider.append(sliderItem);

        })
        //this selected
        let sliderImg = `<div class='slider-item latte-img' data-name=${name} data-deg=${deg} >
                                <img src=${src}
                                alt=${name}
                                srcset=${srcset}/>

                                <div class="latte-desc"> 
                                    <span class="name">${name}</span>
                                    <div class='selected-container'>
                                    <img src="imgs/selected.jpg"
                                    srcset="imgs/selected@2x.jpg 2x,
                                            imgs/selected@3x.jpg 3x"
                                    class="Selected">
                                     </div>
                                    <span class="deg">${deg}</span>
                                </div>

                         </div>`;
        colorSlider.find('#Truffle').after(sliderImg);
        initColorsSlick();
        ///add class selected
        let colorsItem = $('.colors-types .slider-item');
        colorsItem.on('click', function () {
            $(this).toggleClass('select');
        })
        //  console.log(colorsItem);


    }
    //////
    /**
     * lipsStick">
                <div class="slick-slider horizantal
     */
    function setlipsImgs(lipstickimgs) {
        let slickLips = $('.lipsStick .slick-slider');
        lipstickimgs.map(item => {
            console.log(item);
            let { src, srcset } = item;
            let sliderItem = `<div class='slider-item'>
            <img src=${src}
            srcset=${srcset}
           />
           </div>`;
            slickLips.append(sliderItem);

        });
        initLipsSlick(slickLips);
    }
    /*ajax req***************************************************************************************/
    $.ajax({
        type: "Get",
        url: "https://my-json-server.typicode.com/sajidaqadomi/productsjson/db",
        data: "",
        dataType: 'jsonp',
        success: function (response) {
            let lipsobj = response.lips;
            let lipstickimgs = response.lipstickimgs;
            console.log(lipstickimgs);

            setProdType(lipsobj);
            setlipsImgs(lipstickimgs);

        },
        error: function (xhr, status, error) {
            console.log(lipstickimgs)
        }

    });







    ////////////////////////////////////////
    calcDimetions();
    checkWindow();
    $(window).on('resize', function () {
        checkWindow();
        // calcDimetions();
        setTopValue();
    });


})