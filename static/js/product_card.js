const list_of_goods = {};
const where_is_id_rows = {};

const built_table = function(){

  const table = $('<table class="table table-bordered table-dark"></table>')

  table.append($(`<thead class="thead-dark"><tr><th scope="col">№</th>\
                            <th scope="col">Название</th>\
                            <th scope="col">Сумма</th>\
                            <th scope="col">Кол-во</th></tr></thead>`));

  const tbody = $('<tbody id="tablebody"></tbody>');

  tbody.append($(`<tr><th scope="col">-</th>
                      <td>Общая :</td>
                      <td id="total_sum">0</td>
                      <th id="total_amount">0</th></tr>`));

  table.append(tbody);
  $('#card_information').html('');
  $('#card_information').append(table);
}

built_table();

const add_row = function(text, summ, amount) {

  const tmp = $(`<tr><th scope="col">${product_id}</th>\
      <td style="min-width: 70%;">${text}</td>\
      <td style="min-width: 15%;">${summ}</td>\
      <td style="text-align: right;">
      <div class="delete_raw"></div>
      <input id=\"quantity\" min="0" type=\"number\" value =\"${amount}\" class=\"quantity_inp\" style="max-width: 100px;">
      </td></tr>`);

  $('#tablebody').append(tmp);

  if (!$('#button_by').length){
    $('#card_information').append('<div id="button_by"><input type="button" class="btn btn-success" value="Оформить заказ"></div>');
  }

  return tmp;
}

const sum_amount = function() {
  let total = 0;
  let amount = 0;
  Object.keys(list_of_goods).forEach(key => {
    total+=list_of_goods[key].summ;
    amount+=list_of_goods[key].amount;
    });
  $('#total_sum').html(total);
  $('#total_amount').html(amount);
}

const alter_row = function(id, summ, amount){
  where_is_id_rows[id].children().eq(2).html(summ);
  where_is_id_rows[id].children().eq(3).children().last().val(amount);
  sum_amount();
}

$('.btn.btn-sm.btn-outline-secondary').on('click',function(event){
  const obj = {};
  const text = $(this).parent().parent().parent().children('.card-text').text();
  const summ = parseFloat($(this).parent().parent().children().last().text());
  let amount = 1;

  if (list_of_goods.hasOwnProperty(text)) {
    list_of_goods[text].amount+=1;
    list_of_goods[text].summ +=summ;
    alter_row(list_of_goods[text].id, list_of_goods[text].summ, list_of_goods[text].amount);
  }
  else{
    obj['text'] = text;
    obj['summ'] = summ;
    obj['amount'] = 1;
    obj['price'] = summ;
    obj['id'] = product_id;
    list_of_goods[text] = obj;
    product_id++;
    where_is_id_rows[obj['id']] = add_row(text, summ, amount);

    $('.delete_raw').on('mousedown', function(event){
      delete list_of_goods[$(this).parent().parent().children().eq(1).text()];
      $(this).parent().parent().remove();
      sum_amount();
      if (Object.keys(list_of_goods).length === 0) $('#button_by').remove();
    });

  }
  sum_amount();
});

$('#button_whole_card').on('click',function(event){
  $('.py-5.text-center.container').slideToggle(100);
  if($(this).attr('value') === 'Показать корзину'){
    $(this).attr('value','Скрыть корзину');
  }
  else {
    $(this).attr('value','Показать корзину');
  }
});

$(document).on('change','input', function(){

  if($(this).attr('id')!='quantity') return;

  const name = $(event.target).parent().parent().children().eq(1).text();
  list_of_goods[name].summ = list_of_goods[name].price * $(event.target).val();
  list_of_goods[name].amount = parseInt($(event.target).val());
  $(event.target).parent().parent().children().eq(2).html(list_of_goods[name].summ)

  sum_amount();
});
