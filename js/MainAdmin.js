$(document).ready(function () {
  // Add logo
  $("head").append(`
    <link rel="shortcut icon" href="../images/icon.ico" type="image/x-icon">
    `);

  $(".close").click(function () {
    $(this).parent().fadeOut();
  });

  if (document.querySelector("body#indexAdmin")) {
    // Load
    window.addEventListener("load", function () {
      $("#home").slideDown();
      addCSSFlex($("#home"));

      if (JSON.parse(sessionStorage.getItem("listProductsFromAdmin"))) {
        var listProductsAdmin = Array.from(
          JSON.parse(sessionStorage.getItem("listProductsFromAdmin"))
        );
        $("#manageProduct tbody").html("");
        listProductsAdmin.forEach(function (el) {
          var gender = el.gender == "men" ? "Nam" : "Nữ";
          var color = capitalizeLetter(el.color);
          var species = capitalizeLetter(el.species);
          var brand = capitalizeLetter(el.brand);
          $("#manageProduct tbody").append(
            `
                        <tr>
                            <td class="numberOrder">1</td>
                            <td>${el.id}</td>
                            <td>${el.name}</td>
                            <td>${brand}</td>
                            <td>${species}</td>
                            <td>${gender}</td>
                            <td>${color}</td>
                            <td>${el.price}</td>
                            <td>
                                <picture>
                                    <img src="${el.link_img}" alt="">
                                </picture>
                            </td>
                            <td>
                                <div class="wrap-edit-button">
                                    <button class="btn btn-light btn-edit-product" data-manageName="product"><i class="fal fa-edit"></i></button>
                                    <button class="btn btn-light btn-remove-product" data-manageName="product"><i class="fal fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                        `
          );
        });
      }

      numberOrder("#manageProduct");
      editProduct();
      btnRemove("#manageProduct");
    });

    // User
    $(".user-logOut").click(function () {
      close();
      window.open("./LoginAdmin.html", "_blank").focus();
    });

    // Home click
    $(".home").click(function () {
      $(".add-edit").css("display", "none");
      $(".right-content-item").slideUp();
      $("#home").slideDown();
      addCSSFlex($("#home"));
    });

    addCSSFlex = (selector) => {
      $(selector).css("display", "flex");
    };

    // Hover avatar
    $(".avatar-wrapper").hover(
      function () {
        // over
        $(this)
          .siblings()
          .children(".name-user")
          .css("text-decoration", "underline");
      },
      function () {
        // out
        $(this).siblings().children(".name-user").css("text-decoration", "");
      }
    );
    // Show dropdown avatar
    $(".avatar-wrapper, .name-user").click(function () {
      $(".user-dropdown").slideToggle();
      $(".user-dropdown").css("display", "flex");
      if ($(".name-user .fa-caret-right").hasClass("active")) {
        $(".name-user .fa-caret-right").removeClass("active");
      } else {
        $(".name-user .fa-caret-right").addClass("active");
      }
    });
    // Active navigation with CSS
    $(".content-item").click(function () {
      $(this).siblings().slideToggle();
      // $('.content-item').removeClass('active');
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).children(".fa-caret-right").removeClass("active");
        $(".dropdown-item").removeClass("active");
      } else {
        $(this).children(".fa-caret-right").addClass("active");
        $(this).addClass("active");
      }
    });
    // Dropdown navigation
    $(".dropdown-item, .box .title").click(function () {
      $(".add-edit").slideUp();
      $(".dropdown-item").removeClass("active");
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
      } else {
        $(this).addClass("active");
      }

      // Add animate slide
      if ($(this).hasClass("manageProduct")) {
        // $('#add-edit-product').slideUp();
        $(".right-content-item").slideUp();
        $("#manageProduct").slideDown();
      } else if ($(this).hasClass("manageSpecies")) {
        // $('#add-edit-product').slideUp();
        $(".right-content-item").slideUp();
        $("#manageSpecies").slideDown();
      } else if ($(this).hasClass("manageSupplier")) {
        // $('#add-edit-product').slideUp();
        $(".right-content-item").slideUp();
        $("#manageSupplier").slideDown();
      } else if ($(this).hasClass("manageNews")) {
        $(".right-content-item").slideUp();
        $("#manageNews").slideDown();
      }
    });

    CKEDITOR.replace("textarea");

    ID = (text, number) => {
      return text + Math.random().toString().substr(3, number).toUpperCase();
    };

    var product = {},
      species = {};
    var check;

    // Thêm mới
    $(".btn-addNew").click(function () {
      if ($(this).attr("data-manageName") === "product") {
        var id = ID("HH", 6);

        var listProductsAdmin = JSON.parse(
          sessionStorage.getItem("listProductsFromAdmin")
        );
        if (listProductsAdmin) {
          for (var i = 0; i < listProductsAdmin.length; i++) {
            if (listProductsAdmin[i].id == id) {
              id = ID("HH", 6);
              i = -1;
            }
          }
        }

        check = 1;
        $(".add-edit-left h2").text("THÊM SẢN PHẨM");
        $(".inp-id").val(id);
        changeImg();
        $(".add-edit-right img").attr("src", "");
        $(".add-edit-left .inp-price").val("");
        $(".add-edit-left .inp-name").val("");
        $(this).parents("#manageProduct").slideUp();
        $("#add-edit-product").slideDown();

        setSpecies($("#add-edit-product"));
      } else if ($(this).attr("data-manageName") === "species") {
        var id = ID("LSP", 5);

        var listSpeciesAdmin = JSON.parse(
          sessionStorage.getItem("listSpeciesFromAdmin")
        );
        if (listSpeciesAdmin) {
          for (var i = 0; i < listSpeciesAdmin.length; i++) {
            if (listSpeciesAdmin[i].id == id) {
              id = ID("LSP", 5);
              i = -1;
            }
          }
        }

        check = 2;
        $(".add-edit-left h2").text("THÊM LOẠI SẢN PHẨM");
        $(".inp-id").val(id);
        $(".add-edit-left .inp-name").val("");
        $(this).parents("#manageSpecies").slideUp();
        $("#add-edit-species").slideDown();
      }
    });

    $(".btn-exit").click(function () {
      $(".right-content-item").css("display", "none");
      $(this).parents(".add-edit").slideUp();
      if ($(this).parents("#add-edit-product").length > 0) {
        $("#manageProduct").slideDown();
      } else if ($(this).parents("#add-edit-species").length > 0) {
        $("#manageSpecies").slideDown();
      }
    });

    changeImg = () => {
      $("#fileProduct").change(function () {
        var reader = new FileReader();
        reader.onload = function (e) {
          $(".add-edit-img-product-wrapper img").attr("src", e.target.result);
          product["link_img"] = e.target.result;
        };
        reader.readAsDataURL(this.files[0]);
      });
    };

    $(".btn-confirm").click(function () {
      if (check == 1 || check == 1.1) {
        if (
          $(".add-edit-product img").attr("src") == "" ||
          !checkNumber($(".add-edit-product .inp-price").val()) ||
          $(".add-edit-product .inp-name").val().trim() == ""
        ) {
          $(".alert").fadeIn();
          setTimeout(function () {
            $(".alert").fadeOut();
          }, 2000);
        } else {
          if (check == 1) {
            product["id"] = $(".add-edit-product .inp-id").val();
            product["name"] = $(".add-edit-product .inp-name").val();
            product["price"] =
              Number($(".add-edit-product .inp-price").val()).toLocaleString(
                "es-ES"
              ) + " VND";
            product["color"] = $(
              ".add-edit-product #color option:selected"
            ).text();
            product["species"] = $(
              ".add-edit-product #species option:selected"
            ).text();
            product["brand"] = $(
              ".add-edit-product #brand option:selected"
            ).text();
            product["gender"] = $(
              ".add-edit-product #gender option:selected"
            ).text();

            sessionStorage.setItem("productAdded", JSON.stringify(product));
            addProduct();
          } else if (check == 1.1) {
            product["id"] = $(".add-edit-product .inp-id").val();
            product["name"] = $(".add-edit-product .inp-name").val();
            product["price"] =
              Number($(".add-edit-product .inp-price").val()).toLocaleString(
                "es-ES"
              ) + " VND";
            product["color"] = $(
              ".add-edit-product #color option:selected"
            ).text();
            product["species"] = $(
              ".add-edit-product #species option:selected"
            ).text();
            product["brand"] = $(
              ".add-edit-product #brand option:selected"
            ).text();
            product["link_img"] = $(".add-edit-img-product-wrapper img").attr(
              "src"
            );
            product["gender"] = $(
              ".add-edit-product #gender option:selected"
            ).text();

            // sessionStorage.setItem('product', JSON.stringify(product));

            // updateSession(product);

            $("#manageProduct tbody tr").each(function () {
              if ($(this).find("td:nth(1)").text() == product["id"]) {
                $(this).find("td:nth(2)").text(product["name"]);
                $(this).find("td:nth(3)").text(product["brand"]);
                $(this).find("td:nth(4)").text(product["species"]);
                $(this).find("td:nth(5)").text(product["gender"]);
                $(this).find("td:nth(6)").text(product["color"]);
                $(this).find("td:nth(7)").text(product["price"]);
                $(this).find("td:nth(8) img").attr("src", product["link_img"]);
              }
            });
          }
          getProducts();
          $("#manageProduct").slideDown();
          numberOrder("#manageProduct");
          btnRemove("#manageProduct");
          $(this).parents(".add-edit").slideUp();
        }
      } else if (check == 2 || check == 2.2) {
        if ($(".add-edit-species .inp-name").val().trim() == "") {
          $(".alert").fadeIn();
          setTimeout(function () {
            $(".alert").fadeOut();
          }, 2000);
        } else {
          if (check == 2) {
            species["id"] = $(".add-edit-species .inp-id").val();
            species["name"] = $(".add-edit-species .inp-name").val();

            addSpecies();
            updateSpecies();
          } else {
            species["id"] = $(".add-edit-species .inp-id").val();
            species["name"] = capitalizeLetter(
              $(".add-edit-species .inp-name").val()
            );

            $("#manageSpecies tbody tr").each(function () {
              if ($(this).find("td:nth(1)").text() == species["id"]) {
                $(this).find("td:nth(2)").text(species["name"]);
              }
            });
          }
          $("#manageSpecies").slideDown();
          numberOrder("#manageSpecies");
          btnRemove("#manageSpecies");
          $(this).parents(".add-edit").slideUp();
        }
      }
    });

    // Add product
    addProduct = () => {
      var prod = JSON.parse(sessionStorage.getItem("productAdded"));
      $("#manageProduct tbody").append(`
            <tr>
                <td class="numberOrder">5</td>
                <td>${prod.id}</td>
                <td>${prod.name.toUpperCase()}</td>
                <td>${prod.brand}</td>
                <td>${prod.species}</td>
                <td>${prod.gender}</td>
                <td>${prod.color}</td>
                <td>${prod.price}</td>
                <td>
                    <picture>
                        <img src="${prod.link_img}" alt="">
                    </picture>
                </td>
                <td>
                    <div class="wrap-edit-button">
                        <button class="btn btn-light btn-edit-product"><i class="fal fa-edit"></i></button>
                        <button class="btn btn-light btn-remove-product"><i class="fal fa-trash"></i></button>
                    </div>
                </td>
            </tr>
            `);

      editProduct();
    };
    // Add species
    addSpecies = () => {
      $("#manageSpecies tbody").append(
        `
                <tr>
                    <td class="numberOrder">1</td>
                    <td>${species.id}</td>
                    <td>${capitalizeLetter(species.name)}</td>
                    <td>
                        <div class="wrap-edit-button">
                            <button class="btn btn-light btn-edit-species" data-manageName="species"><i class="fal fa-edit"></i></button>
                            <button class="btn btn-light btn-remove-species" data-manageName="species"><i class="fal fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
                `
      );
    };
    // Update product
    editProduct = () => {
      $(".btn-edit-product").click(function () {
        setSpecies($("#add-edit-product"));

        var brand = $(this)
          .parents("tr")
          .find("td:nth(3)")
          .text()
          .toLowerCase();
        var species = $(this)
          .parents("tr")
          .find("td:nth(4)")
          .text()
          .toLowerCase();
        var gender =
          $(this).parents("tr").find("td:nth(5)").text().toLowerCase() == "nữ"
            ? "women"
            : "men";
        var color = $(this)
          .parents("tr")
          .find("td:nth(6)")
          .text()
          .toLowerCase();
        changeImg();
        $("#manageProduct").slideUp();
        $("#add-edit-product").slideDown();

        $(".add-edit-product h2").text("SỬA SẢN PHẨM");
        $(".add-edit-product .inp-id").val(
          $(this).parents("tr").find("td:nth(1)").text()
        );
        $(".add-edit-product .inp-name").val(
          $(this).parents("tr").find("td:nth(2)").text()
        );
        $(".add-edit-product .inp-price").val(
          $(this)
            .parents("tr")
            .find("td:nth(7)")
            .text()
            .replace(/[VND.]/g, "")
        );
        $(".add-edit-product .add-edit-img-product-wrapper img").attr(
          "src",
          $(this).parents("tr").find("td:nth(8) img").attr("src")
        );
        $(`.add-edit-product #brand option[value='${brand}']`).attr(
          "selected",
          "selected"
        );
        $(`.add-edit-product #species option[value='${species}']`).attr(
          "selected",
          "selected"
        );
        $(`.add-edit-product #gender option[value='${gender}']`).attr(
          "selected",
          "selected"
        );
        $(`.add-edit-product #color option[value='${color}']`).attr(
          "selected",
          "selected"
        );
        check = 1.1;

        $(".btn-exit").click(function () {
          $(this).parents("#add-edit-product").slideUp();
          $(".right-content-item").css("display", "none");
          $("#manageProduct").slideDown();
        });
      });
    };
    editProduct();
    // Update species
    updateSpecies = () => {
      $(".btn-edit-species").click(function () {
        let id = $(this).parents("tr").find("td:nth(1)").text();
        let name = $(this).parents("tr").find("td:nth(2)").text();

        $("#manageSpecies").slideUp();
        $("#add-edit-species").slideDown();

        $(".add-edit-species h2").text("SỬA LOẠI SẢN PHẨM");
        $(".add-edit-species .inp-id").val(id);
        $(".add-edit-species .inp-name").val(name);
        check = 2.2;

        $(".btn-exit").click(function () {
          $(this).parents("#add-edit-species").slideUp();
          $(".right-content-item").css("display", "none");
          $("#manageSpecies").slideDown();
        });
      });
    };
    updateSpecies();
    // get Species
    getSpecies = () => {
      let arrSpecies = [];
      $("#manageSpecies tbody tr").each(function () {
        arrSpecies.push($(this).find("td:nth(2)").text());
      });
      return arrSpecies;
    };
    // set Species
    setSpecies = (selector) => {
      let arrSpecies = getSpecies();
      arrSpecies.forEach((specie, index) => {
        if (index === 0) {
          selector.find("select#species").html(`
          <option value="${specie.toLowerCase()}">${capitalizeLetter(
            specie
          )}</option>
        `);
        } else {
          selector.find("select#species").append(`
            <option value="${specie.toLowerCase()}">${capitalizeLetter(
            specie
          )}</option>
          `);
        }
      });
    };
    // Update session listProduct when edit
    // updateSession = (product = {}) => {
    //     const newProducts = JSON.parse(sessionStorage.getItem('listProductsFromAdmin')).map(pro => {
    //         console.log(pro.id, product.id)
    //         if(product.id.trim() === pro.id.trim()) {
    //             console.log(pro, product)
    //             pro = product;
    //             pro.gender = pro.gender.toLowerCase() === 'nam' ? 'men' : 'women';
    //             pro.brand = pro.brand.toLowerCase();
    //             pro.color = pro.color.toLowerCase();
    //         }
    //         return pro;
    //     })
    //     sessionStorage.setItem(
    //       "listProductsFromAdmin",
    //       JSON.stringify(newProducts)
    //     );
    // }
    // Reset number order
    numberOrder = (selector) => {
      var len = $(`${selector} .numberOrder`).length;
      var numberOrder = $(`${selector} .numberOrder`);
      for (var i = 0; i < len; i++) {
        $(numberOrder[i]).text(i + 1);
      }
    };
    // Reset button remove
    btnRemove = (selector) => {
      $(".btn-remove-product, .btn-remove-species").click(function () {
        $(this).parents("tr").remove();
        numberOrder(selector);
        getProducts();
      });
    };
    btnRemove("#manageProduct");
    btnRemove("#manageSpecies");
    // Get list products
    getProducts = () => {
      var products = [];
      products = $("#manageProduct tbody tr").map(function () {
        return {
          id: $(this).find("td:nth(1)").text(),
          name: $(this).find("td:nth(2)").text(),
          brand: $(this).find("td:nth(3)").text().toLowerCase(),
          gender:
            $(this).find("td:nth(5)").text().toLowerCase() == "nữ"
              ? "women"
              : "men",
          color: $(this).find("td:nth(6)").text().toLowerCase(),
          species: $(this).find("td:nth(4)").text(),
          price: $(this).find("td:nth(7)").text(),
          link_img: $(this).find("td:nth(8) img").attr("src"),
        };
      });

      sessionStorage.setItem("listProductsFromAdmin", JSON.stringify(products));
    };
    // getProducts();

    // Function capitalizeFirstLetter
    capitalizeLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // Function check number
    checkNumber = (num) => {
      return Number(num) ? true : false;
    };

    //Filter in table
    filterTable = () => {
      $(".filter-table").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(this)
          .parent()
          .parent()
          .parent()
          .find("tbody tr")
          .filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
          });
      });
    };
    filterTable();
  }

  if (document.querySelector("body#login")) {
    var adminAccount = [
      {
        username: "admin",
        password: "admin",
      },
      {
        username: "minh",
        password: "1",
      },
      {
        username: "minh",
        password: "2",
      },
    ];

    $(".submit-login").click(function () {
      var check = false;
      adminAccount.forEach(function (el) {
        if (
          el.username == $("#username").val().trim() &&
          el.password == $("#password").val().trim()
        ) {
          $(".alert-success").fadeIn();
          setTimeout(function () {
            window.open("./IndexAdmin.html", "_parent");
          }, 1500);
          check = true;
          return;
        }
      });
      if (!check) {
        $(".alert-danger").fadeIn();
        setTimeout(function () {
          $(".alert-danger").fadeOut();
        }, 3000);
      }
    });
  }
});
