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
        } else {
            $("#api_status").removeClass("available");
        }
    });

    $.ajaxSetup({
        contentType: 'application/json'
    });
    $.post('http://localhost:5001/api/v1/places_search/', '{}', function (data) {
        renderPlaces(data);
    })
    .fail(function(xhr, status, error) {
        console.error('Error:', error);
    });

    // for task 5: to filter search using amenities
    $('button[type="button"]').click(function(){
        // get the selected amenities to a list
        var amenitiesList = Object.keys(selected);
        var data = JSON.stringify({ "amenities": amenitiesList });
        $.ajaxSetup({
            contentType: 'application/json'
        });
        $.post('http://localhost:5001/api/v1/places_search/', data, function (data) {
            renderPlaces(data);
        })
        .fail(function(xhr, status, error) {
            console.error('Error:', error);
        });
    });
    
    
});

function renderPlaces (places) {
    //$placesContainer.empty();
    let placesContainer = $('div .places');
     // Check if the container exists in the DOM
     if (placesContainer.length === 0) {
        console.error("Places container not found in the DOM");
        return;
    }
    if (places.length >= 0) {
        placesContainer.empty()
    }
    places.forEach(place => {
      const html = `
                <article>
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">
                            $${place.price_by_night}
                        </div>
                    </div>
                    <div class="information">
                        <div class="max_guest">
                            <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                            <br />${place.max_guest} Guests
                        </div>
                        <div class="number_rooms">
                            <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                            <br />${place.number_rooms} Bedrooms
                        </div>
                        <div class="number_bathrooms">
                            <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                            <br />${place.number_bathrooms} Bathrooms
                        </div>
                    </div>
                    <div class="description">${place.description}</div>
                </article>
            `;
        placesContainer.append(html);
    });
  }


