package anuncio.ifpb.api.carro;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import anuncio.ifpb.api.anuncio.Anuncio;
import anuncio.ifpb.api.anuncio.AnuncioRepository;
import anuncio.ifpb.api.usuario.Usuario;
import anuncio.ifpb.api.usuario.UsuarioRepository;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedAttributeNode;
import jakarta.persistence.NamedEntityGraph;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "carros")
@Entity(name = "Carro")
@Getter
@AllArgsConstructor
@EqualsAndHashCode(of="id")
@NamedEntityGraph(name = "Carro.anuncio", attributeNodes = @NamedAttributeNode("anuncio"))
public class Carro {

	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String marca;
    private String nome;
    private String cor;
    private String descricao;

	private String image_url;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private Usuario usuario; // Referência para o usuário proprietário do carro

	@OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name="anuncio_id")
    private Anuncio anuncio;
    
    public Carro(DadosCadastroCarro dados, Usuario usuario) {
        this.marca = dados.marca();
        this.nome = dados.nome();
        this.cor = dados.cor();
        this.descricao = dados.descricao();
		this.image_url = dados.image_url();
		this.usuario = usuario;
    }

	public Carro(DadosCadastroCarro dados, Usuario usuario, Anuncio anuncio) {
		this.marca = dados.marca();
		this.nome = dados.nome();
		this.cor = dados.cor();
		this.descricao = dados.descricao();
		this.usuario = usuario;
		this.anuncio = anuncio;
	}
    
    public Carro() {
    }
    
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Anuncio getAnuncio() {
		return anuncio;
	}

	public void setAnuncio(Anuncio anuncio) {
		this.anuncio = anuncio;
	}

	public String getCor() {
		return cor;
	}

	public void setCor(String cor) {
		this.cor = cor;
	}

	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public String getImageUrl() {
		return image_url;
	}

	public void setImageUrl(String image_url) {
		this.image_url = image_url;
	}

	public void atualizarInformacoes(DadosAtualizacaoCarro dados) {
        if (dados.marca() != null) {
            this.marca = dados.marca();
        }
		if (dados.image_url() != null) {
			this.image_url = dados.image_url();
		}
        if (dados.descricao() != null) {
            this.descricao = dados.descricao();
        }
        if (dados.nome() != null) {
            this.nome = dados.nome();
        }
        if (dados.cor() != null) {
            this.cor = dados.cor();
        }
        if (dados.idAnuncio() != null) {
        	Anuncio anuncio = new Anuncio();
        	anuncio.setId(dados.idAnuncio());
            this.anuncio = anuncio;
        }
    }
}