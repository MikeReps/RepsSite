 $(document).ready(function(){
     $("body").css("display", "none").fadeIn(500);

     $("a.transition").click(function(event){
         event.preventDefault();
         linkLocation = this.href;
         $("body").fadeOut(500, redirectPage);
     });

     function redirectPage() {
         window.location = linkLocation;
     }

    $("#trial").click(function (){
        $('html, body').animate({scrollTop:$(document).height()}, 800);
        return false;
    });

    $(".header").click(function (){
        $('html, body').animate({scrollTop:0}, 800);
        return false;
    });

     $("#emailForm").submit(function(){
         event.preventDefault();
     });

    $("#Send").click(function(event){
        var alert = $("#msg");
        var mail = $("#Email");
        var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;
        event.preventDefault();
        if ($("#Name").val() === '' || mail.val() === '' || $("#Message").val() === '') return alert.text("Please fill all fields!");
        if (mail.val().search(pattern) !== 0) return alert.text("Enter valid Email!");
        alert.empty();

        var formData = $("#emailForm").serialize();
        $.ajax ({
            url: '/send',
            type: 'POST',
            data: formData,
            success: function(result) {
                alert.empty().text(result);
            },
            error: function(err) {
                alert.empty().text("There is error " + err.status + ", error message: " + err.statusText);
            },
            dataType: "html",
            timeout: 60000
        });
    });
 });
