import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../Components/Spinner'

const VerCliente = () => {

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
        
            <div>
                {cargando ? <Spinner /> : Object.keys(cliente).length === 0 ? <h1 className="font-black text-4xl text-blue-900 uppercase"> No hay resultados </h1> : (
                        <>
                            <h1 className="font-black text-4xl text-blue-900">Ver Cliente: {cliente.nombre} </h1>
                            <p className="mt-3" > Informacion del cliente </p>

                            <p className='text-4xl text-gray-500 mt-10'> <span className='uppercase font-bold text-gray-800'>Cliente:</span> {cliente.nombre} </p>
                            <p className='text-2xl text-gray-500 mt-4'> <span className='uppercase font-bold text-gray-800'>Email:</span> {cliente.email} </p>
                            {cliente.telefono && (
                                <p className='text-2xl text-gray-500 mt-4'> <span className='uppercase font-bold text-gray-800'>Telefono:</span> {cliente.telefono} </p>
                            )}
                            
                            <p className='text-2xl text-gray-500 mt-4'> <span className='uppercase font-bold text-gray-800'>Empresa:</span> {cliente.empresa} </p>
                            {cliente.notas && (
                                <p className='text-2xl text-gray-500 mt-4'> <span className='uppercase font-bold text-gray-800'>Notas:</span> {cliente.notas} </p>
                            )}                   
                        </>
                    )}       
            </div>
        )
}
 
export default VerCliente;