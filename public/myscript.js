/**
 * Created by pl on 3/5/15.
 */
$(document).ready(function(){
    $.get('/employees', function(data){
        $('.items').html(data);
        alert('Loaded');
    })
});