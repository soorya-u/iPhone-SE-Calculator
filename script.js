function evaluate(e) {

    if (e === "" || !((e.charAt(e.length - 1) >= '0' && e.charAt(e.length - 1) <= '9') || e.charAt(e.length - 1) === '.'))
        return e;

    if(e.charAt(0)==='+' || e.charAt(0)==='-' || e.charAt(0)==='*'|| e.charAt(0)==='/')
        e="0"+e;

    let tokens = e.split('');

    let values = [];

    let ops = [];

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] == ' ') {
            continue;
        }

        if ((tokens[i] >= '0' && tokens[i] <= '9') || tokens[i] == '.') {
            let sbuf = "";

            while (i < tokens.length &&
                tokens[i] >= '0' &&
                tokens[i] <= '9' || tokens[i] == '.') {
                sbuf = sbuf + tokens[i++];
            }
            values.push(parseFloat(sbuf));

            i--;
        }

        else if (tokens[i] == '(') {
            ops.push(tokens[i]);
        }

        else if (tokens[i] == ')') {
            while (ops[ops.length - 1] != '(') {
                values.push(applyOp(ops.pop(),
                    values.pop(),
                    values.pop()));
            }
            ops.pop();
        }

        else if (tokens[i] == '+' ||
            tokens[i] == '-' ||
            tokens[i] == '*' ||
            tokens[i] == '/') {

            while (ops.length > 0 && hasPrecedence(tokens[i],ops[ops.length - 1])) {
                values.push(applyOp(ops.pop(),
                    values.pop(),
                    values.pop()));
            }

 
            ops.push(tokens[i]);
        }
    }

    while (ops.length > 0) {
        values.push(applyOp(ops.pop(),
            values.pop(),
            values.pop()));
    }

    return values.pop();
}

function hasPrecedence(op1, op2) {
    if (op2 == '(' || op2 == ')') {
        return false;
    }
    if ((op1 == '*' || op1 == '/') &&
        (op2 == '+' || op2 == '-')) {
        return false;
    }
    else {
        return true;
    }
}

function applyOp(op, b, a) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b == 0) {
                return "Error"
            }
            return parseFloat(a / b);
    }
    return 0;
}

console.log(typeof(evaluate("-1+2")))
console.log(evaluate("-1+2"))

function activebtn(id) {
    document.getElementById(id).style.backgroundColor="white";
    document.getElementById(id).style.color="orange";
}

function regularbtn(id) {
    document.getElementById(id).style.backgroundColor="orange";
    document.getElementById(id).style.color="white";
}

let ac=true;
let previd="";
let n="";
let n0 = "";
let n1 = "";
let n2 = "";
let e = "0";

function buttonclick(id) {


    s = id;
    ac=false;
    if(previd != "") {
        regularbtn(previd);
        previd="";
    }

    if ((s.charAt(0) >= '0' && s.charAt(0) <= '9') || s.charAt(0) === '.') {
        if (!(n1 === "")) {
            n2 = n2 + s;
            n=n2;
            document.getElementById("textfield").innerHTML = (n);
        }
        else {
            n0 = n0 + s;
            n=n0;
            document.getElementById("textfield").innerHTML = (n);
        }
        e = n0 + n1 + n2;
    }
    else if (s === "AC") {
        n=0
        n0 = n1 = n2 = "";
        exp="0";
        ac=true;
        document.getElementById("textfield").innerHTML = (n);
    }
    else if (s === "%") {
        if (!(n1 === "")) {
            n = n2 = n2 / 100;
            document.getElementById("textfield").innerHTML = (n);
        }
        else {
            n = n0 = n0 / 100;
            document.getElementById("textfield").innerHTML = (n);
        }
        e = n0 + n1 + n2;
    }
    else if (s === "equal") {
        if(n===2005 || n==="2005") {
            document.getElementById("textfield").innerHTML = "SOORYA U";
            document.getElementById("textfield").style.color = "orange";
            document.getElementById("textfield").style.fontFamily = 'JetBrains Mono';
            document.getElementById("textfield").style.justifyContent = 'center';
            document.getElementById("textfield").style.paddingRight = "0rem"
            setTimeout(()=>{
                document.getElementById("textfield").style.color = "white";
                document.getElementById("textfield").style.fontFamily = 'Helvetica';
                document.getElementById("textfield").style.justifyContent = 'end';
                document.getElementById("textfield").style.paddingRight = "1.9rem"
                buttonclick("AC");
            },5000);
        }
        else {
            n = evaluate(e);
            e = n0 = n.toString();
            n1 = n2 = "";
            if(n==='+' || n==='-' || n==='*'|| n==='/') {
                document.getElementById("textfield").innerHTML = ("");
            }
            else
                document.getElementById("textfield").innerHTML = (n);
        }
    }
    else if (s === "+/-") {
        if (n>=0)
            e = evaluate(e) + (-n).toString() + (-n).toString();
        else
            e = evaluate(e) + "+" + (-n).toString() + "+" + (-n).toString();
        n=-n;
        document.getElementById("textfield").innerHTML = (n);
    }
    else {
        activebtn(s);
        if (n1 === "" || n2 === "")
        {
            n1 = s;
            if(n0==="")
                n=0;
        }
        else {
            n = evaluate(e);
            n0 = n.toString();
            n1 = s;
            n2 = "";
        }
        e = n0 + n1 + n2;
        document.getElementById("textfield").innerHTML = (n);
        if(n==="")
            parseFloat(n);
    }
    if(e.charAt(e.length-1)==='+' || e.charAt(e.length-1)==='-' || e.charAt(e.length-1)==='*'|| e.charAt(e.length-1)==='/') {
        previd=id;
    }

    if(ac)
        document.getElementById('AC').textContent = "AC";
    else 
        document.getElementById('AC').textContent = "C";
}
