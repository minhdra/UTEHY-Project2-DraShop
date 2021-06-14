var products = JSON.parse(sessionStorage.getItem("listProducts"));

// $(products).each(function(ind, el) {
//     $('.products-wrapper').append(el);
// });
$(".products-wrapper").html(products);

//Filter
var product_After_Filter = [];
var keySearch = sessionStorage.getItem("keySearch");
var keyBrand = sessionStorage.getItem("keyBrand");

if (keySearch != "") {
  $(".keySearch").text(keySearch);
  $(".content-wrapper").each(function (ind, el) {
    if (
      $(el)
        .children("h5")
        .text()
        .toLowerCase()
        .includes(keySearch.toLowerCase())
    ) {
      product_After_Filter.push($(el).prop("outerHTML"));
    }
  });
}

if (keyBrand != "") {
  $(".keySearch").text(keyBrand);
  $(".content-wrapper").each(function (ind, el) {
    if ($(this).attr("data-brand") == keyBrand) {
      product_After_Filter.push($(this).prop("outerHTML"));
    }
  });
}

// Add to web
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

// Function load btn after filter
reLoad = () => {
  // Open productdetail.html

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

    window.open("./ProductDetail.html", "_parent");
  });

  // Thêm cart
  $(".btn-addCart").click(function () {
    $(".ds-bag-with-count").text(
      Number.parseInt($(".ds-bag-with-count").text()) + 1
    );
  });

  var wishlist = JSON.parse(sessionStorage.getItem("wishlist"));
  if (!wishlist) wishlist = [];

  // Wishlist
  if ($(".heart-wishlist").length > 0) {
    $(".heart-wishlist").click(function () {
      // fal is not active, fas is active
      if ($(this).hasClass("fal")) {
        let check = true;

        wishlist.forEach((el) => {
          if (
            $(this).parents(".content-wrapper").find("h5").text() ===
            $(el).find("h5").text()
          ) {
            check = false;

            wishlist.splice(ind, 1);
            $(".ds-wishlist-with-count").text(
              Number.parseInt($(".ds-wishlist-with-count").text()) - 1
            );
            
            return;
          }
        });

        if (check) {
          $(".ds-wishlist-with-count").text(
            Number.parseInt($(".ds-wishlist-with-count").text()) + 1
          );
          $(this).removeClass("fal");
          $(this).addClass("fas");

          wishlist.push($(this).parents(".content-wrapper").prop("outerHTML"));

          sessionStorage.setItem("wishlist", JSON.stringify(wishlist));
        }
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
};

reLoad();
// Filter
var product_After_Filter_2 = [];
productAfterFill = () => {
  // product_After_Filter_2 = product_After_Filter.map((x) => x);
  // $.each($('.content-wrapper'), function() {
  //     product_After_Filter_2.push($(this).prop('outerHTML'));
  // })
  $(".products-wrapper").html(product_After_Filter);
  // console.log(product_After_Filter_2)
  var value = $("#filter").children("option:selected").val();
  if (value == "0-1") {
    filter(0, 100000);
  } else if (value == "1-5") {
    filter(100000, 500000);
  } else if (value == "5-2") {
    filter(500000, 2000000);
  } else if (value == "2-") {
    filter(2000000, 9999999999999);
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

  document.getElementsByTagName("option")[0].defaultSelected;
  // $('#sort option:first').removeAttr('selected');
};

$("#filter").change(function () {
  productAfterFill();
  loadAddCart();
});

filter = (start, end) => {
  product_After_Filter_2 = [];
  $(".content-wrapper").each(function () {
    var price = Number(
      $(this)
        .find(".price")
        .text()
        .replace(/[VND.]/g, "")
    );
    if (start <= price && price < end) {
      product_After_Filter_2.push($(this).prop("outerHTML"));
    }
  });

  if (product_After_Filter_2.length > 0) {
    $(".products-wrapper").html(product_After_Filter_2);
  } else {
    $(".products-wrapper").html(`
        <picture class="noResult">
            <img src="../images/noResult.svg" alt="" width="100%">
            <a href='https://www.freepik.com/vectors/data'>Data vector created by stories - www.freepik.com</a>
        </picture>
        `);
  }

  reLoad();
};

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

// Add to cart
loadAddCart = () => {
  var arrProduct = [];
  arrProduct = JSON.parse(sessionStorage.getItem("productAddToCart"));
  $(".btn-addCart").click(function () {
    var thisBTN = this;
    if (arrProduct != undefined) {
      var check = true;
      arrProduct.forEach((el) => {
        if (
          el.link_img ==
            $(thisBTN).parents(".content-wrapper").find("img").attr("src") &&
          el.name_product ==
            $(thisBTN).parents(".content-wrapper").find("h5").text() &&
          el.price_product ==
            $(thisBTN).parents(".content-wrapper").find(".price").text()
        ) {
          check = false;
          return;
        }
      });

      if (check) {
        $(".ds-bag-with-count").text(
          Number.parseInt($(".ds-bag-with-count").text()) + 1
        );
        $(thisBTN).attr("data-click", 1);
        var product = {
          link_img: $(thisBTN)
            .parents(".content-wrapper")
            .find("img")
            .attr("src"),
          name_product: $(thisBTN)
            .parents(".content-wrapper")
            .find("h5")
            .text(),
          price_product: $(thisBTN)
            .parents(".content-wrapper")
            .find(".price")
            .text(),
        };
        arrProduct.push(product);
        sessionStorage.setItem("productAddToCart", JSON.stringify(arrProduct));
        window.location.reload();
      } else {
        // Do something
      }
    } else {
      arrProduct = [];
      $(".ds-bag-with-count").text(
        Number.parseInt($(".ds-bag-with-count").text()) + 1
      );
      $(this).attr("data-click", 1);
      var product = {
        link_img: $(this).parents(".content-wrapper").find("img").attr("src"),
        name_product: $(this).parents(".content-wrapper").find("h5").text(),
        price_product: $(this)
          .parents(".content-wrapper")
          .find(".price")
          .text(),
      };
      arrProduct.push(product);
      sessionStorage.setItem("productAddToCart", JSON.stringify(arrProduct));
      window.location.reload();
    }
  });
};

loadAddCart();
