import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})

export class ApiService {

  API_URL = 'https://api-test-nlih-dev.fl0.io/';
  constructor() {}

  async login(email: string, password: string) {
    const options = {
      url: this.API_URL + 'auth/login',
      headers: { 'Content-Type': 'application/json' },
      data: { username: email, password: password },
    };

    const response = await CapacitorHttp.request({
      ...options,
      method: 'POST',
    });

    return response.data;
  }

  async getEmployees(id: any) {
    let data = [];
    const options = {
      url: this.API_URL + 'employees/company/' + id,
     
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
      
    };

    const response = await CapacitorHttp.request({
      ...options,
      method: 'DELETE',
    });

    return response.status;
  }

  async createEmployees(data: any) {
    
    let id:number = 1;
    const options:any = {
      url: this.API_URL + 'employees',
      params: {
        name: data.name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        num_control: data.num_control,
        gender: data.gender,
        company: id,
        birth_date: data.birth_date,
      },
      headers: { 'content-type': 'multipart/form-data' },
      data: {
        image: data.image,
      },
    };

    const response = await CapacitorHttp.request({ ...options, method: 'POST' })

    return response.status;
  }



}
