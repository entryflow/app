import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})

export class ApiService {

  API_URL = 'https://api-test-nlih-dev.fl0.io/';
  constructor() {}

  async login() {
    const options = {
      url: this.API_URL + 'auth/login',
      headers: { 'Content-Type': 'application/json' },
      data: { foo: 'bar' },
    };

    const response = await CapacitorHttp.request({
      ...options,
      method: 'POST',
    });
  }

  async getEmployees(id: any) {
    let data = [];
    const options = {
      url: this.API_URL + 'employees/company/' + id,
      //     headers: { 'Content-Type': 'application/json',
      //   'Acces-Control-Allow-Origin': '*',
      // 'Accept': 'application/json', },
      //params: { company_id : id },
      //data: { foo: 'bar' },
    };

    const response = await CapacitorHttp.request({ ...options, method: 'GET' });
    for (let i = 0; i < response.data.length; i++) {
      data.push(response.data[i]);
    }
    return data;
  }

  async deleteEmployees(id: any) {
    const options = {
      url: this.API_URL + 'employees/' + id,
      //     headers: { 'Content-Type': 'application/json',
      //   'Acces-Control-Allow-Origin': '*',
      // 'Accept': 'application/json', },
      //params: { company_id : id },
      //data: { foo: 'bar' },
    };

    const response = await CapacitorHttp.request({
      ...options,
      method: 'DELETE',
    });

    return response.status;
  }

  async createEmployees(data: any) {
    const options = {
      url: this.API_URL + 'employees',
      params: {
        name: data.name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        company_id: data.company_id,
        birth_date: data.birth_date,
      },
      data: {
        image: data.image,
      },
    };

    const response = await CapacitorHttp.request({ ...options, method: 'POST' })

    return response.status;
  }



}
