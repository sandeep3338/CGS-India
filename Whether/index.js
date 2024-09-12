document.getElementById('convertBtn').addEventListener('click',function(){
    var temp=parseFloat(document.getElementById('tempValue').value);
    var from=document.getElementById('fromUnit').value;
    var to=document.getElementById('toUnit').value;
    console.log(typeof temp)

    if (isNaN(temp)) {
        document.getElementById('result').innerText = 'Please enter a valid number.';
        return;
    }

    const conversions = {
        celsius: {
            fahrenheit: (tempValue) => (tempValue * 9/5) + 32 +" 'F",
            kelvin: (tempValue) => tempValue + 273.15 +" 'K",
            celsius: (tempValue) => tempValue +" 'C"
        },
        fahrenheit: {
            celsius: (tempValue) => (tempValue - 32) * 5/9 +" 'C",
            kelvin: (tempValue) => (tempValue - 32) * 5/9 + 273.15+" 'K",
            fahrenheit: (tempValue) => tempValue +" 'F"
        },
        kelvin: {
            celsius: (tempValue) => tempValue - 273.15 +" 'C",
            fahrenheit: (tempValue) => (tempValue - 273.15) * 9/5 + 32 +" 'F",
            kelvin: (tempValue) => tempValue +" 'K"
        }
    };
   
    var result=conversions[from][to](temp);
    document.getElementById('result').innerText=`${result}`;

})