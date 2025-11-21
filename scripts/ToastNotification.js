// === ToastNotification.js ===

// Cria automaticamente o container caso não exista
(function initToastContainer() {
    let container = document.querySelector(".toastNotification");
    if (!container) {
        container = document.createElement("div");
        container.className = "toastNotification";
        document.body.appendChild(container);
    }
})();

/**
 * Cria o toast completo com título, ícone e mensagem
 */
function createToast(type, message, iconClass, title) {
    const container = document.querySelector(".toastNotification");
    const toast = document.createElement("div");

    toast.classList.add("toastUniversal");
    toast.classList.add(type.toLowerCase()); // sucesso / erro / aviso

    toast.innerHTML = `
        <div class="toast-left">
            <i class="${iconClass} toast-icon"></i>
        </div>

        <div class="toast-body">
            <strong class="toast-title">${title}</strong>
            <p class="toast-msg">${message}</p>
        </div>

        <i class="fa-solid fa-xmark toast-close"></i>
    `;

    toast.querySelector(".toast-close").addEventListener("click", () => {
        toast.classList.add("toast-hide");
        setTimeout(() => toast.remove(), 400);
    });

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("toast-hide");
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

/**
 * Toast simplificado para usar em qualquer arquivo
 *
 * Tipos aceitos:
 *  - success
 *  - error
 *  - warning
 */
function toast(message, type = "success") {
    const map = {
        success: { key: "sucesso", icon: "fa-solid fa-circle-check", title: "Sucesso" },
        error:   { key: "erro", icon: "fa-solid fa-circle-xmark",   title: "Erro" },
        warning: { key: "aviso", icon: "fa-solid fa-triangle-exclamation", title: "Aviso" }
    };

    const entry = map[type] || map.success;

    createToast(entry.key, message, entry.icon, entry.title);
}
