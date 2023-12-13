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
import org.springframework.web.bind.annotation.*;

import anuncio.ifpb.api.anuncio.Anuncio;
import anuncio.ifpb.api.anuncio.AnuncioRepository;
import anuncio.ifpb.api.anuncio.DadosAtualizacaoAnuncio;
import anuncio.ifpb.api.anuncio.DadosCadastroAnuncio;
import anuncio.ifpb.api.anuncio.DadosListagemAnuncio;
import anuncio.ifpb.api.carro.Carro;
import anuncio.ifpb.api.carro.CarroRepository;
import anuncio.ifpb.api.carro.DadosAtualizacaoCarro;
import anuncio.ifpb.api.carro.DadosCadastroCarro;
import anuncio.ifpb.api.carro.DadosListagemCarro;
import jakarta.validation.Valid;

import java.util.List;

@RestController 
@RequestMapping("/carros")
public class CarroController {

	@Autowired
	private CarroRepository repository;

	@Autowired
	private UsuarioRepository user_repository;

	@Autowired
	private AnuncioRepository anuncio_repository;

	
	@PostMapping("/cadastrar")
	@Transactional
	public void cadastrar(@Valid @RequestBody DadosCadastroCarro dados) {
		Usuario usuario = user_repository.findByEmail(dados.user_email());
		System.out.println(dados);
		repository.save(new Carro(dados, usuario));
	}

	@GetMapping("/listar")
	   public List<Carro> listar(@RequestParam String user_email) {
		Usuario usuario = user_repository.findByEmail(user_email);
        return repository.findByUsuario(usuario);
    }




	@PutMapping("/atualizar")
	@Transactional
	public void atualizar(@Valid @RequestBody DadosAtualizacaoCarro dados) {
		var carro = repository.getReferenceById(dados.id());
		carro.atualizarInformacoes(dados);
	}

	@DeleteMapping("/excluir/{id}")
	@Transactional
	public void excluir(@PathVariable Long id) {
		List<Anuncio> anunciosDoCarro = anuncio_repository.findByCarroId(id);
		anuncio_repository.deleteAll(anunciosDoCarro);
		repository.deleteById(id);
	}
}
