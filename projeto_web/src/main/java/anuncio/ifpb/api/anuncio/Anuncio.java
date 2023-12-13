package anuncio.ifpb.api.anuncio;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import anuncio.ifpb.api.carro.Carro;
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

@Table(name = "anuncios")
@Entity(name = "Anuncio")
@Getter
@AllArgsConstructor
@EqualsAndHashCode(of="id")
@NamedEntityGraph(name = "Anuncio.anunciante-carro", 
attributeNodes = {
        @NamedAttributeNode(value = "anunciante"),
        @NamedAttributeNode(value = "carro")
    })
public class Anuncio {


	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String descricao;
    private Float valor;
    
    @ManyToOne
    @JoinColumn(name="anunciante_id")
    private Usuario anunciante;
    
    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name="carro_id")
    private Carro carro;

    @Embedded
    private Endereco endereco;
    
    public Anuncio(DadosCadastroAnuncio dados, Usuario usuario) {
        this.titulo = dados.titulo();
        this.descricao = dados.descricao();
        this.valor = dados.valor();

        Carro carro = new Carro();
        carro.setId(dados.car_id());
        
        this.anunciante = usuario;
        this.carro = carro;
        this.endereco = new Endereco(dados.endereco());
    }
    
    public Anuncio() {
    	
    }
    


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Float getValor() {
		return valor;
	}

	public void setValor(Float valor) {
		this.valor = valor;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}
	
    public Usuario getAnunciante() {
		return anunciante;
	}

	public void setAnunciante(Usuario anunciante) {
		this.anunciante = anunciante;
	}

	public Carro getCarro() {
		return carro;
	}

	public void setCarro(Carro carro) {
		this.carro = carro;
	}

	@Override
	public String toString() {
		return "Anuncio [id=" + id + ", titulo=" + titulo + ", descricao=" + descricao + ", valor=" + valor
				+ ", anunciante=" + anunciante + ", endereco=" + endereco + "]";
	}


	public void atualizarInformacoes(DadosAtualizacaoAnuncio dados) {
        if (dados.titulo() != null) {
            this.titulo = dados.titulo();
        }
        if (dados.descricao() != null) {
            this.descricao = dados.descricao();
        }
        if (dados.valor() != null) {
            this.valor = dados.valor();
        }
        if (dados.endereco() != null) {
            this.endereco.atualizarInformacoes(dados.endereco());
        }

    }
}