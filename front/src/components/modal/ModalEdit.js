import axios from "axios"
import { useState , useEffect} from "react"
import { toast } from "react-toastify"
import "./modal.css"

export function ModalEdit({ dados, isOpen, setIsOpen }) {
    
    const [cod, setCodigo] = useState("")
    const [desc, setDescricao] = useState("")
    const [local, setLocalizacao] = useState("")
    const [fab, setFabricante] = useState("")
    const [qnt, setQuantidade] = useState("")

    useEffect(() => {
        setCodigo(dados.cod);
        setDescricao(dados.desc);
        setLocalizacao(dados.local);
        setFabricante(dados.fab);
        setQuantidade(dados.qnt);
      }, [dados]
    );


    
    var produto = {
        cod: cod,
        desc: desc,
        local: local,
        fab: fab,
        qnt: qnt
    }
    function salvar(e) {
        e.preventDefault()
        // axios.post('http://localhost:3333/cadastrar',lista
        // ).then(e =>{ toast.promise(); console.log(e)}).catch(e => toast.error("Erro ao salvar"))
        toast.promise(
            axios.put('http://localhost:3333/editar', produto),
            {
                pending: 'Salvando..',
                success: 'Salvo com sucesso!',
                error: 'Erro ao salvar!'
            }
        )
        setIsOpen(false)

    }

    if (isOpen) {
           return (
            <div className="modal">

                <div className="content">
                    <form id="modal">

                        <h1>Cadastro de podutos</h1>
                        <fieldset>
                            <legend>Dados</legend>

                            <div className="label-float">
                                <input name="cadastro" className="input" placeholder=" " value={cod} onChange={(e) => setCodigo(e.target.value)} />
                                <label htmlFor="cadastro">codigo</label>
                            </div>

                            <div className="label-float">
                                <input name="descricao" className="input" placeholder=" " value={desc} onChange={(e) => setDescricao(e.target.value)} />
                                <label htmlFor="descricao">descrição</label>
                            </div>

                            <div className="label-float">
                                <input name="localizacao" className="input" placeholder=" " value={local} onChange={(e) => setLocalizacao(e.target.value)} />
                                <label htmlFor="localizacao">localização</label>
                            </div>

                            <div className="label-float">
                                <input name="fabricante" className="input" placeholder=" " value={fab} onChange={(e) => setFabricante(e.target.value)} />
                                <label htmlFor="fabricante">fabricante</label>
                            </div>

                            <div className="label-float">
                                <input name="quantidade" className="input" placeholder=" " value={qnt} onChange={(e) => setQuantidade(e.target.value)} />
                                <label htmlFor="quantidade">quantidade</label>
                            </div>

                        </fieldset>

                        <div id="btn">
                            <button className="cadActions" id="cancel" onClick={() => { setIsOpen(!isOpen) }}>Cancelar</button>
                            <button className="cadActions" id="salvar" onClick={(e) => salvar(e)}>Salvar</button>
                        </div>



                    </form>
                </div>

            </div>
        )
    }
}