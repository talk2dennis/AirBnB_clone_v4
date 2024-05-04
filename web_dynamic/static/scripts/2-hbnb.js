$(document).ready(function () {
    // initialising the list var
    let selected = {};
    
    $('input[type="checkbox"]').change(function() {
        if ($(this).is(":checked")) {
            selected[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete selected[$(this).attr('data-id')];
        }
        $('.amenities h4').text(Object.values(selected).join(', '));
    });

    // Fetch the status of the API
    let url = "http://0.0.0.0:5001/api/v1/status/"

    $.get(url, function (response, status) {
        console.log(response)
        console.log(status)
        if (status === "success") {
            console.log(response)
        }
    })
});

