export function createClienteDTO(data){
    const {nome, email, idade} = data;

    // Validação de entrada e formato
    if (typeof nome !== "string" || nome.trim() === "") {
        throw new Error("Campo 'nome' é obrigatório!");
    }

    if (typeof email !== "string" || !email.includes("@")) {
        throw new Error("Campo 'e-mail' inválido!");
    }

    if (typeof idade !== "number" || Number.isNaN(idade)) {
        throw new Error("Campo 'idade' deve ser numérico!");
    }
    return{
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        idade
    }
}