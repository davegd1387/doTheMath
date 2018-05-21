
// JavaScript Documen

var lineCtr = 0;

function addErrorMessage(msg) {
   'use strict'
    var errorDiv = U.$('errorDiv')
    var errorSpan = U.$('error')
    if (errorSpan) {
    //alert(errorSpan.innerHTML)

       errorSpan.innerHTML = msg;
    } else {
       errorSpan = document.createElement('span')
       errorSpan.id = 'error'
       errorSpan.className = 'error'
       errorSpan.appendChild(document.createTextNode(msg))
       errorDiv.appendChild(errorSpan)}
}
function removeErrorMessage() {
   'use strict'
    var errorSpan = U.$('error')
    if (errorSpan) {
       errorSpan.parentNode.removeChild(errorSpan)}
}


function ChangeFocusColor(x)
{
   x.style.background = "white"
}
function ChangeBlurColor(x)
{
   x.style.background = "#D7AF28"
}


function builddivLine(ctr, divLineExpense, divLinePrice)
{
   var  divLinePriceID= 'price' + ctr;
   var  divLineExpenseID = 'expense' + ctr;
   var divLine =  '<tr><td><input type = text value=' + divLineExpense + ' id=' + divLineExpenseID + '   tabindex="1" ';
   divLine +=  'size="8" class="text" onfocus=ChangeFocusColor(this) onblur=ChangeBlurColor(this)></td>';
   divLine +=  '<td id=' + divLinePriceID+ ' class=price align=right>' + divLinePrice + '</td></tr>';
   return divLine;
}

function addNewLine()
{
   var divHTML = '<table><tr><td align="left" class="text2">Line Cost:</td><td align="left" id=priceTitle1';     
   divHTML += ' class ="text2">Line Price:</td></tr>';  
   for  ( var h = 0; h < lineCtr ; h ++ )
   {    divHTML += builddivLine(h, document.getElementById('expense' + h).value,
                   document.getElementById('price' + h).innerHTML);
   }
   divHTML += builddivLine(lineCtr, 0, '--------------------');
   divHTML += '<tr><td></td></tr><tr><td align="left" class=price><b>Total Cost:</b></td>';
   divHTML += '<td id=totalExpense class=price>--------------------</td>';
   divHTML += '<td align="left" class=price><b>G P M :</b></td>';
   divHTML += '<td id=GPM class=price>--------------------</td></tr></table>';
   divHTML += '<table>';
   divHTML += '</table>';
   document.getElementById('divMain').innerHTML = divHTML;
   return lineCtr +=  1;
}


function dotheMATH()
{
   var totalExpense = 0
   var totalPrice = parseFloat(document.getElementById('totalPrice').value.replace(/[\$\,]/g, ''))
   var expense = new Array
   var GPM = 0
   if  (totalPrice <= 0  |  isNaN(totalPrice) )
   {
       addErrorMessage("Total Price must be greater than 0")
   }
   else
   {
      for  ( var j = 0; j < lineCtr; j ++ )
      {
         expense[j] = parseFloat(document.getElementById('expense' + j).value.replace(/[\$\,]/g, ''))
         if (isNaN(expense[j]))
         {
            addErrorMessage("Expense #" + (j + 1 ) + " is not numerical!")
            return
         }
         else
         {
            if (expense[j] > 0)
            {
               totalExpense = totalExpense + expense[j]
               
            }
         }
      }
      if  (totalExpense <= 0  |  isNaN(totalExpense) )
      {
         addErrorMessage("Total Expense must be greater than 0")
      }
      if (totalExpense >  totalPrice)
      {
         addErrorMessage("Total Expense must not exceed Price")
      }
      document.getElementById('totalExpense').innerHTML =  totalExpense.toFixed(2)
      GPM = (totalPrice - totalExpense) / totalPrice * 100
      document.getElementById('GPM').innerHTML  = GPM.toFixed(3)   + " %"


      var totPrice = 0
      for  ( var i = 0; i < lineCtr; i ++ )
      {
         var thisPrice = 0
         
         if (expense[i] > 0)
         {
            thisPrice = (expense[i] * totalPrice) / totalExpense
            totPrice += Math.round(thisPrice * 100) / 100
            //alert (' inside totPrice = ' + totPrice)
            document.getElementById('price' + i).innerHTML = thisPrice.toFixed(2)
            document.getElementById('expense' + i).value =  expense[i].toFixed(2)
         }
      }
     //alert ("totPrice " +  totPrice)
      if (totPrice < totalPrice)
        { //alert (totPrice + " <  " + totalPrice)
         thisPrice = (Math.round(thisPrice * 100) / 100) + (totalPrice - totPrice)
         document.getElementById('price' + (lineCtr - 1)).innerHTML = thisPrice.toFixed(2) 
         
        }
      if (totPrice > totalPrice)
        {thisPrice = (Math.round(thisPrice * 100) / 100) - (totPrice - totalPrice)
         document.getElementById('price' + (lineCtr - 1)).innerHTML = thisPrice.toFixed(2) }  
         
   }
}
function clearIT()
{
   for  ( var i = 0; i < lineCtr; i ++ )
   {

      document.getElementById('price' + i).innerHTML = "--------------------"
      document.getElementById('expense' + i).value =  0
   }
   document.getElementById('totalExpense').innerHTML =  "--------------------"
   document.getElementById('GPM').innerHTML  = "--------------------"
   document.getElementById('totalPrice').value  = 0
   removeErrorMessage()


}
function refreshIT()
{
   lineCtr=0;
   clearIT();
   addNewLine();
}

function openWinBFAST() {
    window.open("http://bfast.budgetblinds.com/","_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes, width=875, height=700, left=500, top=0");
}

function openWinVENDOR() {
    var vendorURL
    var vendorName = prompt("Vendor Name (SWF, ES, P2, NWF)?", "SWF");
    
    if (vendorName != null) {
        switch (vendorName.toUpperCase()) {
           case 'SWF':
              vendorURL = "https://www.swfconnect.com/";
              break; 
           case 'ES':
              vendorURL = "http://www.kialta.com/";  
               break;
           case 'P2':
              vendorURL = "https://epic.picbusiness.com/5101/";
               break;   
           case 'NWF':
              vendorURL = "http://www.normanwindowcoverings.com/frontend/login.asp";  
               break;
           default: 
              vendorURL = "https://www.swfconnect.com/";
               break;

     }
     window.open(vendorURL,"_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes,  resizable=yes, copyhistory=yes, width=875, height=700, left=500, top=0");
    }
}


    
// Assign event listeners to the window's load event:
window.onload = function() 
   {
    'use strict';
    U.addEvent(U.$('newLine'), 'click', addNewLine);
    U.addEvent(U.$('calculate'), 'click', dotheMATH);
    U.addEvent(U.$('vendorbtn'), 'click', openWinVENDOR);
    U.addEvent(U.$('refreshbtn'), 'click', refreshIT);
    U.addEvent(U.$('clear'), 'click', clearIT);
    U.addEvent(U.$('bfastbtn'), 'click', openWinBFAST);
    U.addEvent(U.$('totalPrice'), 'focus', function(){totalPrice.style.background = "white"});
    U.addEvent(U.$('totalPrice'), 'blur', function(){totalPrice.style.background = "#D7AF28"});
    addNewLine();
   }   
    
    
    
    
    
    
