class Blog{

  //resolver problema de login/senha
  
  #usuarios;
  posts;
  
  constructor(){
    this.#usuarios = [];
    this.posts =  [];
  }
  
  cadastra_usuario(Nome, senha){
   const user = new Usuario(Nome, senha, 0); 
   this.#usuarios.push(user);
    console.log(`Usuário cadastrado com sucesso! Seu ID de usuário é ${this.#usuarios.length - 1}`);
   }

  publicar_post(titulo,texto,user_id,data){
    if(user_id>=this.#usuarios.length){
      console.log("Usuário não encontrado")
    }else{
      const lil_post = new Post(titulo,texto,this.#usuarios[user_id].usuario,data);
      this.posts.push(lil_post);
      console.log(`Post publicado com sucesso! O ID do post é ${this.posts.length - 1}`)
    }
  }

  comentar_post(titulo, texto, autor, data, id_post){
    if(id_post >= this.posts.length){
      console.log("Post não encontrado");
    }else{
      const comentario = new Comment(titulo, texto, autor, data);
      this.posts[id_post].comentarios.push(comentario);
      console.log(`Comentário publicado com sucesso! O ID do comentário é ${this.posts[id_post].comentarios.length - 1}`);
    }
  }

  editar_post(titulo, texto, user_id, data, id_post){
    if(id_post >= this.posts.length){
      console.log("Post não encontrado");
    }else if(user_id>=this.#usuarios.length){
      console.log("Usuário não encontrado")
    }else if(!this.#usuarios[user_id].login){
      console.log("Usuário deslogado")
    }else{
      if(titulo!=undefined or titulo!=null){
        this.posts[id_post].titulo = titulo;
      }if(texto!=undefined or texto!=null){
        this.posts[id_post].texto = texto;
      }
      //Precisa alterar essa data dpsss
      this.posts[id_post].data = data;
      console.log("Post editado com sucesso")
      
      
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
        this.posts[id_post].comntarios.curtidas++;
        console.log(`Comentário curtido com sucesso! O comentário agora tem ${this.posts[id_post].comentarios.curtidas} curtidas`);
      }
    }
  }

  login(user_id, senha){
    if(user_id >= this.usuarios.length){
      console.log("Usuário não encontrado, veriique se o id está correto")
    }else{
      if(senha === usuarios[user_id].senha){
        usuarios[user_id].login = true;
        console.log("Login feito com Sucesso!")
      }else{
        console.log("Senha incorreta, tente novamente")
      }
    }
  }

  logoff(user_id, senha){
    if(user_id >= this.usuarios.length){
      console.log("Usuário não encontrado, veriique se o id está correto")
    }else{
      if(senha === usuarios[user_id].senha){
        usuarios[user_id].login = false;
        console.log("Logoff feito com Sucesso!")
      }else{
        console.log("Senha incorreta, tente novamente")
      }
    }
  }

  

}

class Usuario{
  
  #usuario;
  #senha;
  seguidores;
  login
  
  constructor(usuario, senha, seguidores){
      this.#usuario = usuario;
      this.#senha = senha;
      this.seguidores = seguidores;
      this.login = false;
  }
}

class Post{
  
    constructor(titulo, texto, autor, data){
        this.titulo = titulo;
        this.texto = texto;
        this.autor = autor;
        this.data = data;
        this.curtidas = 0;
        this.comentarios = [];
    }
}

class Comment{
  texto;
  autor;
  data;
  constructor(texto, autor, data){
      this.texto = texto;
      this.autor = autor;
      this.data = data;
      this.curtidas = 0;
  }
}

