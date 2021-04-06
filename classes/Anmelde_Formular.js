"use strict" ;

class Anmelde_Formular{

    constructor(){
        this._html = this._html_generieren();

    }
    _html_generieren(){

        let anmelde_formular = document.createElement("section");
        anmelde_formular.setAttribute("id","eingabeformular-container");
        anmelde_formular.innerHTML=`
        <div class="container">

        <form class="well form-horizontal" action=" " method="post"  id="anmeldeformular">
    <fieldset>
    
    <!-- Form Name -->
    <legend><center><h2><b>Registration Form</b></h2></center></legend><br>
    
    <!-- Text input-->
    
    <div class="form-group">
      <label class="col-md-4 control-label">First Name</label>  
      <div class="col-md-4 inputGroupContainer">
        <div class="input-group">
          <span style="width: 50px;" class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
          <input style="height: 30px;" required id="first_name" name="first_name" placeholder="First Name" class="form-control"  type="text">
        </div>
      </div>
    </div>
    
    <!-- Text input-->
    
    <div class="form-group">
      <label class="col-md-4 control-label" >Last Name</label> 
        <div class="col-md-4 inputGroupContainer">
          <div class="input-group">
            <span style="width: 50px;" class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
            <input style="height: 30px;" required id="last_name" name="last_name" placeholder="Last Name" class="form-control"  type="text">
          </div>
        </div>
    </div>
    

      
    <!-- Text input-->
    
    <div class="form-group">
      <label class="col-md-4 control-label">Birthday</label>  
      <div class="col-md-4 inputGroupContainer">
      <div class="input-group">
      <span style="width: 50px;" class="input-group-addon"><i class="glyphicon glyphicon-gift"></i></span>
      <input style="height: 30px;" required id="birthday" name="birthday" placeholder="Birthday" class="form-control"  type="date">
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="col-md-4 control-label">Phone Number</label>  
      <div class="col-md-4 inputGroupContainer">
        <div class="input-group">
          <span style="width: 50px;" class="input-group-addon"><i class="glyphicon glyphicon-phone-alt"></i></span>
          <input style="height: 30px;" required id="phone" name="phone" placeholder="Phone Number" class="form-control"  type="text">
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="col-md-4 control-label">E-mail</label>  
      <div class="col-md-4 inputGroupContainer">
        <div class="input-group">
          <span style="width: 50px;" class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
          <input style="height: 30px;" required id="mail" name="mail" placeholder="mail" class="form-control"  type="text">
        </div>
      </div>
    </div>


    <!-- Select Basic -->
    
    <!-- Success message -->
    <div class="alert alert-success" role="alert" id="success_message">Success <i class="glyphicon glyphicon-thumbs-up"></i> Success!.</div>
    
    <!-- Button -->
    <div class="form-group">
      <label class="col-md-4 control-label"></label>
      <div class="col-md-4"><br>
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<button type="submit" class="btn btn-warning" >&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspSUBMIT <span class="glyphicon glyphicon-send"></span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</button>
      </div>
    </div>
    
    </fieldset>
    </form>
    </div>
        </div><!-- /.container -->
        `;

        this._absenden_event(anmelde_formular);
        return anmelde_formular;
    }
    _absenden_event(anmelde_formular){
      anmelde_formular.querySelector('#anmeldeformular').addEventListener("submit", e=>{
        e.preventDefault() ;
        let anmeldedaten = this._formular_daten_holen(e);
        document.getElementById("anmeldeformular").reset();
        console.log(anmeldedaten);
        console.log(e.target.elements);

        $.ajax({
          type: "POST",
          url: "einfugen.php",
          data: {
              first_name: anmeldedaten.first_name,
              last_name: anmeldedaten.last_name,
              birthday: anmeldedaten.birthday,
              phone: anmeldedaten.phone,
              mail: anmeldedaten.mail,
              type: 'anmelden'
          },
   
        }).done(function(data){
      });
          });

    }

    _formular_daten_holen(e){
      return{
        first_name: e.target.elements.first_name.value,
        last_name: e.target.elements.last_name.value,
        birthday: e.target.elements.birthday.value,
        phone: e.target.elements.phone.value,
        mail: e.target.elements.mail.value
      }
    }

    anzeigen() {
        let body = document.querySelector("nav");
        if (body !== null) {
           body.insertAdjacentElement("afterend", this._html);
        }
    }
    
}