$(function(){
  function buildHTML(message){
    var　MessageImage = (message.image) ? `<img src="${ message.image }">`: "";

    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-info">
                    <p class="upper-info__user">
                      ${message.user_name}
                    </p>
                    <p class="upper-info__date">
                      ${message.created_at}
                    </p>
                  </div>
                  <p class="message__text">
                    ${message.body}
                  </p>
                  ${MessageImage}
                </div>`;
    return html;
  }

  $('.new-message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href + ''
    $('.new-message__submit-btn').removeAttr('data-disable-with');

    $.ajax({
      url: href,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.new-message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, "first");
    })
    .fail(function(){
      alert('非同期通信に失敗しました');
    })
  });
});