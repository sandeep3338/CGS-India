// function Incre()
// {
//     var value=document.getElementById("cng");
//     var score=parseInt(value.innerText);
//     value.innerText=score+1;
// }
// var score1=document.getElementById("btn1");
// score1.addEventListener("click",Incre);

// var b1=document.getElementById("btn1");
// var b2=document.getElementById("btn2");
// var b3=document.getElementById("btn3");
// var b4=document.getElementById("btn4");

btn1.addEventListener("click",incre);
btn2.addEventListener("click",incre);
btn3.addEventListener("click",incre);
btn4.addEventListener("click",incre);

function incre(e)
{
    var button=e.target
    var sid=button.getAttribute("data-score");
    var score=document.getElementById(sid);
    var currentscore=parseInt(score.innerText);
    score.innerText=currentscore+1;
}

function Endgame()
{
    var s1=parseInt(document.getElementById("s1").innerText);
    var s2=parseInt(document.getElementById("s2").innerText);
    var s3=parseInt(document.getElementById("s3").innerText);
    var s4=parseInt(document.getElementById("s4").innerText);

    if(s1>s2&&s1>s3&&s1>s4)
    {
        alert("Congress  won")
    }
    else if(s2>s3&&s2>s4)
    {
        alert("Bjp  won")
    }
    else if(s3>s4)
    {
        alert("Janasena  won")
    }
    else{
        alert("Tdp  won")
    }

}