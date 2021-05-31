new ClipboardJS('.copy-btn');

$(document).on("click", ".upvote-btn", function(){
    let id = $(this).attr('id').split("-")[0];

    $.ajax({
        method: 'GET',
        url: '/action/upvote/'+ id,
        data: {}
    })
    .done(function(data){
        console.log('success'+ data);


        console.log($('#'+id+'-up').css('color'));

        if($('#'+id+'-up').css('color')=="rgb(255, 165, 0)"){
            $('#'+id+'-up').css('color', '');
        } else {
            $('#'+id+'-up').css('color', "rgb(255, 165, 0)");
        }
    
        $('#'+id+'-down').css('color', '');
        $('#'+id+'-points').html(data.points);
})
    .fail(function(data){
      console.log('error '+data)
    });
});
 
$(document).on("click", ".downvote-btn", function(){
    let id = $(this).attr('id').split("-")[0];

    $.ajax({
        method: 'GET',
        url: '/action/downvote/'+ id,
        data: {}
    })
    .done(function(data){
            console.log('success'+ data);

            if($('#'+id+'-down').css('color')=="rgb(255, 165, 0)"){
                $('#'+id+'-down').css('color', '');
            } else {
                $('#'+id+'-down').css('color', "rgb(255, 165, 0)");
            }
                        $('#'+id+'-up').css('color', '');
            $('#'+id+'-points').html(data.points);
        })
    .fail(function(data){
      console.log('error '+data)
    });
});

function addFiller(){
    if(document.getElementById('comment-area').innerHTML.trim().length==0){
        $('#comment-area').html('<i style="visibility: hidden;" class="la la-plus-circle"></i>');
    }
}
 

$('#comment-input').keypress(function (e) {
    if (e.which == 13) {
        console.log('sin');
      $('#comment-submit').trigger('click');
      return false;    //<---- Add this line
    }
  });

function comment(id, user){
    let comment = $('#comment-input').val();

    $.ajax({
        method: 'POST',
        url: '/action/comment/'+ id,
        data: {message: comment}
    })
    .done(function(data){
        console.log('success'+ data);

        var html = '<div class="post_topbar"><div class="usy-dt"><div class="usy-name"><h3>'+user+'</h3><span><img src="/images/clock.png" alt=""> Just now</span></div></div></div><div class="comment-area"><div style="margin-bottom: 15px; margin-left: 18px;"><p>'+comment+'</p></div></div>';
        $('#comment-area').append(html);
        $('#comment-input').val('')
        
})
    .fail(function(data){
      console.log('error '+data)
    });
};

window.location.href.split("#").join('')

function loadPosts(type, cat, sub, limit, skip, search){
    var skip, bottom;
    var skip = 0;
 

    if(bottom=='reached'){
        return 0;
    }

        $(window).scroll(function() {       

            //if($(window).scrollTop() > $(document).height() - $(window).height() - 5) {
                console.log($(window).scrollTop())
                console.log($('#load-spinner').offset().top - $(window).height() - 1)
                
            if($(window).scrollTop() + $(window).height() > $('#load-spinner').offset().top - 1) {
                skip+=5;
                $.ajax({
                    method: 'POST',
                    url: '/getPosts',
                    data: {type, cat, sub, limit, skip, search}
                }).done(function(data){
                    console.log(data)
                    if(data.length!=0){
                        data.forEach(post => {
                            $('#posts-section').append(newPost(post))
                            //skip++;
                        })
                        console.log('skip: '+skip);
                    } else {
                        $('#load-spinner').html('<h2>Oops! We are out of posts for you</h2>')
                        bottom = 'reached';
                    }
                }).fail(function(error){
                    console.log('Error '+ error);
                })
            }
        });
    }
 


$(document).on("click", ".follow-btn", function(){
    let user = $(this).attr('id').split("-")[1];

    $.ajax({
        method: 'POST',
        url: '/user/'+ user +'/follow',
        data: {}
    })
    .done(function(data){
        console.log('success'+ data);
        if(data.action=='followed'){
            $('#follow-'+user).html('<i class="fa fa-minus"></i> Unfollow');
        } else if(data.action=='unfollowed'){
            $('#follow-'+user).html('<i class="fa fa-plus"></i> Follow');
        }
})
    .fail(function(data){
      console.log('error '+data)
    });
});


$(document).on("click", ".block-btn", function(){
    let user = $(this).attr('id').split("-")[1];
    
    $.ajax({
        method: 'POST',
        url: '/user/'+ user +'/block',
        data: {}
    })
    .done(function(data){
        console.log('success'+ data);
        if(data.action=='blocked'){
            $('#block-'+user).html('<i class="fa fa-ban"></i> Unblock');
        } else if(data.action=='unblocked'){
            $('#block-'+user).html('<i class="fa fa-ban"></i> Block');
        }
})
    .fail(function(data){
      console.log('error '+data)
    });
});





$(document).on("click", ".delete-post", function(){
    let postId = $(this).attr('id').split("-")[0];

    $.ajax({
        method: 'POST',
        url: '/post/delete/'+ postId,
        data: {}
    })
    .done(function(data){
        console.log('success'+ data);
        if(data.success=='deleted'){
            $('#'+postId+'-post').remove();
        }
})
    .fail(function(data){
      console.log('error '+data)
    });
});

