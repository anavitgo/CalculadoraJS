/* Funções de cada membro
    Rafael e Ana: Back-end e dinamização do código.
    Rebecca, Giullia e Nicollas: Front de End
*/


function criaDigitos() {
    for (let i = 0; i < 10; i++) { //array que vai criar os botões dos digitos de 0 até 9 que serão colocados dentro do body
        let botao = document.createElement("button");
        botao.textContent = i;
        botao.setAttribute("id", i);
        document.getElementsByTagName("body")[0].appendChild(botao);

        let divDigitos = document.getElementById("divDigitos");
        divDigitos.appendChild(botao);

         //CUIDADO!! se forem colocar os botoes dentro de uma div para estilizarem, deem appenChild dos botoes na div dentro desse for
    }
}

function criaOperadores(operador) {
    let operadorCriado = document.createElement("button");
    operadorCriado.textContent = operador;
    operadorCriado.setAttribute("id", operador);
    operadorCriado.setAttribute("class", "botaoOperador");
    document.getElementsByTagName("body")[0].appendChild(operadorCriado); 
    
    let divOperadores = document.getElementById("divOperadores");
    divOperadores.appendChild(operadorCriado);

    //CUIDADO!! Coloquei no body de novo, se forem usar flexbox e criarem uma div lembrem-se de dar append nela!
};

criaDigitos();

criaOperadores("+");
criaOperadores("-");
criaOperadores("*");
criaOperadores("/");
criaOperadores("CE");
criaOperadores("=");

let display = document.getElementById("display");

function colocandoEventBotaoDigitos() {
    for (let i = 0; i < 10; i++) {
        document.getElementById(i).addEventListener("click", function () { //adicionando eventListener para os botoes de digitos
            display.textContent += i;
        });
    }
}

colocandoEventBotaoDigitos();

function colocandoEventBotaoOperadores() { //event listener nos operadores para que a string display seja concatenada com as novas operações

    document.getElementById("+").addEventListener("click", function () {
        display.textContent += " + ";
    });
    document.getElementById("*").addEventListener("click", function () {
        display.textContent += " * ";
    });
    document.getElementById("/").addEventListener("click", function () {
        display.textContent += " / ";
    });
    document.getElementById("-").addEventListener("click", function () {
        display.textContent += " - ";
    });
    document.getElementById("CE").addEventListener("click", function () {
        display.textContent = "";
        soma = 0;
    });

    let aux = [];

    document.getElementById("=").addEventListener("click", function () {
        aux = display.textContent.split(" ");
        console.log(aux);
        //BUG FIX
        //1 - Operador na 1° posição
        if (isNaN(parseInt(aux[0])))//converte o elemento na posição 0 para numero, caso não seja numero retorna true
        {
            if (aux[1] != "-") {
                aux.shift();
                aux.shift();
            }
        }
        //2 - Operador na ultima posição
        if (isNaN(parseInt(aux[aux.length - 1]))) {//converte o ultimo elemento para numero, caso não seja numero retorna true
            aux.pop();
            aux.pop();
        }
        //3 - Operador Repetido entre os números
        let contador = 0;
        for (let i = aux.length; i >= 0; i--) {//sempre que um operador repete ele deixa um "" no array, então procuramos esse "" depois deletamos ele e o operador anterior (que é repetido).
            if (aux[i] == "") {
                aux.splice(i - 1, 2);
            }
        }

        soma = eval(aux.join(""));
        display.textContent = soma;
        soma = 0;
    });

};

colocandoEventBotaoOperadores();