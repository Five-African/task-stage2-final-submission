var $ = function(el) {
    return document.querySelector(el);
};
var pass = false;

function checkName(tag) {
    var tip = tag.nextElementSibling;
    var str = tag.value;
    if (!pass) {
        tag.nextElementSibling.style.display = 'inline-block';
    }
    if (GetLength(str) == 0) {
        tip.innerHTML = '姓名不能为空';
        tip.style.color = 'red';
        tag.style.border = '2px solid red';
        pass = false;
        return 0;
    } 
    else if (GetLength(str) >= 4 && GetLength(str) <= 16) {
        tip.innerHTML = '格式正确';
        tip.style.color = 'lightgreen';
        tag.style.border = '2px solid lightgreen';
        pass = true;
        return 1;
    } 
    else {
        tip.innerHTML = '字符数应为4~16位';
        tip.style.color = 'red';
        tag.style.border = '2px solid red';
        pass = false;
        return 0;
    }

}

function checkPassword(tag) {
    var tip = tag.nextElementSibling;
    var str = tag.value;
    if (!pass) {
        tag.nextElementSibling.style.display = 'inline-block';
    }
    if (str.length >=4 && str.length <= 16) {
        tip.style.color = 'lightgreen';
        tag.style.border = '2px solid lightgreen';
        tip.innerHTML = '格式正确';
        pass = true;
        return 1;
    } 
    else {
        tip.innerHTML = '请输入4-16位的密码';
        tip.style.color = 'red';
        tag.style.border = '2px solid red';
        pass = false;
        return 0;
    }

}

function checkPasswordConfirm(tag) {
    var tip = tag.nextElementSibling;
    var str = tag.value;
    var strPassword = $("#password input").value;
    if (!pass) {
        tag.nextElementSibling.style.display = 'inline-block';
    }
    if (str.length < 4 || str.length > 16) {
        tip.innerHTML = '请输入4-16位的密码';
        tip.style.color = 'red';
        tag.style.border = '2px solid red';
        pass = false;
        return 0;
    }
    else if (str === strPassword) {
        tip.style.color = 'lightgreen';
        tag.style.border = '2px solid lightgreen';
        tip.innerHTML = '密码正确';
        pass = true;
        return 1;
    } 
    else {
        tip.innerHTML = '再次输入相同的密码';
        tip.style.color = 'red';
        tag.style.border = '2px solid red';
        pass = false;
        return 0;
    }

}

function checkEmail(tag) {
    var tip = tag.nextElementSibling;
    var str = tag.value;
    var emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!pass) {
        tag.nextElementSibling.style.display = 'inline-block';
    }
    if (emailFilter.test(str)) {
        tip.innerHTML = '格式正确';
        tip.style.color = 'lightgreen';
        tag.style.border = '2px solid lightgreen';
        pass = true;
        return 1;
    } 
    else {
        tip.innerHTML = '请输入正确的邮箱地址';
        tip.style.color = 'red';
        tag.style.border = '2px solid red';
        pass = false;
        return 0;
    }

}


function checkPhoneNumber(tag) {
    var tip = tag.nextElementSibling;
    var str = tag.value;
    var phoneNumberFilter = /^1[3|4|5|7|8]\d{9}$/;
    if (!pass) {
        tag.nextElementSibling.style.display = 'inline-block';
    }
    if (phoneNumberFilter.test(str)) {
        tip.innerHTML = '格式正确';
        tip.style.color = 'lightgreen';
        tag.style.border = '2px solid lightgreen';
        pass = true;
        return 1;
    } 
    else {
        tip.innerHTML = '请输入正确的手机号码';
        tip.style.color = 'red';
        tag.style.border = '2px solid red';
        pass = false;
        return 0;
    }
    
}


function clickBtn() {
    if(checkName($('#name input')) === 0 || checkPassword($('#password input')) === 0 || checkPasswordConfirm($("#passwordConfirm input")) === 0 || checkEmail($("#email input")) === 0 || checkPhoneNumber($('#phoneNumber input')) === 0){
        alert("您的输入有误 或者 输入信息不完整，请细心检查");
    }
    else{
        alert("信息提交成功");
    }
}



function hiddenTip(tag) {
    if (pass) {
        tag.nextElementSibling.style.display = 'none';
        tag.style.border = '1px solid black';
        pass = false;
    }
}
function GetLength(str) {
    return str.replace(/[^\x00-\xff]/g, '__').length;
};