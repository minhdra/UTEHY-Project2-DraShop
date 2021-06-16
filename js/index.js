$(document).ready(function () {
  if (JSON.parse(sessionStorage.getItem("listProductsFromAdmin"))) {
    var listProductsAdmin = Array.from(
      JSON.parse(sessionStorage.getItem("listProductsFromAdmin"))
    );
    listProductsAdmin.forEach(function (el) {
      if (el.gender == "women") {
        $(".carousel-women").append(
          `
                  <div class="content-wrapper col-exm-12 col-sm-6 col-md-4 col-lg-3" data-gender="women" data-color="${el.color}" data-brand="${el.brand}">
                      <picture>
                      <img src="${el.link_img}" alt="">
                      </picture>
                      <h5>${el.name}</h5>
                      <p class="price">${el.price}</p>
                      <i class="fal fa-heart heart-wishlist"></i>
                      <div class="btn-buy-wrapper">
                          <button class="btn btn-light btn-border-dark btn-view">Xem ngay </button>
                      
                      </div>
                  </div>
                  `
        );
      } else {
        $(".carousel-men").append(
          `
                  <div class="content-wrapper col-exm-12 col-sm-6 col-md-4 col-lg-3" data-gender="men" data-color="${el.color}" data-brand="${el.brand}">
                      <picture>
                      <img src="${el.link_img}" alt="">
                      </picture>
                      <h5>${el.name}</h5>
                      <p class="price">${el.price}</p>
                      <i class="fal fa-heart heart-wishlist"></i>
                      <div class="btn-buy-wrapper">
                          <button class="btn btn-light btn-border-dark btn-view">Xem ngay </button>
                      
                      </div>
                  </div>
                  `
        );
      }
    });
  }
  // get product
  getProducts = () => {
    var products = [],
      products_new = [];
    $(".carousel-wrapper .content-wrapper").each(function (ind, el) {
      products.push($(el).prop("outerHTML"));
    });

    $.each(products, function (ind, el) {
      if ($.inArray(el, products_new) === -1) products_new.push(el);
    });

    sessionStorage.setItem("listProducts", JSON.stringify(products_new));
  };
  getProducts();

  // Search by brand
  $(".popular-menu button, .popular-content h3, .popular-content button").click(
    function () {
      var keyBrand = $(this).attr("name");
      sessionStorage.setItem("keySearch", JSON.stringify(""));
      sessionStorage.setItem("keyBrand", keyBrand);
      window.open("./views/Brand.html", "_parent");
    }
  );

  // show product women
  showProductsWomen = () => {
    var productsWomen = $(".products-women-wrapper .content-wrapper");
    // var len = productsWomen.length;
    var count = 8,
      i;
    $(".products-women-wrapper .content-wrapper").css("display", "none");
    for (i = 0; i < count; i++) {
      $(productsWomen[i]).css("display", "flex");
    }

    $(".products-women-wrapper .btn-more").click(function () {
      count += 4;
      for (i = 0; i < count; i++) {
        $(productsWomen[i]).css("display", "flex");
      }
    });
  };
  showProductsWomen();

  // show product men
  showProductsMen = () => {
    var productsMen = $(".products-men-wrapper .content-wrapper");
    var count = 8,
      i;
    $(".products-men-wrapper .content-wrapper").css("display", "none");
    for (i = 0; i < count; i++) {
      $(productsMen[i]).css("display", "flex");
    }

    $(".products-men-wrapper .btn-more").click(function () {
      count += 4;
      for (i = 0; i < count; i++) {
        $(productsMen[i]).css("display", "flex");
      }
    });
  };
  showProductsMen();

  var productRecent = JSON.parse(sessionStorage.getItem("productRecent"));
  productRecent = productRecent ? productRecent : [];

  $(".btn-view, .content-wrapper h5").click(function () {
    var product = {
      link_img: $(this).parents(".content-wrapper").find("img").attr("src"),
      name_product: $(this).parents(".content-wrapper").find("h5").text(),
      price_product: $(this).parents(".content-wrapper").find(".price").text(),
      gender: $(this).parents(".content-wrapper").attr("data-gender"),
      brand: $(this).parents(".content-wrapper").attr("data-brand"),
      color: $(this).parents(".content-wrapper").attr("data-color"),
    };

    sessionStorage.setItem("ProductDetail", JSON.stringify(product));

    productRecent.unshift(
      $(this).parents(".content-wrapper").prop("outerHTML")
    );
    sessionStorage.setItem("productRecent", JSON.stringify(productRecent));

    window.open("./views/ProductDetail.html", "_parent");
  });

  // Carousel hot
  var position = 0;
  $(".btn-hot-next").click(function () {
    var amount;
    if ($(window).width() <= 576) amount = 1;
    else if ($(window).width() <= 768) amount = 2;
    else if ($(window).width() <= 992) amount = 3;
    else amount = 4;
    var width =
      $(".hot .content-wrapper").width() * $(".hot .content-wrapper").length -
      $(".hot .content-wrapper").width() * amount;
    if (position <= width) {
      position += $(".hot .content-wrapper").width() + 32;
      $(".hot .content-wrapper").css(
        "transform",
        "translateX(-" + position + "px)"
      );
    }
  });

  $(".btn-hot-prev").click(function () {
    if (position > $(".hot-content").offset().left) {
      position -= $(".hot .content-wrapper").width() + 32;
      position = position < 0 ? 0 : position;
      $(".hot .content-wrapper").css(
        "transform",
        "translateX(-" + position + "px)"
      );
    }
  });

  var wishlist = JSON.parse(sessionStorage.getItem('wishlist'));
  if (!wishlist) wishlist = [];

  // Wishlist
  if ($(".heart-wishlist").length > 0) {
    $(".heart-wishlist").click(function () {
      // fal is not active, fas is active
      if ($(this).hasClass("fal")) {
        let check = true;

        wishlist.forEach((el, ind) => {
          if ($(this).parents('.content-wrapper').find('h5').text() === $(el).find('h5').text()) {
            check = false;

            wishlist.splice(ind, 1);
            $(".ds-wishlist-with-count").text(
              Number.parseInt($(".ds-wishlist-with-count").text()) - 1
            );

            return;
          }
        })

        if (check) {
          $(".ds-wishlist-with-count").text(
            Number.parseInt($(".ds-wishlist-with-count").text()) + 1
          );
          $(this).removeClass("fal");
          $(this).addClass("fas");
  
          wishlist.push($(this).parents(".content-wrapper").prop("outerHTML"));
        }
        sessionStorage.setItem("wishlist", JSON.stringify(wishlist));
      } else {
        $(".ds-wishlist-with-count").text(
          Number.parseInt($(".ds-wishlist-with-count").text()) - 1
        );
        $(this).removeClass("fas");
        $(this).addClass("fal");

        wishlist.forEach((el, ind) => {
          if (
            $(el).find("h5").text() ===
            $(this).parents(".content-wrapper").find("h5").text()
          ) {
            wishlist.splice(ind, 1);
            return;
          }
        });

        sessionStorage.setItem("wishlist", JSON.stringify(wishlist));
      }

      sessionStorage.setItem(
        "countWishlist",
        $(".ds-wishlist-with-count").text()
      );

      getProducts();
    });
  }

  // Slideshow
  var slides = document.querySelectorAll(".slide");
  if (slides) {
    var isPause = false;
    var indexSlide = 0;
    var slide_auto = document.querySelector(".slide-auto");

    if (slide_auto) {
      setInterval(function () {
        if (!isPause) {
          var slideCurrent = slides[indexSlide];
          $(slideCurrent).removeClass("active");

          if (indexSlide >= slides.length - 1) indexSlide = 0;
          else indexSlide++;

          var slideNext = slides[indexSlide];

          $(slideCurrent).removeClass("active");
          $(slideNext).removeClass("leftHide");
          $(slideCurrent).removeClass("leftShow");
          $(slideNext).removeClass("rightHide");
          $(slideCurrent).removeClass("rightShow");
          $(slideNext).addClass("active");
          $(slideNext).addClass("rightShow");
          $(slideCurrent).addClass("rightHide");
        }
      }, 6000);

      $(".slideshow, .btn-slide").hover(
        function () {
          // over
          isPause = true;
        },
        function () {
          // out
          isPause = false;
        }
      );
    }

    $(".btn-slide-next").click(function () {
      var slideCurrent = slides[indexSlide];
      $(slideCurrent).removeClass("active");

      if (indexSlide >= slides.length - 1) indexSlide = 0;
      else indexSlide++;

      var slideNext = slides[indexSlide];

      $(slideCurrent).removeClass("active");
      $(slideNext).removeClass("leftHide");
      $(slideCurrent).removeClass("leftShow");
      $(slideNext).removeClass("rightHide");
      $(slideCurrent).removeClass("rightShow");
      $(slideNext).addClass("active");
      $(slideNext).addClass("rightShow");
      $(slideCurrent).addClass("rightHide");
    });

    $(".btn-slide-prev").click(function () {
      var slideCurrent = slides[indexSlide];
      if (indexSlide <= 0) indexSlide = slides.length - 1;
      else indexSlide--;

      var slidePrev = slides[indexSlide];

      $(slideCurrent).removeClass("active");
      $(slidePrev).removeClass("rightHide");
      $(slideCurrent).removeClass("rightShow");
      $(slidePrev).removeClass("leftHide");
      $(slideCurrent).removeClass("leftShow");
      $(slidePrev).addClass("active");
      $(slidePrev).addClass("leftShow");
      $(slideCurrent).addClass("leftHide");
    });
  }

  // Open brand.html
  $(".popular-content-left h3, .popular-content-left button").click(
    function () {
      window.open("./views/Brand.html", "_parent");
    }
  );
});
