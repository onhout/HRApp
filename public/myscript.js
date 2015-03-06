$(document).ready(function(){
    $.get('/employees', function(data){
        $('.items').html(data);
        alert('Loaded');
    })
});