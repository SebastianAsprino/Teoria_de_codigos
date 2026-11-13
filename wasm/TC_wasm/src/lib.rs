use wasm_bindgen::prelude::*;

/// Número de letras del alfabeto inglés.
const ALFABETO: usize = 26;

/// Cifra `texto` desplazando cada letra ASCII `desplazamiento` posiciones hacia adelante.
/// Los caracteres que no son letras se mantienen sin cambios.
#[wasm_bindgen]
pub fn cifrar_cesar(texto: &str, desplazamiento: u8) -> String {
    let desplazamiento = desplazamiento as usize;

    texto.chars().map(|caracter| {
        if caracter.is_ascii_alphabetic() {
            let primera_letra = if caracter.is_ascii_lowercase() { 'a' } else { 'A' } as u8;
            let mut posicion = caracter as usize - primera_letra as usize;
            posicion = (posicion + desplazamiento) % ALFABETO;
            (primera_letra + posicion as u8) as char
        } else {
            caracter
        }
    }).collect()
}

/// Descifra `texto` desplazando cada letra ASCII `desplazamiento` posiciones hacia atrás.
#[wasm_bindgen]
pub fn descifrar_cesar(texto: &str, desplazamiento: u8) -> String {
    let desplazamiento = desplazamiento as usize;

    texto.chars().map(|caracter| {
        if caracter.is_ascii_alphabetic() {
            let primera_letra = if caracter.is_ascii_lowercase() { 'a' } else { 'A' } as u8;
            let mut posicion = caracter as usize - primera_letra as usize;
            posicion = (posicion as isize - desplazamiento as isize).rem_euclid(ALFABETO as isize) as usize;
            (primera_letra + posicion as u8) as char
        } else {
            caracter
        }
    }).collect()
}
