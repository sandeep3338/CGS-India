
async function next()
{
    var result= await fetch('https://randomuser.me/api/');
   var userdata=await result.json();
   var user=userdata.results[0];
   document.getElementById("image").src=`${user.picture.large}`;
   document.getElementById("pName").innerHTML=`${user.name.title} ${user.name.first} ${user.name.last}`;
   document.getElementById("email").innerHTML=`Mail :${user.email}`;
   document.getElementById("age").innerHTML=`Age: ${user.dob.age}`
   document.getElementById("gender").innerHTML=`Gender :${user.gender}`
   document.getElementById("phone").innerHTML=`phone :${user.phone}`
   document.getElementById("city").innerHTML=`City :${user.location.city}`
   document.getElementById("country").innerHTML=`Country :${user.location.country}`
   document.getElementById("postcode").innerHTML=`Code :${user.location.postcode}`

}