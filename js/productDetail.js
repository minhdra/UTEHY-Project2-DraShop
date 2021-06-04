$(document).ready(function () {
    // Add product
    window.addEventListener('load', function() {
        var product = JSON.parse(this.sessionStorage.getItem('ProductDetail'));
        var gender = product.gender == 'men' ? 'Nam' : 'Nữ';

        $('#productDetail .slide img:first, #productDetail .collection-item img:first').attr('src', product.link_img);
        $('#productDetail .slide img:nth(1), #productDetail .collection-item img:nth(1)').attr('src', '../images/img-2.jpg');
        $('#productDetail .slide img:nth(2), #productDetail .collection-item img:nth(2)').attr('src', '../images/img-3.jpg');
        $('#description h1, #description h2').text(product.name_product);
        $('.des-img img').attr('src', product.link_img);
        $('.detail-right-wrapper h2').text(product.name_product);
        $('.product-price').text(product.price_product);
        $('.product-brand').text(capitalizeLetter(product.brand));
        $('.product-color').text(capitalizeLetter(product.color));
        $('.product-gender').text(capitalizeLetter(gender));
    })

    // Function capitalizeFirstLetter
    capitalizeLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Slideshow
    var slides = document.querySelectorAll('.slide');
    var indexSlide = 0;
    $('.btn-slide-next').click(function() {
        var slideCurrent = slides[indexSlide];
        $(slideCurrent).removeClass('active');
    
        if(indexSlide >= slides.length - 1) indexSlide = 0;
        else indexSlide++;
        
        var slideNext = slides[indexSlide];
    
        $(slideCurrent).removeClass('active');
        $(slideNext).removeClass('leftHide');
        $(slideCurrent).removeClass('leftShow');
        $(slideNext).removeClass('rightHide');
        $(slideCurrent).removeClass('rightShow');
        $(slideNext).addClass('active');
        $(slideNext).addClass('rightShow');
        $(slideCurrent).addClass('rightHide');
    
        var collection = document.getElementsByClassName('collection-item');
        if(collection) {
            $(collection).removeClass('active');
            $(collection[indexSlide]).addClass('active')
        }
    })
    
    $('.btn-slide-prev').click(function() {
        var slideCurrent = slides[indexSlide];
        if(indexSlide <= 0) indexSlide = slides.length - 1;
        else indexSlide--;
        
        var slidePrev = slides[indexSlide];
    
        $(slideCurrent).removeClass('active');
        $(slidePrev).removeClass('rightHide');
        $(slideCurrent).removeClass('rightShow');
        $(slidePrev).removeClass('leftHide');
        $(slideCurrent).removeClass('leftShow');
        $(slidePrev).addClass('active');
        $(slidePrev).addClass('leftShow');
        $(slideCurrent).addClass('leftHide');
    
        var collection = document.getElementsByClassName('collection-item');
        if(collection) {
            $(collection).removeClass('active');
            $(collection[indexSlide]).addClass('active')
        }
    })
    
    $('.collection-item').click(function() {
        var preIndex = $('.collection-item.active').attr('data-index');
        if(!$(this).hasClass('active')){
            var index = $(this).attr('data-index');
    
            console.log(preIndex, index);
            $('.collection-item').removeClass('active');
            $(this).addClass('active');
            
            if(index > preIndex){
                indexSlide = index;
                var slideCurrent = slides[preIndex];
                $(slideCurrent).removeClass('active');
    
                // if(indexSlide >= slides.length - 1) indexSlide = 0;
                // else indexSlide++;
                
                var slideNext = slides[index];
    
                $(slideCurrent).removeClass('active');
                $(slideNext).removeClass('leftHide');
                $(slideCurrent).removeClass('leftShow');
                $(slideNext).removeClass('rightHide');
                $(slideCurrent).removeClass('rightShow');
                $(slideNext).addClass('active');
                $(slideNext).addClass('rightShow');
                $(slideCurrent).addClass('rightHide');
            }
            else {
                indexSlide = index
                var slideCurrent = slides[preIndex];
                
                // if(indexSlide <= 0) indexSlide = slides.length - 1;
                // else indexSlide--;
                
                var slidePrev = slides[index];
    
                $(slideCurrent).removeClass('active');
                $(slidePrev).removeClass('rightHide');
                $(slideCurrent).removeClass('rightShow');
                $(slidePrev).removeClass('leftHide');
                $(slideCurrent).removeClass('leftShow');
                $(slidePrev).addClass('active');
                $(slidePrev).addClass('leftShow');
                $(slideCurrent).addClass('leftHide');
            }
        }
    })
    
    // Chose size
    $('.size-item').click(function() {
        $('.detail-right-wrapper .alert').fadeOut();
        $('.size-item').removeClass('active');
        $(this).addClass('active');
    })
    
    // Add fixed
    window.addEventListener('scroll', function() {
        if(this.scrollY > document.getElementsByClassName('detail-right')[0].offsetTop) {
            $('.detail-right').css('position', 'sticky');
        }
        else {
            $('.detail-right').css('position', 'static');
            
        }
    })
    
    // Tiny menu
    $('.detail-tiny-bar button').click(function() {
        $('.detail-tiny-bar button').removeClass('active');
        $(this).addClass('active');
        var el = document.getElementById($(this).attr('name'));
    
        $('html, body').animate({
            scrollTop: $(el).offset().top - 100
        })
    })

    // Add active to detail tiny bar
    const activeBar = () => {
        let currentNavId = $(".link-tiny-bar:first").attr('id');
        
        $('.link-tiny-bar').each(function () {
            const navTop = $(this).offset().top;
            if (pageYOffset >= navTop - 110) {
                currentNavId = $(this).attr('id');
            }
        })

        $(".detail-tiny-bar button").each(function () {
            if (!currentNavId) $('.detail-tiny-bar button[name="collection"]').addClass('active');
            if (currentNavId === $(this).attr('name')) {
                $(this).addClass('active');
            }
            else $(this).removeClass('active');
        });
    }
    activeBar();

    // Scroll to active detail bar
    $(window).on('scroll', function () {
        activeBar();
    })
        
    // Add cart
    var arrProduct = [];
    arrProduct = JSON.parse(sessionStorage.getItem('productAddToCart'));
    // Add to cart
    $('.btn-addCart').click(function() {
        var check = false;
        $('.size-item').each(function() {
            if($(this).hasClass('active')) {
                check = true;
            }
        })

        if(!check) $('.detail-right-wrapper .alert').fadeIn();
        else {
            var thisBTN = this;
            if(arrProduct != undefined) {
                arrProduct.forEach((el) => {
                    if(el.link_img == $('#productDetail .slide img:first').attr('src')
                    && el.name_product == $('.detail-right-wrapper h2').text()
                    && el.price_product == $('.product-price').text()) {
                        check = false;
                        return;
                    }
                })
                
                if(check){
                    $('.ds-bag-with-count').text(Number.parseInt($('.ds-bag-with-count').text()) + 1);
                    $(thisBTN).attr('data-click', 1);
                    var product = {
                        'link_img': $('#productDetail .slide img:first').attr('src'),
                        'name_product': $('.detail-right-wrapper h2').text(),
                        'price_product': $('.product-price').text(),
                        'size': $('.size-list input.active').val(),
                        'color': $('.product-color').text(),
                        'brand': $('.product-brand').text(),
                        'gender': $('.product-gender').text()
                    }
                    arrProduct.push(product);
                    sessionStorage.setItem('productAddToCart', JSON.stringify(arrProduct));
                    window.location.reload();
                }
                else {
                    // Do something
                }
            }
            
            else {
                arrProduct = [];
                $('.ds-bag-with-count').text(Number.parseInt($('.ds-bag-with-count').text()) + 1);
                $(this).attr('data-click', 1);
                var product = {
                    'link_img': $('#productDetail .slide img:first').attr('src'),
                    'name_product': $('.detail-right-wrapper h2').text(),
                    'price_product': $('.product-price').text(),
                    'size': $('.size-list input.active').val(),
                    'color': $('.product-color').text(),
                    'brand': $('.product-brand').text(),
                    'gender': $('.product-gender').text()
                }
                arrProduct.push(product);
                sessionStorage.setItem('productAddToCart', JSON.stringify(arrProduct));
                window.location.reload();
            }
        }
        
    })

    // Add products recent
    var productRecent = JSON.parse(sessionStorage.getItem('productRecent'));
    var arrRecent = [];
    arrRecent.push(productRecent[0]);
    for(var i = 1; i < productRecent.length; i++) {
        if(arrRecent.length <= 3) {
            var check = true;
            for(var j = 0; j < arrRecent.length; j++) {
                if(productRecent[i] == arrRecent[j]) {
                    check = false;
                    break;
                }
            }
            if(check) arrRecent.push(productRecent[i]);
        }
        else break;
    }

    var htmlRecent = arrRecent.join(' ');
    $('.productRecent-content').html('');
    $('.productRecent-content').append(htmlRecent);

    var productRecent = JSON.parse(sessionStorage.getItem('productRecent'));
    productRecent = productRecent ? productRecent : [];

    $('.btn-view, .content-wrapper h5').click(function() {
        var product = {
            'link_img': $(this).parents('.content-wrapper').find('img').attr('src'),
            'name_product': $(this).parents('.content-wrapper').find('h5').text(),
            'price_product': $(this).parents('.content-wrapper').find('.price').text(),
            'gender': $(this).parents('.content-wrapper').attr('data-gender'),
            'brand': $(this).parents('.content-wrapper').attr('data-brand'),
            'color': $(this).parents('.content-wrapper').attr('data-color'),
        }

        sessionStorage.setItem('ProductDetail', JSON.stringify(product));

        productRecent.unshift($(this).parents('.content-wrapper').prop('outerHTML'));
        sessionStorage.setItem('productRecent', JSON.stringify(productRecent));

        window.open('./ProductDetail.html', '_parent');
    })
});


