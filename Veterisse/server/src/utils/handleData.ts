import { readFileSync, writeFileSync } from "fs";
const path = require('path');

export const HandleData = (route: string) => {
  const productsFilePath = path.join(__dirname, route);

  const readData = (): any[] => {
    try {
      const fileContent = readFileSync(productsFilePath, 'utf8');
      if (!Array.isArray(JSON.parse(fileContent))) {
        console.error('El archivo no contiene un array válido');
        return [];
      }
      return JSON.parse(fileContent);
    } catch (error: any) {
      console.error('Error al leer el archivo:', error.message);
      return [];
    }
  }

  const saveData = (data: any[]): void => {
    try {
      const jsonContent = JSON.stringify(data, null, 2);
      writeFileSync(productsFilePath, jsonContent, 'utf8');
      console.log('Archivo guardado correctamente');
    } catch (error: any) {
      console.error('Error al guardar el archivo:', error.message);
    }
  }

  const addData = (newData: any): {status: number, message: string, data?: any} => {
    try {
      const data = readData();
      data.push(newData);
      saveData(data);

      return {status: 200, message: 'Datos agregados correctamente', data: newData};
    }
    catch (error: any) {
      return {status: 404, message: error.message, data: newData};
    }

  }

  const getId = (): string => {
    return generateId(); // Incrementa el último ID
  }

  const generateId = (length: number = 10): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!@#$%^&*()-_=+[]{}|;:<>?';
    let id = '';
    for (let i = 0; i < length; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  return {
    readData,
    saveData,
    addData,
    getId,
  };
}
