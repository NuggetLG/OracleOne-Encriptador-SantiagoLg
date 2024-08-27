document.addEventListener('DOMContentLoaded', function() {
    var encriptarButton = document.getElementById("encriptar");
    var desencriptarButton = document.getElementById("desencriptar");
    var mainContainer = document.querySelector('.main-container');
    var inputText = document.getElementById("input-text");
    var messageLayout = document.querySelector('.message-layout');

    function toggleMessageLayout(show) {
        mainContainer.classList.toggle('show-message-layout', show);
    }

    function encriptarTexto(texto) {
        return texto
            .replace(/e/g, "enter")
            .replace(/i/g, "imes")
            .replace(/a/g, "ai")
            .replace(/o/g, "ober")
            .replace(/u/g, "ufat");
    }

    function desencriptarTexto(texto) {
        return texto
            .replace(/enter/g, "e")
            .replace(/imes/g, "i")
            .replace(/ai/g, "a")
            .replace(/ober/g, "o")
            .replace(/ufat/g, "u");
    }

    function updateMessageLayout(message, showDefaultMessage = false) {
        if (showDefaultMessage) {
            messageLayout.innerHTML = `
                <div class="default-message">
                    <img class="mueco-icon" loading="lazy" alt="" src="./public/mueco.svg" />
                    <h3 class="ningn-mensaje-fue">Ningún mensaje fue encontrado</h3>
                    <div class="ingresa-el-texto">
                        Ingresa el texto que desees encriptar o desencriptar.
                    </div>
                </div>
            `;
        } else {
            messageLayout.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                </div>
                <button id="copyButton" class="copy-button">Copiar</button>
            `;
            
            var copyButton = document.getElementById('copyButton');
            copyButton.addEventListener('click', function() {
                navigator.clipboard.writeText(message).then(function() {
                    copyButton.textContent = 'Copiado!';
                    setTimeout(function() {
                        copyButton.textContent = 'Copiar';
                    }, 2000);
                });
            });
        }
    }

    function processText(encrypt) {
        var texto = inputText.value.trim();
        if (texto !== "") {
            var processedText = encrypt ? encriptarTexto(texto) : desencriptarTexto(texto);
            updateMessageLayout(processedText);
            toggleMessageLayout(true);
        } else {
            updateMessageLayout('', true);
            toggleMessageLayout(true);
        }
    }

    if (encriptarButton) {
        encriptarButton.addEventListener("click", function (e) {
            processText(true);
        });
    }

    if (desencriptarButton) {
        desencriptarButton.addEventListener("click", function (e) {
            processText(false);
        });
    }
});