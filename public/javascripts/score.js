var bluescore =0;
var redscore= 0;

function score(type)
{
if (type ==1)
{
bluescore++;

 var scoreblue = document.getElementById("bluescore").innerHTML = "Blue:" +bluescore;
}

if (type ==2)
{
redscore++;
 var scorered = document.getElementById("redscore").innerHTML = "Red:" +redscore;
}
}