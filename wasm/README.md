para crear un wasm con rust
lo pimero que debes hacer es 
instalar rustup el cual es el gestor de versiones de rust para windows y linux

linux
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


windows
https://win.rustup.rs/x86_64



instalado rust por cualquiera de los 2 metodos
luego se debe instalar web.pack con el comando  (cargo e sel gestor de paquete sde rust se instala 
con el)

cargo install wasm-pack


con cargo new --lib (nombre archivo)

se crea el componente, sin embargo en este caso no es necesario ya que agregaremos mas funciones al componenete ya creado.

con este comando creamos la carpeta pkg la cual contiene nuestro codigo rust compilado a wasm
wasm-pack build --target web

