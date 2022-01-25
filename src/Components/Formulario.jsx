import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'

const Formulario = ({cliente}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El Nombre es muy corto')
                    .max(40, 'El Nombre es muy largo')
                    .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
                    .required('El nombre de la Empresa es obligatorio'),
        email: Yup.string()
                  .email('El E-mail no es valido')
                  .required('El E-mail es obligatorio'),
        telefono: Yup.number()
                    .positive('Numero no valido')
                    .integer('Numero no valido')
                    .typeError('El numero no es valido')
    })

    const handleSubmit = async (valores) => {
        console.log(valores)
        try {
            let respuesta
            if(cliente.id) {
                const url = `http://localhost:4000/clientes/${cliente.id}`

                respuesta = await fetch (url, {
                    method: 'PUT', 
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            } else {
                const url = 'http://localhost:4000/clientes'

                respuesta = await fetch (url, {
                    method: 'POST', 
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            }

            await respuesta.json()
            navigate('/')

        } catch (error) {
            console.log(error)
        }

        
    }

    return ( 
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            <h1 className="text-gray-600 font-bold text-xl uppercase text-center"> {cliente.nombre ? 'Editar Cliente' : 'Agregar Cliente'} </h1>
            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? "",
                    empresa: cliente?.empresa ?? "",
                    email: cliente?.email ?? "", 
                    telefono: cliente?.telefono ?? "",
                    notas: cliente?.notas ?? "",
                }}
                
                enableReinitialize={true}
            
                onSubmit={ async (values, {resetForm}) => {
                    await handleSubmit(values)
                    resetForm()

                }}

                validationSchema={nuevoClienteSchema}
            >
                {({errors, touched}) => {

                    return (
                    <Form className='mt-10'>
                        <div className='mb-4'>
                            <label className='text-gray-800' htmlFor="nombre" >Nombre:</label>
                            <Field
                                id="nombre" 
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-100 rounded-md"
                                placeholder="Nombre del cliente"
                                name="nombre"
                            />
                            {errors.nombre && touched.nombre ? (
                                <Alerta>{errors.nombre}</Alerta>
                            
                            ) : null } 
                        </div>
                        <div className='mb-4'>
                            <label className='text-gray-800' htmlFor="empresa" >Empresa:</label>
                            <Field
                                id="empresa" 
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-100 rounded-md"
                                placeholder="Empresa del cliente"
                                name="empresa"
                            />
                            {errors.empresa && touched.empresa ? (
                                <Alerta>{errors.empresa}</Alerta>
                            
                            ) : null } 
                        </div>
                        <div className='mb-4'>
                            <label className='text-gray-800' htmlFor="email" >E-Mail:</label>
                            <Field
                                id="email" 
                                type="email"
                                className="mt-2 block w-full p-3 bg-gray-100 rounded-md"
                                placeholder="E-Mail del cliente"
                                name="email"
                            />
                            {errors.email && touched.email ? (
                                <Alerta>{errors.email}</Alerta>
                            
                            ) : null } 
                        </div>
                        <div className='mb-4'>
                            <label className='text-gray-800' htmlFor="telefono" >Telefono:</label>
                            <Field
                                id="telefono" 
                                type="tel"
                                className="mt-2 block w-full p-3 bg-gray-100 rounded-md"
                                placeholder="Telefono del cliente"
                                name="telefono"
                            />
                            {errors.telefono && touched.telefono ? (
                                <Alerta>{errors.telefono}</Alerta>
                            
                            ) : null } 
                        </div>
                        <div className='mb-4'>
                            <label className='text-gray-800' htmlFor="notas" >Notas:</label>
                            <Field
                                as="textarea"
                                id="notas" 
                                type="tel"
                                className="mt-2 block w-full p-3 bg-gray-100 rounded-md h-40"
                                placeholder="Notas sobre el cliente"
                                name="notas"

                            />
                        </div>
                        <input 
                            type="submit"
                            value={cliente.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                            className='mt-5 w-full bg-blue-800 p-3 text-white uppercase text-lg font-bold hover:cursor-pointer hover:bg-blue-600 rounded-md'
                        />
                    </Form>
                )}}

            </Formik>
        </div>
     );
}

Formulario.defaultProps = {
    cliente: {}
}

export default Formulario;