import { createClienteDTO } from "../dtos/createCliente.js";

export class ClienteController{
    constructor(clienteService) {
        this.clienteService = clienteService;
    }
    listar = (req, res) => {
        //Corpo do  método
        try {

            const clientes = this.clienteService.listarCliente();

            return res.status(200).json(clientes);
        } catch (err){
             return res.status(500).json({erro : err.mensagem});
        }

    }


    criar = (req, res) => {
        //Corpo do método
        try {
            const dto = createClienteDTO(req.body);
            const clienteCriado = this.clienteService.cadastrarCliente(dto);

            return res.status(201).json(clienteCriado);
        } catch (err){
            return res.status(400).json({erro : err.mensagem});
        }
    }
}
