var products = JSON.parse(sessionStorage.getItem("listProducts"));

// $(products).each(function(ind, el) {
//     $('.products-wrapper').append(el);
// });
$(".products-wrapper").html(products);

//Filter
var product_After_Filter = [];
var keyBrand = sessionStorage.getItem("keyBrand");

var overwriteContent = (brand, introduce) => {
  $(".brand-name").text(brand);
  $(".introduce-content").html(introduce);
};

switch (keyBrand) {
  case "gucci":
    overwriteContent(
      "gucci",
      "Thương hiệu Gucci được Guccio Gucci thành lập tại Florence, Ý năm 1921. Gucci là một trong những thương hiệu thời trang thành công nhất thế giới với các mặt hàng quần áo, phụ kiện và sản phẩm bằng da cao cấp. Khi mới thành lập, Gucci chuyên về mặt hàng da mịn với phong cách cổ điển và duy trì phương pháp chế tạo thủ công truyền thống. Cùng với 3 người con trai là Aldo Gucci, Vasco Gucci và Rodolfo Gucci, thương hiệu đã mở rộng thị trường bằng các cửa hàng tại Milan, Rome và Florence. Lúc này, Gucci bắt đầu cung cấp các phụ kiện thủ công làm từ chất liệu da mịn như túi xách và giày dép. Trong Thế chiến II, trước tình trạng thiếu nguyên liệu, thương hiệu chuyển sang sản xuất túi xách bằng vải cotton thay cho da. Lúc này, thương hiệu cho ra đời biểu tượng 2 chữ G đan vào nhau kết hợp với dải màu đỏ – xanh lá cây, biểu tượng sau này trở thành logo nổi tiếng của Gucci. Năm 1970, đồng hồ, trang sức, cà vạt và mắt kính được bổ sung vào dòng sản phẩm của thương hiệu. Thời gian này, việc sử dụng biểu tượng 2-G bằng kim loại cho khóa thắt lưng và các phụ kiện khác thực sự tạo ra hiệu ứng mạnh mẽ trên toàn thế giới. Năm 1994, Tom Ford trở thành Giám đốc Sáng tạo của Gucci. Với sự lớn mạnh của mình, trong những năm 1990s, tập đoàn Gucci sở hữu các thương hiệu nổi tiếng như Yves Saint Laurent Rive Gauche, Bottega Veneta, Boucheron, Sergio Rossi, sở hữu một phần Stella McCartney, Alexander McQueen và Balenciaga. Năm 2005, Frida Giannini được bổ nhiệm vào vị trí Giám đốc Sáng tạo. Vị trí đó tiếp tục được thay thế bởi Alessandro Michele vào tháng 1/2015. Hiện tại Gucci trực thuộc Gucci Group, thuộc sở hữu của công ty thời trang Kering với gần 300 cửa hàng trên thế giới."
    );
    break;
  case "adidas":
    overwriteContent(
      "adidas",
      `
        Adidas là tập đoàn đa quốc gia đến từ nước Đức, chuyên sản xuất các mặt hàng giầy dép, quần áo, phụ kiện. Tiền thân của hãng là công ty Gebruder Dassler Schuhfabrik được ra đời vào năm 1924 bởi hai anh em nhà Dassler là Adi Dassler và Rudolf.

        Trong thời gian đầu thương hiệu này đã đạt được những thành công và lợi nhuận khủng. Nhưng sau thế chiến thứ hai, do bất đồng quan điểm nên Rudoft đã tách ra thành lập công ty Ruda, sau này đổi tên là Puma. Trong khi đó Adi Dassler vẫn tiếp tục điều hành công ty cũ và đặt tên mới là Adidas từ năm 1949.

        Ngày nay, Adidas trở thành tập đoàn chuyên sản xuất các mặt hàng thời trang phong cách thể thao lớn thứ hai trên thế giới. Sản phẩm của hãng hiện đã có mặt tại 160 quốc gia và hàng năm tung ra thị trường hơn 660 triệu sản phẩm để phục vụ nhu cầu của người dùng.
        `
    );
    break;
  case "lv":
    overwriteContent(
      "louis vuitton",
      `
        Louis Vuitton là biểu tượng của giới thời trang thượng lưu tại Pháp, nổi tiếng khắp thể giới với logo lồng ghép 2 kí tự LV và các motif mang tính di sản.

        Tinh thần Louis Vuitton hình thành bởi cảm hứng tự do, và khát vọng chinh phục của nhà sáng lâp thương hiệu. Logo lồng ghép 2 kí tự LV, các motif Damier màu nâu và họa tiết Monogram đã trở thành biểu tượng mang tính di sản của thương hiệu. Sự quyến rũ ma mị và đầy “ám ảnh” của những chiếc vali, túi xách thương hiệu Louis Vuitton là niềm tự hào của lối sống tinh tế và xa xỉ phong cách Pháp. Lịch sử hình thành và phát triển của thương hiệu Louis Vuitton gắn liền với nỗ lực ngăn chặn nạn sao chép ý tưởng và mẫu mã. Tuy nhưng, Louis Vuitton lại là thương hiệu có các sản phẩm bị làm giả nhiều nhất trong lịch sử thời trang, chỉ hơn 1% sản phẩm của Louis Vuitton trên toàn thế giới là hàng thật chính hãng.
        `
    );
    break;
  case "puma":
    overwriteContent(
      "puma",
      `
        Thương hiệu Puma có công ty chính thức là Puma SE, chuyên sản xuất giày và các dụng cụ thể thao khác, có trụ sở tại Herzogenaurach, Bavaria, Đức. Công ty được thành lập năm 1924 bởi Adolf và Rudolf Dassler. Quan hệ giữa hai anh em rạn nứt và vào năm 1948, họ tách ra thành 2 thương hiệu: Adidas và Puma. Cả hai công ty hiện nay đều có trụ sở đóng tại Herzogenaurach, Đức.
        
        Puma sản xuất giày đá bóng và bảo trợ cho nhiều cầu thủ như Pelé, Eusébio, Johan Cruijff, Enzo Francescoli, Diego Maradona, Lothar Matthäus, Kenny Dalglish, Didier Deschamps, Robert Pires, Zlatan Ibrahimović, Radamel Falcao, Sergio Agüero, Cesc Fàbregas, Marco Reus, và Gianluigi Buffon. Puma cũng là nhà tài trợ của vận động viên điền kinh Jamaica Usain Bolt. Ở Mỹ, công ty nổi tiếng với sản phẩm giày bóng rổ Puma Clyde được ra mắt năm 1968, sản phẩm này mang tên của ngôi sao bóng rổ Walter "Clyde" Frazier thuộc đội New York Knicks.

        Sau khi tách ra làm ăn riêng, Rudolf Dassler ban đầu đăng ký tên công ty mới thành lập là Ruda nhưng sau đó đổi thành Puma. Logo đầu tiên của Puma là hình một con thú nhảy qua chữ D. Cùng với tên công ty, biểu trưng này được đăng ký vào năm 1948.

        Công ty bán ra thị trường dòng sản phẩm giày và quần áo thể thao được thiết kế bởi Lamine Kouyate, Amy Garbers và các nhà thiết kế khác. Từ 1996, Puma đã mở rộng hoạt động sang thị trường Mỹ. Từ 2007, Puma SE trở thành một phần của tập đoàn sản xuất hàng xa xỉ của Pháp - Kering. Hiện tại Rihhan đang là gương mặt đại diện của hãng.
        `
    );
    break;
  case "supreme":
    overwriteContent(
      "supreme",
      `
        Supreme được biết đến là một thương hiệu thời trang đường phố của Mỹ vô cùng nổi tiếng, với mức độ tiêu thụ khủng trên toàn cầu. Tại Việt Nam, những năm gần đây, thương hiệu này cũng dần trở nên phổ biến hơn, nhất là trong giới trẻ.
        
        Quay trở về nhiều năm trước, lúc mới thành lập vào tháng 4/1994, Supreme chỉ là một cửa hàng nhỏ tại kinh đô thời trang hoa lệ New York. Họ chuyên sản xuất, cung cấp các vật dụng liên quan đến bộ môn Skateboarding (trượt ván) với các chủng loại và thiết kế khác nhau.
        
        Thời điểm đó làn sóng văn hóa hiphop và rock đang lan rộng trong giới trẻ, đi kèm với đó là sự phát triển của bộ môn trượt ván. Vì vậy, những người lui tới cửa hàng đa số các thanh thiếu niên chịu ảnh hưởng từ làn sóng văn hóa này.

        Chủ cửa hàng là nhà thiết kế James Jebbia cũng là người đam mê bộ môn trượt ván. Nhờ vào khả năng nhạy bén, ông nhận ra tại thời điểm đó, có rất ít công ty ván trượt nào chuyên sản xuất sản phẩm dành cho đối tượng thanh thiếu niên. Họ có suy nghĩ rằng niềm đam mê này chỉ là một trào lưu và sẽ mau chóng thay đổi như những trào lưu trước đó.

        Vì vậy, James quyết định sáng lập ra thương hiệu không chỉ sản xuất ván trượt mà còn thiết kế nên các sản phẩm dành cho tín đồ của bộ môn này, chủ yếu là tuổi teen đam mê hiphop, rock. Logo của thương hiệu này tưởng chừng rất đơn giản nhưng không kém phần ấn tượng, bao gồm: chữ Supreme được viết bằng phông chữ Futura Bold Oblique (in đậm và nghiêng) màu trắng nằm trong một khuôn hình chữ mình có màu đỏ tươi.

        Từ đó cho đến nay, Supreme trở thành thương hiệu lớn mạnh, không có đối thủ trong giới thời trang phong cách đường phố trên toàn thế giới.
        `
    );
    break;
  default:
    overwriteContent("no brand", "No data");
    break;
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
