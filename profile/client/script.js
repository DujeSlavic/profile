

var max = 500;
$('textarea').keyup(function(){
    var duljina = $(this).val().length;
    duljina = max - duljina;
    if(duljina >= 0){
        $('button').removeAttr("disabled");
        $('#count_message').text(duljina+' characters left');
    }
    else{
        $('button').attr("disabled",'true');
        $('#count_message').text('previse');
    }
});


$('#b1').click(function(){
    $('.jedan').hide();
    $('#profil-section').hide();
    $('.dva').show();
});

$('#b2').click(function(){
    $('.dva').hide();
    $('.jedan').show();
    $('#profil-section').show();
});

$('#loginButton').click(function(){

    

    const inpName = document.getElementById("name");
    const inpEmail = document.getElementById("email");
    const inpPassword = document.getElementById("password");

    const name = inpName.value;
    const email = inpEmail.value;
    const password = inpPassword.value;

    if(name && email && password && isValidEmailAddress(email)){

        $('#login-section').hide();
        $('.jedan').show();
        $('#profil-section').show();
        

    console.log(name);
    console.log(email);

    if(name && email){
        localStorage.setItem('ime', name);
        localStorage.setItem('mail', email);
        //location.reload();
    }

    $('#IME').text(localStorage.getItem('ime'));
    $('#MAIL').text(localStorage.getItem('mail'));

    }
});

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
};



var getTodos = function(callb) {
    $.get('/todo', function(data) {
        callb(data);
    });   
}

var addTodo = function(description, callb) {
    $.post('/todo', { description}, function(data){
        callb(data);
    });
}

var deleteTodo = function(id) {
    $.ajax({
        url: `/todo/${id}`,
        type: 'DELETE',
        success: function(data) {
            fillTable(data.todos);
        }
    });
}

var updateTodo = function(id) {
    $.ajax({
        url: `/todo/${id}`,
        type: 'PUT',
        success: function(data) {
            fillTable(data.todos);
        }
    });
}

var fillTable = function(todos) {
    var tbody = $("#todos-table > tbody")
    tbody.empty();
    
    for(var i = todos.length - 1; i >= Math.max(0,todos.length - 5); i--) {

        var description = todos[i].description;
        
        var id = todos[i].id;
        tbody.append(
            `<tr>
                
                <td>${description}</td><td></td>
                
            </tr>
            `
            )
    }
    
    if(todos.length < 5){
        $('#b1').hide();
    }
    else{
        $('#b1').show();
    }


    var tab2 = $("#tab2")
    tab2.empty();
    
    for(var i = todos.length - 1; i >= 0; i--) {
        var description = todos[i].description;
        
        var id = todos[i].id;
        tab2.append(
            `<tr>
                
                <td>${description}</td><td></td>
                
            </tr>
            `
            )
    }
}

$('#olovka2').click(function(){
    $('#uPP').trigger('click');
});


$('#olovka1').click(function(){
    $('#uCP').trigger('click');
});



$(document).ready(function() {
    const inpName = document.getElementById("name");
    const inpEmail = document.getElementById("email");

    //const name = document.getElementById("name");
    //const name = document.getElementById("name");

    loginButton.onclick = function(){
        const name = inpName.value;
        const email = inpEmail.value;

        console.log(name);
        console.log(email);

        if(name && email){
            localStorage.setItem('ime', name);
            localStorage.setItem('mail', email);
            //location.reload();
        }
    };

    $('.dva').hide();
    $('.jedan').hide();
    $('#profil-section').hide();

    if(localStorage.getItem('profilna')){
        $('.profile-pic').attr('src', localStorage.getItem('profilna'));
    }

    if(localStorage.getItem('naslovna')){
        $('.cover-pic').attr('src', localStorage.getItem('naslovna'));
    }

    //$('#IME').text(localStorage.getItem('ime'));
    //$('#MAIL').text(localStorage.getItem('mail'));



    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
                const prof = e.target.result;
                localStorage.setItem('profilna', prof);
                //console.log(e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
            //console.log(reader);
        }
    }
    

    $(".file-upload").on('change', function(){
        readURL(this);
    });
    
    $(".upload-button").on('click', function() {
       $(".file-upload").click();
    });
    
//-------------------------------------------------naslovna
    var readURL2 = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.cover-pic').attr('src', e.target.result);
                const nas = e.target.result;
                localStorage.setItem('naslovna', nas);
                //console.log(e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
            //console.log(reader);
        }
    }
    

    $(".file-upload2").on('change', function(){
        readURL2(this);
    });
    
    $(".upload-button").on('click', function() {
       $(".file-upload2").click();
    });
    // čim se dokument učita, dohvati todo zapise te ih dodaj na stranicu pomocu metode fillTable
    getTodos(function(data) {
       fillTable(data.todos);
    });
    
    $("#todo-form").submit(function(event) {
        var description = event.target[0].value;
        
        event.target[0].value = "";
        
        event.preventDefault();
        addTodo(description, function(data) {
            fillTable(data.todos)
        });
        $('#count_message').text('500 characters left');
    });    
    
});