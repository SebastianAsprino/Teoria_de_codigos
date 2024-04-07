fn cifrar_cesar(texto: &str, desplazamiento: u8) -> String {
  const ALFABETO: usize = 26; // Número de letras en el alfabeto inglés
  let desplazamiento = desplazamiento as usize;

  texto.chars().map(|caracter| {
      if caracter.is_ascii_alphabetic() {
          let primera_letra = if caracter.is_ascii_lowercase() { 'a' } else { 'A' } as u8;
          // Convertir el caracter a un 0-25
          let mut posicion = caracter as u8 - primera_letra;
          // Aplicar el desplazamiento
          posicion = (posicion as usize + desplazamiento) % ALFABETO;
          // Convertir de vuelta a un caracter
          (primera_letra + posicion as u8) as char
      } else {
          // Si no es una letra, no cambia
          caracter
      }
  }).collect()
}

fn descifrar_cesar(texto: &str, desplazamiento: u8) -> String {
  const ALFABETO: usize = 26; // Número de letras en el alfabeto inglés
  let desplazamiento = desplazamiento as usize;

  texto.chars().map(|caracter| {
      if caracter.is_ascii_alphabetic() {
          let primera_letra = if caracter.is_ascii_lowercase() { 'a' } else { 'A' } as u8;
          // Convertir el caracter a un 0-25
          let mut posicion = caracter as u8 - primera_letra;
          // Aplicar el desplazamiento hacia atrás
          posicion = (posicion as isize - desplazamiento as isize).rem_euclid(ALFABETO as isize) as u8;
          // Convertir de vuelta a un caracter
          (primera_letra + posicion) as char
      } else {
          // Si no es una letra, no cambia
          caracter
      }
  }).collect()
}

fn main() {
  let mensaje = "Hola Mundo!";
  let desplazamiento = 3;
  
  let mensaje_cifrado = cifrar_cesar(mensaje, desplazamiento);
  println!("Mensaje cifrado: {}", mensaje_cifrado);
  
  let mensaje_descifrado = descifrar_cesar(&mensaje_cifrado, desplazamiento);
  println!("Mensaje descifrado: {}", mensaje_descifrado);
}
