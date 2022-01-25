import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from "../Components/Formulario";
import Spinner from '../Components/Spinner';

const EditarCliente = () => {

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()

                setCliente(resultado)

            } catch (error) {
                console.log(error)
            }

            setTimeout(() => {
                setCargando(false)
            }, 1000)

            
        }

        obtenerClienteAPI()

    }, [])

    return ( 
        <>
            <h1 className="font-black text-4xl text-blue-900"> Editar Cliente </h1>
            <p className="mt-3" > Utilice este formulario para editar el clienten </p>
            {cargando ? <Spinner /> : Object.keys(cliente).length === 0 ? <h1 className="font-black text-4xl text-blue-900 uppercase"> No hay resultados </h1> : (
                <Formulario 
                    cliente={cliente}
                />
            )}
        </>
     );
}
 
export default EditarCliente;