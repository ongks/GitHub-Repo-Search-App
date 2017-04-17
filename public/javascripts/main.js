//Captures search result in 'val' upon pressing enter
$(function(){
    var source = $("#search-results").html();
    var dataTemplate = Handlebars.compile(source);
    $results = $('#results');

    $('#search').on('keyup', function(e){
        if(e.keyCode === 13) {
            var parameters = { 
                search: $(this).val() 
            };
            $.get( '/search',parameters, function(data) {
                if (data instanceof Array) {
                    $results.html(dataTemplate({resultsArray: data}));
                    manageButtons();
                } else {
                    $results.html(data);
                }
            });
        };
    });
});

var manageButtons = function() {

  var _btns = document.querySelectorAll('.btn'),

    _eachBtn = function(callback) {
      Array.prototype.forEach.call(_btns, function(elem) {
        callback.call(this, elem);
      });
    },
    _initListener = function(e) {
      e.preventDefault();
      e.stopPropagation();
      _eachBtn(function(btn) {
        btn.classList.remove('dropdown-open')
      });
      this.classList.toggle('dropdown-open');
    },
    _hideAll = function() {
      _eachBtn(function(btn) {
        btn.classList.remove('dropdown-open');
      });
    };

  _eachBtn(function(btn) {
    btn.addEventListener('touchend', function(e) {
      _initListener.call(this, e);
    });

    btn.addEventListener('click', function(e) {
      _initListener.call(this, e);
    });
  });

  document.addEventListener('touchend', function() {
    _hideAll();
  });
  
  document.addEventListener('click', function() {
    _hideAll();
  });
};