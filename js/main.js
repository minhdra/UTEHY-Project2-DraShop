$(document).ready(function () {
  // add address
  if ($("body").attr("id") === "index") {
    // wishlist
    $(".ht-item[title='Wishlist']").attr("href", "./views/Wishlist.html");
    // Logo shop
    $(".ds-logo-wrapper img").attr("src", "./images/DS-Logo-2.png");
    // icon shop
    $("head").append(`
    <link rel="shortcut icon" href="./images/icon.ico" type="image/x-icon">
    `);
  } else {
    // wishlist
    $(".ht-item[title='Wishlist']").attr("href", "./Wishlist.html");
    // Logo shop
    $(".ds-logo-wrapper img").attr("src", "../images/DS-Logo-2.png");
    // icon shop
    $("head").append(`
    <link rel="shortcut icon" href="../images/icon.ico" type="image/x-icon">
    `);
  }

  // Menu toggle
  $(".btn-menu-toggle").click(function () {
    if ($(".hb-menu-wrapper").hasClass("show-menu-toggle")) {
      $(".hb-menu-wrapper, .nav-menu").removeClass("show-menu-toggle");
    } else {
      $(".hb-menu-wrapper, .nav-menu").addClass("show-menu-toggle");
    }
  });

  // Suggest men click
  $("#nav-men .group-suggest-left .suggest-item").click(function () {
    $("#nav-men .group-suggest-left .suggest-item").removeClass("active");
    $(this).addClass("active");

    const dataSuggest = $(this).attr("data-suggest");
    const suggestList = $("#nav-men .group-suggest-right .suggest-list");

    suggestList.slideUp();
    if (dataSuggest === "shirt") {
      suggestList.html(`
                  <li class="suggest-item">T-Shirt</li>
                  <li class="suggest-item">Hoodie</li>
                  <li class="suggest-item">Vest</li>
              `);
    } else if (dataSuggest === "pant") {
      suggestList.html(`
                  <li class="suggest-item">Quần vải</li>
                  <li class="suggest-item">Jean</li>
                  <li class="suggest-item">Short</li>
                  <li class="suggest-item">Thể thao</li>
              `);
    } else if (dataSuggest === "accessories") {
      suggestList.html(`
                  <li class="suggest-item">Kính</li>
                  <li class="suggest-item">Đồng hồ</li>
                  <li class="suggest-item">Cà vạt</li>
                  <li class="suggest-item">Mũ - nón</li>
              `);
    } else {
      suggestList.slideUp();
      return;
    }
    suggestList.slideDown();
  });

  // Suggest women click
  $("#nav-women .group-suggest-left .suggest-item").click(function () {
    $("#nav-women .group-suggest-left .suggest-item").removeClass("active");
    $(this).addClass("active");

    const dataSuggest = $(this).attr("data-suggest");
    const suggestList = $("#nav-women .group-suggest-right .suggest-list");

    suggestList.slideUp();
    if (dataSuggest === "shirt") {
      suggestList.html(`
                  <li class="suggest-item">T-Shirt</li>
                  <li class="suggest-item">Hoodie</li>
                  <li class="suggest-item">Vest</li>
              `);
    } else if (dataSuggest === "pant") {
      suggestList.html(`
                  <li class="suggest-item">Chân váy</li>
                  <li class="suggest-item">Baggy jean</li>
                  <li class="suggest-item">Vest</li>
                  <li class="suggest-item">Legging</li>
                  <li class="suggest-item">Thể thao</li>
              `);
    } else if (dataSuggest === "accessories") {
      suggestList.html(`
                  <li class="suggest-item">Kính</li>
                  <li class="suggest-item">Vòng tay, cổ</li>
                  <li class="suggest-item">Cài áo</li>
                  <li class="suggest-item">Mũ - nón</li>
                  <li class="suggest-item">Bông tai</li>
              `);
    } else {
      suggestList.slideUp();
      return;
    }
    suggestList.slideDown();
  });

  //
  $(".ds-logo-wrapper").click(function () {
    if ($("body").attr("id") === "index")
      window.open("./index.html", "_parent");
    else window.open("../index.html", "_parent");
    
  });

  // Scroll navbar
  if (!document.getElementById("productDetail")) {
    var prevScrollPos = window.pageYOffset;
    window.onscroll = function () {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos) {
        $("header").css("top", "0");
      } else {
        $("header").css("top", "-7rem");
      }
      prevScrollPos = currentScrollPos;
    };
  } else {
    $("header").css("position", "static");
  }

  // Form login
  $(".user-signin").click(function () {
    $(".mood-signin").fadeIn();
    $(".btn-exit-form").click(function () {
      $(this).parents(".mood").fadeOut();
    });
  });
  // Form Sign up
  $(".user-signup").click(function () {
    $(".mood-signUp").fadeIn();
    $(".btn-exit-form").click(function () {
      $(this).parents(".mood").fadeOut();
    });
  });

  // Load cart
  window.addEventListener("load", function () {
    addProductToCart();
    btnRemove();
    if (Number($(".ds-bag-with-count").text()) == 0) {
      $(".text-no-product").addClass("active");
    } else {
      $(".text-no-product").removeClass("active");
    }
  });

  $(".btn-addCart").click(function () {
    addProductToCart();
    btnRemove();
  });

  addProductToCart = () => {
    var arrProduct = sessionStorage.getItem("productAddToCart");
    $(".tiny-cart-product-wrapper").html("");
    if (arrProduct != undefined) {
      $(".ds-bag-with-count").text(JSON.parse(arrProduct).length);
      JSON.parse(arrProduct).forEach((element) => {
        $(".tiny-cart-product-wrapper").append(`
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
                `);
      });
    }
  };

  btnRemove = () => {
    $(".btn-remove").click(function () {
      var arrProduct = JSON.parse(sessionStorage.getItem("productAddToCart"));
      var thisBTN = this;
      arrProduct.forEach((el, ind) => {
        if (
          el.link_img ==
            $(thisBTN).parents(".tiny-cart-product").find("img").attr("src") &&
          el.name_product ==
            $(thisBTN).parents(".tiny-cart-product").find("h4").text() &&
          el.price_product ==
            $(thisBTN).parents(".tiny-cart-product").find(".price").text()
        ) {
          arrProduct.splice(ind, 1);
        }
      });
      sessionStorage.setItem("productAddToCart", JSON.stringify(arrProduct));
      $(".ds-bag-with-count").text(
        Number.parseInt($(".ds-bag-with-count").text()) - 1
      );

      $(this).parent().remove();

      window.location.reload();
    });
  };

  // Search form
  $("#search").focus(function () {
    $("header").siblings(".hidden, footer").css("display", "none");
    $(this)
      .parent()
      .parent()
      .siblings(".search-suggest")
      .css("display", "flex");
    $(this).parent().parent().siblings(".search-suggest").slideDown();
  });

  $(".suggest-exit").click(function () {
    $(".nav-item").removeClass("active");
    $("header").siblings(".hidden, footer").css("display", "block");
    $(this).parent().slideUp();
  });

  $(".nav-item").click(function () {
    // $(this).siblings().slideDown()
    $("#search").focus(function () {
      $("header").siblings(".hidden, footer").css("display", "none");
      $("#nav-new, #nav-men, #nav-women").slideUp();
      $(this).parent().siblings(".search-suggest").css("display", "flex");
      $(this).parent().siblings(".search-suggest").slideDown();
    });

    $("#nav-new, #nav-men, #nav-women").slideUp();
    $("header").siblings(".hidden, footer").css("display", "none");
    $(this).parents(".hb-menu").siblings(".search-suggest").slideUp();
    if ($(this).hasClass("nav-new")) {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $("#nav-new").slideUp();
        $("header").siblings(".hidden, footer").css("display", "block");
      } else {
        $(".nav-item").removeClass("active");
        $(this).addClass("active");
        $("#nav-new").css("display", "flex");
        $("#nav-new").slideDown();
      }
    } else if ($(this).hasClass("nav-men")) {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $("#nav-men").slideUp();
        $("header").siblings(".hidden, footer").css("display", "block");
      } else {
        $(".nav-item").removeClass("active");
        $(this).addClass("active");
        $("#nav-men").css("display", "flex");
        $("#nav-men").slideDown();
      }
    } else if ($(this).hasClass("nav-women")) {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $("#nav-men").slideUp();
        $("header").siblings(".hidden, footer").css("display", "block");
      } else {
        $(".nav-item").removeClass("active");
        $(this).addClass("active");
        $("#nav-women").css("display", "flex");
        $("#nav-women").slideDown();
      }
    } else if ($(this).hasClass("nav-news")) {
      if ($("body").attr("id") === "index")
        window.open("./views/Magazine.html", "_parent");
      else window.open("./Magazine.html", "_parent");
    } else if ($(this).hasClass("nav-about")) {
      if ($("body").attr("id") === "index")
        window.open("./views/AboutShop.html", "_parent");
      else window.open("./AboutShop.html", "_parent");
    } else {
      $("header").siblings(".hidden, footer").css("display", "block");
    }
  });

  // Dark mode
  $(".darkMode").click(function () {
    $(this).removeClass("active");
    $(this).siblings().addClass("active");
  });

  // men women
  if ($(".carousel-gender").length > 0) {
    $(".products-women-wrapper").slideDown();
    $(".carousel-menu div").click(function () {
      $(".carousel-menu div").removeClass("active");
      $(this).addClass("active");
      if ($(this).hasClass("carousel-menu-men")) {
        $(".products-women-wrapper").slideUp();
        $(".products-men-wrapper").slideDown();
      } else {
        $(".products-men-wrapper").slideUp();
        $(".products-women-wrapper").slideDown();
      }
    });
  }

  // Search
  $(".lbl-search").click(function () {
    sessionStorage.setItem("keySearch", $(this).siblings().val());
    sessionStorage.setItem("keyBrand", "");
    if ($("body").attr("id") === "index")
      window.open("./views/resultSearch.html", "_parent");
    else window.open("./resultSearch.html", "_parent");
  });

  $(".ds-wishlist-with-count").text(
    JSON.parse(sessionStorage.getItem("countWishlist"))
      ? JSON.parse(sessionStorage.getItem("countWishlist"))
      : 0
  );
});
