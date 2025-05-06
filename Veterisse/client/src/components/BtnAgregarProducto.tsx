import React, { useState } from "react";
import { IconPlus } from "@tabler/icons-react";

const BtnAgregarProducto = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                className={`inline-flex items-center justify-center whitespace-nowrap 
                rounded-md bg-teal-600 hover:bg-teal-700 px-4 py-2 text-sm font-medium
                text-white transition-colors focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2
            `}
                onClick={() => setOpen(true)}
            >
                <IconPlus className="mr-2" size={20} />
                Agregar Producto
            </button>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-4 shadow-lg w-full max-w-2xl relative">
                        <h2 className="text-lg font-semibold text-center">Agregar Producto</h2>
                        <form className="mt-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombre del Producto
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full border 
                                border-gray-300 rounded-md shadow-sm focus:ring-teal-500 
                                focus:border-teal-500 py-1 px-2"
                                    placeholder="Nombre"
                                    required
                                />
                            </div>
                            <div className="flex justify-between w-full">
                            <div className="mb-4 w-100">
                            <label className="block text-sm font-medium text-gray-700">
                                Precio
                            </label>
                            <input
                                type="number"
                                className="mt-1 w-75 block border 
                                border-gray-300 rounded-md shadow-sm focus:ring-teal-500 
                                focus:border-teal-500 py-1 px-2"
                                placeholder="Precio"
                                required
                            />
                            </div>
                            <div className="mb-4 w-100">
                                <label className="block text-sm font-medium text-gray-700">
                                    Cantidad
                                </label>
                                <input
                                    type="number"
                                    className="mt-1 block w-75 border 
                                border-gray-300 rounded-md shadow-sm focus:ring-teal-500 
                                focus:border-teal-500 py-1 px-2"
                                    placeholder="Cantidad"
                                    required
                                />
                            </div>
                                </div>
                            <div className="flex justify-between mt-6 w-full">
                                <div className="mb-4 w-100">
                                <label className="block text-sm font-medium text-gray-700">
                                    Ubicacion
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 w-75 block border 
                                border-gray-300 rounded-md shadow-sm 
                                focus:ring-teal-500
                                py-1 px-2"
                                    placeholder="Ubicacion"
                                    required
                                />
                                </div>
                                <div className="mb-4 w-100">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Categoria
                                    </label>
                                    <input
                                        type="text"
                                        className="mt-1 py-1 px-2 block w-75 border
                                border-gray-300 rounded-md shadow-sm focus:ring-teal-500"
                                placeholder="Categoria"></input>
                                </div>

                            </div>
                            <div className="=mb-4">
                                <label className="mt-4 block text-sm font-medium text-gray-700">
                                    Descripcion
                                </label>
                                <textarea
                                    className="mt-1 block w-full border
                                border-gray-300 rounded-md shadow-sm focus:ring-teal-500 px-2 resize-none"
                                    placeholder="Descripcion"
                                    rows={3}
                                    required

                                ></textarea>
                            </div>
                            {/* Agrega más campos según sea necesario */}
                            <div className="flex justify-between mt-6 w-full">
                            <button
                                type="submit"
                                className="mt-4 bg-teal-600 hover:bg-teal-700 
                            text-white py-2 px-4 rounded "
                            >
                                Agregar
                            </button>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="mt-4 bg-teal-600 hover:bg-teal-700 
                                    text-white py-2 px-4 rounded"
                                >
                                    Cerrar
                                </button>
                                </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default BtnAgregarProducto;
