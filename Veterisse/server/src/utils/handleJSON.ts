import { readFileSync, writeFileSync } from "fs";
const path = require('path');

export class HandleData{
  #pathFile: string;
  #productsFilePath: string;

  constructor(pathFile: string) {
    this.#pathFile = pathFile;
    this.#productsFilePath = path.join(__dirname, this.#pathFile);
  }

  readData(): any[] {
    try {
      const fileContent = readFileSync(this.#productsFilePath, 'utf8');
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

  saveData(data: any[]): void {
    try {
      const jsonContent = JSON.stringify(data, null, 2);
      writeFileSync(this.#productsFilePath, jsonContent, 'utf8');
      console.log('Archivo guardado correctamente');
    } catch (error: any) {
      console.error('Error al guardar el archivo:', error.message);
    }
  }

  addData(newData: any): {status: number, message: string, data?: any} {
    try {
      const data = this.readData();
      data.push(newData);
      this.saveData(data);

      return {status: 200, message: 'Datos agregados correctamente', data: newData};
    }
    catch (error: any) {
      return {status: 404, message: error.message, data: newData};
    }

  }

  getId(): string {
    return this.#generateId(); // Incrementa el último ID
  }

  #generateId(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!@#$%^&*()-_=+[]{}|;:<>?';
    let id = '';
    for (let i = 0; i < length; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}