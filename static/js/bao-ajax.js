
$('#likes').click(function(){
	var tutid;
	tutid = $(this).attr("data-tutid");
	$.get('/Bao/like_tutorial/',{t.name: tutid}, function(data){
			$('#like_count').html(data);

			$('#likes').hide();
	});
});


