$(document).on('turbolinks:load', function(){
$(function() {

  var search_user = $('#user-search-result');

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_user.append(html);
  }

  function appendErrMsgToHTML(msg){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    search_user.append(html);
  }

  var member_list = $('#chat-group-users');

  function addUser(userId, userName){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${userId}'>
                  <input name='group[user_ids][]' type='hidden' value='${userId}'>
                  <p class='chat-group-user__name'>${userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    member_list.append(html);
  }

  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();

      var addedUserListIds = [];
      $('.js-chat-member').each(function(){
        addedUserListIds.push($(this).attr('id'));
      });

      if (users.length !== 0){
        users.forEach(function(user){
          var resultId = $.inArray(`chat-group-user-${user.id}`, addedUserListIds);

          if (resultId === -1){
            appendUser(user);
          }else{
            appendErrMsgToHTML("一致するユーザーが見つかりません");
          }
        });
      }else{
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }

      if (input.length === 0){
        $('#user-search-result').empty();
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });

  $(document).on('click', ".user-search-add", function(){
    var userId = $(this).data('user-id');
    var userName = $(this).data('user-name');
    addUser(userId, userName);
    $(this).parent().remove();
  });

  $(document).on('click', ".user-search-remove", function(){
    $(this).parent().remove();
  });
});
});
