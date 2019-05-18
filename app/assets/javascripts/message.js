$(function(){
  function buildHTML(message){
    var MessageImage = (message.image) ? `<img src="${ message.image }">`: "";

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

  var buildMessageHTML = function(message){
    if (message.body && message.image) {
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
                    <img src="${message.image}">
                  </div>`
    }else if (message.body) {
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
                  </div>`
    }else if (message.image) {
      var html = `<div class="message" data-message-id="${message.id}">
                    <div class="upper-info">
                      <p class="upper-info__user">
                        ${message.user_name}
                      </p>
                      <p class="upper-info__date">
                        ${message.created_at}
                      </p>
                    </div>
                    <img src="${message.image}">
                  </div>`
    };
    return html;
  };

  var reloadMessages = function(){
    var last_message_id = $('.message:last').data('message-id');

    var dirPathname = location.pathname.split("/");
    var currentGroupname = dirPathname[2]

    $.ajax({
      url: `/groups/${currentGroupname}/api/messages`,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      var insertHTML = '';
      messages.forEach(function(message){
        if (message.id > last_message_id){
          insertHTML += buildMessageHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, "first");
        }
      });
    })
    .fail(function(){
      alert('自動更新に失敗しました');
    })
  };

  $(function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      setInterval(reloadMessages, 5000);
    }
  });
});