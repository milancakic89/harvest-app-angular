import { Component, Input, OnInit } from '@angular/core';
import { Service } from '../app.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  success: boolean;
  message = '';
  constructor(private service: Service) { }

  ngOnInit(): void {
    this.service.emitMessage.subscribe(message => {
      this.message = message;
      this.removeMessage();
    })
    this.service.success.subscribe(success=>{
      this.success = success;
    })
  }
  removeMessage() {
    if (this.message) {
      setTimeout(() => {
        this.service.emitMessage.emit('');
      }, 2000)
    }

  }

}
