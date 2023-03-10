(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(document).ready(function() {
        $(window).scroll(function() {
          if ($(this).scrollTop() > 20) {
            $('#toTopBtn').fadeIn();
          } else {
            $('#toTopBtn').fadeOut();
          }
        });
      
        $('#toTopBtn').click(function() {
          $("html, body").animate({
            scrollTop: 0
          }, 1000);
          return false;
        });
      });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);
//stk push

const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent the form from submitting normally

  const phoneNumber = form.elements.phone_number.value;

  // use the Daraja APIs to initiate the STK push
  const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
  const accessToken = 'your_access_token_here';
  const businessShortCode = 'your_business_short_code_here';
  const passkey = 'your_passkey_here';
  const amount = '10'; // the amount to charge the customer
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3); // current timestamp in the format required by the APIs
  const password = btoa(`${businessShortCode}${passkey}${timestamp}`); // generate the password required by the APIs
  const requestBody = {
    BusinessShortCode: businessShortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: businessShortCode,
    PhoneNumber: phoneNumber,
    CallBackURL: 'https://your-callback-url-here.com',
    AccountReference: 'your_account_reference_here',
    TransactionDesc: 'your_transaction_description_here'
  };
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  };
  fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});


