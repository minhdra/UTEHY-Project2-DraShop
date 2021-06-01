$(document).ready(function () {
    // 
    $('.ds-logo-wrapper').click(function() {
        window.open('./index.html', '_parent');
    })

    // Scroll navbar
    if(!document.getElementById('productDetail')){
        var lastScrollTop = 0;
        window.addEventListener("scroll", function(){
            var st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop){
                $('header').removeClass('sticky');
            } else {
                if(scrollY != 0){
                    $('header').addClass('sticky');
                }
                else{
                    // upscroll code
                    $('header').removeClass('sticky');
                }
            }
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        }, false);
    }

    // Form login
    $('.user-signin').click(function() {
        $('.mood-signin').fadeIn();
        $('.btn-exit-form').click(function() {
            $(this).parents('.mood').fadeOut();
        })
    })
    // Form Sign up
    $('.user-signup').click(function() {
        $('.mood-signUp').fadeIn();
        $('.btn-exit-form').click(function() {
            $(this).parents('.mood').fadeOut();
        })
    })

    // Load cart
    window.addEventListener('load', function() {
        addProductToCart();
        btnRemove();
        if(Number($('.ds-bag-with-count').text()) == 0) {
            $('.text-no-product').addClass('active');
        }
        else {
            $('.text-no-product').removeClass('active');
        }
    })

    $('.btn-addCart').click(function() {
        addProductToCart();
        btnRemove();
    })
    
    addProductToCart = () => {
        var arrProduct = sessionStorage.getItem('productAddToCart');
        $('.tiny-cart-product-wrapper').html('');
        if(arrProduct != undefined) {
            $('.ds-bag-with-count').text(JSON.parse(arrProduct).length);
            JSON.parse(arrProduct).forEach(element => {
                $('.tiny-cart-product-wrapper').append(`
                <div class="tiny-cart-product">
                    <picture>
                        <img src="${element.link_img}" alt="">
                    </picture>
                    <div class="tiny-cart-product-content">
                        <h4>${element.name_product}</h4>
                        <span class="price">${element.price_product}</span>
                    </div>
                    <button class="btn btn-light btn-border-dark btn-remove">Xóa</button>
                </div>
                `)
            });
        };
    }

    btnRemove = () => {
        $('.btn-remove').click(function() {
            var arrProduct = JSON.parse(sessionStorage.getItem('productAddToCart'));
            var thisBTN = this;
            arrProduct.forEach((el, ind) => {
                if(el.link_img == $(thisBTN).parents('.tiny-cart-product').find('img').attr('src')
                && el.name_product == $(thisBTN).parents('.tiny-cart-product').find('h4').text()
                && el.price_product == $(thisBTN).parents('.tiny-cart-product').find('.price').text()) {
                    arrProduct.splice(ind, 1);
                }
            })
            sessionStorage.setItem('productAddToCart', JSON.stringify(arrProduct));
            $('.ds-bag-with-count').text(Number.parseInt($('.ds-bag-with-count').text()) - 1);

            $(this).parent().remove();

            window.location.reload();
        })
    }

    // Search form
    $('#search').focus(function() {
        $('header').siblings('.hidden, footer').css('display', 'none');
        $(this).parent().siblings('.search-suggest').css('display', 'flex');
        $(this).parent().siblings('.search-suggest').slideDown();
        
    })
    
    $('.suggest-exit').click(function() {
        $('.nav-item').removeClass('active');
        $('header').siblings('.hidden, footer').css('display', 'block');
        $(this).parent().slideUp();
    });
    
    $('.nav-item').click(function() {
        // $(this).siblings().slideDown()
        $('#search').focus(function() {
            $('header').siblings('.hidden, footer').css('display', 'none');
            $('#nav-new, #nav-men, #nav-women').slideUp();
            $(this).parent().siblings('.search-suggest').css('display', 'flex');
            $(this).parent().siblings('.search-suggest').slideDown();
        });

        $('#nav-new, #nav-men, #nav-women').slideUp();
        $('header').siblings('.hidden, footer').css('display', 'none');
        $(this).parents('.hb-menu').siblings('.search-suggest').slideUp();
        if($(this).hasClass('nav-new')){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                $('#nav-new').slideUp();
                $('header').siblings('.hidden, footer').css('display', 'block');
            }
            else{
                $('.nav-item').removeClass('active');
                $(this).addClass('active');
                $('#nav-new').css('display', 'flex');
                $('#nav-new').slideDown();
            }
        }
        else if($(this).hasClass('nav-men')){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                $('#nav-men').slideUp();
                $('header').siblings('.hidden, footer').css('display', 'block');
            }
            else{
                $('.nav-item').removeClass('active');
                $(this).addClass('active');
                $('#nav-men').css('display', 'flex');
                $('#nav-men').slideDown();
            }
        }
        else if($(this).hasClass('nav-women')){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                $('#nav-men').slideUp();
                $('header').siblings('.hidden, footer').css('display', 'block');
            }
            else{
                $('.nav-item').removeClass('active');
                $(this).addClass('active');
                $('#nav-men').css('display', 'flex');
                $('#nav-men').slideDown();
            }
        }
        else if($(this).hasClass('nav-news')) {
            window.open('./Magazine.html', '_parent');
        }
        else if($(this).hasClass('nav-about')) {
            window.open('./AboutShop.html', '_parent');
        }
        else{
            $('header').siblings('.hidden, footer').css('display', 'block');
        }
    });

    // Dark mode
    $('.darkMode').click(function() {
        $(this).removeClass('active');
        $(this).siblings().addClass('active');
    })

    // men women
    if($('.carousel-gender').length > 0){
        $('.products-women-wrapper').slideDown();
        $('.carousel-menu div').click(function() {
            $('.carousel-menu div').removeClass('active');
            $(this).addClass('active');
            if($(this).hasClass('carousel-menu-men')){
                $('.products-women-wrapper').slideUp();
                $('.products-men-wrapper').slideDown();
            }
            else{
                $('.products-men-wrapper').slideUp();
                $('.products-women-wrapper').slideDown();
            }
        })
    }

    // Search
    $('.lbl-search').click(function() {
        sessionStorage.setItem('keySearch', $(this).siblings().val());
        sessionStorage.setItem('keyBrand', '');
        window.open('./resultSearch.html', '_parent');
    })

});
