const montoNoNegativo = (valor?: number) => {
    if (valor === undefined) {
        return { isValido: true };
    };
    if (!Number.isFinite(valor) || valor < 0) {
        return { isValido: false, message: "El monto no puede ser negativo" };
    }
 
    return { isValido: true };
};
 
export default montoNoNegativo;