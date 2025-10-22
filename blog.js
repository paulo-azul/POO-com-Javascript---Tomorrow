//encapsular tudo e usar get e set
//validação do set
//toString para demonstrar instanciamento e mudança de atributos (blog,usuario,post,comentario..)
//detalhamento de msg de erro


class Blog{

  #usuarios;
  posts;

  constructor(){
    this.#usuarios = [];
    this.posts =  [];
  }

  cadastra_usuario(Nome, senha){
   const user = new Usuario(Nome, senha); 
   this.#usuarios.push(user);
    console.log(`Usuário cadastrado com sucesso! Seu ID de usuário é ${this.#usuarios.length - 1}`);
   }

  publicar_post(titulo,texto, user_id){
    if(user_id>=this.#usuarios.length){
      console.log("Usuário não encontrado")
    }else{
      const lil_post = new Post(titulo,texto,user_id);
      this.posts.push(lil_post);
      console.log(`Post publicado com sucesso! O ID do post é ${this.posts.length - 1}`)
    }
  }

  comentar_post(texto, user_id, id_post){
    if(id_post >= this.posts.length){
      console.log("Post não encontrado");
    }else if(user_id>=this.#usuarios.length){
      console.log("Usuário não encontrado")
    }else if(!this.#usuarios[user_id].login){
      console.log("Não é possível comentar, usuário deslogado")
    }else{
      const comentario = new Comment(texto, user_id);
      this.posts[id_post].comentarios.push(comentario);
      console.log(`Comentário publicado com sucesso! O ID do comentário é ${this.posts[id_post].comentarios.length - 1}`);
    }
  }

  editar_post(titulo, texto, user_id, id_post){
    if(id_post >= this.posts.length){
      console.log("Post não encontrado");
    }else if(user_id>=this.#usuarios.length){
      console.log("Usuário não encontrado")
    }else if(!this.#usuarios[user_id].login){
      console.log("Usuário deslogado")
    }else{
      if(this.posts[id_post].autor==user_id){
        if(titulo!==undefined || titulo!==null){
          this.posts[id_post].titulo = titulo;
        }if(texto!==undefined || texto!==null){
          this.posts[id_post].texto = texto;
        }
        this.posts[id_post].data = new Date().toUTCString();
        console.log("Post editado com sucesso")
      }else{
        console.log("Usuário não é dono do post")
      }

    }
  }

  curtir_post(id_post){
    if(id_post >= this.posts.length){
      console.log("Post não encontrado");
    }else{
      this.posts[id_post].curtidas++;
      console.log(`Post curtido com sucesso! O post agora tem ${this.posts[id_post].curtidas} curtidas`);
    }
  }

  curtir_comentario(id_comentario, id_post){
    if(id_post >= this.posts.length){
      console.log("Post não encontrado");
    }else{
      if(id_comentario >= this.posts[id_post].comentarios.length){
        console.log("Comentário não encontrado");
      }else{
        this.posts[id_post].comentarios[id_comentario].curtidas++
        console.log(`Comentário curtido com sucesso! O comentário agora tem ${this.posts[id_post].comentarios[id_comentario].curtidas} curtidas`);
      }
    }
  }

  follow_user(influencer_user_id,follower_user_id){
    if(this.#usuarios[influencer_user_id].seguidores.includes(follower_user_id)){
      console.log(`${this.#usuarios[follower_user_id].getNomeUsuario()} já é seguidor de ${this.#usuarios[influencer_user_id].getNomeUsuario()}`)
    }else{
      this.#usuarios[influencer_user_id].seguidores.push(follower_user_id)
      console.log(`${this.#usuarios[follower_user_id].getNomeUsuario()} agora está seguindo ${this.#usuarios[influencer_user_id].getNomeUsuario()}`)
    }
  }

  unfollow_user(influencer_user_id,follower_user_id){
    if(this.#usuarios[influencer_user_id].seguidores.includes(follower_user_id)){
      let index_follower = this.#usuarios[influencer_user_id].seguidores.indexOf(follower_user_id)
      this.#usuarios[influencer_user_id].seguidores.splice(index_follower, 1)
      console.log(`${this.#usuarios[follower_user_id].getNomeUsuario()} parou de seguir ${this.#usuarios[influencer_user_id].getNomeUsuario()}`)
    }else{
      console.log(`${this.#usuarios[follower_user_id].getNomeUsuario()} não segue ${this.#usuarios[influencer_user_id].getNomeUsuario()}`)
    }
  }

  follower_count(user_id){
    console.log(`${this.#usuarios[user_id].getNomeUsuario()} possui ${this.#usuarios[user_id].seguidores.length} seguidores`)
    return this.#usuarios[user_id].seguidores.length
  }
  
  login(user_id, senha){
    if(user_id >= this.#usuarios.length){
      console.log("Usuário não encontrado, veriique se o id está correto")
    }else{
      if(this.#usuarios[user_id].verificar_senha(senha)){
        if(this.#usuarios[user_id].login){
          this.#usuarios[user_id].login=false
          console.log("Logoff feito com Sucesso!")
        }else{
          this.#usuarios[user_id].login=true
          console.log("Login feito com Sucesso!")
        }
      }else{
        console.log("Senha incorreta, tente novamente")
      }
    }
  }

  getUsuarios(){
    return this.#usuarios;
  }

  getPosts(){
    return this.posts
  }
  
}


class Usuario{

  #usuario;
  #senha;
  seguidores;
  login

  constructor(usuario, senha){
      this.#usuario = usuario;
      this.#senha = senha;
      this.seguidores = [];
      this.login = false;
  }

  verificar_senha(tentativa){
    if(tentativa === this.#senha){
      return true
    }else{
      return false
    }
  }

  MudarSenha(senha_anterior, nova_senha){
    if(this.verificar_senha(senha_anterior)){
      this.#senha = nova_senha
      console.log("Senha alterada com Sucesso")
    }else{
      console.log("Senha incorreta")
    }
  }

  getNomeUsuario(){
    return this.#usuario
  }

  setNomeUsuario(novo_nome){
    return this.#usuario = novo_nome
  }

  getSeguidores(){
    return this.seguidores
  }

  setSeguidores(index,mudar){
    if(index!=null){
      this.seguidores[index]=mudar
    }else{
      this.seguidores = []
    }
  }

  getLoginState(){
    return this.login
  }

  setLoginState(new_state){
    this.login = new_state
  }
  
}

class Post{
  
    constructor(titulo, texto, id_autor){
        this.titulo = titulo;
        this.texto = texto;
        this.autor = id_autor;
        this.data = new Date().toUTCString();
        this.curtidas = 0;
        this.comentarios = [];
    }

  getTitulo(){
    return this.titulo
  }
  getTexto(){
    return this.texto
  }
  getAutor(){
    return this.autor
  }
  getCurtidas(){
    return this.curtidas
  }
  getComentarios(){
    return this.comentarios
  }

  setTitulo(novo_titulo){
    this.titulo = novo_titulo
  }
  setTexto(novo_texto){
    this.texto = novo_texto
  }
  setAutor(novo_autor){
    this.autor = novo_autor
  }
  setCurtidas(novas_curtidas){
    this.curtidas = novas_curtidas
  }
  setComentarios(novos_comentarios){
    this.comentarios = novos_comentarios
  }
}

class Comment{
  
  texto;
  autor;
  data;
  constructor(texto, autor){
      this.texto = texto;
      this.autor = autor;
      this.data = new Date().toUTCString();
      this.curtidas = 0;
  }
  
    getTexto(){
      return this.texto
    }
    getAutor(){
      return this.autor
    }
    getCurtidas(){
      return this.curtidas
    }
    setTexto(novo_texto){
      this.texto = novo_texto
    }
    setAutor(novo_autor){
      this.autor = novo_autor
    }
    setCurtidas(novas_curtidas){
      this.curtidas = novas_curtidas
    }
    
}

/*

console.log("--- TESTE 1: CADASTRO E LOGIN ---");
const meuBlog = new Blog();

// Cadastrar usuários 
meuBlog.cadastra_usuario("Ana", "senha123");     // ID 0
meuBlog.cadastra_usuario("Carlos", "senha456"); // ID 1
meuBlog.cadastra_usuario("Luíza", "senha789");  // ID 2

// Fazer logins
meuBlog.login(0, "senha123"); // Ana loga
meuBlog.login(1, "senha456"); // Carlos loga
meuBlog.login(2, "senhaERRADA"); // Luíza erra a senha
console.log("---------------------------------");


console.log("\n--- TESTE 2: POSTS E COMENTÁRIOS ---");
// Ana publica um post [cite: 19]
meuBlog.publicar_post("Viagens Sustentáveis", "Texto sobre viagens...", 0); // Post ID 0

// Carlos comenta no post de Ana [cite: 20]
meuBlog.comentar_post("Ótimo texto! Minha experiência...", 1, 0); // Comentário ID 0

// Luíza tenta comentar sem estar logada
meuBlog.comentar_post("Quero ir também!", 2, 0); // Deve falhar
console.log("---------------------------------");


console.log("\n--- TESTE 3: CURTIDAS ---");
// Luíza curte o post de Ana (não precisa estar logada pela sua regra) [cite: 21]
meuBlog.curtir_post(0);

// Ana (logada) curte o comentário de Carlos
meuBlog.curtir_comentario(0, 0);

// Tenta curtir post inexistente
meuBlog.curtir_post(99);
console.log("---------------------------------");


console.log("\n--- TESTE 4: EDIÇÃO E PERMISSÃO ---");
// Carlos (ID 1) tenta editar post de Ana (Autor ID 0)
meuBlog.editar_post("Título Editado por Carlos", null, 1, 0); // Deve falhar

// Ana (ID 0) edita seu próprio post (só o título)
meuBlog.editar_post("Viagens Sustentáveis (Editado)", null, 0, 0); // Deve funcionar

// Ana (ID 0) edita seu próprio post (só o texto)
meuBlog.editar_post(null, "Texto sobre viagens... (Editado)", 0, 0); // Deve funcionar
console.log("---------------------------------");


console.log("\n--- TESTE 5: SEGUIDORES (NOVO) ---");
// Luíza (ID 2) segue Ana (ID 0) [cite: 21]
meuBlog.follow_user(0, 2);

// Carlos (ID 1) segue Ana (ID 0)
meuBlog.follow_user(0, 1);

// Luíza (ID 2) tenta seguir Ana (ID 0) DE NOVO
meuBlog.follow_user(0, 2); // Deve avisar que já segue

// Checar seguidores de Ana
meuBlog.follower_count(0); // Deve mostrar 2

// Luíza (ID 2) para de seguir Ana (ID 0)
meuBlog.unfollow_user(0, 2);

// Checar seguidores de Ana novamente
meuBlog.follower_count(0); // Deve mostrar 1

// Luíza (ID 2) tenta parar de seguir Ana (ID 0) DE NOVO
meuBlog.unfollow_user(0, 2); // Deve avisar que não segue

console.log("---------------------------------");


console.log("\n--- TESTE 6: ESTADO FINAL ---");
// Logoff de Carlos
meuBlog.login(1, "senha456"); // Carlos desloga

// Carlos (deslogado) tenta comentar
meuBlog.comentar_post("Agora deslogado!", 1, 0); // Deve falhar

// Ver estado final dos posts e usuários
console.log("\n--- Usuários Finais ---");
console.log(meuBlog.getUsuarios());
console.log("\n--- Posts Finais ---");
console.log(meuBlog.getPosts()[0]); // Mostra o post 0 com comentários e curtidas
console.log("---------------------------------"); */