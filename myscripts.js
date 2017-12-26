var value_pizza_names = ['Pepperoni', 'Hawaiian', 'Vegetarian', 'Cheese', 'Ham and Cheese']
var traditional_pizza_names = ['Meat Lovers', 'Supreme Vegetarian', 'Wedge', 'Double Bacon', 'Double Meat and Cheese', 'BBQ Bacon', 'Italian', 'Triple Cheese', 'g', 'd', 's,', 'a']
var gourmet_pizza_names = ['Ultimate Meat Lovers', 'BBQ Chicken', 'Supreme Chicken', 'Apricot Chicken', 'Spicy Chicken']
//var current_order_names = [];
var current_order_names = {};
const VALUE_PRICE = 5;
const TRADITIONAL_PRICE = 8;
const GOURMET_PRICE = 13;
const LARGE_EXTRA_PRICE = 3;

const DEFAULT_SIZE = 'Medium';
const DEFAULT_BASE = 'Classic';

var current_size = DEFAULT_SIZE
var current_base = DEFAULT_BASE
var current_quantity = 1;
var pizza_id_iterator = 0;

function makePizzas(array, pizza_type) {
  for(var i = 0; i < array.length; i++) {
    var div = document.createElement('div');
    div.innerHTML = array[i];
    div.className = "pizza";
    div.id = array[i];

    price_div = document.createElement('div');
    price_div.innerHTML = '$' + getPizzaPriceFromName(array[i]);
    price_div.className = "pizza_price_menu";
    div.appendChild(price_div);

    add_div = document.createElement('div');
    add_div.innerHTML = 'Add to Order';
    add_div.className = "add button";
    div.appendChild(add_div);
    document.getElementById(pizza_type).appendChild(div);

  }
}

function getPizzaPriceFromName(name, size) {
  var price;

  if (value_pizza_names.indexOf(name) >= 0) {
    price = VALUE_PRICE;
  } else if (traditional_pizza_names.indexOf(name) >= 0) {
    price = TRADITIONAL_PRICE;
  } else {
    price = GOURMET_PRICE;
  }
  if (size === 'Large') {
    price += LARGE_EXTRA_PRICE;
  }
  return price;
}

/*
function getPizzaPriceFromType(type, size) {
  var price;

  if (type == 'value') {
    price = VALUE_PRICE;
  } else if (type === 'traditional') {
    price = TRADITIONAL_PRICE;
  } else {
    price = GOURMET_PRICE;
  }
  if (size === 'Large') {
    price += LARGE_EXTRA_PRICE;
  }
  return price;
}*/

function displayOrder() {
  var current_order = document.getElementById("current_order");
  current_order.innerHTML = '';

  var num_distinct_in_order = 0;
  var total_price = 0;
  $.each(current_order_names, function( index, pizza) {
    mypizza = current_order_names['Cheese0'];
    num_distinct_in_order += 1;
    var div = document.createElement('div');
    var price = getPizzaPriceFromName(pizza.name, pizza.size) * pizza.quantity;
    total_price += price;
    div.innerHTML = pizza.quantity + ' x ' + pizza.name;

    div.className = "order_pizza";
    div.id = index;

    price_span = document.createElement('span');
    price_span.innerHTML = '$' + price;
    price_span.className = "pizza_price";
    div.appendChild(price_span);

    remove_span = document.createElement('span');
    remove_span.innerHTML = '&#x2716';
    remove_span.className = "remove";
    div.appendChild(remove_span);

    details_div = document.createElement('div');

    size_span = document.createElement('span');
    size_span.innerHTML = "Size: " + pizza.size;
    size_span.id = 'size_order';
    details_div.appendChild(size_span);

    base_span = document.createElement('span');
    base_span.innerHTML = "Base: " + pizza.base;
    base_span.id = "base_order";
    details_div.appendChild(base_span);

    div.appendChild(details_div);

    document.getElementById("current_order").appendChild(div);
  });

  if (num_distinct_in_order == 0) {
    document.getElementById('place_button').style.display = 'none';
  }
  else {
    document.getElementById('place_button').style.display = 'block';
  }

  document.getElementById("total_price").innerHTML = "Total: $" + total_price;
  var new_height = num_distinct_in_order * 66 + 100;
  //document.getElementById("order").style.height = new_height + 'px';
  $('.order').animate({height:new_height},250);
  //$('.order').fadeIn('slow');
}

function addPizza(name) {
  var pizza = new Object();
  pizza.name = name;
  pizza.size = current_size;
  pizza.base = current_base;
  pizza.quantity = current_quantity;
  //current_order_names.push(pizza);
  current_order_names[name + pizza_id_iterator] = pizza;
  my = current_order_names[name + pizza_id_iterator];

  pizza_id_iterator += 1;
  restoreOrderDefaults();
  //if (name in current_order_names) {
    //current_order_names[name] += 1;
 // } else {
    //current_order_names[name] = 1;
  //}
}

function removePizza(name) {
  if (name in current_order_names) {
    if (current_order_names[name] > 1) {
      current_order_names[name] -= 1;
       } else {
      delete current_order_names[name];
    }
  } else {
    alert('cant remove pizza which isnt in current order');
  }
}

//http://www.dynamicdrive.com/forums/showthread.php?17849-How-to-grey-out-the-html-page-but-pop-up-a-interactive-dialog-box

function showPopUp(el) {
  var cvr = document.getElementById("cover")
  var dlg = document.getElementById(el)
  cvr.style.display = "block"
  dlg.style.display = "block"
  if (document.body.style.overflow = "hidden") {
    cvr.style.width = "1024"
    cvr.style.height = "100&#37;"
  }
}

function closePopUp(el) {
  var cvr = document.getElementById("cover")
  var dlg = document.getElementById(el)
  cvr.style.display = "none"
  dlg.style.display = "none"
  document.body.style.overflowY = "scroll"
}

function restoreOrderDefaults() {
  current_size = DEFAULT_SIZE;
  current_base = DEFAULT_BASE;
  current_quantity = 1;

  //restore order details ui
  $('.size').removeClass("preview");
  $("#" + DEFAULT_SIZE).addClass("preview");

  $('.base').removeClass("preview");
  $("#" + DEFAULT_BASE).addClass("preview");
  $('#quantity').html("1");
}

$(document).ready(function(){
  $('.pizza_type').hide()
  $('.pizza_type[data-link=value]').show();

  $('.links').mouseover(function() {
    $(this).addClass("preview");
  });

	$('.links').mouseleave(function() {
    $(this).removeClass("preview");
  });




  makePizzas(value_pizza_names, 'value_pizza_type');
  makePizzas(traditional_pizza_names, 'traditional_pizza_type');
  makePizzas(gourmet_pizza_names, 'gourmet_pizza_type');


  $('.links').click(function() {
    $('.links').not(this).removeClass("active");
  	$(this).addClass("active");
    $('.pizza_type').hide();
    var pizza_name = $(this).data('link');
    $('.pizza_type[data-link=' + pizza_name + ']').show();
  });

  $('.size').click(function(event) {
    $('.size').not(this).removeClass("preview");
    $(this).addClass("preview");
    current_size = event.target.id;
  });

  $('.base').click(function(event) {
    $('.base').not(this).removeClass("preview");
    $(this).addClass("preview");
    current_base = event.target.id;
  });

  $('.add').click(function(event) {
    showPopUp('order_popup');
    document.getElementById("popup_name").innerHTML=event.target.parentNode.id;
  });

  $('.cancel_button').click(function(event) {
    closePopUp('order_popup');
    restoreOrderDefaults();
  });

  $('.accept_button').click(function(event) {
    closePopUp('order_popup');
    
    var pizza_name = document.getElementById("popup_name").innerHTML
    addPizza(pizza_name);
    displayOrder();
  });

  $('body').on('click', '.remove', function(event) {
    removePizza(event.target.parentNode.id);
    displayOrder();
  });

  $('body').on('mouseover', '.pizza', function(event) {
    $(this).append( )
  });

  $('#plus').click(function () {
    $('#quantity').html(function (y, val) {
        var new_val = val * 1 + 1;
        current_quantity = new_val;
        return new_val;
    });
  });

  $('#minus').click(function () {
    $('#quantity').html(function (y, val) {
        var new_val = val * 1 - 1;
        if (new_val < 1) {
          return 1;
        }
        else {
          current_quantity = new_val;
          return new_val;
        }
    });
  });
    var increased = parseInt($(this).parent().find('.number').text());
    if (isNaN(increased) || increased > 0) {
        $(this).parent().find('.number').html(function (t, val) {
            return val * 1 - 1
        });
    } else {
      return false;
    }

});