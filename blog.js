class Blog{

  #usuarios;
  #posts;

  constructor(){
    this.#usuarios = [];
    this.#posts =  [];
    console.log("Blog Criado com sucesso!")
  }

  cadastra_usuario(Nome, senha) {
      if (Nome == null || senha == null) {
          console.log("Erro ao cadastrar o usuário: Forneça as informações de nome e senha.");
          return;
      }
      if (typeof Nome !== 'string' || typeof senha !== 'string') {
          console.log("Erro ao cadastrar usuário: Nome e Senha devem ser do tipo 'string'.");
          return;
      }
      const user = new Usuario(Nome, senha);
      this.#usuarios.push(user);
      console.log(`${user.getNomeUsuario()} cadastrado com sucesso! Seu ID de usuário é ${this.#usuarios.length - 1}`);
      return user;
  }

  publicar_post(titulo, texto, user_id) {
      if (titulo == null || texto == null || user_id == null) {
          console.log("Erro ao publicar o post: Forneça todas as informações (titulo, texto e id do usuário)");
          return;
      }
      if (typeof titulo !== "string" || typeof texto !== "string" || typeof user_id !== "number") {
          console.log("Erro ao publicar o post: Forneça todos os dados corretamente (titulo -> string, texto -> string, user_id -> number)");
          return;
      }
      if (user_id < 0 || user_id >= this.#usuarios.length) {
          console.log("Erro ao publicar o post: Usuário não encontrado");
          return;
      }

      const lil_post = new Post(titulo, texto, user_id);
      this.#posts.push(lil_post);
      console.log(`Post "${lil_post.getTitulo()}" publicado com sucesso! O ID do post é ${this.#posts.length - 1}`);
  }

  comentar_post(texto, user_id, id_post) {
      if (texto == null || user_id == null || id_post == null) {
          console.log("Erro ao comentar o post: Forneça todas as informações (texto, id de usuário e ID do post)");
          return;
      }
      if (typeof texto !== "string" || typeof user_id !== "number" || typeof id_post !== "number") {
          console.log("Erro ao comentar o post: Forneça todos os dados corretamente (texto -> string, user_id -> number, id_post -> number)");
          return;
      }
      if (id_post < 0 || id_post >= this.#posts.length) {
          console.log("Erro ao comentar o post: Post não encontrado");
      } else if (user_id < 0 || user_id >= this.#usuarios.length) {
          console.log("Erro ao comentar o post: Usuário não encontrado");
      } else if (!this.#usuarios[user_id].getLoginState()) {
          console.log("Não é possível comentar, usuário deslogado");
      } else {
          const comentario = new Comment(texto, user_id);
          this.#posts[id_post].getComentarios().push(comentario);
          console.log(`Comentário publicado com sucesso no Post "${this.#posts[id_post].getTitulo()}"! O ID do comentário é ${this.#posts[id_post].getComentarios().length - 1}`);
      }
  }

  editar_post(titulo, texto, user_id, id_post){
    if(user_id !== null && user_id !== undefined && id_post !== null && id_post !== undefined){
      if(typeof titulo == "string" && typeof texto == "string" && typeof user_id == "number" && typeof id_post == "number"){
        if(id_post >= this.#posts.length){
          console.log("Erro ao editar o post: Post não encontrado");
        }else if(user_id>=this.#usuarios.length){
          console.log("Erro ao editar o post: Usuário não encontrado")
        }else if(!this.#usuarios[user_id].getLoginState()){
          console.log("Erro ao editar o post: Usuário deslogado")
        }else{
          if(this.#posts[id_post].getAutor()==user_id){
            if((titulo===undefined || titulo===null)&&(texto===undefined || texto===null)){
                console.log("Não é possível editar, parametros inválidos")
                return;
            }
            if(titulo!==undefined && titulo!==null){
              this.#posts[id_post].setTitulo(titulo);
            }if(texto!==undefined && texto!==null){
              this.#posts[id_post].setTexto(texto);
            }
            this.#posts[id_post].setData(new Date().toUTCString());
            console.log("Post editado com sucesso")
          }else{
            console.log("Erro ao editar o post: Usuário não é dono do post")
          }
        }
      }else{
        console.log("Erro ao editar o post: Forneça todos os dados corretamente (título -> string, text -> string, user_id -> number, id_post -> string)")
      }
    }else{
      console.log("Erro ao editar o post: Forneça todas as informações (título, texto, id de usuário e id do post)")
    }
  }

  curtir_post(id_post) {
      if (id_post === null || id_post === undefined) {
          console.log("Erro ao curtir o post: Forneça o ID do post.");
          return;
      }
      if (typeof id_post !== 'number') {
          console.log("Erro ao curtir o post: ID do post deve ser um número.");
          return;
      }
      if (id_post < 0 || id_post >= this.#posts.length) {
          console.log("Erro ao curtir o post: Post não encontrado");
          return;
      }
      const curtidasAtuais = this.#posts[id_post].getCurtidas();
      this.#posts[id_post].setCurtidas(curtidasAtuais + 1);
      console.log(`Post "${this.#posts[id_post].getTitulo()}" curtido com sucesso! O post agora tem ${this.#posts[id_post].getCurtidas()} curtidas`);
  }

  curtir_comentario(id_comentario, id_post) {
      if (id_post == null || id_comentario == null) {
          console.log("Erro ao curtir comentário: Forneça o ID do post e do comentário.");
          return;
      }
      if (typeof id_post !== 'number' || typeof id_comentario !== 'number') {
          console.log("Erro ao curtir comentário: IDs devem ser números.");
          return;
      }
      if (id_post < 0 || id_post >= this.#posts.length) {
          console.log("Erro ao curtir comentário: Post não encontrado");
          return;
      }

      const comentarios = this.#posts[id_post].getComentarios();
      if (id_comentario < 0 || id_comentario >= comentarios.length) {
          console.log("Erro ao curtir comentário: Comentário não encontrado");
          return;
      }

      const comentario = comentarios[id_comentario];
      const curtidasAtuais = comentario.getCurtidas();
      comentario.setCurtidas(curtidasAtuais + 1);
      console.log(`Comentário curtido com sucesso! O comentário agora tem ${comentario.getCurtidas()} curtidas`);
  }

  follow_user(influencer_user_id, follower_user_id) {
          if (influencer_user_id == null || follower_user_id == null) {
              console.log("Erro ao seguir o usuário: Forneça o ID do influencer e do seguidor.");
              return;
          }
          if (typeof influencer_user_id !== 'number' || typeof follower_user_id !== 'number') {
              console.log("Erro ao seguir o usuário: IDs devem ser números.");
              return;
          }
          if (influencer_user_id < 0 || influencer_user_id >= this.#usuarios.length ||
              follower_user_id < 0 || follower_user_id >= this.#usuarios.length) {
              console.log("Erro ao seguir o usuário: Usuário (influencer ou seguidor) não encontrado.");
              return;
          }
          if (this.#usuarios[influencer_user_id].getSeguidores().includes(follower_user_id)) {
              console.log(`Erro ao seguir o usuário: ${this.#usuarios[follower_user_id].getNomeUsuario()} já é seguidor de ${this.#usuarios[influencer_user_id].getNomeUsuario()}`);
          } else {
              this.#usuarios[influencer_user_id].addSeguidores(follower_user_id);
              console.log(`${this.#usuarios[follower_user_id].getNomeUsuario()} agora está seguindo ${this.#usuarios[influencer_user_id].getNomeUsuario()}`);
          }
  }

  unfollow_user(influencer_user_id, follower_user_id) {
      if (influencer_user_id == null || follower_user_id == null) {
          console.log("Erro ao deixar de seguir o usuário: Forneça o ID do influencer e do seguidor.");
          return;
      }
      if (typeof influencer_user_id !== 'number' || typeof follower_user_id !== 'number') {
          console.log("Erro ao deixar de seguir o usuário: IDs devem ser números.");
          return;
      }
      if (influencer_user_id < 0 || influencer_user_id >= this.#usuarios.length ||
          follower_user_id < 0 || follower_user_id >= this.#usuarios.length) {
          console.log("Erro ao deixar de seguir o usuário: Usuário (influencer ou seguidor) não encontrado.");
          return;
      }
      if (this.#usuarios[influencer_user_id].getSeguidores().includes(follower_user_id)) {
          let index_follower = this.#usuarios[influencer_user_id].getSeguidores().indexOf(follower_user_id);
          this.#usuarios[influencer_user_id].getSeguidores().splice(index_follower, 1);
          console.log(`${this.#usuarios[follower_user_id].getNomeUsuario()} parou de seguir ${this.#usuarios[influencer_user_id].getNomeUsuario()}`);
      } else {
          console.log(`Erro ao deixar de seguir o usuário: ${this.#usuarios[follower_user_id].getNomeUsuario()} não segue ${this.#usuarios[influencer_user_id].getNomeUsuario()}`);
      }
  }

  follower_count(user_id) {
      if (user_id == null) {
          console.log("Erro ao emitir o numéro de seguidores do usuário: Forneça o ID do usuário.");
          return;
      }
      if (typeof user_id !== 'number') {
          console.log("Erro ao emitir o numéro de seguidores do usuário: ID do usuário deve ser um número.");
          return;
      }
      if (user_id < 0 || user_id >= this.#usuarios.length) {
          console.log("Erro ao emitir o numéro de seguidores do usuário: Usuário não encontrado.");
          return null;
      }
      console.log(`${this.#usuarios[user_id].getNomeUsuario()} possui ${this.#usuarios[user_id].getSeguidores().length} seguidores`);
      return this.#usuarios[user_id].getSeguidores().length;
  }

  login(user_id, senha) {
      if (user_id == null || senha == null) {
          console.log("Erro ao conectar à conta: Forneça ID do usuário e senha.");
          return;
      }
      if (typeof user_id !== 'number' || typeof senha !== 'string') {
          console.log("Erro ao conectar à conta: ID deve ser número e senha deve ser string.");
          return;
      }
      if (user_id < 0 || user_id >= this.#usuarios.length) {
          console.log("Usuário não encontrado: Verifique se o ID está correto");
          return;
      }

      if (this.#usuarios[user_id].verificar_senha(senha)) {
          if (this.#usuarios[user_id].getLoginState()) {
              this.#usuarios[user_id].setLoginState(false); 
              console.log("Logoff feito com Sucesso!");
          } else {
              this.#usuarios[user_id].setLoginState(true); 
              console.log("Login feito com Sucesso!");
          }
      } else {
          console.log("Erro ao conectar à conta: Senha incorreta, tente novamente");
      }
  }

  getUsuarios(){
    return this.#usuarios;
  }

  getPosts(){
    return this.#posts
  }

  toString(){
    return `Blog{\n Usuários: ${this.getUsuarios()}\n Posts: ${this.getPosts()}\n}`
  }
}


class Usuario{

  #usuario;
  #senha;
  #seguidores;
  #login

  constructor(usuario, senha){
    if(usuario == null || senha == null){
      console.log("Erro ao contruir um usuário: Defina um usuário e senha pra criar um usuário")
      return
    }
    if(typeof usuario != "string" || typeof senha != "string"){
      console.log("Erro ao contruir um usuário: Defina corretamente os dados: usuário -> string, senha -> string")
      return
    }
      this.#usuario = usuario;
      this.#senha = senha;
      this.#seguidores = [];
      this.#login = false;
  }

    verificar_senha(tentativa) {
        if (tentativa == null || typeof tentativa !== 'string') {
            console.log("Erro ao verificar a senha: parâmetro errado/indefinido {tentativa -> string}")
            return false; 
        }
        return tentativa === this.#senha;
    }

  MudarSenha(senha_anterior, nova_senha) {
      if (senha_anterior == null || nova_senha == null ||
          typeof senha_anterior !== 'string' || typeof nova_senha !== 'string') {
          console.log("Erro ao mudar a senha: Forneça a senha anterior e a nova senha como strings.");
          return;
      }

      if (this.verificar_senha(senha_anterior)) {
          this.#senha = nova_senha;
          console.log("Senha alterada com Sucesso");
      } else {
          console.log("Erro ao mudar a senha: Senha incorreta");
      }
  }

  getNomeUsuario(){
    return this.#usuario
  }

  getSeguidores(){
    return this.#seguidores
  }

  setNomeUsuario(novo_nome) {
      if (novo_nome == null) {
          console.log("Impossível redefinir o nome sem um parâmetro");
          return;
      }
      if (typeof novo_nome == "string") {
          this.#usuario = novo_nome;
      } else {
          console.log("Para redefinir o nome, defina um parâmetro válido (string)");
      }
  }

  addSeguidores(index) {
      if (index != null && typeof index == 'number') {
          this.#seguidores.push(index);
      } else {
          console.log("Erro ao seguir um usuário: Informe um ID de usuário válido (number)");
      }
  }

  getLoginState(){
    return this.#login
  }

  setLoginState(new_state) {
      if (new_state != null && typeof new_state == "boolean") {
          this.#login = new_state;
      } else {
          console.log("Erro ao redefinir o estado da conta: Forneça um estado de login válido (true ou false)");
      }
  }

  toString(){
    return `[Nome: ${this.getNomeUsuario()}, Senha: ${this.#senha}, Login: ${this.getLoginState()}, Seguidores: ${this.getSeguidores()}]`
  }
}

class Caixa_Texto{
  #texto;
  #autor;
  #data;
  #curtidas;

  constructor(txt,id_autor){
    if (txt == null || id_autor == null) {
      console.log("Erro ao contruir Texto: Forneça todas as informações (texto e ID do autor)");
      return;
    }
    if (typeof txt !== "string" || typeof id_autor !== "number") {
      console.log("Erro ao construir Texto: Forneça todos os dados corretamente (texto -> string, id_autor -> number)");
      return;
    }
    this.#texto = txt;
    this.#autor = id_autor;
    this.#data = new Date().toUTCString();
    this.#curtidas = 0;
  }


  getTexto(){
    return this.#texto
  }
  getAutor(){
    return this.#autor
  }
  getCurtidas(){
    return this.#curtidas
  }

  getData(){
    return this.#data
  }

  setTexto(novo_texto) {
      if (novo_texto == null) {
          console.log("Impossível redefinir o texto sem um parâmetro");
          return;
      }
      if (typeof novo_texto !== "string") {
          console.log("Para redefinir o texto, defina um parâmetro válido (string)");
          return;
      }
      this.#texto = novo_texto;
  }

  setAutor(novo_autor) {
      if (novo_autor == null) {
          console.log("Impossível redefinir o autor sem um parâmetro");
          return;
      }
      if (typeof novo_autor !== "number") {
          console.log("Para redefinir o autor, defina um parâmetro válido (number)");
          return;
      }
      this.#autor = novo_autor;
  }

  setCurtidas(novas_curtidas) {
      if (novas_curtidas == null) {
          console.log("Impossível redefinir o número de curtidas sem um parâmetro");
          return;
      }
      if (typeof novas_curtidas !== "number" || novas_curtidas < 0) {
          console.log("Para redefinir o número de curtidas, defina um parâmetro válido (number)");
          return;
      }
      this.#curtidas = novas_curtidas;
  }

  setData(nova_data) {
      if (nova_data == null) {
          console.log("Impossível redefinir a data sem um parâmetro");
          return;
      }
      if (typeof nova_data !== "string") {
          console.log("Para redefinir a data, defina um parâmetro válido (string)");
          return;
      }
      this.#data = nova_data;
  }

  toString(){
      return `[Texto: "${this.getTexto()}", Autor: ${this.getAutor()}, Data: (${this.getData()}), Curtidas: ${this.getCurtidas()}]`
  }

}

class Post extends Caixa_Texto{

  #titulo
  #comentarios

  constructor(title, txt, id_autor){
    super(txt,id_autor)
    if(title == null){
      console.log("Erro ao construit o post: Defina um titulo")
      return
    }
    if(typeof title != "string"){
      console.log("Erro ao construit o post: Defina os dados corretamente: title -> string")
    }

    this.#titulo = title;
    this.#comentarios = [];
  }

  getTitulo(){
    return this.#titulo
  }

  getComentarios(){
    return this.#comentarios
  }

  setTitulo(novo_titulo) {
      if (novo_titulo == null) {
          console.log("Erro ao redefinir o título: Forneça um novo título.");
          return;
      }
      if (typeof novo_titulo !== "string") {
          console.log("Erro ao redefinir o título: Forneça um novo título válido (string).");
          return;
      }
      this.#titulo = novo_titulo;
  }

  setComentarios(novos_comentarios) {
      if (novos_comentarios == null) {
          console.log("Erro ao redefinir o comentário: Forneça uma nova lista de comentários.");
          return;
      }
      if (!Array.isArray(novos_comentarios)) {
          console.log("Erro ao redefinir o comentário: Forneça uma nova lista de comentários válida (array).");
          return;
      }
      this.#comentarios = novos_comentarios;
  }

  toString(){
    return `[Titulo: "${this.getTitulo()}", Texto: "${this.getTexto()}", Autor: ${this.getAutor()}, Data: (${this.getData()}), Curtidas: ${this.getCurtidas()}, Comentarios: ${this.getComentarios()}]`
  }
}

class Comment extends Caixa_Texto{

  constructor(texto, autor){
    super(texto,autor)
  }
}