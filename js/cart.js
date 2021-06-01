$(document).ready(function () {
    addToCart = () => {
        var arrProduct = JSON.parse(sessionStorage.getItem('productAddToCart'));

        // Add to cart
        if(arrProduct != undefined) {
            $('.cart-product-wrapper').html('');
            arrProduct.forEach((el) => {
                $('.cart-product-wrapper').append(`
                <div class="cart-item-wrapper">
                  <picture>
                    <img src="${el.link_img}" alt="">
                  </picture>
                  <div class="description-cart-item">
                    <h5 class="name-product-cart">${el.name_product}</h5>
                    <div class="cart-item-gender">
                      <span>Giới tính: </span>
                      <span class="gender">${el.gender}</span>
                    </div>
                    <div class="cart-item-size">
                      <span>Size: </span>
                      <span class="size">${el.size}</span>
                    </div>
                    <div class="cart-item-option">
                      <span class="del-cart-item">Xóa</span>
                      <span class="moveToWishlist-cart-item">Thêm vào yêu thích</span>
                    </div>
                  </div>
                  <div class="cart-item-price">
                    <span class="root-price">${el.price_product}</span>
                    <span> x </span>
                    <select class="custom-select chose-amount" name="" id="chose-amount">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                    <span class="real-price">${el.price_product}</span>
                  </div>
                </div>
                `)
            })
        }
    }
    addToCart();

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

            addToCart();
            window.location.reload();
        })
    }
    
    // Cart
    var arrCodeSale = ['DRASHOP', 'MINH2000', 'MINHDRA', 'LEMINH'];
    window.addEventListener('load', () => {
        btnRemove();
        reload();
    })
    
    reload = () => {
        let total = 0;
        if($('.real-price').length > 0) {
            $('.real-price').each(function(index, element) {
                total += Number.parseFloat(element.textContent.replace(/[VND.]/g, ''));
            })
        }
        else {
            $('.cart-product-wrapper').html('<img src="../images/no-data-animate.svg" alt="">');
        }
    
        $('.total').text(total.toLocaleString('de-DE') + ' VND');
    
        $('.amount-cart').text($('.cart-item-wrapper').length);
    }
    
    // Change amount
    $('.chose-amount').each(function(ind, el) {
        $(el).change(function() {
            var root_Price = Number.parseFloat($(el).siblings('.root-price').text().replace(/[VND.]/g, ''));
            $(el).siblings('.real-price').text((root_Price * $(el).children('option:selected').val()).toLocaleString('de-DE') + ' VND');
    
            reload();
            reloadAfterAddCode();
        })
    })
    
    // Add code sale
    $('.btn-add-codeSale').click(function() {
        reloadAfterAddCode();
        // window.location.reload();
    })
    
    reloadAfterAddCode = () => {
        arrCodeSale.forEach((el) => {
            if(el == $('.inp-code-sale').val()) {
                var tmp_total = Number.parseFloat(document.getElementsByClassName('total')[0].textContent.replace(/[VND.]/g, ''));
                tmp_total = tmp_total - tmp_total * 0.1 ;
                $('.total-real').text(tmp_total.toLocaleString('de-DE') + ' VND');
                return;
            }
        })
    }
    
    // Remove product cart
    $('.del-cart-item').click(function() { 
        $(this).parent().parent().parent().remove();
        var index = $(this).index();
        var arrProduct = [];
        $('.btn-remove').each(function(ind, el) {
            if(index === ind){
                arrProduct = JSON.parse(sessionStorage.getItem('productAddToCart'));
                var thisBTN = el;
                arrProduct.forEach((el, ind) => {
                    if(el.link_img == $(thisBTN).parents('.tiny-cart-product').find('img').attr('src')
                    && el.name_product == $(thisBTN).parents('.tiny-cart-product').find('h4').text()
                    && el.price_product == $(thisBTN).parents('.tiny-cart-product').find('.price').text()) {
                        arrProduct.splice(ind, 1);
                    }
                })
                $(this).parent().remove();
                sessionStorage.setItem('productAddToCart', JSON.stringify(arrProduct));
                $('.ds-bag-with-count').text(Number.parseInt($('.ds-bag-with-count').text()) - 1);
            }
        })

        // addToCart();
        window.location.reload();
    })
    
    // Slide code sale
    $('.code-sale').click(function() {
        if($(this).hasClass('code-sale-rotate')){
            $(this).removeClass('code-sale-rotate');
            $(this).siblings().slideUp();
        }
        else {
            $(this).addClass('code-sale-rotate');
            $(this).siblings().slideDown();
        }
    })
    
    // click check out
    $('.btn-checkout').click(function() {
        var totalProduct = $('.amount-cart:first').text();
        var total_tmp = $('.total:first').text();
        var total_real = $('.total-real').text();
        var dateNow = new Date();
        var bill = {
            'totalProducts': totalProduct,
            'total_tmp': total_tmp,
            'total_real': total_real,
            'date': dateNow.toLocaleString()
        }

        sessionStorage.setItem('bill', JSON.stringify(bill));

        window.open('./CheckOut.html', '_parent');
    })
});
