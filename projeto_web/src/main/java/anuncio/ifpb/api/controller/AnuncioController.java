package anuncio.ifpb.api.controller;

import anuncio.ifpb.api.usuario.Usuario;
import anuncio.ifpb.api.usuario.UsuarioRepository;
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

import anuncio.ifpb.api.anuncio.Anuncio;
import anuncio.ifpb.api.anuncio.AnuncioRepository;
import anuncio.ifpb.api.anuncio.DadosAtualizacaoAnuncio;
import anuncio.ifpb.api.anuncio.DadosCadastroAnuncio;
import anuncio.ifpb.api.anuncio.DadosListagemAnuncio;
import jakarta.validation.Valid;

@RestController 
@RequestMapping("/anuncios")
public class AnuncioController {

	@Autowired
	private AnuncioRepository repository;
	@Autowired
	private UsuarioRepository user_repository;
	
	@PostMapping("/cadastrar")
	@Transactional
	public void cadastrar(@Valid @RequestBody DadosCadastroAnuncio dados) {
		Usuario usuario = user_repository.findByEmail(dados.user_email());
		System.out.println(dados);
		repository.save(new Anuncio(dados, usuario));
	}

	@GetMapping("/listar")
	   public Page<DadosListagemAnuncio> listar(@PageableDefault(
			   size = 10, sort = {"titulo"}) Pageable paginacao) {
        return repository.findAll(paginacao).map(DadosListagemAnuncio::new);
    }


	@PutMapping("/atualizar")
	@Transactional
	public void atualizar(@Valid @RequestBody DadosAtualizacaoAnuncio dados) {
		var anuncio = repository.getReferenceById(dados.id());
		anuncio.atualizarInformacoes(dados);
	}

	@DeleteMapping("/excluir/{id}")
	@Transactional
	public void excluir(@PathVariable Long id) {
		repository.deleteById(id);
	}

}
