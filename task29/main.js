var msgDom = document.getElementById('msg');
var tipDom = document.getElementById('tip');

function validate() {
    var msg = msgDom.value;
    if(GetLength(msg) == 0){
        tipDom.innerHTML = '姓名不能为空';
        tipDom.style.color = 'red';
        msgDom.style.border = '2px solid red';
    }
    else if(GetLength(msg) >= 4 && GetLength(msg) <= 16){
        tipDom.innerHTML = '格式正确';
        tipDom.style.color = 'lightgreen';
        msgDom.style.border = '2px solid lightgreen';
    }
    else {
        tipDom.innerHTML = '字符数应为4~16位';
        tipDom.style.color = 'red';
        msgDom.style.border = '2px solid red';
    }
}

var GetLength = function(str)
{
    var realLength = 0;
    for (var i = 0; i < str.length; i++)
    {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
        realLength += 1;
        else
        realLength += 2;
    }
    return realLength;
};
