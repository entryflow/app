import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { HttpClient,HttpHeaders,HttpParams } from  '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API_URL = 'https://api-test-nlih-dev.fl0.io/';
  constructor(private http: HttpClient) {}

  async login(data: any) {
    let data_tmp: any = [];

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = `username=${data.email}&password=${data.password}`;
    try {
      const response = await this.http.post(`${this.API_URL}login`, body, { headers }).toPromise();
      
      return response;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error; // You can handle or rethrow the error as needed
    }
  }

  async signUp(data: any) {
    const id: number = 1;

    const params = new HttpParams()
      .set('name', data.name)
      .set('middle_name', data.middle_name)
      .set('last_name', data.last_name)
      .set('email', data.email)
      .set('password', data.password)
      .set('phone', data.phone)
      .set('company', id);

    const body = new FormData();
    body.append('image', data.image);

    try {
      const response = await this.http.post(`${this.API_URL}signup`, body, { params }).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error; // You can handle or rethrow the error as needed
    }
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

  async getCompanyID(key: string) {
    let data: any = [];
    const options = {
      url: this.API_URL + 'company',
      params: { key: key },
    };

    const response = await CapacitorHttp.request({
      ...options,
      method: 'GET',
    }).then((res) => {
      data = res.data;
    });

    return data;
  }

  async createEmployees(data: any) {
    let id: number = 1;

    const params = new HttpParams()
    .set('name', data.name)
    .set('middle_name', data.middle_name)
    .set('last_name', data.last_name)
    .set('email', data.email)
    .set('phone', data.phone)
    .set('num_control', data.num_control)
    .set('gender',data.gender)
    .set('company', id)
    .set('birth_date', data.birth_date);

    const body = new FormData();
    body.append('image', data.image);

    try {
      const response = await this.http.post(`${this.API_URL}employees`, body, { params }).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error; // You can handle or rethrow the error as needed
    }
 
  }

  async setToken(token: string) {
    await Preferences.set({
      key: 'token',
      value: token,
    });
  }

  async getToken() {
    return await Preferences.get({ key: 'token' });
  }

  async deleteToken() {
    await Preferences.remove({ key: 'token' });
  }
}
