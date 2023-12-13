package anuncio.ifpb.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import anuncio.ifpb.api.usuario.DadosAtualizacaoUsuario;
import anuncio.ifpb.api.usuario.DadosCadastroUsuario;
import anuncio.ifpb.api.usuario.DadosListagemUsuario;
import anuncio.ifpb.api.usuario.Endereco;
import anuncio.ifpb.api.usuario.Usuario;
import anuncio.ifpb.api.usuario.UsuarioRepository;
import jakarta.validation.Valid;

@RestController 
@RequestMapping("/usuarios")
public class UsuarioController {

	@Autowired
	private UsuarioRepository repository;
	
	@PostMapping("/cadastrar")
	@Transactional
	public void cadastrar(@Valid @RequestBody DadosCadastroUsuario dados) {
		System.out.println(dados);
		repository.save(new Usuario(dados));
	}

	@GetMapping("/listar")
	   public Page<DadosListagemUsuario> listar(@PageableDefault(
			   size = 10, sort = {"nome"}) Pageable paginacao) {
        return repository.findAll(paginacao).map(DadosListagemUsuario::new);
    }


	@PutMapping("/atualizar")
	@Transactional
	public void atualizar(@Valid @RequestBody DadosAtualizacaoUsuario dados) {
		var usuario = repository.getReferenceById(dados.id());
		usuario.atualizarInformacoes(dados);
	}

	@DeleteMapping("/excluir/{id}")
	@Transactional
	public void excluir(@PathVariable Long id) {
		repository.deleteById(id);
	}

}
