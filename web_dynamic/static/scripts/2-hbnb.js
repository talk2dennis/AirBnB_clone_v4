$(document).ready(function () {
    // initialising the list var
    let selected = {};
    $(input[type='checkbox']).$().change(function () { 
        if ($(this).is(":checked")) {
            selected[$(this).atrr('data-id')] = $(this).atrr('data_name');
        } else {
            delete selected[$(this).atrr('data-id')];
        }
        $('.amenities h4').text(Object.values(amenities).join(', '));
    });
})
