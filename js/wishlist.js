$(document).ready(function () {
  var wishlist = JSON.parse(sessionStorage.getItem("wishlist"));

  if (wishlist) {
    wishlist.forEach((element) => {
      $(".products-wrapper").append(`
              ${element}
              `);
    });
  } else {
    $(".products-wrapper").append(`
            <div class="noResult">
                <picture>
                    <img src="../images/noResult.svg" alt="">
                </picture>
            </div>
        `);
  }

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

    window.open("./ProductDetail.html", "_parent");
  });

  // Wishlist
  if ($(".heart-wishlist").length > 0) {
    $(".heart-wishlist").click(function () {
      // fal is not active, fas is active
      $(".ds-wishlist-with-count").text(
        Number.parseInt($(".ds-wishlist-with-count").text()) - 1
      );
      $(this).removeClass("fas");
      $(this).addClass("fal");

      sessionStorage.setItem(
        "countWishlist",
        $(".ds-wishlist-with-count").text()
      );

      // Remove product
      let product = $(this).parents(".content-wrapper");

      wishlist.forEach((el, ind) => {
        if (
          $(el).find("h5").text() ===
          $(this).parents(".content-wrapper").find("h5").text()
        ) {
          wishlist.splice(ind, 1);
          return;
        }
      });

      product.remove();
      sessionStorage.setItem("wishlist", JSON.stringify(wishlist));

      window.location.reload();
    });
  }

  // Order
  var product_After_Filter_3 = [];
  sort = () => {
    product_After_Filter_3 = [];
    // product_After_Filter_3 = product_After_Filter.map((x) => x);
    $.each($(".content-wrapper"), function () {
      product_After_Filter_3.push($(this).prop("outerHTML"));
    });

    var value = $("#sort").children("option:selected").val();
    if (value == "a-z") {
      sortNameAZ();
    } else if (value == "z-a") {
      sortNameZA();
    } else if (value == "lowToHigh") {
      sortPriceLtoH();
    } else if (value == "highToLow") {
      sortPriceHtoL();
    } else {
      if (product_After_Filter.length > 0) {
        $(".products-wrapper").html(product_After_Filter);
      } else {
        $(".products-wrapper").html(`
            <picture class="noResult">
                <img src="../images/noResult.svg" alt="" width="100%">
                <a href='https://www.freepik.com/vectors/data'>Data vector created by stories - www.freepik.com</a>
            </picture>
            `);
      }
    }

    // document.getElementsByTagName('option')[0].selected;
    // $('#filter option:first').attr('selected', 'true');
  };

  $("#sort").change(function () {
    // productAfterFill();
    sort();

    if (product_After_Filter_3.length <= 0) {
      $(".products-wrapper").html(`
        <picture class="noResult">
            <img src="../images/noResult.svg" alt="" width="100%">
            <a href='https://www.freepik.com/vectors/data'>Data vector created by stories - www.freepik.com</a>
        </picture>
        `);
    }

    loadAddCart();
  });

  sortNameAZ = () => {
    // product_After_Filter_3 = product_After_Filter.map((x) => x);
    var i, j;

    for (i = 0; i < product_After_Filter_3.length - 1; i++) {
      for (j = product_After_Filter_3.length - 1; j > i; j--) {
        var textI = product_After_Filter_3[j].substring(
          product_After_Filter_3[j].indexOf("<h5>") + 4,
          product_After_Filter_3[j].lastIndexOf("</h5>")
        );
        var textJ = product_After_Filter_3[j - 1].substring(
          product_After_Filter_3[j - 1].indexOf("<h5>") + 4,
          product_After_Filter_3[j - 1].lastIndexOf("</h5>")
        );
        if (textJ[0].includes("Á")) textJ = "A";
        if (textI[0].includes("Á")) textI = "A";
        if (textI[0] < textJ[0]) {
          var tmp = product_After_Filter_3[j];
          product_After_Filter_3[j] = product_After_Filter_3[j - 1];
          product_After_Filter_3[j - 1] = tmp;
        }
      }
    }
    $(".products-wrapper").html(product_After_Filter_3);

    reLoad();
  };

  sortNameZA = () => {
    // product_After_Filter_3 = product_After_Filter.map((x) => x);
    var i, j;

    for (i = 0; i < product_After_Filter_3.length - 1; i++) {
      haveSwap = false;
      for (j = product_After_Filter_3.length - 1; j > i; j--) {
        var textI = product_After_Filter_3[j].substring(
          product_After_Filter_3[j].indexOf("<h5>") + 4,
          product_After_Filter_3[j].lastIndexOf("</h5>")
        );
        var textJ = product_After_Filter_3[j - 1].substring(
          product_After_Filter_3[j - 1].indexOf("<h5>") + 4,
          product_After_Filter_3[j - 1].lastIndexOf("</h5>")
        );
        if (textJ[0].includes("Á")) textJ = "A";
        if (textI[0].includes("Á")) textI = "A";
        if (textI[0] > textJ[0]) {
          var tmp = product_After_Filter_3[j];
          product_After_Filter_3[j] = product_After_Filter_3[j - 1];
          product_After_Filter_3[j - 1] = tmp;
        }
      }
    }
    $(".products-wrapper").html(product_After_Filter_3);

    reLoad();
  };

  sortPriceLtoH = () => {
    // product_After_Filter_3 = product_After_Filter.map((x) => x);
    var i, j;

    for (i = 0; i < product_After_Filter_3.length - 1; i++) {
      for (j = product_After_Filter_3.length - 1; j > i; j--) {
        var textI = product_After_Filter_3[j].substring(
          product_After_Filter_3[j].indexOf('<p class="price">') + 17,
          product_After_Filter_3[j].lastIndexOf("VND</p>")
        );
        var textJ = product_After_Filter_3[j - 1].substring(
          product_After_Filter_3[j - 1].indexOf('<p class="price">') + 17,
          product_After_Filter_3[j - 1].lastIndexOf("VND</p>")
        );
        textI = Number(textI.replace(/[. ]/g, ""));
        textJ = Number(textJ.replace(/[. ]/g, ""));
        console.log(textI, textJ);
        if (textI < textJ) {
          var tmp = product_After_Filter_3[j];
          product_After_Filter_3[j] = product_After_Filter_3[j - 1];
          product_After_Filter_3[j - 1] = tmp;
        }
      }
    }
    $(".products-wrapper").html(product_After_Filter_3);

    reLoad();
  };

  sortPriceHtoL = () => {
    // product_After_Filter_3 = product_After_Filter.map((x) => x);
    var i, j;

    for (i = 0; i < product_After_Filter_3.length - 1; i++) {
      for (j = product_After_Filter_3.length - 1; j > i; j--) {
        var textI = product_After_Filter_3[j].substring(
          product_After_Filter_3[j].indexOf('<p class="price">') + 17,
          product_After_Filter_3[j].lastIndexOf("VND</p>")
        );
        var textJ = product_After_Filter_3[j - 1].substring(
          product_After_Filter_3[j - 1].indexOf('<p class="price">') + 17,
          product_After_Filter_3[j - 1].lastIndexOf("VND</p>")
        );
        textI = Number(textI.replace(/[. ]/g, ""));
        textJ = Number(textJ.replace(/[. ]/g, ""));
        console.log(textI, textJ);
        if (textI > textJ) {
          var tmp = product_After_Filter_3[j];
          product_After_Filter_3[j] = product_After_Filter_3[j - 1];
          product_After_Filter_3[j - 1] = tmp;
        }
      }
    }
    $(".products-wrapper").html(product_After_Filter_3);

    reLoad();
  };
});
