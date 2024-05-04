$(document).ready(function () {
    // initialising the list var
    let selected = {};
    
    $('input[type="checkbox"]').change(function() {
        if ($(this).is(":checked")) {
            selected[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete selected[$(this).attr('data-id')];
        }
        if (Object.keys(selected).length === 0) {
            $('div.amenities h4').html('&nbsp');
          } else {
            $('.amenities h4').text(Object.values(selected).join(', '));
          }
    });

    // Fetch the status of the API
    let url = "http://localhost:5001/api/v1/status/"

    $.get(url, function (response) {
        if (response.status === "OK") {
            $("#api_status").addClass("available");
            console.log(response);
        } else {
            $("#api_status").removeClass("available");
        }
    })
});

