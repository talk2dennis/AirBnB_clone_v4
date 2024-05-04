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
});
