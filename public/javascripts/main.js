//Captures search result in 'val' upon pressing enter
$(function(){
    $('#search').on('keyup', function(e){
        if(e.keyCode === 13) {
            var parameters = { 
                search: $(this).val() 
            };
            $.get( '/search',parameters, function(data) {
                if (data instanceof Array) {
                    $results.html(dataTemplate({resultsArray: data}));
                } else {
                    $results.html(data);
                }
            });
        };
    });
});