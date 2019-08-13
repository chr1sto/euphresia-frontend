import { Injectable, Inject, InjectionToken } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { AuthenticationService } from './auth.service';
import { VoteState } from './generated.services';

export const SOCK_BASE_URL = new InjectionToken<string>('SOCK_BASE_URL');

@Injectable({
    providedIn: 'root'
  })
  export class SignalRService {
    private hubConnection : signalR.HubConnection;
    private base_url : string;
    public state : VoteState;

    constructor(@Inject(SOCK_BASE_URL) baseUrl, private authService : AuthenticationService)
    {
        this.base_url = baseUrl;
    }

    public connect = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
                                    .withUrl(this.base_url +  '/vote?access_token=' + localStorage.getItem('token'))
                                    .build();

        this.hubConnection.start()
            .then(() => console.log('Socket Started'))
            .catch((err => console.log('Could not connect to vote socket! Error: ', err)))
    }

    public addListeners = () => 
    {
        this.hubConnection.on('STATE',(state) => {
            this.state = state;
            console.log(state);
        })

    }

    public disconnect = () => {
        this.hubConnection.stop()
            .then(() => console.log('Socket succesfully stopped'))
            .catch((err) => console.log('Could not terminate vote socket! Error: ',err))
    }
  }
