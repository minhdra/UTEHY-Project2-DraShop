$(document).ready(function () {
    window.addEventListener('load', function() {
        var bill = JSON.parse(this.sessionStorage.getItem('bill'));

        $('.amount-cart').text(bill.totalProducts);
        $('.total:first').text(bill.total_tmp);
        $('.total-real').text(bill.total_real);
    })

    $('.btn-toPayment').click(function() {
        $(this).parents('.checkOut-content').removeClass('active');
        $(this).parents('.checkOut-content').siblings('.checkOut-content').addClass('active');
        $('.payment').addClass('active');
    })
});